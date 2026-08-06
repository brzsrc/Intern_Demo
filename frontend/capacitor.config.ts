import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.intern.demo.app',
    appName: 'Intern Demo',
    webDir: 'dist',
    server: {
        androidScheme: 'http',
        cleartext: true
    },
    plugins: {
        FirebaseAuthentication: {
            authDomain: undefined,
            skipNativeAuth: false,
            providers: ["google.com"],
        },

        SplashScreen: {
            launchAutoHide: false,
            backgroundColor: '#ffffffff',
            androidScaleType: 'CENTER_CROP',
            showSpinner: false,
            splashFullScreen: true,   // 想要沉浸式就留这两行
            splashImmersive: true,    // 不想要就删掉
        },
    },
};

export default config;
