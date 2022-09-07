declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        success(): void;
        minimize(): void;
        close(): void;
        download(type: any, link: any): void;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};