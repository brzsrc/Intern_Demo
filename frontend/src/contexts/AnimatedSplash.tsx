// AnimatedSplash.tsx
import {useEffect, useState} from "react";
import { SplashScreen } from "@capacitor/splash-screen";
import splashAnim from "../../assets/cat-with-lamp.json";
import { useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

const FADE_MS = 300;

export function AnimatedSplash({ loading }: { loading: boolean }) {
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [gone, setGone] = useState(false);

    useEffect(() => {
        SplashScreen.hide();   // 职责不变:撤原生图
    }, []);

    useEffect(() => {                              // loading 结束 → 数 FADE_MS 拍后真正卸载
        if (loading) return;
        const t = setTimeout(() => setGone(true), FADE_MS);
        return () => clearTimeout(t);
    }, [loading]);

    // if (!loading) return null;                          // 退场条件就这一行
    if (gone) return null;

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "#ffffff",
            opacity: loading ? 1 : 0,              // 谢幕由 loading 直接驱动
            transition: `opacity ${FADE_MS}ms ease-out`,
            pointerEvents: loading ? "auto" : "none",
        }}>
            <Lottie
                lottieRef={lottieRef}
                animationData={splashAnim}
                loop
                initialSegment={[14, 90]}      // 单位是帧,不是秒——见下
                onDOMLoaded={() => lottieRef.current?.setSpeed(3)}
                style={{ width: 220 }}
            />
        </div>
    );
}


export function AnimatedLoading({ loading }: { loading: boolean }) {
    const lottieRef = useRef<LottieRefCurrentProps>(null);


    if (!loading) return null;                          // 退场条件就这一行

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "#ffffff",
            // pointerEvents: loading ? "auto" : "none",
        }}>
            <Lottie
                lottieRef={lottieRef}
                animationData={splashAnim}
                loop
                initialSegment={[14, 90]}      // 单位是帧,不是秒——见下
                onDOMLoaded={() => lottieRef.current?.setSpeed(1)}
                style={{ width: 220 }}
            />
        </div>
    );
}


