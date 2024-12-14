import { initialState } from './../user/index';
import { describe, test } from '@jest/globals';
import ingredients from './../../../ingredients.json';
import { getAllIngredients, reducer } from '../ingredients'
describe('тесты ingredients', () => {
  const expectedResult = ingredients;
		
  test('теcт action на получение ингредиентов', () => {
			const initialState = 
			const newState = reducer(initialState, action);
		});
});
