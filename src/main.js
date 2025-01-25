import { createApp } from 'vue'
import router from './router' //上記で作ったrouterをインポート
import axios from 'axios'
import App from './App.vue'
import store from './store'
//import 'bootstrap/dist/css/bootstrap.css'
//import firebase from 'firebase'
import { initializeApp } from 'firebase/app'
//import { getAnalytics } from 'firebase/analytics'

const app = createApp(App)
// axiosを使用できるように定義
app.config.globalProperties.$axios = axios.create({
  baseURL: 'http://localhost:3000/',
})
const firebaseConfig = {
  apiKey: 'AIzaSyCESmz5s5gDEIePPfex11_eXpuhRMTj5HU',
  authDomain: 'loinsystem.firebaseapp.com',
  projectId: 'loinsystem',
  storageBucket: 'loinsystem.firebasestorage.app',
  messagingSenderId: '61712526317',
  appId: '1:61712526317:web:88619c6c113863cec055e4',
  measurementId: 'G-P98VVTT2RV',
}
initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)

app.use(router) //routerをアプリケーション全体で使えるようにする
app.mount('#app')
app.use(store)

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
