<template>
  <button aria-label="удалить задачу"
          class="delete-task-button task-button"
          @click="(e) => deleteTask(e)"
  >
    <BIconTrashFill style="transform: scale(1.5)"/>
  </button>
</template>

<script>
import { BIconTrashFill } from "bootstrap-icons-vue";

export default {
  components: {
    BIconTrashFill,
  },

  props: {
    id: String,
  },

  emits: ["deleteTask"],

  methods: {
    deleteTask(e) {
      this.$emit("deleteTask", e, this.$props.id);
    }
  }
}
</script>

<style scoped>

</style>