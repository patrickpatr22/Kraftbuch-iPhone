/* Kraftbuch – Brücke zwischen der Web-App und den iPhone-Funktionen (Capacitor). */
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Preferences } from '@capacitor/preferences';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

const KEY = 'kraftbuch.state';
let saveTimer = null, pending = null;

if (Capacitor.isNativePlatform()) {
  window.KBNative = {
    platform: Capacitor.getPlatform(),

    /* Daten zusätzlich in den App-Einstellungen sichern (übersteht auch ein Leeren des Web-Speichers) */
    async load() { const r = await Preferences.get({ key: KEY }); return r && r.value ? r.value : null; },
    save(json) {
      pending = json; clearTimeout(saveTimer);
      saveTimer = setTimeout(() => { const v = pending; pending = null; Preferences.set({ key: KEY, value: v }).catch(() => {}); }, 400);
    },

    /* Mitteilung zur Richtzeit */
    async permission() { try { const p = await LocalNotifications.checkPermissions(); return p.display === 'granted' ? 'granted' : p.display === 'denied' ? 'denied' : 'prompt'; } catch (e) { return 'prompt'; } },
    async requestPermission() { try { const p = await LocalNotifications.requestPermissions(); return p.display === 'granted' ? 'granted' : p.display === 'denied' ? 'denied' : 'prompt'; } catch (e) { return 'prompt'; } },
    async notifyAt(id, atMs, title, body) {
      try {
        const p = await LocalNotifications.checkPermissions();
        if (p.display !== 'granted') return;
        await LocalNotifications.schedule({ notifications: [{ id, title, body, schedule: { at: new Date(atMs), allowWhileIdle: true }, foreground: false }] });
      } catch (e) {}
    },
    cancel(id) { LocalNotifications.cancel({ notifications: [{ id }] }).catch(() => {}); },

    /* fühlbare Rückmeldung */
    haptic(kind) {
      try {
        if (kind === 'success') Haptics.notification({ type: NotificationType.Success });
        else if (kind === 'warning') Haptics.notification({ type: NotificationType.Warning });
        else Haptics.impact({ style: kind === 'medium' ? ImpactStyle.Medium : ImpactStyle.Light });
      } catch (e) {}
    },

    /* Statusleiste passend zum Design */
    statusBar(dark) { StatusBar.setStyle({ style: dark ? Style.Dark : Style.Light }).catch(() => {}); },

    /* Sicherung als Datei teilen bzw. in „Dateien“ sichern */
    async shareFile(name, text) {
      const r = await Filesystem.writeFile({ path: name, data: text, directory: Directory.Cache, encoding: Encoding.UTF8 });
      await Share.share({ title: name, files: [r.uri] });
    },

    /* Fortschrittsfotos: liegen nur auf dem iPhone (App-Daten) */
    async savePhoto(id, b64) {
      const path = `photos/${id}.jpg`;
      await Filesystem.writeFile({ path, data: b64, directory: Directory.Data, recursive: true });
      const r = await Filesystem.getUri({ path, directory: Directory.Data });
      return Capacitor.convertFileSrc(r.uri);
    },
    async photoUrl(path) { const r = await Filesystem.getUri({ path, directory: Directory.Data }); return Capacitor.convertFileSrc(r.uri); },
    async readPhoto(path) { const r = await Filesystem.readFile({ path, directory: Directory.Data }); return typeof r.data === 'string' ? r.data : null; },
    async deletePhoto(path) { try { await Filesystem.deleteFile({ path, directory: Directory.Data }); } catch (e) {} },
    async shareImage(name, b64) {
      const r = await Filesystem.writeFile({ path: name, data: b64, directory: Directory.Cache });
      await Share.share({ title: name, files: [r.uri] });
    },

    onResume(fn) { App.addListener('appStateChange', s => { if (s.isActive) fn(); }); }
  };
  window.addEventListener('pagehide', () => { if (pending) Preferences.set({ key: KEY, value: pending }).catch(() => {}); });
  App.addListener('appStateChange', s => { if (!s.isActive && pending) { const v = pending; pending = null; clearTimeout(saveTimer); Preferences.set({ key: KEY, value: v }).catch(() => {}); } });
}
