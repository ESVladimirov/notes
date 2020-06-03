<template>
  <transition name="modal-fade">  
    <div class="modal-backdrop">
      <div class="modal">
        <section class="modal-body">
          <slot name="body">
            <p>Are you sure?</p>
            <button type="button"
                    class="btn-blue"
                    @click="deleteNote"
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
    name: 'modalDeleteNote',
    methods: {
      close() {
        this.$emit('close');
      },
      deleteNote() {
        this.$emit('deleteNote');
      }
    },
  };
</script>

<style>
p {
  font-size: 24px;
}
.modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-blue {
    color: white;
    margin: 10px;
    background: #87cefa;
    border: 1px solid #87cefa;
    border-radius: 2px;
    font-size: 20px;
    padding: 15px;
  }
</style>