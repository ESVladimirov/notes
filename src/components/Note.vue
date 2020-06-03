<template>
  <div>
    <div class="note">
      <div>
        <button type="button" class="btn btn-delete" @click="showModal">Delete note</button>
          <ModalDeleteNote v-show="isModalVisible"
                 @close="closeModal"
                 @deleteNote="deleteNote"
          />
          <h2 class="note-title">{{noteTitle}}</h2>
      </div>
      <ul v-if="isShortOption">
        <li v-for="todo in todos.slice(0, 3)" 
            :key="todo.id"
        >  
          <span >
            <input type="checkbox" 
                   disabled 
                   v-model="todo.completed"
            >
            <div class="todo-title"           
                 v-bind:class="{completed: todo.completed}"
            > {{todo.todoTitle}} </div>
            <button disabled 
                    @click="$emit('delete-todo', todo.id)"
                    
            >&times;</button>
          </span>
        </li>
      </ul>
      <ul v-else>
        <li v-for="todo in todos" 
            :key="todo.id"
        >  
          <span >
            <input type="checkbox" 
                   v-on:click="todo.completed = !todo.completed" 
                   v-model="todo.completed"
            >
            <div class="todo-title" 
                 @click="$emit('change-todo', { id: todo.id, todoTitle: todo.todoTitle, completed: todo.completed })" 
                 v-bind:class="{completed: todo.completed}"
            > {{todo.todoTitle}} </div>
            <button @click="$emit('delete-todo', todo.id)"
                    class="btn btn-delete"
            >&times;</button>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ModalDeleteNote from '@/components/ModalDeleteNote.vue';
export default {
    data () {
      return {
        isModalVisible: false,
      };
    },
    props: {
        id: Number,
        noteTitle: String,
        todoTitle: String,
        todos: Array,
        isShortOption: false
    },
    methods: {
        deleteNote() {
            this.$store.dispatch('deleteNote', {
                id: this.id,
                noteTitle: this.noteTitle,
                todos: this.todos
            })
            this.$router.push('/')
        },
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    },
    components: {
        ModalDeleteNote
    }
    
}
</script>

<style lang="scss">
  .note {
    margin: 60px auto  25px;
    padding: 25px;
    width: 350px;
    max-width: 350px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    background: #ffd;
    box-shadow: 0 10px 10px gray;
    .btn {
      padding: 5px 10px;
      color: white;
      font-size: 16px;
      text-transform: uppercase;
      border: none;
      background: #60acd7;
      &-delete:hover{
        background: #f44336;
      }
    }
    
    &-title {
      border: none;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 25px;
      padding: 10px 20px;
      background: #ffd;
      word-wrap: break-word;
    }
    h2 {
      border-bottom: 1px solid;
      padding: 15px;
      text-align: left;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        font-size: 20px;
        text-align: left;
        display: flex;
        justify-content: space-between;
        align-items: center;
        input {
          border: none;
          border-bottom: 1px solid gray;
          font-size: 20px;
          margin-bottom: 25px;
          padding: 10px 20px;
          background: #ffd;
        }
        span {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .todo-title {
            width: 100%;
            min-width: 250px;
            text-align: left;
            margin-left: 20px;
            margin-bottom: 30px;
            padding: 15px;
            border-bottom: 1px solid gray;
            word-wrap: break-word;
          }
        }
        button {
          
          margin-bottom: 13px;
        }
      }
    }
  }
  .completed {
      text-decoration: line-through;
  }
</style>