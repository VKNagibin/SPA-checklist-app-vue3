<template>
  <button role="button"
          :aria-label="ariaLabel"
          class="edit-task-button task-button"
          @click="(e) => editHandler(e)"
          @keydown.enter="(e) => editHandler(e)">
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
    editHandler(e) {
      this.$emit("edited", e);
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