import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: JSON.parse(localStorage.getItem('notes') || '[]')
  },
  mutations: {
    createNote(state, note) {
      state.notes.push(note);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    updateNote(state, {id, noteTitle, todos}) {
      const notes = state.notes.concat();
      const idx = notes.findIndex(n => n.id === id);
      const note = notes[idx];
      notes[idx] = {...note, noteTitle, todos};
      state.notes = notes;
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
    deleteNote(state, id) {
      const notes = state.notes.concat();
      const idx = notes.findIndex(n => n.id === id);
      notes.splice(idx, 1);
      state.notes = notes;
      localStorage.setItem('notes', JSON.stringify(state.notes));
    }
  },
  actions: {
    createNote({commit}, note) {
      commit('createNote', note);
    },
    updateNote({commit}, note) {
      commit('updateNote', note);
    },
    deleteNote({commit}, note) {
      commit('deleteNote', note);
    }
  },
  getters: {
    notes: s => s.notes,
    noteById: s => id => s.notes.find(n => n.id === id)
  }
})
