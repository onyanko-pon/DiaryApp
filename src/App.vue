<template>
  <nav class="menu-bar">
    <router-link to="/main" class="menu-item"> <i class="fas fa-home"></i> ホーム </router-link>
    <router-link to="/register" class="menu-item" v-if="!isLoggedIn">
      <i class="fas fa-user-plus"></i> 登録
    </router-link>
    <router-link to="/sign" class="menu-item" v-if="!isLoggedIn">
      <i class="fas fa-sign-in-alt"></i> サインイン
    </router-link>

    <!-- ユーザー名を表示 -->

    <h1 v-if="isLoggedIn" class="menu-item sign-out">
      <i class="fas fa-sign-out-alt"></i> Hello! {{ displayName }}
    </h1>

    <!-- サインアウトボタン -->
    <button @click="handleSignOut" v-if="isLoggedIn" class="menu-item sign-out">
      <i class="fas fa-sign-out-alt"></i> サインアウト
    </button>
  </nav>
  <router-view />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const displayName = ref('') // ユーザー名を保持
let auth

onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      displayName.value = user.displayName // ユーザー名を設定
    } else {
      isLoggedIn.value = false
      displayName.value = ''
    }
  })
})

function handleSignOut() {
  signOut(auth)
    .then(() => {
      console.log('サインアウトしました')
      router.push('/sign-in')
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<style>
/* ユーザー名の表示スタイル */
.hello-user {
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: rgba(255, 255, 255, 0.3);
  padding: 10px 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
<style>
/* 全体のスタイル */
body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

/* メニューバーのスタイル */
.menu-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(90deg, #ff9a9e, #fad0c4);
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* メニューアイテムのスタイル */
.menu-item {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin: 0 15px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
}

.menu-item i {
  font-size: 18px;
}

/* サインアウトボタンのスタイル */
.sign-out {
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.sign-out:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
}
</style>
