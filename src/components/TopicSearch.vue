<template>
  <div id="topicSearch">
  <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
      <li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
        <input v-model="topic" class="effect-3" v-on:input="topicSearch()" placeholder="topic bul..">

        <ul class="pure-menu-children">
        <div v-if="topic.length > 0 && topic.length < 3">
          <li class="pure-menu-item">
            minimum üç karakter
          </li>
        </div>
        <template v-for="topic in topics">
          <li class="pure-menu-item">
            <router-link class="pure-menu-link" :to="{ name: 'TopicShow', params: { id: topic.id }}">
              {{ topic.name }}
            </router-link>
          </li>
        </template>
        </ul>
      </li>
    </ul>
</div>
  </div>
</template>

<script>
import { HTTP } from '@/http-common'
import store from '@/store'

export default {
  name: 'TopicSearch',
  data () {
    return {
      topic: '',
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
    clearTopic () {
      console.log(this.topic)
      this.topic = ''
    },
    topicSearch () {
      if (this.topic.length > 2) {
        HTTP.get(`api/topics/${this.topic}/`)
        .then(response => {
          this.topics = response.data
        }).catch(e => {
          this.errors.push(e)
        })
      } else this.topics = []
    }
  }
}
</script>

<style>
:focus{outline: none;}
textarea{
  color: #333;
  background-color: rgba(244, 247, 190, 0);
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;
}
.effect-3{
  border: 0;
  padding: 10px 0;
}
.add-question-button{
  font-size: 28px;
  cursor:pointer;
  display: inline-block;
}
.pure-button{
  color: #E5F77D;
  background-color: #823038;
  border-radius: 5px;
}
</style>
