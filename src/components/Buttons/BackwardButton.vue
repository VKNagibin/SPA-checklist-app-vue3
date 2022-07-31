<template>
  <button title="Отменить последнее изменение"
          v-show="this.$store.state.savedNoteState.length > 1 && this.$store.state.curStateIndex"
          class="prev-state-btn"
          aria-label="Отменить последнее изменение"
          @click="handleBackward">
    <BIconSkipBackward class="prev-state-btn__icon"/>
  </button>
</template>

<script>
import { BIconSkipBackward } from "bootstrap-icons-vue";

export default {
  components: {
    BIconSkipBackward,
  },

  emits: ["backward"],

  methods: {
    handleBackward() {
      this.$emit("backward");
    }
  }
}
</script>

<style scoped>
  .prev-state-btn{
    position: absolute;
    top: 20px;
    left: 40px;
  }

  .prev-state-btn__icon {
    width: 40px;
    height: 40px;
  }
</style>