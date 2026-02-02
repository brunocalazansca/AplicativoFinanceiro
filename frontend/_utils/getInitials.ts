export function getInitials(fullName: string) {
    if (!fullName?.trim()) return "";

    const ignore = new Set(["de", "da", "do", "dos", "das", "e"]);
    const parts = fullName
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .filter((p) => !ignore.has(p.toLowerCase()));

    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";

    return (first + last).toUpperCase();
}
