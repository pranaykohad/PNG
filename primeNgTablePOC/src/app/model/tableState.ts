export interface tableState {
     sortField: string;
     sortOrder: number;
     multiSortMeta: {field: string, order: number}[];
     columnWidths: string;
     columnOrder: string[];
}
