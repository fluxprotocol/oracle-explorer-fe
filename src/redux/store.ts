import {
    applyMiddleware,
    CombinedState,
    createStore,
    Store,
    StoreEnhancer,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers, { Reducers } from './reducers';

const createEnhancer = (): StoreEnhancer => (process.env.REACT_APP_APP_ENV !== 'production'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk)
);

export default function configureStore(preloadedState: Record<string, any> = {}): Store<CombinedState<Reducers>> {
    const enhancer = createEnhancer();
    return createStore(reducers, preloadedState, enhancer);
}
