<template>
  <div id="questionDetail">
    <div id="question">
      <div id="time">{{ data.date_created |  moment('from', 'now')}}</div>
      <div id="title">{{ data.body }}</div>
    </div>
    <div id="line"></div>
    <textarea-autosize :min-height="30" :max-height="500" type="text" class="effect-3" v-model="answer" placeholder="cevabını yaz..."></textarea-autosize>
    <a v-if="answer.length > 0" @click="createAnswer" type="submit" class="add-question-button">+</a>

    <div id="answers">
      <div v-for="answer in data.answers_set">
        <div id="body">
          <div id="time">{{ answer.date_created |  moment('from', 'now')}}</div>
          <div id="answer">{{ answer.body }}</div>
          <div id="vote">
            <button class="pure-button" @click="voteAnswer('True', answer.id)">
              Upvote
              <div v-if="answer.vote > 0" id="voteCount">{{ answer.vote }}</div>
            </button>
            <a @click="voteAnswer('False', answer.id)">Downvote</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '@/http-common'
import store from '@/store'

export default {
  name: 'QuestionDetail',
  data () {
    return {
      answer: '',
      data: {},
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
    findAnswer (data) {
      return this.data.answers_set.filter(function (answer) {
        if (answer.id === data.answer) {
          answer.vote = data.vote
        }
      })
    },
    voteAnswer (value, answerId) {
      HTTP.defaults.headers.common['Authorization'] = 'Token ' + this.userAuthToken
      HTTP.post(`api/votes/`, {
        answer: answerId,
        type: value
      })
      .then(response => {
        this.findAnswer(response.data)
      }).catch(e => {
        this.errors.push(e.response)
      })
    },
    createAnswer () {
      HTTP.defaults.headers.common['Authorization'] = 'Token ' + this.userAuthToken
      HTTP.post(`api/answer/`, {
        body: this.answer,
        question: this.data.id
      })
      .then(response => {
        this.answer = ''
        this.data.answers_set.unshift(response.data)
      }).catch(e => {
        this.errors.push(e)
      })
    },
    detailQuestion () {
      HTTP.get(`api/question/${this.$route.params.id}/`)
      .then(response => {
        this.data = response.data
      }).catch(e => {
        this.errors.push(e)
      })
    }
  },
  watch: {
    '$route': 'detailQuestion'
  },
  created () {
    this.detailQuestion()
  }
}
</script>

<style>
#questionDetail {
  width: 720px;
  margin: 0 auto;
  margin-top: 20px;
}
#answer {
  font-size: 18px;
  line-height: 24px;
  font-family: 'Libre Baskerville', serif;
}
#title {
  font-family: 'Libre Baskerville', serif;
  font-size: 36px;
  color: #2c3e50;
  opacity: .84;
}
#time {
  border-bottom: 1px #823038 solid;
  float: right;
  font-family: 'Slabo 27px', serif;
  font-size: 15px;
}
#answers {
  margin-top: 64px;
  margin-bottom: 64px;
}
#voteCount {
  padding: 8px;
  border-radius: 15px;
  display: inline-block;
  font-size: 14px;
  color: #ffffff;
}
#vote{
  margin-top: 40px;
  color: #823038;
}
#body {
  border-left: 3px #823038 solid;
  padding: 20px;
  margin-top: 50px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0), 0 1px 2px rgba(0,0,0,0.24);
}
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
