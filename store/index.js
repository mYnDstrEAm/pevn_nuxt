import Vuex from 'vuex';
import todos from './modules/todos';
import auth from './modules/auth';
import * as authMutations from './modules/auth/mutation-types';

const createStore = () =>
  new Vuex.Store({
    modules: {
      todos,
      auth
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        if (req.user) {
          commit(authMutations.SET_USER, req.user);
        }
      }
    }
  });

export default createStore;
