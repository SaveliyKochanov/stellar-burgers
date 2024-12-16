import { describe, test } from '@jest/globals';
import {
  getIngredients,
  ingredientsReducer,
  initialState
} from '../ingredients';

describe('тесты слайса ingredients', () => {
  const ingredientsPayload = [
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      id: 'id'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: 'id2'
    }
  ];
  test('теcт getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const newState = ingredientsReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.ingredients).toEqual([]);
  });

  test('теcт getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredientsPayload
    };
    const newState = ingredientsReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.ingredients).toEqual(ingredientsPayload);
  });

  test('теcт getIngredients.rejected', () => {
    const action = { type: getIngredients.rejected.type };
    const newState = ingredientsReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.ingredients).toEqual([]);
  });
});
