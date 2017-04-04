/*global describe it*/

/*----------Modules----------*/
import expect from 'expect';
import df from 'deep-freeze-strict';

import * as actions from 'actions';
import {userSessionReducer} from 'reducers';
import configureStore from 'configureStore';

describe('redux tests', () => {
  describe('configureStore', () => {
    it('should configure the redux store based on an initial state', () => {

    });
  });

  describe('action generators', ()=>{
    it('should generate the SET_USER action', () => {
      const user = 'user';
      const action = {
        type: 'SET_USER',
        user: 'user',
      };

      expect(actions.setUser(user)).toEqual(action);
    });
  });

  describe('reducer tests', () => {
    it('should set user data in the redux store', () => {
      const state = {
        user: null,
      };
      const action = {
        type: 'SET_USER',
        user: 'user',
      };
      const result = {
        user: 'user',
      };
      expect(userSessionReducer(df(state), df(action))).toEqual(result);
    });
  });
});
