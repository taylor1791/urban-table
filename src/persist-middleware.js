import { AsyncStorage } from 'react-native';

import { STORE_KEY } from './constants/store';

export default function persist(store) {
  return function(next) {
    return function(action) {
      const result = next(action);
      const state = store.getState();
      AsyncStorage.setItem(STORE_KEY, JSON.stringify(state)).catch(e => {
        console.warn(e);
      });
      return result;
    };
  };
}
