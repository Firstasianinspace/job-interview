<script setup lang="ts">
import { reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface ISport {
  id: number;
  name: string;
}

const router = useRouter()

const sports: ISport[] = [
  { id: 1, name: "Football" },
  { id: 2, name: "Basketball" },
  { id: 3, name: "Volleyball" },
];
// reactive more suitable/scalable for rich-object filters
const filters = reactive({
  sport: null as number | null,
});

const selectedSportName = computed(() => sports.find(sport => sport.id === filters.sport)?.name || '');

const updateQuery = () => {
  const query: Record<string, string> = {};
  if (filters.sport !== null) {
    query['sportId'] = filters.sport.toString();
    query['sportName'] = selectedSportName.value;
  }
  router.push({ query });
};

const initializeFiltersFromQuery = () => {
  const query = router.currentRoute.value.query;
  if (query.sportId) {
    filters.sport = parseInt(query.sportId as string);
  }
}

const resetFilter = () => {
  filters.sport = null;
  updateQuery();
};

watch(
  () => router.currentRoute.value.query,
  (newQuery) => {
    if (newQuery.sportId) {
      filters.sport = parseInt(newQuery.sportId as string);
    } else {
      filters.sport = null;
    }
  },
  { deep: true }
);


onMounted(() => {
  initializeFiltersFromQuery()
});
</script>
<template>
  <div class="app-container">
    <select v-model="filters.sport" @change="updateQuery">
      <option v-for="sport in sports" :key="sport.id" :value="sport.id">
        {{ sport.name }}
      </option>
    </select>
    <br />
    <button class="btn" @click="resetFilter">Стереть значение в селекте</button>
  </div>
</template>

<style scoped>

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.btn {
  margin-top: 20px;
}
</style>

