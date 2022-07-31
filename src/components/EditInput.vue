<template>
  <transition name="edit">
    <div class="disable-all"
         v-show="this.$store.state.showEditInput"
          @keydown.esc="closeModal"
          @mousedown="(e) => handleClick(e)">
        <div class="edit-wrapper"
             :style="{top: `${top}px`, left: `${left}px`}">
          <input class="edit-task-input"
                 :value="value"
                 ref="input"
                 @keydown.enter="saveEditHandler"
                 @keydown.esc="cancelEditHandler"
                 @input="(e) => handleInput(e)"
                 :style="{ 'min-width': `${width}px`, height: `${height}px`}"
          />
          <div class="btn-group">
            <button class="save-edit-btn"
                    aria-label="сохранить изменения"
                    @click="saveEditHandler">
              Сохранить
            </button>
            <button class="cancel-edit-btn"
                    aria-label="отменить редактирование"
                    @click="cancelEditHandler">
              Отмена
            </button>
          </div>
        </div>
    </div>
  </transition>

</template>

<script>
export default {
  props: {
    top: Number,
    left: Number,
    value: String,
    width: Number,
    height: Number,
    noteIndex: Number,
    taskId: String,
  },
  data() {
    return {
      inputValue: "",
    }
  },
  methods: {
    handleInput(e) {
      this.inputValue = e.currentTarget.value;
    },
    handleClick(e) {
      if (e.target.classList.contains("disable-all")) {
        this.$store.commit("showEditInput", false);
      }
    },
    closeModal() {
      this.$store.commit("showEditInput", false);
    },
    saveEditHandler() {
      if ( !(this.inputValue === "" || this.inputValue === this.value) ) {
        this.$store.commit("editNote",
            {
              noteIndex: this.noteIndex,
              taskId: this.taskId,
              content: this.inputValue,
            })
      }

      this.inputValue = "";
      this.$store.commit("showEditInput", false);
    },
    cancelEditHandler() {
      this.inputValue = "";
      this.$store.commit("showEditInput", false);
    }
  },
  updated() {
    this.$refs.input.focus();
    localStorage.setItem("notesArray", JSON.stringify(this.$store.state.notesArray));
  },
}
</script>

<style lang="scss" scoped>
  .edit-enter-active, .edit-leave-active {
    transition: opacity .4s ease-in-out;
  }

  .edit-enter-from, .edit-leave-to {
    opacity: 0;
  }
  .edit-wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 20px;

    button {
      font-size: 1.5rem;
      background: white;
    }
  }

  .edit-task-input {
    background: white;
    font-size: 1.5rem;
    padding: 10px;
    z-index: 110;
  }

  .disable-all {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: inherit;
    z-index: 105;
    background: rgba(255, 255, 255, 0.8);
  }
</style>