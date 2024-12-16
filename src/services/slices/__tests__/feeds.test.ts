import { describe, test } from '@jest/globals';
import { feedsReducer, getFeeds } from '../feeds';

describe('тесты слайса feeds', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    selectedOrder: null,
    isLoading: false
  };

  test('теcт getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const newState = feedsReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.orders).toEqual([]);
    expect(newState.total).toEqual(0);
    expect(newState.totalToday).toEqual(0);
  });

  test('теcт getFeeds.fulfilled', () => {
    const feedsPayload = {
      orders: [
        {
          isLoading: false,
          orderModalData: null,
          orderRequest: false,
          data: null
        },
        {
          isLoading: false,
          orderModalData: null,
          orderRequest: false,
          data: null
        }
      ],
      total: 200,
      totalToday: 100
    };

    const action = {
      type: getFeeds.fulfilled.type,
      payload: feedsPayload
    };
    const newState = feedsReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.orders).toEqual(feedsPayload.orders);
    expect(newState.total).toEqual(feedsPayload.total);
    expect(newState.totalToday).toEqual(feedsPayload.totalToday);
  });

  test('теcт getFeeds.rejected', () => {
    const action = { type: getFeeds.rejected.type };
    const newState = feedsReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.orders).toEqual([]);
    expect(newState.total).toBe(0);
    expect(newState.totalToday).toBe(0);
  });
});
