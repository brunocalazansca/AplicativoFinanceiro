export const formatarValor = (v: string): number => {
    if (!v) return 0;
    const valorLimpo = v.replace(/[R$\s.]/g, '').replace(',', '.');
    return Number(valorLimpo);
};

export const formatarData = (data: Date): string => {
    return data.toISOString().split('T')[0];
};