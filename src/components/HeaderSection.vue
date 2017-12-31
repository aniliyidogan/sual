<template>
<nav>
  <div class="container">
    <h2 class="brand">Sual</h2>
    <ul>
      <template v-if="isCurrentUser">
      <li><topic-search></topic-search></li>
      <li>
        <a>
        <router-link :to="{ name: 'Hello' }">Sual Duvarım</router-link>
        </a>
      </li>
      </template>
      <li><user-login></user-login></li>
      <li><user-logout></user-logout></li>
    </ul>
  </div>
</nav>
</template>

<script>
import UserLogin from './UserLogin.vue'
import UserLogout from './UserLogout.vue'
import TopicSearch from './TopicSearch.vue'
import store from '@/store'

export default {
  name: 'HeaderSection',
  data () {
    return {
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
  components: { UserLogin, UserLogout, TopicSearch }
}
</script>

<style>
.pure-form input:not([type]):focus, .pure-form input[type=password]:focus, .pure-form input[type=email]:focus, .pure-form input[type=url]:focus, .pure-form input[type=date]:focus, .pure-form input[type=month]:focus, .pure-form input[type=time]:focus, .pure-form input[type=datetime]:focus, .pure-form input[type=datetime-local]:focus, .pure-form input[type=week]:focus, .pure-form input[type=tel]:focus, .pure-form input[type=color]:focus, .pure-form input[type=number]:focus, .pure-form input[type=search]:focus, .pure-form input[type=text]:focus, .pure-form select:focus, .pure-form textarea:focus {
  border-color: #823038;
}
.brand {
  display: inline-block;
  color: #823038;
}
.container {
  margin: 0 auto;
  width: 720px;
}
ul {
  display: inline-block;
}
li {
  margin-left: 20px;
  display: inline-block;
}
nav {
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0), 0 1px 2px rgba(0,0,0,0.24);
}
nav > ul > li > a{
  color: #E5F77D;
}
</style>
