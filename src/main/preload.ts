import { contextBridge, ipcRenderer } from 'electron';

export type Channels = 'success';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    success() {
      ipcRenderer.send('success');
    },
    start() {
      ipcRenderer.send('start');
    },
    fail() {
      ipcRenderer.send('fail');
    },
    minimize() {
      ipcRenderer.send('minimize');
    },
    close() {
      ipcRenderer.send('close');
    },
    download(type: any, link: any) {
      ipcRenderer.send('download', type, link)
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});