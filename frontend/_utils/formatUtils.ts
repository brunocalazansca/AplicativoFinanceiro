export function formatDateLabel(dateStr: string) {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) return dateStr;

    const day = date.getDate().toString().padStart(2, '0');
    const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    const month = meses[date.getMonth()];
    return `${day} ${month}`;
}

export function formatBRL(value: number) {
    try {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    } catch {
        const fixed = value.toFixed(2).replace(".", ",");
        const parts = fixed.split(",");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return `R$ ${parts.join(",")}`;
    }
}

export const parseDateFromString = (text: string): Date | null => {
    const parts = text.split("/");
    if (parts.length !== 3) return null;

    const [ddStr, mmStr, yyyyStr] = parts;
    const day = Number(ddStr);
    const month = Number(mmStr) - 1;
    const year = Number(yyyyStr);

    // @ts-ignore
    if (!day || !month + 1 || !year) return null;

    const d = new Date(year, month, day);
    if (
        d.getFullYear() !== year ||
        d.getMonth() !== month ||
        d.getDate() !== day
    ) {
        return null;
    }

    return d;
};

export const formatDate = (date: Date | null) => {
    if (!date) {
        return "";
    }
    return date.toLocaleDateString("pt-BR");
};