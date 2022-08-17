<template>
  <button role="button"
          :aria-label="ariaLabel"
          class="edit-task-button task-button"
          @click="editHandler"
          @keydown.enter="editHandler">
    <BIconPencilFill style="transform: scale(1.5)"/>
  </button>
</template>

<script>
import { BIconPencilFill } from "bootstrap-icons-vue";

export default {
  props: {
    ariaLabel: String,
  },

  components: {
    BIconPencilFill,
  },

  emits: [ "edited" ],

  methods: {
    editHandler() {
      this.$emit("edited");
    }
  }

}
</script>

<style scoped>
  @media (max-width: 768px) {
    .edit-task-button {
      display: none;
    }

  }
</style>