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
            <label for="title">タイトル</label>
            <input id="title" v-model="diary.title" type="text" placeholder="タイトルを入力" class="input-field" />
          </div>
          <div class="form-group">
            <label for="date">日付</label>
            <input id="date" v-model="diary.date" type="date" class="input-field" />
          </div>
          <div class="form-group">
            <label for="content">本文</label>
            <textarea id="content" v-model="diary.content" placeholder="本文を入力" class="textarea-field"></textarea>
          </div>
          <button type="submit" class="submit-button">保存する</button>
        </form>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentAuthor: '',
        diary: {
          title: '',
          date: '',
          content: ''
        }
      };
    },
    methods: {
      submitDiary() {
        console.log("日記が保存されました:", this.diary);
        alert("日記が保存されました！");
        this.diary = { title: '', date: '', content: '' }; // フォームをリセット
      }
    }
  };
  </script>
  
  <style scoped>
  .diary-app {
    font-family: 'Patrick Hand', cursive;
    background-color: #ffebf0;
    padding: 20px;
    border: 5px solid #ffb3c1;
    border-radius: 15px;
  }
  
  .header {
    background-color: #ffccd5;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
  }
  
  .header-text {
    font-size: 1.5em;
    color: #ff3366;
  }
  
  .author-input {
    font-size: 1em;
    border: 2px solid #ff66a3;
    border-radius: 5px;
    padding: 5px;
  }
  
  .content {
    margin-top: 20px;
  }
  
  .diary-form {
    background-color: #fff;
    border: 3px dashed #ff66a3;
    padding: 20px;
    border-radius: 10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .input-field, .textarea-field {
    width: 100%;
    padding: 10px;
    border: 2px solid #ff99cc;
    border-radius: 5px;
    font-size: 1em;
  }
  
  .submit-button {
    background-color: #ff6699;
    color: white;
    font-size: 1em;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #ff3366;
  }
  </style>
  