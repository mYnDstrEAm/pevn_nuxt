<template>
  <v-flex>
    <v-layout v-if="!isEditing" row>
      <v-flex xs10 md10 xl10>
        <v-layout row>
          <v-checkbox
            id="todoCheckbox"
            v-model="todo.complete"
            style="max-width:30px;"
            @change="updateTodo(todo)"
          />
          <div id="todoTitle">
            <del v-if="todo.complete">
              <h3>{{ todo.title }}</h3>
            </del>
            <div v-else style>
              <h3>{{ todo.title }}</h3>
            </div>
          </div>
        </v-layout>
      </v-flex>
      <v-flex xs1 md1 xl1>
        <v-btn @click.prevent="deleteTodo(todo.id)">Del</v-btn>
      </v-flex>
      <v-flex xs1 md1 xl1>
        <v-btn @click.prevent="setEditMode()">Edit</v-btn>
      </v-flex>
    </v-layout>
    <v-layout v-if="isEditing" row>
      <v-flex xs10 md10 xl10>
        <v-text-field v-model="todo.title"/>
      </v-flex>
      <v-flex xs1 md1 xl1>
        <v-btn @click.prevent="setEditMode()">Cancel</v-btn>
      </v-flex>
      <v-flex xs1 md1 xl1>
        <v-btn @click.prevent="updateTodo(todo),setEditMode()">Save</v-btn>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ToDo',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      updateTodo: 'todos/updateTodo',
      deleteTodo: 'todos/deleteTodo'
    }),
    setEditMode() {
      this.isEditing = !this.isEditing;
    }
  }
};
</script>

<style>
#todoTitle {
  align-content: center;
  align-items: center;
  align-self: center;
}
#todoCheckbox {
  max-width: 30px;
}
</style>
