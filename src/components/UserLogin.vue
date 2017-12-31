<template>
<div class="login" v-if="!isCurrentUser">
  <div class="pure-form">
    <template v-if="errors.length"> errors </template>
    <fieldset>
        <input v-model="username" type="text" placeholder="Username">
        <input v-model="password" type="password" placeholder="Password">

        <button @click="login()" type="submit" class="pure-button pure-button-primary">Login</button>
    </fieldset>
  </div>
  </div>
</div>
</template>

<script>
import { HTTP } from '@/http-common'
import store from '@/store'
import { mapActions } from 'vuex'

export default {
  name: 'UserLogin',
  data () {
    return {
      username: '',
      password: '',
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
    login () {
      HTTP.post(`api/users/login/`, {
        username: this.username,
        password: this.password
      }).then(response => {
        this.setUser(response.data)
        this.username = ''
        this.password = ''
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
</style>
