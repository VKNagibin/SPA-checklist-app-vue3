<template>
  <div class="note-title">
    <CreateTaskButton @createTask="createTask" />
    <h2 class="todo-heading"
        @click="(e) => editHandler(e)"
        ref="heading">
      {{this.$store.state.notesArray[noteIndex].heading}}
    </h2>
    <EditButton ariaLabel="изменить заголовок заметки" @edited="editHandler"/>
  </div>
</template>

<script>
import EditButton from "@/components/EditButton";
import CreateTaskButton from "@/components/CreateTaskButton";

export default {
  components: {
    EditButton,
    CreateTaskButton,
  },

  props: {
    noteIndex: Number,
  },

  methods: {
    createTask() {
      this.$store.commit("createNewTask", this.noteIndex)
    },

    editHandler() {
      let element = this.$refs.heading;

      const editInputData = {
        ...this.editInputData,
        coordX: element.offsetLeft,
        coordY: element.offsetTop - pageYOffset,
        width: element.offsetWidth,
        height: element.offsetHeight,
        value: element.textContent,
        taskId: null,
      }

      this.$emit("edit", editInputData);
    },
  },

  updated() {
    localStorage.setItem("notesArray", JSON.stringify(this.$store.state.notesArray));
  },

}
</script>

<style scoped>
  .note-title {
    display: flex;
    gap: 40px;
    align-items: center;
  }
</style>