<template>
  <div id="app">
    <div class="container">
      <navbar></navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Nav from '@/components/commons/Nav'

export default {
  name: 'app',
  components: {
    navbar: Nav
  },
  beforeCreate () {
    this.$store.dispatch('loadSession')
  }
}
</script>

<style>

</style>
