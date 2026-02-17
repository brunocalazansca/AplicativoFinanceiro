export function withAlpha(hex: string, alpha: number) {
    const clean = hex.replace("#", "");
    const full = clean.length === 3
        ? clean.split("").map((c) => c + c).join("")
        : clean;

    if (full.length !== 6) return `rgba(0,0,0,${alpha})`;

    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);

    return `rgba(${r},${g},${b},${alpha})`;
}