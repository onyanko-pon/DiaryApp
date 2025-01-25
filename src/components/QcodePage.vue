<template>
  <div class="qrcodepage">
    <h1>友達登録</h1>
    <p>ユーザーIDを入力後、QRコードを生成ボタンを押してください。</p>

    <!-- QRコードの表示 -->
    <canvas ref="qrcodeCanvas"></canvas>

    <!-- QRコード生成用の入力フォーム -->
    <div class="form-section">
      <input type="text" v-model="userId" placeholder="ユーザーIDを入力" class="input-box" />
      <button @click="generateQRCode" class="generate-button">QRコードを生成</button>
    </div>

    <!-- 生成結果 -->
    <div v-if="qrData">
      <h3>スクショして友達に送ろう!</h3>
      <p>{{ qrData }}</p>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
  name: 'QcodePage',
  data() {
    return {
      userId: '', // ユーザーID（QRコードのデータ）
      qrData: '', // 生成されたQRコードデータ
    }
  },
  methods: {
    async generateQRCode() {
      if (!this.userId.trim()) {
        alert('ユーザーIDを入力してください')
        return
      }

      try {
        const qrCanvas = this.$refs.qrcodeCanvas
        this.qrData = `userID:${this.userId}`
        await QRCode.toCanvas(qrCanvas, this.qrData, {
          width: 200,
          margin: 2,
        })
        alert('QRコードが生成されました！')
      } catch (error) {
        console.error('QRコード生成エラー:', error)
        alert('QRコードの生成に失敗しました。')
      }
    },
  },
}
</script>

<style scoped>
.qrcodepage {
  text-align: center;
  padding: 20px;
}

.form-section {
  margin-top: 20px;
}

.input-box {
  width: 80%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
}

.generate-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.generate-button:hover {
  background-color: #0056b3;
}

canvas {
  margin-top: 20px;
  border: 1px solid #ddd;
}
</style>
