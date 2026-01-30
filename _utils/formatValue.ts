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