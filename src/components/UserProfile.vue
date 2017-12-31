<template>
<div class="user-feed">
  <div class="userProfile">
    <div id="name">{{user.user_details.user.username}}</div>
    <div id="company">{{user.user_details.company}}</div>
    <div id="title">{{user.user_details.tittle}}</div>
    <div id="line"></div>
    <div class='questions' v-for='question in user.questions_details'>
      <div id="question-body">
        <span> {{ question.date_created |  moment('from', 'now') }} </span>
        <div class='body'> {{ question.body }} </div>
        <router-link class="pure-button" :to="{ name: 'QuestionDetail', params: { id: question.id } }">
          >
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { HTTP } from '@/http-common'
import store from '@/store'
import { mapActions } from 'vuex'

export default {
  name: 'UserProfile',
  data () {
    return {
      user: {},
      errors: []
    }
  },
  computed: {
    currentUser () {
      return store.state.user
    },
    isCurrentUser () {
      return this.currentUser['auth_token']
    }
  },
  methods: {
    ...mapActions(['setUser']),
    userProfile () {
      HTTP.get(`api/users/${this.$route.params.username}/`)
      .then(response => {
        this.user = response.data
      }).catch(e => {
        this.errors.push(e)
      })
    }
  },
  watch: {
    '$route': 'userProfile'
  },
  created () {
    this.userProfile()
  }
}
</script>

<style>
#question-body > span {
  font-size: 10px;
  float: right;
  color: #000000;
  opacity: .7;
}
#question-body > .body {
  margin-top: 10px;
  padding-bottom: 10px;
  font-size: 23px;
  font-family: 'Libre Baskerville', serif;
}
.user-feed{
  width: 720px;
  margin: 0 auto;
}
.questions{
  margin-top: 20px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 3px;
  color: #1E000E;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0), 0 1px 2px rgba(0,0,0,0.24);
}
.pure-button {
  float: right;
}
#name {
  font-size: 64px;
  display: inline-block;
}
#company {
  font-size: 24px;
  display: inline-block;
}
.userProfile > #title{
  display: inline-block;
}
</style>
