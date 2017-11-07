<template>
  <div>
    <section class="hero is-link">
      <div class="hero-body">
        <div class="container">
          <div class="columns">

            <div class="column is-one-third is-left">
              <h1>{{ msg }}</h1>
            </div>
            <div class="column">
              <div class="field has-addons">
                <div class="control is-expanded">
                  <input class="input" type="text" placeholder="Type your location, ex: San Francisco" v-model="location">
                </div>
                <div class="control">
                  <a class="button is-info" :class="{'is-loading': isLoading}" @click="searchForBars">
                    Search for bars
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <bar-list :bars="bars"> </bar-list>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { isEmpty } from 'lodash'
import BarList from '@/components/bar/BarList'

export default {
  name: 'Home',
  components: {
    barList: BarList
  },
  data () {
    return {
      msg: 'Welcome to Your Nightlife Coordination App',
      bars: [],
      location: 'San francisco',
      isLoading: false
    }
  },
  methods: {
    searchForBars () {
      if (!isEmpty(this.location)) {
        let encoded = encodeURI(this.location)
        this.bars = []
        this.isLoading = true
        axios.get(`http://localhost:3000/api/bars/?location=${encoded}`)
          .then(res => {
            this.bars = res.data
            this.isLoading = false
          }).catch(err => console.log(err))
      }
    }
  },
  created () {
    // let aos = axios.create({
    //   baseURL: 'https://localhost:3000/api/',    })
    this.isLoading = true
    axios.get('http://localhost:3000/api/bars/?location=San%20Francisco')
      .then(res => {
        this.bars = res.data
        this.isLoading = false
      }).catch(err => console.log(err))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
