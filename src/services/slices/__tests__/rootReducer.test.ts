import { describe } from '@jest/globals';
import { rootReducer, store } from '../../store';

describe('rootReducer', () => {
  test('тест на корректность инициализации rootReducer', () => {
    const initialState = rootReducer(undefined, { type: 'test' });
    expect(initialState).toEqual(store.getState());
  });
});
