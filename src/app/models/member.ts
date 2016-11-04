export interface IMember {
    id: number;
    first_name: string;
    last_name: string;
    key: string;
    starRating: number;
    selected: boolean;
    description: string;
    parents?: IMember[];
}