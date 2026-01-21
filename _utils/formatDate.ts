export function formatDateLabel(dateStr: string) {
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) return dateStr;

    const day = date.getDate().toString().padStart(2, '0');
    const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
    const month = meses[date.getMonth()];
    return `${day} ${month}`;
}