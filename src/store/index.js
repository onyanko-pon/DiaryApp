import { createStore } from 'vuex'

export default createStore({
  state: {
    diaries: {
      January: [],
      February: [],
      March: [],
      April: [],
      May: [],
      June: [],
      July: [],
      August: [],
      September: [],
      October: [],
      November: [],
      December: [],
    },
    isLogin: false,
    userId: '',
  },
  mutations: {
    // 日記を追加する
    addDiary(state, diary) {
      console.log('Vuexに追加される日記:', diary)
      const month = diary.month // 月別
      if (state.diaries[month]) {
        // 既存の月の配列に日記を追加
        state.diaries[month].push(diary)

        // LocalStorageに保存する
        localStorage.setItem('diaries', JSON.stringify(state.diaries))
      }
    },

    // 初期データをLocalStorageからロードする
    loadDiariesFromLocalStorage(state) {
      const storedDiaries = localStorage.getItem('diaries')
      if (storedDiaries) {
        state.diaries = JSON.parse(storedDiaries)
      }
    },
    auth(state, user) {
      state.isLogin = true
      state.userId = user
    },
  },
  actions: {
    fetch(context, user) {
      context.commit('auth', user)
    },
    loadDiaries(context) {
      context.commit('loadDiariesFromLocalStorage')
    },
  },

  modules: {},
})
