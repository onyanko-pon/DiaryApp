// Vue Routerを使うためにインポート
import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomePage from '../components/HomePage.vue'
import MainPage from '../components/MainPage.vue'
import AccountPage from '../components/AccountPage.vue'
import OtherPage from '../components/OtherPage.vue'
import PasswordRegister from '../components/PasswordRegister.vue'
import PasswordInput from '../components/PasswordInput.vue'
import FriendPage from '../components/FriendPage.vue'
import QcodePage from '../components/QcodePage.vue'
//import SectionPage from '../components/SectionPage.vue'
import PastPage from '../components/PastPage.vue'
import template from '../components/template.vue'
import EntryForm from '../components/EntryForm.vue'
import sample from '../components/sample.vue'
import ThemeCard from '../components/ThemeCard.vue'
import ThemeList from '../components/ThemeList.vue'
import DiaryInput from '../components/DiaryInput.vue'
import RegisterPage from '../components/RegisterPage.vue'
import SignIn from '../components/SignIn.vue'
import UsernamePage from '../components/UsernamePage.vue'
import InformationPage from '../components/InformationPage.vue'
import Chat from '../components/Chat.vue'
import RoomJoin from '../components/RoomJoin.vue'
import RoomCreation from '@/components/RoomCreation.vue'

//import test from '../components/test.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/main',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountPage,
    },
    {
      path: '/other',
      name: 'other',
      component: OtherPage,
    },
    {
      path: '/pass',
      name: 'pass',
      component: PasswordRegister,
    },
    {
      path: '/input',
      name: 'input',
      component: PasswordInput,
    },
    {
      path: '/friend',
      name: 'friend',
      component: FriendPage,
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: QcodePage,
    },
    /*{
     path: '/section',
      name: 'section',
      component: SectionPage,
      meta: { requiresAuth: true },
    },*/
    {
      path: '/past',
      name: 'past',
      component: PastPage,
    },
    {
      path: '/temp',
      name: 'temp',
      component: template,
    },
    {
      path: '/form',
      name: 'form',
      component: EntryForm,
    },
    {
      path: '/sample',
      name: 'sample',
      component: sample,
    },
    {
      path: '/card',
      name: 'card',
      component: ThemeCard,
    },
    {
      path: '/list',
      name: 'list',
      component: ThemeList,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/sign',
      name: 'sign',
      component: SignIn,
    },
    {
      path: '/theme',
      name: 'ThemeCardLazy',
      component: ThemeCard, // 動的インポート版
    },
    {
      path: '/diaryinput',
      name: 'diaryinput',
      component: DiaryInput,
    },
    {
      path: '/username',
      name: 'username',
      component: UsernamePage,
    },

    {
      path: '/information',
      name: 'information',
      component: InformationPage,
    },

    {
      path: '/chat',
      name: 'chat',
      component: Chat,
    },
    {
      path: '/roomcreation',
      name: 'roomcreation',
      component: RoomCreation,
    },
    {
      path: '/roomjoin',
      name: 'roomjoin',
      component: RoomJoin,
    },
  ],
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject,
    )
  })
}

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
})

export default router
