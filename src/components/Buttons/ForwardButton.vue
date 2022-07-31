<template>
  <button v-show="this.$store.state.wasRevert"
          title="Вернуть отмененное изменение"
          class="next-state-btn"
          aria-label="Вернуть отмененное изменение"
          @click="forward">
    <BIconSkipBackward class="next-state-btn__icon"/>
  </button>
</template>

<script>
import { BIconSkipBackward } from "bootstrap-icons-vue";

export default {
  components: {
    BIconSkipBackward,
  },

  methods: {
    forward() {
      this.$emit("forward");
    }
  }

}
</script>

<style scoped>
  .next-state-btn {
    position: absolute;
    top: 20px;
    right: 40px;
  }
  .next-state-btn__icon {
    width: 40px;
    height: 40px;
    transform: rotate(180deg);
  }
</style>