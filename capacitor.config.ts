import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.drstone.app',
  appName: 'DrStone',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
