<template>
  <v-container grid-list-xl>
    <v-layout v-bind="binding">
      <v-flex>
        <v-text-field v-model="todo.title" :placeholder="$t('inspire.todos.placeholders.title')"/>
      </v-flex>
      <v-flex>
        <v-btn @click.prevent="addTodo(todo)">add</v-btn>
        <v-btn @click.prevent="fetchTodos()">fetch</v-btn>
      </v-flex>
      <ToDo v-for="(todo, index) in todos" :key="index" :todo="todo"/>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ToDo from '../../components/ToDo.vue';

export default {
  components: {
    ToDo
  },
  data() {
    return {
      todo: {
        id: 0,
        title: '',
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };
  },
  computed: {
    ...mapGetters({
      todos: 'todos/todos'
    }),
    binding() {
      const binding = {};
      binding.column = true;
      return binding;
    }
  },
  mounted() {},
  methods: {
    ...mapActions({
      addTodo: 'todos/addTodo',
      fetchTodos: 'todos/fetchTodos'
    })
  }
};
</script>
