<template>
  <div class="component-wrapper">
    <button class="add-note-btn" @click="addNoteHandler" aria-label="создать новую заметку">
      <BIconClipboard2Plus class='add-note-icon' />
    </button>
    <transition-group tag="div" name="list" class="notes-area">
      <Note v-for="note in this.$store.state.notesArray" :id="note.noteId" :key="note.noteId" :tasks="note.tasks" :heading="note.heading"/>
    </transition-group>
  </div>
</template>

<script>
import Note from "../components/NoteCard.vue";
import { BIconClipboard2Plus } from 'bootstrap-icons-vue';

export default {
  components: {
    BIconClipboard2Plus,
    Note,
  },
  methods: {
    addNoteHandler() {
      this.$store.commit("addNewNote");
    }
  },
  beforeUpdate() {
    localStorage.setItem("notesArray", JSON.stringify(this.$store.state.notesArray));
  }
}
</script>

<style lang="scss" scoped>
  .list-move {
    transition: transform .5s ease-in-out;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(-100px);
  }

  .list-enter-active{
    transition: all .5s ease-out;
  }

  .list-leave-active {
    transition: all .3s ease-in;
  }

  .component-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .add-note-btn {
    margin: 120px 0;
    border: none;
    width: max-content;
    height: max-content;
  }

  .add-note-icon {
    cursor: pointer;
    transition: .5s;
    transform: scale(10);

    &:hover {
      transform: scale(11);
    }
  }

  .notes-area {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
    row-gap: 50px;
    column-gap: 20px;
  }

</style>