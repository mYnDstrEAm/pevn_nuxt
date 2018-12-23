import axios from 'axios';
import * as mutations from './mutation-types';

export const addTodo = ({ commit }, payload) => {
  axios
    .post(`${process.env.BASE_URL}/api/todos/add-todo`, payload)
    .then(json => {
      commit(mutations.SET_TODOS, json.data);
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchTodos = ({ commit }) => {
  axios
    .get(`${process.env.BASE_URL}/api/todos/`)
    .then(json => {
      commit(mutations.SET_TODOS, json.data);
    })
    .catch(error => {
      console.log(error);
    });
};

export const updateTodo = ({ commit }, payload) => {
  axios
    .put(`${process.env.BASE_URL}/api/todos/${payload.id}`, payload)
    .then(json => {
      commit(mutations.UPDATE_TODO, json.data);
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteTodo = ({ commit }, payload) => {
  axios
    .delete(`${process.env.BASE_URL}/api/todos/${payload}`)
    .then(json => {
      commit(mutations.DELETE_TODO, json.data);
    })
    .catch(error => {
      console.log(error);
    });
};
