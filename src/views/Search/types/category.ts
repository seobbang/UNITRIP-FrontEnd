export type category = 'physical' | 'visual' | 'hearing' | 'infant';
export type filterState = Record<category, Record<string, boolean>>;
