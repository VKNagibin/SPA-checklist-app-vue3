<template>
  <div class="btn-group edit-note-btns">
    <button class="cancel-edit-btn" @click="cancelEditHandler">
      Отменить редактирование
    </button>
    <button class="remove-changes-btn" v-if="wasUpdate && !changesRemoved" @click="removeChangesHandler">
      Отменить изменения
    </button>
    <button class="repeat-removed-changes-btn" v-else-if="wasUpdate && changesRemoved && !hide" @click="repeatRemovedChanges">
      Повторить отмененное изменение
    </button>
    <router-link to="/" class="save-changes-btn btn">
      Сохранить изменения
    </router-link>
  </div>

  <div class="note-component-wrapper">
    <div class="note-flex-container">
      <div class="note-title">
        <button aria-label="создать новую задачу"
                class="create-task-btn"
                @click="createNewTask">
          <BIconPlusCircle style="transform: scale(2);"/>
        </button>
        <h2 class="todo-heading"
            @click="(e) => editHandler(e)">
          {{this.$store.state.notesArray[noteIndex].heading}}
        </h2>
        <button role="button"
                aria-label="изменить заголовок заметки"
                class="edit-task-button task-button"
                @click="(e) => editHandler(e)"
                @keydown.enter="(e) => editHandler(e)">
          <BIconPencilFill style="transform: scale(1.5)"/>
        </button>
      </div>

      <ul class="todo-list" >
        <li class="todo-list__item" v-for="todo in this.$store.state.notesArray[noteIndex].tasks" :key="todo.id">
          <input type="checkbox"
                 class="todo-list__checkbox"
                 :id="todo.id" @change="handleCheckbox"
                 :checked="todo.checked"
                 aria-label="отметить как выполненное">
          <span class="todo-list__span" :class="{['done-todo']: todo.checked}" @click="(e) => editHandler(e)" :id="todo.id">
            {{todo.content}}
          </span>
          <div class="btn-group">
            <button aria-label="редактировать задачу"
                    class="edit-task-button task-button"
                    @click="(e) => editHandler(e)"
                    @keydown.enter="(e) => editHandler(e)">
              <BIconPencilFill style="transform: scale(1.5)"/>
            </button>
            <button aria-label="удалить задачу"
                    class="delete-task-button task-button"
                    @click="(e) => deleteTaskBtn(e)"
                    :id="todo.id"
            >
              <BIconTrashFill style="transform: scale(1.5)"/>
            </button>
          </div>
        </li>
      </ul>
    </div>
    <button aria-label="удалить заметку"
            role="button"
            @click="deleteNoteBtn"
            class="delete-note-button note-button">
      <BIconTrashFill style="transform: scale(5)"/>
    </button>

  </div>

  <modal-window v-if="showModal" @usersClick="(answer) => handleModalAnswer(answer)">
    {{this.deleteRequest ? 'Удалить заметку?' : 'Отменить редактирование?'}}
  </modal-window>
  <EditInput :top="editInputData.coordY"
             :left="editInputData.coordX"
             :value="editInputData.value"
             :width="editInputData.width"
             :height="editInputData.height"
             :noteIndex="noteIndex"
             :taskId="editInputData.taskId"
  />
</template>

<script>
import {BIconPlusCircle, BIconPencilFill, BIconTrashFill} from "bootstrap-icons-vue";
import ModalWindow from "@/components/ModalWindow.vue";
import EditInput from "@/components/EditInput.vue";

export default {
  components: {
    ModalWindow,
    BIconPencilFill,
    BIconTrashFill,
    BIconPlusCircle,
    EditInput,
  },
  data() {
    return {
      editInputData: {coordX: 0, coordY: 0, width: 0, height: 0, value: ""},
      showModal: false,
      deleteRequest: false,
      cancelEditRequest: false,
      wasUpdate: false,
      changesRemoved: false,
      currentNote: [],
      noteIndex: 0,
      hide: false,
    }
  },
  methods: {
    cancelEditHandler() {
      this.showModal = true;
      this.cancelEditRequest = true;
    },

    repeatRemovedChanges() {
      this.$store.commit("repeatRemovedChanges", this.noteIndex);
      this.hide = true;
    },

    deleteNoteBtn() {
      this.showModal = true;
      this.deleteRequest = true;
    },

    deleteTaskBtn(e) {
      this.$store.commit("deleteTask", {
        noteIndex: this.noteIndex,
        taskId: e.currentTarget.id,
      });
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

    handleCheckbox(e) {
      this.$store.commit("doneTask",
          {
            noteIndex: this.noteIndex,
            taskId: e.currentTarget.id,
            isChecked: e.currentTarget.checked,
          });
    },

    createNewTask() {
      this.$store.commit("createNewTask", this.noteIndex)
    },

    removeChangesHandler() {
      this.$store.commit("removeNoteChanges", this.noteIndex);
      this.changesRemoved = true;
    },

    editHandler(e) {
      let element = this.findRequiredElem(e.currentTarget);

      this.editInputData = {
        ...this.editInputData,
        coordX: element.offsetLeft,
        coordY: element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight,
        value: element.textContent,
        taskId: element.id,
      }

      this.$store.commit("showEditInput", true);
    },

    findRequiredElem(target) {
      if(target.closest("span") || target.closest("h2")) {
        return target;
      } else if(target.previousSibling) {
        return target.previousSibling.closest("h2");
      }

      return target.parentElement.parentElement.querySelector("span");
    },
  },
  mounted() {
    this.currentNote = this.$store.state.notesArray.find(item => this.$route.params.noteId === item.noteId);
    this.noteIndex = this.$store.state.notesArray.findIndex(item => this.currentNote === item);
    this.$store.commit("saveNoteState", this.noteIndex);
  },
  updated() {
    localStorage.setItem("notesArray", JSON.stringify(this.$store.state.notesArray));
    (JSON.stringify(this.currentNote) === JSON.stringify(this.$store.state.savedNoteState)) ? null :
      this.wasUpdate = true;
  },
}
</script>

<style lang="scss" scoped>
  .note-component-wrapper {
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .note-title {
    display: flex;
    gap: 40px;
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

    &__span {
      z-index: 1;
      position: relative;
      font-size: 1.5rem;
      width: 70%;
    }

    &__item {
      justify-content: center;
    }
  }

  .done-todo {
    text-decoration: line-through;
    opacity: .5;
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

  .save-changes-btn {
    text-decoration: none;
    color: inherit;
  }

  .save-changes-btn, .cancel-edit-btn, .remove-changes-btn, .repeat-removed-changes-btn {
    box-sizing: content-box;
    text-align: center;
    font-size: 2rem;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    padding: 10px 40px;
    width: 200px;
  }

  .remove-changes-btn, .repeat-removed-changes-btn {
    margin-right: auto;
  }
</style>