export type InputType = 'none' | 'email' | 'numeric' | 'text';

export function inputMask(text: string, type: InputType): string {
    switch (type) {
        case 'numeric': {
            let value = text.replace(/\D/g, '');

            if (!value) return '';

            value = parseInt(value, 10).toString();

            if (isNaN(Number(value))) return '';

            value = value.padStart(3, '0');

            const centavos = value.slice(-2);
            const inteiros = value.slice(0, -2);

            const inteirosFormatados = inteiros.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

            return `${inteirosFormatados},${centavos}`;
        }

        case 'email':
            return text.replace(/\s/g, '').toLowerCase();

        case 'text':
            return text;

        case 'none':
        default:
            return text;
    }
}