<template>
  <div class="profile-page">
    <h1>登録情報</h1>
    <p><strong>メールアドレス:</strong> {{ user?.email || '未登録' }}</p>
    <p><strong>ユーザー名:</strong> {{ user?.displayName || '未登録' }}</p>
    <p><strong>UID:</strong> {{ user?.uid || '未登録' }}</p>
    <p><strong>認証プロバイダー:</strong> {{ provider || '不明' }}</p>
    <p>
      <button
        class="youth-button button-5"
        @click="
          () =>
            $router.push({
              name: 'main',
              params: { id: '1', text: 'Option 1: Writing my thoughts' },
            })
        "
      >
        ホームに戻る
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth } from 'firebase/auth'

const auth = getAuth()
const user = ref(null)
const provider = ref('')
const router = useRouter()

onMounted(() => {
  // 現在のユーザー情報を取得
  const currentUser = auth.currentUser
  if (currentUser) {
    user.value = currentUser

    // 認証プロバイダー情報を取得
    if (currentUser.providerData && currentUser.providerData.length > 0) {
      provider.value = currentUser.providerData[0].providerId.includes('google')
        ? 'Google'
        : 'メールアドレス'
    }
  } else {
    alert('ユーザーがログインしていません。')
    router.push('/') // ログインページへリダイレクト
  }
})

// ログアウト処理
</script>

<style>
.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}
</style>
