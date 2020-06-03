<template>
  <div >
    <h1>{{currentH1}}</h1>
    <div class="editNote">
      <div class="input-field">
        <div class="actionsButtons">
              <button type="button" 
                      @click="saveNote" 
                      class="saveBtn"
              >Save note</button>
              <button type="button" 
                      @click="showModal" 
                      class="undoBtn"
              >Undo the saved changes</button>
              <ModalUndoChanges v-show="isModalVisible"
                                @close="closeModal"
                                @undo-changes="undoChanges"
              />
              <button type="button" 
                      @click="cancelEdit" 
                      class="cancelBtn"
              > Cancel </button>
              <button type="button" 
                      @click="repeatEdit" 
                      class="repeatBtn"
              > Repeat </button>
            </div>
        <form>
          <div class="input-titles">
            <input v-model="noteTitle" 
                   placeholder="Enter title and click on button" 
                   id="noteTitle" 
                   type="text" 
                   class="validate"
            >
            <button type="button" 
                    @click="changeNoteTitle"
                    title="Click to add/change title"
                    class="btn"
            >+</button> 
          </div>
          <div class="input-titles">
            <input v-model="todoTitle" 
                   placeholder="Enter todo or pick one to edit" 
                   id="todoTitle" 
                   type="text" 
                   class="validate"
            >
            <button type="button" 
                    @click="pushTodo"
                    title="Click to add/change todo"
                    class="btn"
            >+</button> 
          </div>
        </form>
        
      </div>
      <div>
        <!-- If need to edit existing note-->
        <Note v-if="note" 
              v-bind:noteTitle="noteTitle" 
              v-bind:todos="todos"
              v-bind:id="id"
              v-on:delete-todo="deleteTodo"
              v-on:change-todo="changeTodo"
        />
        <Note v-else 
                  v-bind:noteTitle="noteTitle" 
                  v-bind:todos="todos"
                  v-bind:id="id"
                  v-on:delete-todo="deleteTodo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Note from '@/components/Note.vue';
import ModalUndoChanges from '@/components/ModalUndoChanges.vue';
export default {
  name: 'note-view',
  data: () => ({
    currentH1: 'Create note',
    isModalVisible: false,
    isEditMode: false,
    isEditTodoMode: false,
    completed: false,
		flag: true,
		
    id: 0,
    todoId: 0,
    todoTitle: '',
    //vars for undo changes
    noteTitle: '',
    todos: [],
    //vars for save note
    resultNoteTitle: '',
    resultTodos: [],
    //an array of intermediate States
    notesStates: [],
    curState: -1
    
  }),
  computed: {
    note() {
        const nt = this.$store.getters.noteById(+this.$route.params.id);
        if (nt) { // if in localStorage exist note with this id
            if (!this.notesStates.length) {
                this.noteTitle = nt.noteTitle;
                this.flag = false;
            }
            
            this.todos = nt.todos;
						this.resultNoteTitle = nt.noteTitle;
            this.resultTodos = nt.todos;

            this.id = nt.id;
            this.currentH1 = 'Edit note';
            this.isEditMode = true;
        }
        return nt
    },
  },
  components: {
    Note,
    ModalUndoChanges
  },
  methods: {
    saveNote() {
        if (this.isEditMode) {
            if (this.noteTitle) {
						  this.$store.dispatch('updateNote', {
              	id: this.note.id,
                noteTitle: this.noteTitle,
                todos: this.todos
              })
            }
        } else {
        	if (this.resultNoteTitle) {
          	const note = {
          	    noteTitle: this.resultNoteTitle,
          	    todos: this.todos,
          	    id: Date.now(),
          	}
            this.$store.dispatch('createNote', note);
            this.$router.push('/')
          }
        }
    },
    pushTodo() {
      if (this.isEditTodoMode) {// edit the existing todo -
      	const idx = this.resultTodos.findIndex(t => t.id === this.todoId);
      	this.resultTodos.splice(idx, 1, {id: this.todoId, todoTitle: this.todoTitle, completed: this.completed} );
      	this.isEditTodoMode = false;
				this.newState(this.resultNoteTitle, this.resultTodos.slice());
				
			} else if (this.isEditMode && this.todoTitle.trim()) {//edit the existing todo in the existing note
        this.todos.push( {id: Date.now(), todoTitle: this.todoTitle, completed: this.completed} );
        this.newState(this.noteTitle, this.todos.slice());
				this.todoTitle = ''; //clear input
				
      } else if (this.todoTitle.trim()) {//add new todo to the new note
        this.todos.push({id: Date.now(), todoTitle: this.todoTitle, completed: false});
        this.resultNoteTitle = this.noteTitle;
        this.newState(this.noteTitle, this.resultTodos.slice());
        this.todoTitle = '';//clear input
      } 
    },
    newState(curNoteTitle, curTodos) { 
    	this.notesStates.push( {curNoteTitle, curTodos} );
    	this.curState++;
    },
    changeNoteTitle() {
    	if (this.resultNoteTitle != this.noteTitle && this.noteTitle.trim()) {
				this.resultNoteTitle = this.noteTitle;
    	  this.newState(this.noteTitle, this.todos.slice());
    	}
    },
    changeTodo(todo) {
      this.todoTitle = todo.todoTitle;
      this.todoId = todo.id;
      this.isEditTodoMode = true;
    },
    deleteTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id);
      //this.newState(this.noteTitle, this.todos.slice()); // ??? todo
    },
    cancelEdit() {
      if (this.curState > 0) {
        this.curState--;
        this.todos = this.notesStates[this.curState].curTodos.slice();
        this.noteTitle = this.notesStates[this.curState].curNoteTitle;
      }
    },
    repeatEdit() {
      if (this.curState < this.notesStates.length - 1) {
        this.curState++;
        this.todos = this.notesStates[this.curState].curTodos.slice();
        this.noteTitle = this.notesStates[this.curState].curNoteTitle;
      }
    },
    undoChanges() { // reverse to the initial state
      this.closeModal();
      this.todos = this.notesStates[0].curTodos.slice();
      this.noteTitle = this.notesStates[0].curNoteTitle;
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
	},
  mounted() {//to save the initial state
    this.notesStates.push( {curNoteTitle: this.noteTitle, curTodos: this.todos.slice()} );
    this.curState++;
 },
}
</script>

<style lang="scss">
    .editNote {
      display: flex;
      justify-content: space-around;

      flex-wrap: wrap;
    }
    .input-field {
      margin:  50px;
      display: flex;
      flex-direction: column;
      max-width: 350px;
      font-size: 28px;
      input {
        width: 100%;
        border: none;
        border-bottom: 1px solid;
        font-size: 20px;
        margin-bottom: 25px;
        padding: 25px;
      }
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
    .input-titles {
      display: flex;
      align-items: center;
      button {
        margin-left: 15px;
      }
    }
    }
    .actionsButtons {
      margin: 30px auto;
      max-width: 350px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      
      .saveBtn, .repeatBtn, .undoBtn, .cancelBtn{
        margin: 10px;
        border: none;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 10px 10px gray;
        background: #ffd;
        &:hover {
          background-color: gray;
        }
      }
      .saveBtn:hover, .repeatBtn:hover {
        background-color: #4CAF50;
        color: white;
      }
      .undoBtn:hover, .cancelBtn:hover {
        background-color: #f44336;
        color: white;
      }
      
    }
    .completed {
      text-decoration: line-through;
    }
</style>