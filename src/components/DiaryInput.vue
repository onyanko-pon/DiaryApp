<template>
  <div id="app" class="diary-app">
    <!-- Header -->
    <header class="header">
      <h1 class="header-text">
        今回の担当は <input type="text" v-model="currentAuthor" class="author-input" placeholder="名前を入力" /> だよ
      </h1>
    </header>

    <!-- Main Content -->
    <main class="content">
      <form class="diary-form" @submit.prevent="submitDiary">
        <div class="form-group">
          <label for="date">今日の日付は</label>
          <input id="date" v-model="diary.date" type="date" class="input-field" />だよ
        </div>

        <div class="form-group">
          <label for="mood">今日の気分は…</label>
          <select id="mood" v-model="diary.mood" class="input-field">
            <option value="">選択してね</option>
            <option value="😊 楽しい">😊 楽しい</option>
            <option value="😢 悲しい">😢 悲しい</option>
            <option value="😡 怒っている">😡 怒っている</option>
            <option value="🤔 考え中">🤔 考え中</option>
          </select>かな！
        </div>

        <div class="form-group">
          <label for="top-three-title">私のトップ３！！</label>
          <input id="top-three-title" v-model="diary.topThreeTitle" type="text" placeholder="例: 好きな食べ物" class="input-field" />
          <div class="top-three">
            <div class="top-three-item">
              <label for="top1">1位</label>
              <input id="top1" v-model="diary.topThree[0]" type="text" class="input-field" placeholder="1位を入力" />
            </div>

            <div class="top-three-item">
              <label for="top2">2位</label>
              <input id="top2" v-model="diary.topThree[1]" type="text" class="input-field" placeholder="2位を入力" />
            </div>

            <div class="top-three-item">
              <label for="top3">3位</label>
              <input id="top3" v-model="diary.topThree[2]" type="text" class="input-field" placeholder="3位を入力" />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="song">おすすめの曲は…</label>
          <input id="song" v-model="diary.song" type="text" placeholder="曲名・アーティストを書いてね！" class="input-field" />
        </div>

        <div class="form-group">
          <label for="template">今日のテーマは…？？</label>
          <select id="template" v-model="diary.template" class="input-field">
            <option value="">質問を選んでね</option>
            <option value="最近嬉しかったこと！">最近嬉しかったこと！</option>
            <option value="次の週末の予定は？">次の週末の予定は？</option>
            <option value="今一番欲しいものは？">今一番欲しいものは？</option>
          </select>
        </div>

        <div class="form-group" v-if="diary.template">
          <label for="template-answer">{{ diary.template }}</label>
          <textarea id="template-answer" v-model="diary.templateAnswer" placeholder="ここに書いてね" class="textarea-field"></textarea>
        </div>

        <div class="form-group">
          <label for="photo">お気に入りのワンショット❗️</label>
          <input id="photo" type="file" @change="handlePhotoUpload" class="input-field" />
          <!-- 画像が選択されたら表示 -->
          <div v-if="diary.photo">
            <img :src="diary.photo" alt="Selected photo" class="selected-photo" />
          </div>
        </div>

        <button type="submit" class="submit-button">保存！</button>
      </form>
    </main>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";

export default {
  data() {
    return {
      currentAuthor: '',
      diary: {
        date: '',
        mood: '',
        topThreeTitle: '',
        topThree: ['', '', ''],
        song: '',
        template: '',
        templateAnswer: '',
        photo: null, // 画像用のデータを追加
      },
    };
  },
  methods: {
    async submitDiary() {
      if (!this.diary.date) {
        alert("日付を入力してください。");
        return;
      }

      const diaryData = {
        name: this.currentAuthor,
        title: this.diary.date,
        month: this.diary.date
          ? new Date(this.diary.date).toLocaleString("en-US", { month: "long" })
          : "Unknown Month",
        topThreeTitle: this.diary.topThreeTitle,
        topThree: this.diary.topThree,
        mood: this.diary.mood,
        song: this.diary.song,
        template: this.diary.template,
        templateAnswer: this.diary.templateAnswer,
        photo: this.diary.photo,
      };

      try {
        const pdfUrl = await this.createPDF(diaryData);
        diaryData.pdfUrl = pdfUrl;

        this.$store.commit("addDiary", diaryData);

        alert("日記が保存されました！");
      } catch (error) {
        console.error("日記の保存中にエラーが発生しました:", error);
        alert("日記の保存に失敗しました");
      }

      this.diary = {
        date: "",
        mood: "",
        topThreeTitle: "",
        topThree: ["", "", ""],
        song: "",
        template: "",
        templateAnswer: "",
        photo: null,
      };
      this.currentAuthor = "";
    },

    // ファイル選択時に画像を表示する処理
    handlePhotoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.diary.photo = e.target.result; // 画像データを保存
        };
        reader.readAsDataURL(file); // 画像をData URLとして読み込む
      }
    },

    createPDF(diaryData) {
      return new Promise((resolve, reject) => {
        try {
          const doc = new jsPDF();
          doc.setFontSize(20);
          doc.text(diaryData.title, 105, 20, { align: "center" });
          doc.setFontSize(12);

          if (diaryData.topThreeTitle) {
            doc.text(`Top 3 - ${diaryData.topThreeTitle}`, 10, 50);
            diaryData.topThree.forEach((item, index) => {
              doc.text(`${index + 1}. ${item}`, 10, 60 + index * 10);
            });
          }

          if (diaryData.mood) {
            doc.text(`Mood: ${diaryData.mood}`, 10, 100);
          }

          if (diaryData.song) {
            doc.text(`Song: ${diaryData.song}`, 10, 110);
          }

          if (diaryData.template) {
            doc.text(`Template: ${diaryData.template}`, 10, 120);
            doc.text(`Answer: ${diaryData.templateAnswer}`, 10, 130);
          }

          const pdfName = `${diaryData.title}.pdf`;
          doc.save(pdfName);
          resolve(pdfName);
        } catch (error) {
          reject(error);
        }
      });
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sawarabi+Gothic&display=swap');

.diary-app {
  font-family: 'Sawarabi Gothic', sans-serif;
  /* background-color: #ffccd5; */
  background-image: url('@/assets/hand-drawn_doodle_set_6.jpg');
  background-size: cover;
  background-position: center;
  padding: 20px;
  border: 5px solid #ffb3c1;
  border-radius: 15px;
}

.header {
  /* background-image: url('@/assets/93585.jpg'); */
  background-color: #ffccd5;
  background-size: cover;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}

.header-text {
  font-size: 1.8em;
  color: #ff3366;
}

.author-input {
  font-size: 1.1em;
  border: 2px solid #ff66a3;
  border-radius: 5px;
  padding: 5px;
}

.content {
  margin-top: 20px;
}

.diary-form {
  background-color: #fff;
  background-size: cover;
  border: 3px dashed #ff66a3;
  padding: 20px;
  border-radius: 10px;
  width: 60%;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.input-field, .textarea-field {
  width: 50%;
  padding: 10px;
  border: 2px solid #ff99cc;
  border-radius: 5px;
  font-size: 1.1em;
}

.top-three {
  display: flex;
  justify-content: space-between;
}

.top-three-item {
  width: 30%;
}

.submit-button {
  background-color: #ff6699;
  color: white;
  font-size: 1.1em;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #ff3366;
}

/* 画像の表示 */
.selected-photo {
  max-width: 50%;
  height: auto;
  margin-top: 10px;
}
</style>
