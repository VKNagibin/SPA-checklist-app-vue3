<template>
  <button class="save-changes-btn btn"
          @click="save">
    Сохранить
  </button>
</template>

<script>
export default {
  emits: ["save"],

  methods: {
    save() {
      this.$emit("save");
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
    right: 40px;
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