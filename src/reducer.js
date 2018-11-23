import { createAction, handleActions } from 'redux-actions';
import { get } from './utils';

export const setOperation = createAction('SET_OPERATION');
export const setTableSize = createAction('SET_TABLE_SIZE');
export const recordScore = createAction('RECORD_ACTION');

export default handleActions(
  {
    [setOperation](state, { payload: operation }) {
      return { ...state, operation };
    },
    [setTableSize](state, { payload: tableSize }) {
      return { ...state, tableSize };
    },
    [recordScore](state, { payload }) {
      const { operation, tableSize, result } = payload;

      const newState = { ...state };
      newState.sessions = { ...state.sessions };
      newState.sessions[operation] = { ...get(state, ['sessions', operation]) };
      newState.sessions[operation][tableSize] =
        get(state, ['sessions', operation, tableSize]) || [];
      newState.sessions[operation][tableSize] = newState.sessions[operation][
        tableSize
      ].concat(result);

      return newState;
    },
  },
  {},
);
