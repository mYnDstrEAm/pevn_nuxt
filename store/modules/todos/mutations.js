import * as types from './mutation-types';

export default {
  [types.PUSH_TODO](state, newTodo) {
    state.todos.push(newTodo);
  },
  [types.SET_TODOS](state, todos) {
    state.todos = todos;
  },
  [types.UPDATE_TODO](state, todo) {
    const item = state.todos.find(
      item => item.id === Number.parseInt(todo.id, 10)
    );
    item.title = todo.title;
    item.complete = todo.complete;
  },
  [types.DELETE_TODO](state, todo) {
    const item = state.todos.find(
      item => item.id === Number.parseInt(todo.id, 10)
    );
    let i = state.todos.indexOf(item);
    state.todos.splice(i, 1);
  }
};
