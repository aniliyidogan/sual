<template>
  <div id="topic">
    <div id="name">{{ topic.topic_details.name }}</div>
    <div id="about">{{ topic.topic_details.about }}</div>
    <button class="pure-button following" @click="topicUnfollow(topic.topic_details.id)" v-if="following">Takibi bırak</button>
    <button class="pure-button following" @click="topicFollow(topic.topic_details.id)" v-if="!following">Takip et</button>
    <div id="line"></div>
    <div v-for="question in topic.questions_details">
      <div id="questions">
        <div id="time">{{ question.date_created |  moment('from', 'now')}}</div>
        <div id="title">
          {{ question.body }}
        </div>
        <router-link id="goQuestion" class="pure-button" :to="{ name: 'QuestionDetail', params: { id: question.id } }">
          >
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '@/http-common'
import store from '@/store'

export default {
  name: 'TopicShow',
  data () {
    return {
      user_id: 0,
      users: [],
      name: '',
      about: '',
      following: false,
      topic: {},
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
    topicShow () {
      HTTP.get(`api/topic/${this.$route.params.id}/`)
      .then(response => {
        this.topic = response.data
      }).catch(e => {
        this.errors.push(e)
      })
    },
    topicFollow (id) {
      HTTP.defaults.headers.common['Authorization'] = 'Token ' + this.userAuthToken
      HTTP.post(`api/follow/topic/`, {
        topic_id: id
      }).then(response => {
        this.following = true
      }).catch(e => {
        this.errors.push(e.response)
      })
    },
    topicUnfollow (id) {
      HTTP.defaults.headers.common['Authorization'] = 'Token ' + this.userAuthToken
      HTTP.delete(`api/follow/topic/`, {
        data: { topic_id: id }
      }).then(response => {
        this.following = false
      }).catch(e => {
        console.log(e.response)
        this.errors.push(e.response)
      })
    },
    listFollowingTopics () {
      HTTP.get(`api/follow/topic/${this.$route.params.id}/`)
      .then(response => {
        var self = this
        response.data.filter(function (data) {
          if (data.user.id === self.user_id) {
            self.following = true
          }
        })
      }).catch(e => {
        this.errors.push(e.response)
      })
    },
    getUserId () {
      HTTP.defaults.headers.common['Authorization'] = 'Token ' + this.userAuthToken
      HTTP.get(`api/users/token/`)
      .then(response => {
        this.user_id = response.data.id
      }).catch(e => {
        this.errors.push(e.response)
      })
    }
  },
  watch: {
    '$route': 'topicShow'
  },
  created () {
    this.topicShow()
    this.getUserId()
    this.listFollowingTopics()
  }
}
</script>

<style>
#topic{
  width: 720px;
  margin: 0 auto;
  margin-top: 20px;
}
#questions {
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
#about{
  font-size: 20px;
  display: inline-block;
}
#title {
  font-family: 'Libre Baskerville', serif;
  font-size: 36px;
  color: #000000;
  opacity: .64;
}
#time {
  border-bottom: 1px #823038 solid;
  float: right;
  font-family: 'Slabo 27px', serif;
  font-size: 15px;
}
#goQuestion{
  font-size: 14px;
  float: right;
}
.following {
  float: right;
}
</style>
