<template>
  <div id="app">
    <header>
      <h1>Room: {{ roomName }}</h1>
      <p v-if="inviteCode">招待コード: {{ inviteCode }}</p>
    </header>
    <main>
      <div class="content">
        <aside class="chat-sidebar">
          <ul class="message-list">
            <li v-for="(data, index) in messages" :key="index" class="message-item">
              <div class="message-avatar">👤</div>
              <div class="message-content">
                <p>{{ data.message }}</p>
              </div>
              <hr v-if="index !== messages.length - 1" />
            </li>
          </ul>
        </aside>
        <section class="input-area">
          <textarea v-model="body" placeholder="メッセージを送信する" rows="3"></textarea>
          <div class="button-group">
            <button :disabled="invalid" @click="submit">Submit</button>
            <button @click="clear">Clear</button>
          </div>
          <div class="text">
            <h2>今日は何を記録する？</h2>
            <button
              class="youth-button button-1"
              @click="
                () =>
                  $router.push({
                    name: 'temp',
                    params: { id: '1', text: 'Option 1: Writing my thoughts' },
                  })
              "
            >
              テンプレート選択
            </button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import db from '@/firebase'
import {
  collection,
  query,
  //where,
  orderBy,
  onSnapshot,
  addDoc,
  //getDocs,
  serverTimestamp,
} from 'firebase/firestore'

/*export default {
  async created() {
    this.user_id = this.$route.query.user_id || 'default_user_id'
    this.roomName = this.$route.query.roomName || 'Untitled Room'
    this.inviteCode = this.$route.query.inviteCode || ''

    const chatQuery = query(
      collection(db, 'room2'),
      where('receiver_id', '==', this.user_id),
      orderBy('timestamp', 'asc'),
    )
    const chatRef = collection(db, 'room2')
    const snapshot = await getDocs(chatRef)
    snapshot.forEach((doc) => {
      this.messages.push(doc.data())
    })
    onSnapshot(chatQuery, (snapshot) => {
      this.messages = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        }
      })
    })
  },
  data: () => ({
    messages: [],
    body: '',
    user_id: '',
    roomName: '',
    inviteCode: '',
  }),
  computed: {
    invalid() {
      return !this.body.trim()
    },
  },
  methods: {
    clear() {
      this.body = ''
    },
    async submit() {
      if (this.invalid) return
      this.messages.unshift({ message: this.body })
      this.body = this.body.trim()
      try {
        const messageData = {
          sender_id: this.user_id,
          receiver_id: 'receiver_user_id',
          message: this.body.trim(),
          timestamp: serverTimestamp(),
        }
        await addDoc(collection(db, 'room2/${roomId}/chats'), messageData)
        this.body = ''
      } catch (error) {
        console.error('メッセージ送信エラー:', error)
      }
    },
  },
}*/
export default {
  async created() {
    this.user_id = this.$route.query.user_id || 'default_user_id'
    this.roomId = this.$route.query.roomId || 'default_room_id'
    this.roomName = this.$route.query.roomName || 'Untitled Room'
    this.inviteCode = this.$route.query.inviteCode || ''

    // Firestoreのクエリ
    const chatQuery = query(
      collection(db, `room2/${this.roomId}/chats`), // 部屋IDに基づくサブコレクション
      orderBy('timestamp', 'asc'),
    )

    onSnapshot(chatQuery, (snapshot) => {
      this.messages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      .reverse()
    })
  },
  data: () => ({
    messages: [],
    body: '',
    user_id: '',
    roomId: '',
    roomName: '',
    inviteCode: '',
  }),
  computed: {
    invalid() {
      return !this.body.trim()
    },
  },
  methods: {
    clear() {
      this.body = ''
    },
    async submit() {
      if (this.invalid) return
      try {
        const messageData = {
          sender_id: this.user_id,
          receiver_id: 'receiver_user_id', // 受信者のID（必要に応じて修正）
          message: this.body.trim(),
          timestamp: serverTimestamp(),
          roomId: this.roomId, // 部屋情報を含める
          roomName: this.roomName,
        }

        // メッセージを部屋のサブコレクションに保存
        await addDoc(collection(db, `room2/${this.roomId}/chats`), messageData)

        // 入力欄をクリア
        this.body = ''
      } catch (error) {
        console.error('メッセージ送信エラー:', error)
      }
    },
  },
}
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 24px;
  margin: 0;
}

header p {
  font-size: 14px;
  color: #555;
}

.content {
  display: flex;
}

.chat-sidebar {
  flex: 1;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-right: 20px;
}

.message-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.message-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.message-avatar {
  width: 40px;
  height: 40px;
  background: #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 18px;
}

.message-content {
  flex: 1;
}

.input-area {
  flex: 2;
  display: flex;
  flex-direction: column;
}

textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  gap: 10px;
}
.text {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 15px;
  margin-top: 30px;
}

button {
  padding: 10px 20px;
  border: none;
  background: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
}

button:hover:not(:disabled) {
  background: #80b7f1;
}
.youth-button {
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* ボタンの個別スタイル（柔らかい色） */
.button-1 {
  background: linear-gradient(to right, #a8edea, #fed6e3);
  color: #444;
}
</style>
