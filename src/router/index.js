import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import UserProfile from '@/components/UserProfile'
import QuestionDetail from '@/components/QuestionDetail'
import Topic from '@/components/Topic'
import TopicShow from '@/components/TopicShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/users/:username',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '/questions/:id',
      name: 'QuestionDetail',
      component: QuestionDetail
    },
    {
      path: '/topics',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/topics/:id',
      name: 'TopicShow',
      component: TopicShow
    }
  ],
  mode: 'history'
})
