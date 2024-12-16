import { describe, test } from '@jest/globals';
import { RequestStatus, TUser } from '@utils-types';
import {
  authUser,
  fetchUser,
  initialState,
  logoutUser,
  registerUser,
  userReducer
} from '../user';

describe('тесты слайса user', () => {
  describe('тесты fetchUser', () => {
    test('теcт fetchUser.pending', () => {
      const action = { type: fetchUser.pending.type };
      const newState = userReducer(initialState, action);

      expect(newState.requestStatus).toBe(RequestStatus.Loading);
      expect(newState.data).toEqual(null);
    });

    test('теcт fetchUser.fulfilled', () => {
      const userPayload = {
        email: 'kochanov.test@mail.ru',
        name: 'Saveliy'
      };

      const action = {
        type: fetchUser.fulfilled.type,
        payload: userPayload
      };
      const newState = userReducer(initialState, action);

      expect(newState.data).toEqual(userPayload);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Success);
    });

    test('теcт fetchUser.rejected', () => {
      const action = {
        type: fetchUser.rejected.type,
        meta: { rejectedWithValue: true },
        payload: { message: 'error' },
        error: { message: 'error' }
      };
      const newState = userReducer(initialState, action);

      expect(newState.error).toEqual({ message: 'error' });
      expect(newState.requestStatus).toEqual(RequestStatus.Failed);
    });
  });

  describe('тест registerUser', () => {
    test('теcт registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const newState = userReducer(initialState, action);

      expect(newState.requestStatus).toBe(RequestStatus.Loading);
    });

    test('теcт registerUser.fulfilled', () => {
      const userPayload: TUser = {
        email: 'kochanov.test@mail.ru',
        name: 'Saveliy'
      };

      const action = {
        type: registerUser.fulfilled.type,
        payload: userPayload
      };
      const newState = userReducer(initialState, action);

      expect(newState.data).toEqual(action.payload);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Success);
    });

    test('теcт registerUser.rejected', () => {
      const action = {
        type: registerUser.rejected.type
      };
      const newState = userReducer(initialState, action);

      expect(newState.requestStatus).toBe(RequestStatus.Failed);
    });
  });

  describe('тест authUser', () => {
    test('теcт authUser.pending', () => {
      const action = { type: authUser.pending.type };
      const newState = userReducer(initialState, action);

      expect(newState.requestStatus).toBe(RequestStatus.Loading);
    });

    test('теcт authUser.fulfilled', () => {
      const userPayload: TUser = {
        email: 'kochanov.test@mail.ru',
        name: 'Saveliy'
      };

      const action = {
        type: authUser.fulfilled.type,
        payload: userPayload
      };
      const newState = userReducer(initialState, action);

      expect(newState.data).toEqual(action.payload);
      expect(newState.isAuthenticated).toBe(true);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Success);
    });

    test('теcт authUser.rejected', () => {
      const action = {
        type: authUser.rejected.type
      };
      const newState = userReducer(initialState, action);

      expect(newState.requestStatus).toBe(RequestStatus.Failed);
    });
  });

  describe('тест logoutUser', () => {
    test('теcт logoutUser.pending', () => {
      const action = { type: logoutUser.pending.type };
      const newState = userReducer(initialState, action);

      expect(newState.requestStatus).toBe(RequestStatus.Loading);
    });

    test('теcт logoutUser.fulfilled', () => {
      const userPayload: TUser = {
        email: 'kochanov.test@mail.ru',
        name: 'Saveliy'
      };

      const action = {
        type: logoutUser.fulfilled.type,
        payload: userPayload
      };
      const newState = userReducer(initialState, action);

      expect(newState.data).toEqual(null);
      expect(newState.isAuthenticated).toBe(false);
      expect(newState.isAuthChecked).toBe(true);
      expect(newState.requestStatus).toBe(RequestStatus.Success);
    });

    test('теcт logoutUser.rejected', () => {
      const action = {
        type: logoutUser.rejected.type
      };
      const newState = userReducer(initialState, action);

      expect(newState.requestStatus).toBe(RequestStatus.Failed);
    });
  });
});
