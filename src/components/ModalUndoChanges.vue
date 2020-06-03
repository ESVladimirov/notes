<template>
  <transition name="modal-fade">  
    <div class="modal-backdrop">
      <div class="modal">
        <section class="modal-body">
          <slot name="body">
            <p>Are you sure?</p> 
            <button type="button"
                    class="btn-blue"
                    @click="undoChanges"
            >Yes</button>
            <button type="button"
                    class="btn-blue"
                    @click="close"
            >Cancel</button>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modalUndoChanges',
    methods: {
      close() {
        this.$emit('close');
      },
      undoChanges() {
        this.$emit('undo-changes');
      }
    },
  };
</script>

