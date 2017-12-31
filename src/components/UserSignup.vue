<template>
<div class="signup" v-if="!isCurrentUser">
  <h1>Signup Sual</h1>
  <div class="pure-form pure-form-aligned">
  <template v-if="errors.length"> {{ errors }} </template>
    <fieldset>
      <div class="pure-control-group">
        <label>Username</label>
        <input v-model="username" type="text">
      </div>

      <div class="pure-control-group">
        <label>Email</label>
        <input v-model="email" type="email">
      </div>

      <div class="pure-control-group">
        <label>Password</label>
        <input v-model="password" type="password">
      </div>

      <div class="pure-control-group">
        <label>Company</label>
        <input v-model="company" type="text">
      </div>

      <div class="pure-control-group">
        <label>Title</label>
        <input v-model="title" type="text">
      </div>

      <div class="pure-controls">
        <button @click="signup" type="submit" class="pure-button pure-button-primary">Signup</button>
      </div>
    </fieldset>
    <div id="success">{{ success }}</div>
  </div>
</div>
</template>

<script>
import { HTTP } from '@/http-common'
import store from '@/store'
import { mapActions } from 'vuex'

export default {
  name: 'UserSignup',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      company: '',
      title: '',
      errors: [],
      success: ''
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
    signup () {
      HTTP.post(`api/users/`, {
        username: this.username,
        email: this.email,
        password: this.password,
        tittle: this.title,
        company: this.company
      }).then(response => {
        this.title = ''
        this.email = ''
        this.username = ''
        this.password = ''
        this.company = ''
        this.success = 'Başarılı şekilde kayıt işlemini gerçekleştirdiniz.'
      }).catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>

<style>
h1{
  text-align: center;
  color: #1E000E;
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
#success{
  color: rgba(0,1,0,.6)
}
</style>
