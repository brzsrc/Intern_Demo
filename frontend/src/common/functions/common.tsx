import { Haptics, ImpactStyle } from '@capacitor/haptics';

export function truncate(text: string | null | undefined, max = 100) {
    if (!text) return ""
    return text.length > max ? text.slice(0, max) + "…" : text
}

export function formatDateTime(iso: string) {
    const d = new Date(iso)
    const pad = (n: number) => String(n).padStart(2, "0")
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
    // 2026-08-02 04:01
}


export const hapticsImpactMedium =  () => {
   Haptics.impact({ style: ImpactStyle.Medium });
};

export const hapticsImpactLight =  () => {
   Haptics.impact({ style: ImpactStyle.Light });
};

export const hapticsVibrate =  () => {
   Haptics.vibrate();
};

export const hapticsSelectionStart =  () => {
   Haptics.selectionStart();
};

const hapticsSelectionChanged =  () => {
   Haptics.selectionChanged();
};

export const hapticsSelectionEnd = () => {
   Haptics.selectionEnd();
};