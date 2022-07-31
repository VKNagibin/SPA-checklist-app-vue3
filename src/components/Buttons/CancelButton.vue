<template>
  <button class="cancel-edit-btn"
          ref="cancel-edit"
          @click="cancel">
    Отмена
  </button>
</template>

<script>
export default {
  emits: ["cancel"],

  methods: {
    cancel() {
      this.$emit("cancel");
    }
  }
}
</script>

<style scoped>
  button {
    position: fixed;
    box-sizing: border-box;
    z-index: 10;
    bottom: 40px;
    left: 40px;
    text-align: center;
    font-size: 2rem;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    width: 300px;
    text-decoration: none;
    color: inherit;
  }
</style>