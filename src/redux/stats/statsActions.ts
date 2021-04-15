import { getAllDataRequests } from "../../services/DataRequestService"
import { setLatestRequestsStat, setTotalRequestsStat } from "./stats";

export function loadStats() {
    return async (dispatch: Function) => {
        getAllDataRequests({
            limit: 5,
            offset: 0,
        }).then((result) => {
            dispatch(setTotalRequestsStat(result.total.toString()));
            dispatch(setLatestRequestsStat(result.items));
        });
    }
}
