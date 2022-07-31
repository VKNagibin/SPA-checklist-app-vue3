<template>
  <button aria-label="создать новую задачу"
          class="create-task-btn"
          @click="createTask">
    <BIconPlusCircle style="transform: scale(2);"/>
  </button>
</template>

<script>
import { BIconPlusCircle } from "bootstrap-icons-vue"

export default {
  components: {
    BIconPlusCircle,
  },

  emits: ["createTask"],

  methods: {
    createTask() {
      this.$emit("createTask");
    }
  }
}
</script>

<style scoped>
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
</style>