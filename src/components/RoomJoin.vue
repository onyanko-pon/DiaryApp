<template>
  <div class="section">
    <h1>部屋に入室</h1>

    <input v-model="searchInviteCode" placeholder="招待コードを入力" />
    <button @click="searchRoom">部屋を検索</button>

    <div v-if="selectedRoom">
      <p>部屋名: {{ selectedRoom.roomName }}</p>
      <button @click="joinRoom">この部屋に参加する</button>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, query, where, updateDoc, arrayUnion, doc } from 'firebase/firestore'
import { db } from '@/firebase'
import { getAuth } from 'firebase/auth'

export default {
  data() {
    return {
      searchInviteCode: '', // 入力された招待コード
      selectedRoom: null, // 検索された部屋の情報
    }
  },
  methods: {
    async searchRoom() {
      try {
        if (!this.searchInviteCode) {
          alert('招待コードを入力してください')
          return
        }

        // Firestore から招待コードに一致する部屋を検索
        const q = query(collection(db, 'room2'), where('inviteCode', '==', this.searchInviteCode))
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          alert('部屋が見つかりません')
          this.selectedRoom = null
          return
        }

        // 部屋が見つかった場合、最初の部屋情報を選択
        const roomData = querySnapshot.docs[0].data()
        this.selectedRoom = {
          id: querySnapshot.docs[0].id,
          ...roomData,
        }

        console.log('部屋が見つかりました:', this.selectedRoom)
      } catch (e) {
        console.error('部屋の検索中にエラーが発生しました: ', e)
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

        if (!this.selectedRoom) {
          alert('部屋が選択されていません')
          return
        }

        // Firestore の部屋に現在のユーザーを追加
        const roomRef = doc(db, 'room2', this.selectedRoom.id)
        await updateDoc(roomRef, {
          memberUIDs: arrayUnion(user.uid),
        })

        console.log('部屋に参加しました:', this.selectedRoom)

        // /chat ページに遷移し、Firestore 情報を渡す
        this.$router.push({
          path: '/chat',
          query: {
            roomId: this.selectedRoom.id,
            roomName: this.selectedRoom.roomName,
            inviteCode: this.selectedRoom.inviteCode,
          },
        })
      } catch (e) {
        console.error('部屋の参加中にエラーが発生しました: ', e)
      }
    },
  },
}
</script>
