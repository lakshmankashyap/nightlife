<template lang="html">
  <li class="box"> <article class="media">
    <div class="media-left">
      <figure class="image is-128x128">
        <img :src="bar.image_url" alt="Image">
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ bar.name }}</strong> <small>@{{ bar.bar_id }}</small>
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item " :class="{ 'is-going': imGoing }" @click="vote">
            <span class="icon is-small"><i class="fa fa-heart" title="I'm Going"></i> </span>
          </a>
          <span title="Going">({{votes}})</span>
        </div>
      </nav>
    </div>
  </article>
</li>
</template>

<script>
import axios from 'axios'

export default {
  props: ['bar'],
  data () {
    return {
      votes: 0
    }
  },
  computed: {
    imGoing () {
      let going = this.bar.voters.filter(user => user._user === this.$store.state.session._id)
      if (going.length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    vote () {
      if (this.$store.getters.isAuthenticated) {
        const token = localStorage.getItem('x-auth')
        axios.post('http://localhost:3000/api/bars/vote', { bar_id: this.bar.bar_id }, { headers: { 'x-auth': token } })
          .then(res => {
            this.bar.voters = res.data.bar.voters
            this.votes = this.bar.voters.length
          }).catch(err => { console.log(err) })
      } else {
        this.$router.push({path: '/login'})
      }
    }
  },
  created () {
    this.votes = this.bar.voters.length
  }
}
</script>

<style lang="css">
  .is-going {
    color: #555;
  }
</style>
