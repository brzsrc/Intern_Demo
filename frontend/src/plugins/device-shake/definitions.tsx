import { registerPlugin } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';

export interface DeviceShakePlugin {
  enableListening(): Promise<void>;
  stopListening(): Promise<void>;

  addListener(eventName: 'shake', listenerFunc: () => void): Promise<PluginListenerHandle>;
  removeAllListeners(): Promise<void>;
}

export const DeviceShake = registerPlugin<DeviceShakePlugin>('DeviceShake', {
  web: () => import('./web').then(m => new m.DeviceShakeWeb()),
});