<template>
  <div>
    <select v-model="selectedMonth">
      <option disabled value="">月を選択してください</option>
      <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
    </select>

    <div v-if="filteredDiaries.length > 0">
      <ul>
        <li v-for="(diary, index) in filteredDiaries" :key="index">
          <a :href="diary.pdfUrl" target="_blank">
            {{ diary.title }}
          </a>
        </li>
      </ul>
    </div>
    <p v-else>この月には日記がありません。</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMonth: "",
      months: [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
      ],
    };
  },
  computed: {
    filteredDiaries() {
      return this.selectedMonth
        ? this.$store.state.diaries[this.selectedMonth] || []
        : [];
    },
  },
  created() {
    // コンポーネントが作成されたときに、日記をローカルストレージからロード
    this.$store.dispatch('loadDiaries');
  },
};
</script>
