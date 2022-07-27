<template>
  <div class="component-wrapper">
    <button class="add-note-btn" @click="addNoteHandler" aria-label="создать новую заметку">
      <BIconClipboard2Plus class='add-note-icon' />
    </button>
    <div class="notes-area">
      <Note v-for="note in this.$store.state.notesArray" :id="note.noteId" :key="note.noteId" :tasks="note.tasks" :heading="note.heading"/>
    </div>
  </div>
</template>

<script>
import Note from "./NoteCard.vue";
import { BIconClipboard2Plus } from 'bootstrap-icons-vue';

export default {
  components: {
    BIconClipboard2Plus,
    Note,
  },
  data() {
    return {

    }
  },
  methods: {
    addNoteHandler() {
      this.$store.commit("addNewNote");
    }
  },
  updated() {
    localStorage.setItem("notesArray", JSON.stringify(this.$store.state.notesArray));
  }
}
</script>

<style lang="scss" scoped>
  .component-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .add-note-btn {
    margin: 120px 0;
    border: none;
    width: max-content;
    height: max-content;
    animation: pulse 1s linear 1s 1;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  .add-note-icon {
    cursor: pointer;
    transition: .2s;
    transform: scale(10);

    &:hover {
      transform: scale(12);
    }
  }

  .notes-area {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    row-gap: 50px;
    column-gap: 20px;

  }

</style>