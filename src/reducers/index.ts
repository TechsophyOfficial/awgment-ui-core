import { combineReducers, CombinedState } from 'redux';
import { routerReducer } from 'react-router-redux';
import { CLEAR_STORE } from '../constants/common';
import common from './common';

interface Action {
    type: string;
}

const appReducer = combineReducers({
    common: common,
    routing: routerReducer,
});

const rootReducer = (
    state: CombinedState<{ common: never; routing: unknown }> | undefined,
    action: Action,
): CombinedState<{
    common: never;
    routing: unknown;
}> => {
    let appState = state;
    if (action.type === CLEAR_STORE) {
        /*
         * Reducers are supposed to return the initial state when they are called
         * with undefined as the first argument, no matter the action.
         * Let’s use this fact to conditionally strip the accumulated state as we
         * pass it to appReducer. Now, whenever CLEAR_STORE fires, all reducers will
         * be initialized anew.
         */
        appState = undefined;
    }
    return appReducer(appState, action);
};

export default rootReducer;
