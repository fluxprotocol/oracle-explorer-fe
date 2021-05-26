import { getOracleConfigById } from '../../services/OracleConfigService';
import { setOracleConfigDetail, setOracleConfigLoading } from './oracleConfig';

export function loadOracleConfig(id: string) {
    return async (dispatch: Function) => {
        dispatch(setOracleConfigLoading(true));
        const config = await getOracleConfigById(id);
        dispatch(setOracleConfigDetail(config));
        dispatch(setOracleConfigLoading(false));
    }
}
