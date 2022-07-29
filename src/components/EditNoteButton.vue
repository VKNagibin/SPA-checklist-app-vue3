<template>
  <button class="edit-note-button note-button"
          aria-label="редактировать заметку"
          title="Редактировать заметку"
          @click="editNote">
    <BIconPencilFill style="transform: scale(4)"/>
  </button>
</template>

<script>
import { BIconPencilFill } from "bootstrap-icons-vue";

export default {
  components: {
    BIconPencilFill,
  },

  emits: ["editNote"],

  methods: {
    editNote() {
      this.$emit("editNote");
    }
  }


}
</script>

<style scoped>

</style>