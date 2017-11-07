<template lang="html">
  <div class="">
    <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Sign Up
        </h1>
        <h2 class="subtitle">
          Sign up for an account here
        </h2>
      </div>
    </div>
    </section>
    <div class="container">

      <div class="columns is-mobile is-centered">
        <div class="column is-one-quarter">
          <form v-on:submit.prevent>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email" v-model.trim="email">
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fa fa-check"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" v-model="password">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Repeat Password" v-model="passwordRepeat">
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control">
                <button class="button is-success" @click="createAccount">
                  Create account
                </button>
              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      passwordRepeat: ''
    }
  },
  methods: {
    createAccount () {
      const { email, password, passwordRepeat } = this
      this.$store.dispatch('createAccount', { email, password, passwordRepeat })
        .then(res => {
          this.$router.push({ path: '/' })
        })
        .catch(err => { console.log(err) })
    }
  }
}
</script>

<style lang="css">
</style>
