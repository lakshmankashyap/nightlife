<template lang="html">
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item brand-name">
        Nightlife
      </div>
      <button class="button navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item is-active" to="/" exact>Home</router-link>
      </div>
      <div class="navbar-end">
        <router-link class="navbar-item" v-if="isAuthenticated === false" to="/login">Login</router-link>
        <a class="navbar-item" v-if="isAuthenticated === true" @click="logout">Logout({{username}})</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },
    username () {
      return this.$store.getters.username
    }
  }
}
</script>

<style lang="css">
  .brand-name {
    font-size: 2rem;
  }
</style>
