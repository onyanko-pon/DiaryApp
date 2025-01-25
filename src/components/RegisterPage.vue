<template>
  <div class="registerpage">
    <h1>交換日記用アカウントを作成しよう</h1>
    <p><input type="text" placeholder="メールアドレス" v-model="email" /></p>
    <p><input type="password" placeholder="パスワード" v-model="password" /></p>
    <p><button class="youth-button button-5" @click="register">登録</button></p>
    <p>
      <button class="youth-button button-1" @click="signInWithGoogle">
        Googleでサインインする
      </button>
    </p>
  </div>
</template>

<script setup>
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()

function register() {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log(auth.currentUser)
      alert('登録完了！確認メールを送信しました。')
      router.push('/username') // ユーザー名登録ページに遷移
    })
    .catch((error) => {
      console.error(error)
      alert('登録に失敗しました。もう一度お試しください。')
    })
}

function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
      router.push('/username') // ユーザー名登録ページに遷移
    })
    .catch((error) => {
      console.error(error)
      alert('Googleサインインに失敗しました。')
    })
}
</script>

<style>
.registerpage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}
</style>
