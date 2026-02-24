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

export const parseDateFromString = (dateString: string): Date | null => {
    const parts = dateString.split('/');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }
    return null;
}

export const formatDate = (date: Date | null) => {
    if (!date) {
        return "";
    }
    return date.toLocaleDateString("pt-BR");
};