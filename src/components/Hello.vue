<template>
<div class="hello">
  <user-signup></user-signup>
  <div class="pure-g">
      <div class="pure-u-1-5"><p>Thirds</p></div>
      <div class="pure-u-4-5">
        <feed-question></feed-question>
      </div>
  </div>
</div>
</template>

<script>
import UserSignup from './UserSignup.vue'
import FeedQuestion from './FeedQuestion.vue'
import store from '@/store'

export default {
  name: 'Hello',
  computed: {
    currentUser () {
      return store.state.user
    }
  },
  components: { UserSignup, FeedQuestion }
}
</script>

<style>
.hello{
  width: 720px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
