<template>
  <div id="topics">
    <div v-for="topic in topics.results">
      <div id="body">
        <div id="name">{{topic.name}}</div>
        <div id="about">{{topic.about}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '@/http-common'
import store from '@/store'

export default {
  name: 'Topic',
  data () {
    return {
      topics: [],
      errors: []
    }
  },
  computed: {
    currentUser () {
      return store.state.user
    },
    isCurrentUser () {
      return this.currentUser['auth_token']
    },
    userAuthToken () {
      return this.isCurrentUser
    }
  },
  methods: {
    topicList () {
      HTTP.get(`api/topic/`)
      .then(response => {
        this.topics = response.data
      }).catch(e => {
        this.errors.push(e)
      })
    }
  },
  created () {
    this.topicList()
  }
}
</script>

<style>
#topics{
  width: 720px;
  margin: 0 auto;
  margin-top: 20px;
}
#body {
  border-left: 3px #823038 solid;
  padding: 20px;
  margin-top: 50px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0), 0 1px 2px rgba(0,0,0,0.24);
}
#name{
  font-size: 64px;
  display: inline-block;
}
</style>
