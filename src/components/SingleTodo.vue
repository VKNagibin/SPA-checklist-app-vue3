<template>
  <li class="todo-list__item">
    <input type="checkbox"
           class="todo-list__checkbox"
           @change="(e) => handleCheckbox(e)"
           :checked="checked"
           aria-label="отметить как выполненное">
    <span class="todo-list__span"
          ref="span"
          :class="{['done-todo']: checked}"
          @click="editHandler">
      {{content}}
    </span>
    <div class="btn-group task-btns">
      <EditButton ariaLabel="редактировать задачу" @edited="editHandler"/>
      <RemoveTaskButton :id="id" @deleteTask="deleteTask"/>
    </div>
  </li>
</template>

<script>
import EditButton from "@/components/Buttons/EditButton";
import RemoveTaskButton from "@/components/Buttons/RemoveTaskButton";

export default {
  components: {
    EditButton,
    RemoveTaskButton,
  },

  emits: ["edit"],

  props: {
    id: String,
    checked: Boolean,
    content: String,
    noteIndex: Number,
  },

  methods: {
    handleCheckbox(e) {
      this.$store.commit("doneTask",
          {
            noteIndex: this.noteIndex,
            taskId: this.id,
            isChecked: e.currentTarget.checked,
          });
    },

    deleteTask(e, id) {
      this.$store.commit("deleteTask", {
        noteIndex: this.noteIndex,
        taskId: id,
      });
    },

    editHandler() {
      let element = this.$refs.span;

      const editInputData = {
        ...this.editInputData,
        coordX: element.offsetLeft,
        coordY: element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight,
        value: element.textContent,
        taskId: this.id,
      }

      this.$emit("edit", editInputData);
    },
  },
  beforeUpdate() {
    localStorage.setItem("notesArray", JSON.stringify(this.$store.state.notesArray));
  },
}
</script>

<style lang="scss" scoped>
  .todo-list {
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
</style>