import { createStore, applyMiddleware, Store, CombinedState, Action } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export const initStore = (): Store<
    CombinedState<{
        common: never;
        routing: unknown;
    }>,
    Action
> & {
    dispatch: unknown;
} => {
    const store = createStore(rootReducer, applyMiddleware(thunk));
    return store;
};
export default initStore;
