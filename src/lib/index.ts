import { clean, strip } from './clean';

export function process(text: string): string[] {
    const corpus = clean(strip(text).toLowerCase());
    return [];
}
