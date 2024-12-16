import { describe, test } from '@jest/globals';
import {
  TOrdersState,
  createOrder,
  getOrder,
  getOrders,
  ordersReducer
} from '../orders';
import { TOrder } from './../../../utils/types';

describe('тесты слайса orders', () => {
  const initialState: TOrdersState = {
    isLoading: false,
    orderModalData: null,
    orderRequest: false,
    data: []
  };

  describe('тесты getOrders', () => {
    test('теcт getOrders.pending', () => {
      const action = { type: getOrders.pending.type };
      const newState = ordersReducer(initialState, action);

      expect(newState.isLoading).toBe(true);
      expect(newState.data).toEqual([]);
    });

    test('теcт getOrders.fulfilled', () => {
      const ordersPayload: TOrder[] = [
        {
          _id: 'someid',
          status: 'somestatus',
          name: 'somename',
          createdAt: '2024.12.12/18:02',
          updatedAt: '2024.12.12/18:04',
          number: 3,
          ingredients: ['643d69a5c3f7b9001cfa0944', '643d69a5c3f7b9001cfa0948']
        },
        {
          _id: 'someid',
          status: 'somestatus',
          name: 'somename',
          createdAt: '2024.12.12/18:05',
          updatedAt: '2024.12.12/18:08',
          number: 5,
          ingredients: ['643d69a5c3f7b9001cfa0942', '643d69a5c3f7b9001cfa0948']
        }
      ];

      const action = {
        type: getOrders.fulfilled.type,
        payload: ordersPayload
      };
      const newState = ordersReducer(initialState, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.data).toEqual(ordersPayload);
    });

    test('теcт getOrders.rejected', () => {
      const action = { type: getOrders.rejected.type };
      const newState = ordersReducer(initialState, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.data).toEqual([]);
    });
  });

  describe('тесты getOrder', () => {
    test('теcт getOrder.pending', () => {
      const action = { type: getOrder.pending.type };
      const newState = ordersReducer(initialState, action);

      expect(newState.isLoading).toBe(true);
      expect(newState.data).toEqual([]);
    });

    test('теcт getOrder.fulfilled', () => {
      const orderPayload = {
        order: {
          _id: 'someid',
          status: 'somestatus',
          name: 'somename',
          createdAt: '2024.12.12/18:02',
          updatedAt: '2024.12.12/18:04',
          number: 3,
          ingredients: ['643d69a5c3f7b9001cfa0944', '643d69a5c3f7b9001cfa0948']
        }
      };

      const action = {
        type: createOrder.fulfilled.type,
        payload: orderPayload
      };

      const newState = ordersReducer(initialState, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.data).toEqual([action.payload.order]);
    });

    test('теcт getOrder.rejected', () => {
      const action = { type: createOrder.rejected.type };
      const newState = ordersReducer(initialState, action);

      expect(newState.isLoading).toBe(false);
    });
  });

  describe('тесты createOrder', () => {
    test('теcт createOrder.pending', () => {
      const action = { type: createOrder.pending.type };
      const newState = ordersReducer(initialState, action);

      expect(newState.isLoading).toBe(true);
      expect(newState.orderRequest).toBe(true);
    });

    test('теcт createOrder.fulfilled', () => {
      const orderPayload = {
        order: {
          _id: 'someid',
          status: 'somestatus',
          name: 'somename',
          createdAt: '2024.12.12/18:02',
          updatedAt: '2024.12.12/18:04',
          number: 3,
          ingredients: ['643d69a5c3f7b9001cfa0944', '643d69a5c3f7b9001cfa0948']
        }
      };

      const action = {
        type: createOrder.fulfilled.type,
        payload: orderPayload
      };
      const newState = ordersReducer(initialState, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.orderModalData).toEqual(action.payload.order);
      expect(newState.data).toEqual([action.payload.order]);
      expect(newState.orderRequest).toBe(false);
    });

    test('теcт createOrder.rejected', () => {
      const action = {
        type: createOrder.rejected.type
      };
      const newState = ordersReducer(initialState, action);

      expect(newState.isLoading).toBe(false);
    });
  });
});
