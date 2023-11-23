import {initialState, favoriteReducer} from './favorite.reducer';
import * as actions from '../actions/favorite.actions';
import {ISearchItem} from '../../youtube/interfaces/search-item.interface';
import {testItem} from "../../youtube/companents/search-item/search-item.component.spec";

describe('Favorite Reducer', () => {
  it('should return the initial state', () => {
    const action = {} as ReturnType<typeof actions.addToFavorites>;
    const state = favoriteReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should handle addToFavorites', () => {
    const searchItem: ISearchItem = {...testItem};
    const action = actions.addToFavorites({searchItem});
    const state = favoriteReducer(initialState, action);
    expect(state).toEqual([searchItem]);
  });

  it('should handle addNewToFavorites', () => {
    const searchItem: ISearchItem = {...testItem};
    const existingItem: ISearchItem = {...testItem};
    const initialStateWithExistingItem = [existingItem];

    const action = actions.addNewToFavorites({searchItem});
    const state = favoriteReducer(initialStateWithExistingItem, action);

    expect(state).toEqual([searchItem, existingItem]);
  });

  it('should handle removeFromFavorites (invalid)', () => {
    const videoIdToRemove = 'video1';
    const item1: ISearchItem = {...testItem};
    const item2: ISearchItem = {...testItem};
    const initialStateWithItems = [item1, item2];
    const action = actions.removeFromFavorites({videoId: videoIdToRemove});
    const state = favoriteReducer(initialStateWithItems, action);
    expect(state).toEqual([item1, item2]);
  });

  it('should handle removeFromFavorites (only one)', () => {
    const videoIdToRemove = 'video1';
    const itemToRemove: ISearchItem = {...testItem, id: {...testItem.id, videoId: videoIdToRemove}};
    const initialStateWithItems = [itemToRemove,];
    const action = actions.removeFromFavorites({videoId: videoIdToRemove});
    const state = favoriteReducer(initialStateWithItems, action);
    expect(state).toEqual([]);
  });

  it('should handle removeFromFavorites (correct)', () => {
    const videoIdToRemove = 'video1';
    const itemToRemove: ISearchItem = {...testItem, id: {...testItem.id, videoId: videoIdToRemove}};
    const existingItem: ISearchItem = {...testItem};
    const initialStateWithItems = [itemToRemove, existingItem];
    const action = actions.removeFromFavorites({videoId: videoIdToRemove});
    const state = favoriteReducer(initialStateWithItems, action);
    expect(state).toEqual([existingItem]);
  })

  describe('addNewToFavorites', () => {
    const testItem1 = {...testItem, snippet: {...testItem.snippet, publishedTime: '2023-11-02'}}
    const testItem2 = {...testItem, snippet: {...testItem.snippet, publishedTime: '2023-11-01'}}
    const testItem3 = {...testItem, kind: 'newItem', snippet: {...testItem.snippet, publishedTime: '2023-11-02'}}
    const testItem4 = {...testItem, kind: 'newItem', snippet: {...testItem.snippet, publishedTime: '2023-11-01'}}

    it('should handle addNewToFavorites (only youtube items)', () => {
      const action1 = actions.addNewToFavorites({searchItem: testItem1});
      const action2 = actions.addNewToFavorites({searchItem: testItem2});
      const stateAfterFirstAction = favoriteReducer(initialState, action1);
      const stateAfterSecondAction = favoriteReducer(stateAfterFirstAction, action2);

      expect(stateAfterSecondAction).toEqual([testItem2, testItem1]);
    });
    it('should handle addNewToFavorites (only custom items)', () => {
      const action1 = actions.addNewToFavorites({searchItem: testItem3});
      const action2 = actions.addNewToFavorites({searchItem: testItem4});
      const stateAfterFirstAction = favoriteReducer(initialState, action1);
      const stateAfterSecondAction = favoriteReducer(stateAfterFirstAction, action2);

      expect(stateAfterSecondAction).toEqual([testItem4, testItem3]);
    });
    it('should handle addNewToFavorites', () => {
      const action1 = actions.addNewToFavorites({searchItem: testItem1});
      const action2 = actions.addNewToFavorites({searchItem: testItem2});
      const action3 = actions.addNewToFavorites({searchItem: testItem3});
      const action4 = actions.addNewToFavorites({searchItem: testItem4});
      const stateAfterFirstAction = favoriteReducer(initialState, action1);
      const stateAfterSecondAction = favoriteReducer(stateAfterFirstAction, action2);
      const stateAfterThirdAction = favoriteReducer(stateAfterSecondAction, action3);
      const stateAfterFourthAction = favoriteReducer(stateAfterThirdAction, action4);

      expect(stateAfterFourthAction).toEqual([testItem4, testItem3, testItem2, testItem1]);
    });
    it('should handle addNewToFavorites (another sequence)', () => {
      const action1 = actions.addNewToFavorites({searchItem: testItem4});
      const action2 = actions.addNewToFavorites({searchItem: testItem1});
      const action3 = actions.addNewToFavorites({searchItem: testItem2});
      const action4 = actions.addNewToFavorites({searchItem: testItem3});
      const stateAfterFirstAction = favoriteReducer(initialState, action1);
      const stateAfterSecondAction = favoriteReducer(stateAfterFirstAction, action2);
      const stateAfterThirdAction = favoriteReducer(stateAfterSecondAction, action3);
      const stateAfterFourthAction = favoriteReducer(stateAfterThirdAction, action4);

      expect(stateAfterFourthAction).toEqual([testItem4, testItem3, testItem2, testItem1]);
    });
  });
});
