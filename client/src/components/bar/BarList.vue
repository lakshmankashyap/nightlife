<template lang="html">
  <ul>
    <bar v-for="bar in bars" :bar="bar" :key="bar.bar_id"></bar>
  </ul>
</template>

<script>
import Bar from './Bar'

export default {
  components: {
    bar: Bar
  },
  props: ['bars']
}
</script>

<style lang="css">
</style>
