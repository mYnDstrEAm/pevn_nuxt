import * as types from './mutation-types';

export default {
  [types.SET_USER](state, user) {
    state.authUser = user;
  }
};
