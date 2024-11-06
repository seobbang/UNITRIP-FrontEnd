import { BarrierFreeItem } from '@/types/search';

export type category = 'physical' | 'visual' | 'hearing' | 'infant';
export type filterState = Record<category, Record<string, boolean>>;
export type FilterFacilities = keyof Omit<BarrierFreeItem, 'contentid'>;
