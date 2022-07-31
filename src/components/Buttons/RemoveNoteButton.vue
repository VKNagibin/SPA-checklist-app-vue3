<template>
  <button aria-label="удалить заметку"
          title="Удалить заметку"
          role="button"
          @click="deleteNote"
          class="delete-note-button note-button">
    <BIconTrashFill style="transform: scale(5)"/>
  </button>
</template>

<script>
import { BIconTrashFill } from "bootstrap-icons-vue";

export default {
  components: {
    BIconTrashFill
  },

  emits: ["deleteNote"],

  methods: {
    deleteNote() {
      this.$emit("deleteNote");
    }
  },

}
</script>

<style scoped>

</style>