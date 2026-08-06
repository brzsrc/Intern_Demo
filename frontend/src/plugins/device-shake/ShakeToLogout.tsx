import { useEffect } from "react";
import { DeviceShake } from "./definitions";
import { useAuth } from "../../contexts/AuthContext";

export function ShakeToLogout() {
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) return;

        DeviceShake.enableListening().catch(console.error);
        const handle = DeviceShake.addListener('shake', () => {
            if (window.confirm('shaking detected, do you want to logout?')) logout();
        });

        return () => {
            handle.then(h => h.remove());
            DeviceShake.stopListening();
        };
    }, [isAuthenticated]);

    return null;
}