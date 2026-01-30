export type InputType = 'none' | 'email' | 'numeric' | 'text'

export function inputMask(text: string, type: InputType): string {
    switch (type) {
        case 'numeric':
            return text.replace(/[^0-9]/g, '');

        case 'email':
            return text.replace(/\s/g, '').toLowerCase();

        case 'text':
            return text;

        case 'none':
        default:
            return text;
    }
}