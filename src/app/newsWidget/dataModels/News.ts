import {Tag} from './Tag';
export interface News {
    id: number;
    title: string;
    source: string;
    url: string;
    content: string;
    publishedAt: string;
    tags: Tag[];
}
