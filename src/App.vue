<template>
  <div class="App" @keydown.esc.capture="closeModals">
    <router-view>
    </router-view>
    <ModalWindow v-if="this.$store.state.modalIsOpen"/>
  </div>
</template>
<script>
import ModalWindow from "./components/ModalWindow.vue";

export default {
  components: {
    ModalWindow,
  },

  methods: {
    closeModals() {
      this.$store.commit("showEditInput", false);
    }
  },
  beforeMount() {
    try {
      const notesArray = JSON.parse(localStorage.getItem("notesArray"));
      notesArray ? this.$store.commit('getNotesArray', notesArray) : null;
    } catch(e) {
      localStorage.clear();
    }
  },
}
</script>

<style lang="scss">
  .appear-enter-active, .appear-leave-active {
    transition: opacity .3s ease-in;

  }

  .appear-enter-from, .appear-leave-to {
    opacity: 0;
  }

  .App {
    position: relative;
    min-height: 100vh;
    padding: 40px;
    display: flex;
    justify-content: center;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: transparent;
    font-family: sans-serif;
  }

  button, .btn {
    box-sizing: content-box;
    padding: 10px 20px;
    will-change: transform;
    transition: .2s transform;
    cursor: pointer;
    border-radius: 5px;
    border: 2px solid rgba(128, 128, 128, 0.59);

    &:hover {
      transform: scale(1.1);
    }
  }

  .btn-group {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }

  input {
      will-change: transform;
      transition: .2s transform;
      border-radius: 5px;

      &:hover {
        transform: scale(1.1);
      }
  }

  li {
    list-style: none;
  }

  @media (max-width: 540px) {
    html {
      font-size: 14px;
    }
  }

</style>