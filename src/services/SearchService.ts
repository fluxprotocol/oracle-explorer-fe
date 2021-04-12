import { Pagination } from "../models/Pagination";
import { routePaths } from "../routes";
import { doesDataRequestExists } from "./DataRequestService";

export interface SearchResult {
    url: string;
}

export async function search(query: string): Promise<Pagination<SearchResult>> {
    try {
        if (isNaN(Number(query))) {
            return {
                items: [],
                total: 0,
            };
        }

        const dataRequest = await doesDataRequestExists(query);

        if (dataRequest) {
            return {
                items: [{
                    url: routePaths.dataRequestDetail('near', query),
                }],
                total: 1,
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
