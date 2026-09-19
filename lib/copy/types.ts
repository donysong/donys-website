export type Lang = 'en' | 'ko';
export type Entry = string | string[];
export type Dict = Record<Lang, Record<string, Entry>>;
