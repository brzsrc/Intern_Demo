import { WebPlugin } from '@capacitor/core';
import type { DeviceShakePlugin } from './definitions';


export class DeviceShakeWeb extends WebPlugin implements DeviceShakePlugin {

  async enableListening(): Promise<void> {
    console.warn('[DeviceShake] not supported on web, ignoring');
  }

  async stopListening(): Promise<void> {}
}