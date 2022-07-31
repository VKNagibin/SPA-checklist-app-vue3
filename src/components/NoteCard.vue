<template>
  <div class="wrapper">
  <div class="note-component-wrapper">
    <div class="note-flex-container">
      <h2 class="todo-heading">{{heading}}</h2>
      <ul class="todo-list">
        <li class="todo-list__item" v-for="todo in tasks.slice(0, 3)" :key="todo.id">
          <input type="checkbox" class="todo-list__checkbox" disabled :checked="todo.checked">
          <span class="todo-list__span span_home-page">{{todo.content}}</span>
        </li>
      </ul>
    </div>

    <div class="note-buttons-group">
      <EditNoteButton @editNote="editNote"/>
      <RemoveNoteButton @deleteNote="deleteNote"/>
    </div>
  </div>

  <teleport to="body">
    <modal-window v-if="showModal" @usersClick="(answer) => handleModalAnswer(answer)">
      Вы точно хотите удалить заметку?
    </modal-window>
  </teleport>
  </div>
</template>

<script>
import ModalWindow from "@/components/ModalWindow.vue";
import RemoveNoteButton from "@/components/Buttons/RemoveNoteButton";
import EditNoteButton from "@/components/Buttons/EditNoteButton";

export default {
  components: {
    EditNoteButton,
    RemoveNoteButton,
    ModalWindow,
  },

  props: {
    tasks: Array,
    heading: String,
    id: String,
  },

  data() {
    return {
      to: `/note/${this.id}`,
      showModal: false,
      deleteRequest: false
    }
  },

  methods: {
    editNote() {
      this.to = `/note/${this.id}`
      this.$router.push(this.to);
    },

    handleModalAnswer(answer) {
      if (this.deleteRequest && answer) {
        let noteIndex = this.$store.state.notesArray.findIndex(item => item.noteId === this.id);
        this.$store.commit("deleteNote", noteIndex);
      }
      this.showModal = false;
    },

    deleteNote() {
      this.showModal = true;
      this.deleteRequest = true;
    }
  },

  mounted() {
    localStorage.setItem("notesArray", JSON.stringify(this.$store.state.notesArray));
  },

  beforeUpdate() {
    localStorage.setItem("notesArray", JSON.stringify(this.$store.state.notesArray));
  }
}

</script>

<style lang="scss">
  .note-component-wrapper {
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .note-flex-container {
    min-width: 400px;
    padding: 30px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    border: 2px solid rgba(141, 141, 141, 0.49);

    .todo-heading {
      font-size: 4rem;
      text-align: center;
    }
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;

    &__item {
      width: 100%;
      font-size: 2rem;
      display: flex;
      gap: 40px;
      justify-content: flex-start;
      align-items: center;
      word-break: break-word;

    }

    &__span {
      display: block;
      max-width: 600px;
      text-align: left;
      padding: 20px;
      border: 5px solid rgba(221, 160, 221, 0.4);
      border-radius: 10px;
    }

    &__checkbox {
      transform: scale(2.5);
      transition: .2s;
      cursor: pointer;

      &:hover {
        transform: scale(3);
      }
    }
  }

  button {
    position: relative;
    z-index: 10;
  }

  .task-button {
    &:hover {
      transform: scale(1.5);
    }
  }

  .task-button, .note-button {
    transform: scale(1.2);
    will-change: transform;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
  }

  .note-buttons-group {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;
  }

  .note-button {
    transform: scale(1);
    width: 60px;
    height: 60px;

    &:hover {
      transform: scale(1.08);
    }
  }

  .edit-note-button {
    color: black;
    box-sizing: content-box;
    border-radius: 10px;
    will-change: transform;
    transition: .2s transform;
    border: 2px solid rgba(128, 128, 128, 0.59);
  }

  @media (max-width: 540px) {

    .note-component-wrapper {
      width: 95%;
    }

    .note-flex-container {
      min-width: 300px;
      padding: 20px;
      min-height: auto;
    }
  }

</style>