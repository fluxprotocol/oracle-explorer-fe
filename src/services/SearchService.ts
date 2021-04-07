import { Pagination } from "../models/Pagination";

export async function search(query: string): Promise<Pagination<any>> {
    try {
        if (isNaN(Number(query))) {
            return {
                items: [],
                total: 0,
            };
        }

        return {
            items: [],
            total: 0,
        };
    } catch (error) {
        return {
            items: [],
            total: 0,
        };
    }
}
