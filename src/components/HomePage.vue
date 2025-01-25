<template>
  <div class="sign-in">
    <h1>ようこそ！</h1>
    <p><input type="text" placeholder="メールアドレス" v-model="email" /></p>
    <p><input type="password" placeholder="パスワード" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button class="youth-button button-2" @click="login">ログイン</button></p>
    <p>
      <button
        @click="
          () =>
            $router.push({
              name: 'register',
              params: { id: '1', text: 'Option 1: Writing my thoughts' },
            })
        "
      >
        アカウントをまだ持っていない方
      </button>
    </p>
    <h3>Googleアカウントを持っている方はこちら</h3>
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
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const email = ref('')
const password = ref('')
const router = useRouter()
const errMsg = ref('')
const auth = getAuth()
function login() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log(auth.currentUser)
      router.push('/main')
    })
    .catch((error) => {
      console.log(error.code)
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'メールアドレスが不正です'
          break
        case 'auth/user-not-found':
          errMsg.value = 'ユーザーが見つかりません'
          break
        case 'auth/wrong-password':
          errMsg.value = 'パスワードが間違っています'
          break
      }
    })
}
function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
      router.push('/main')
    })
    .catch((error) => {})
}
</script>
<style>
.sign-in {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}
</style>
