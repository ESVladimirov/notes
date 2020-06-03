<template>
  <div>
    <h1>Notes</h1>
    <div class="notes">
      <div v-for="note of notes"
           :key="note.id"
      >
        <Note v-bind:todos="note.todos"
              v-bind:noteTitle="note.noteTitle"
              v-bind:isShortOption="true"
              v-bind:id="note.id"
        />
        <router-link class="editBtn" tag="button" :to="'/note/' + note.id">
          Edit
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Note from '@/components/Note.vue'
export default {
  computed: {
    notes() {
      return this.$store.getters.notes;
    }
  },
  components: {
    Note
  }
}
</script>

<style lang="scss">
  .notes {
    display: flex;
    justify-content: space-between;
    align-items: left;
    flex-wrap: wrap;
    .editBtn {
      padding: 5px 10px;
      color: white;
      font-size: 16px;
      text-transform: uppercase;
      border: none;
      background: #60acd7;
    }
    .editBtn:hover{
        background: #87cefa;
      }
    
  }
</style>
