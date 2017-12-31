<template>
<div id="feed" class='feed' v-if='isCurrentUser'>
  <textarea-autosize :min-height="30" :max-height="70" type="text" class="effect-3" v-model="question" placeholder="sualini yaz..."></textarea-autosize>
  <a v-if="question.length > 0" @click="createQuestion()" type="submit" class="add-question-button">+</a>
  <span id="line"></span>
  <div class='questions' v-for='question in questions.results'>
    <div id="information">
      <div id="username">{{ question.user.username }}</div>
      <div id="title">{{ question.user.tittle }}</div>
      <div id="company">{{ question.user.company }}</div>
      <span> {{ question.date_created |  moment('from', 'now') }} </span>
    </div>
    <div id="question-body">
      <div class='body'>
        {{ question.body }}
        <div id="goQuestion">
        <router-link class="pure-button" :to="{ name: 'QuestionDetail', params: { id: question.id } }">
          >
        </router-link>
        </div>
      </div>
    </div>
  </div>
  <button id="previousPage" class="pure-button" @click="getPage(questions.previous)" v-if="questions.previous">Önceki</button>
  <button id="nextPage" class="pure-button" @click="getPage(questions.next)" v-if="questions.next">Sonraki</button>
</div>
</template>

<script>
import { HTTP } from '@/http-common'
import store from '@/store'

export default {
  name: 'FeedQuestion',
  data () {
    return {
      question: '',
      questions: [],
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
    getPage (pageUrl) {
      HTTP.defaults.headers.common['Authorization'] = 'Token ' + this.userAuthToken
      HTTP.get(pageUrl).then(response => {
        this.questions = response.data
        console.log(response.data)
      }).catch(e => {
        this.errors.push(e)
      })
    },
    createQuestion () {
      HTTP.defaults.headers.common['Authorization'] = 'Token ' + this.userAuthToken
      HTTP.post(`api/question/`, {
        body: this.question
      }).then(response => {
        console.log(response.data)
        this.question = ''
        this.questions.results.unshift(response.data)
      }).catch(e => {
        this.errors.push(e)
      })
    },
    feedQuestion () {
      HTTP.defaults.headers.common['Authorization'] = 'Token ' + this.userAuthToken
      HTTP.get(`api/question/`
      ).then(response => {
        this.questions = response.data
        console.log(response.data)
      }).catch(e => {
        this.errors.push(e)
      })
    }
  },
  created () {
    this.feedQuestion()
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
#username{
  color: #823038;
  font-size: 23px;
  display: inline-block;
}
#title{
  opacity: .64;
  font-size: 15px;
  display: inline-block;
}
#company{
  font-size: 12px;
  display: inline-block;

}
#information{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.add-question-button{
  font-size: 28px;
  cursor:pointer;
}
h1{
  text-align: center;
}
.signup{
  margin: 0 auto;
  margin-top: 10px;
  width: 480px;
}
#question-body > .body {
  margin-top: 10px;
  font-size: 28px;
  font-family: 'Libre Baskerville', serif;
}
#information > span {
  font-size: 14px;
  font-family: 'Slabo 27px', serif;
  color: #000000;
  opacity: .7;
  border-bottom: 1px #823038 solid;
  float: right;
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
h1{
  text-align: center;
}
.pure-button{
  color: #E5F77D;
  background-color: #823038;
  border-radius: 5px;
}
.signup{
  margin: 0 auto;
  margin-top: 10px;
  width: 480px;
}
#previousPage{
  margin-top: 30px;
  margin-bottom: 30px;
  float: left;
}
#nextPage{
  margin-bottom: 30px;
  margin-top: 30px;
  float: right;
}
#goQuestion{
  font-size: 14px;
  float: right;
}
</style>
