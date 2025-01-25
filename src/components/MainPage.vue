<template>
  <div class="button-container">
    <h1>日常を彩ろう</h1>
    <p>友達と始める交換日記</p>
    <button
      class="youth-button button-1"
      @click="
        () =>
          $router.push({
            name: 'roomjoin',
            params: { id: '1', text: 'Option 1: Writing my thoughts' },
          })
      "
    >
      部屋に入る
    </button>
    <button
      class="youth-button button-2"
      @click="
        () =>
          $router.push({
            name: 'roomcreation',
            params: { id: '2', text: 'Option 2: Writing about today' },
          })
      "
    >
      部屋を作る
    </button>
    <button
      class="youth-button button-3"
      @click="
        () =>
          $router.push({ name: 'other', params: { id: '3', text: 'Option 3: Writing a memory' } })
      "
    >
      使い方
    </button>
    <button
      class="youth-button button-4"
      @click="
        () => $router.push({ name: 'input', params: { id: '4', text: 'Option 4: Writing a goal' } })
      "
    >
      過去の日記を見る
    </button>
    <button
      class="youth-button button-5"
      @click="
        () =>
          $router.push({
            name: 'pass',
            params: { id: '4', text: 'Option 4: Writing a goal' },
          })
      "
    >
      合言葉を決める
    </button>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
}
</script>

<style>
/* 全体のボタン配置 */
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}

/* 青春ぽいボタン共通スタイル */
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

.button-2 {
  background: linear-gradient(to right, #fbc2eb, #a6c1ee);
  color: #444;
}

.button-3 {
  background: linear-gradient(to right, #ff9a9e, #fecfef);
  color: #444;
}

.button-4 {
  background: linear-gradient(to right, #82db58, #ebedee);
  color: #444;
}
.button-5 {
  background: linear-gradient(to right, #56dfd4, #ebeeec);
  color: #444;
}

/* ボタンのホバー効果 */
.youth-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

/* ボタンを押したときのエフェクト */
.youth-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
