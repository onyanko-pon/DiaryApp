<template>
  <div class="section">
    <h1>部屋を作成</h1>
    <input v-model="roomName" placeholder="部屋の名前を入力" />
    <button @click="createRoom">部屋を作成</button>

    <div v-if="inviteCode">
      <p>招待コード: {{ inviteCode }}</p>
      <button @click="joinRoom">この部屋に参加する</button>
    </div>
  </div>
</template>

<script>
import { collection, addDoc, serverTimestamp, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '@/firebase'
import { getAuth } from 'firebase/auth'

export default {
  data() {
    return {
      roomName: '',
      inviteCode: '',
      createdRoomRef: null, // 作成した部屋の参照
    }
  },
  methods: {
    async createRoom() {
      try {
        const auth = getAuth()
        const user = auth.currentUser

        if (!user) {
          alert('ログインしてください')
          return
        }

        // ユニークな招待コードを生成
        const generateInviteCode = () => Math.random().toString(36).substring(2, 8).toUpperCase()

        const inviteCode = generateInviteCode()

        // Firestore に部屋を作成
        const docRef = await addDoc(collection(db, 'room2'), {
          roomName: this.roomName,
          ownerUID: user.uid,
          memberUIDs: [user.uid],
          createdAt: serverTimestamp(),
          inviteCode,
        })

        console.log('部屋が作成されました: ', docRef.id)

        // 招待コードと作成した部屋の参照を保存
        this.inviteCode = inviteCode
        this.createdRoomRef = docRef
      } catch (e) {
        console.error('部屋の作成中にエラーが発生しました: ', e)
      }
    },
    async joinRoom() {
      try {
        const auth = getAuth()
        const user = auth.currentUser

        if (!user) {
          alert('ログインしてください')
          return
        }

        if (!this.createdRoomRef) {
          alert('部屋情報がありません')
          return
        }

        // Firestore の部屋に現在のユーザーを追加
        await updateDoc(this.createdRoomRef, {
          memberUIDs: arrayUnion(user.uid),
        })

        alert('部屋に参加しました！')

        // 部屋に遷移 (inviteCodeやroomNameをクエリパラメータで渡す)
        this.$router.push({
          path: '/chat',
          query: {
            roomId: this.createdRoomRef.id,
            roomName: this.roomName,
            inviteCode: this.inviteCode,
          },
        })
      } catch (e) {
        console.error('部屋の参加中にエラーが発生しました: ', e)
      }
    },
  },
}
</script>
<style>
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}
</style>
