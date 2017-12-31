<template>
<button @click="logout" class="button-error pure-button" v-if="isCurrentUser">Çıkış Yap</button>
</template>

<script>
import { HTTP } from '@/http-common'
import store from '@/store'
import { mapActions } from 'vuex'

export default {
  name: 'UserLogin',
  data () {
    return {
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
    ...mapActions(['setUser']),
    logout () {
      HTTP.defaults.headers.common['Authorization'] = 'Token ' + this.userAuthToken
      HTTP.post(`api/users/logout/`, {
        auth_token: this.userAuthToken
      }).then(response => {
        this.setUser('')
        this.$router.push({path: '/'})
      }).catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>

<style>
.logout {
  display: inline-block;
}
h1{
  text-align: center;
}
.pure-button{
  border-radius: 5px;
}
.signup{
  margin: 0 auto;
  margin-top: 10px;
  width: 480px;
}
</style>
