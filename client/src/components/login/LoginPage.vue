<template lang="html">
  <div>
    <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          Login
        </h1>
        <h2 class="subtitle">
          Type your email and password
        </h2>
      </div>
    </div>
    </section>
    <div class="container">

      <div class="columns is-mobile is-centered">
        <div class="column is-one-quarter">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="Email" v-model="email">
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
            <p><router-link to="/signup">Create a new account</router-link></p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button is-success" @click="login">
                Login
              </button>
            </p>
          </div>
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
      password: ''
    }
  },
  methods: {
    login () {
      const { email, password } = this
      this.$store.dispatch('login', { email, password })
        .then(res => {
          this.$router.push({ path: '/' })
        })
        .catch(err => { console.log('error was', err) })
    }
  }
}
</script>

<style lang="css">
</style>
