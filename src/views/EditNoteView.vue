<template>
  <div class="note-component-wrapper">
    <BackwardButton  @backward="backwardHandler"/>
    <ForwardButton @forward="handleBackward"/>
    <div class="note-flex-container">
    <NoteTitle @edit="getInputData" :noteIndex="this.noteIndex"/>
    <transition-group class="todo-list"
                      name="list"
                      tag="ul">
      <SingleTodo :id="todo.id"
                  v-for="todo in this.$store.state.notesArray[noteIndex].tasks"
                  :key="todo.id"
                  :checked="todo.checked"
                  :content="todo.content"
                  :noteIndex="this.noteIndex"
                  @edit="getInputData"/>
      </transition-group>
    </div>
    <RemoveNoteButton @delete-note="deleteNote"/>
  </div>
  <teleport to="body">
    <modal-window v-if="showModal" @usersClick="handleModalAnswer">
      {{this.deleteRequest ? 'Удалить заметку?' : 'Отменить редактирование?'}}
    </modal-window>
  </teleport>
  <EditInput :top="editInputData.coordY"
             :left="editInputData.coordX"
             :value="editInputData.value"
             :width="editInputData.width"
             :height="editInputData.height"
             :noteIndex="noteIndex"
             :taskId="editInputData.taskId"
             :show="showInputCount"/>
  <CancelButton @cancel="cancelEditHandler"/>
  <SaveButton @save="saveChanges" ref="save-changes"/>
</template>

<script>
import NoteTitle from "@/components/NoteTitle";
import CancelButton from "@/components/Buttons/CancelButton";
import ForwardButton from "@/components/Buttons/ForwardButton";
import BackwardButton from "@/components/Buttons/BackwardButton";
import RemoveNoteButton from "@/components/Buttons/RemoveNoteButton";
import ModalWindow from "@/components/ModalWindow.vue";
import EditInput from "@/components/EditInput.vue";
import SaveButton from "@/components/Buttons/SaveButton";
import SingleTodo from "@/components/SingleTodo";

export default {
  components: {
    NoteTitle,
    SingleTodo,
    CancelButton,
    SaveButton,
    ForwardButton,
    BackwardButton,
    RemoveNoteButton,
    ModalWindow,
    EditInput,
  },
  data() {
    return {
      editInputData: {coordX: 0, coordY: 0, width: 0, height: 0, value: ""},
      showModal: false,
      deleteRequest: false,
      cancelEditRequest: false,
      currentNote: [],
      noteIndex: 0,
      showInputCount: 0,
    }
  },
  methods: {
    getInputData(inputData) {
      this.editInputData = inputData;
      this.$store.commit("showEditInput", true);
    },

    saveChanges() {
      this.$router.push("/");
    },

    cancelEditHandler() {
      this.showModal = true;
      this.cancelEditRequest = true;
    },

    deleteNote() {
      this.showModal = true;
      this.deleteRequest = true;
    },

    handleModalAnswer(answer) {
      if(this.deleteRequest && answer) {
        this.$router.push('/');
        setTimeout(() => {
          this.$store.commit("deleteNote", this.noteIndex);
        })
      }

      if(this.cancelEditRequest && answer) {
        this.$store.commit("cancelEditRequest",  this.noteIndex);
        this.$router.push('/');
      }

      this.showModal = false;
    },

    backwardHandler() {
      this.$store.commit("removeNoteChanges", this.noteIndex);
    },

    handleBackward() {
      this.$store.commit("repeatRemovedChanges", this.noteIndex);
    },
  },

  beforeMount() {
    this.currentNote = this.$store.state.notesArray.find(item => this.$route.params.noteId === item.noteId);
    this.noteIndex = this.$store.state.notesArray.findIndex(item => this.currentNote === item);
    this.$store.commit("saveNoteState", this.noteIndex);
  },
  beforeUpdate() {
    localStorage.setItem("notesArray", JSON.stringify(this.$store.state.notesArray));
  },
}
</script>

<style lang="scss" scoped>
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }

  .list-enter-active,
  .list-leave-active {
    transition: all .3s ease-in-out;
  }

  .note-component-wrapper {
    width: 80%;
    display: flex;
    align-items: center;
  }
  
  .note-flex-container {
    width: 100%;
    padding: 50px;
    display: flex;
    gap: 40px;
    flex-direction: column;
    align-items: center;

    .todo-heading {
      font-size: 4rem;
      text-align: center;
    }
  }

  .create-task-btn {
    will-change: transform;
    transition: .2s;
    padding: 0;
    transform: scale(2);
    cursor: pointer;
    border: none;

    &:hover {
      transform: scale(2.3);
    }
  }

  .todo-list {
    padding: 0 5%;
  }

  .edit-task-modal {
    z-index: 20;
    display: flex;
    background: #000;
    flex-direction: column;
    gap: 10px;
    position: fixed;
    height: 30px;
    top: 10%;
    right: 50%;
    transform: translateX(50%);

    .btn-group {
      justify-content: flex-end;
    }
  }

  .edit-task-btn {
    box-sizing: content-box;
    padding: 10px;
    width: 50px;
    font-size: 1rem;
  }

  .edit-note-btns {
    width: 95%;
    display: flex;
    position: fixed;
    justify-content: space-between;
    z-index: 11;
    bottom: 10px;
    gap: 40px;
  }

  @media (max-width: 768px) {
    .note-component-wrapper {
      width: 100%;
    }

    .note-flex-container {
      border: none;
    }

    .todo-heading {
      padding-top: 50px;
    }

    .note-flex-container {
      padding: 10px 0 20px;
    }

    .note-title {
      flex-direction: column-reverse;
    }

    .task-btns {
      flex-direction: column;
    }
  }

  @media (max-width: 540px) {
    .todo-heading {
      padding-top: 70px;
    }

    .cancel-edit-btn {
      bottom: 0;
    }
    .save-changes-btn {
      bottom: 50px;
    }
  }
</style>