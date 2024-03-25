<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'


// @TODO to files
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

const filters = ref({
  sport: null as number | null,
});

const updateQuery = () => {
  const query: Record<string, string> = {};
  console.log(filters.value.sport !== null)
  if (filters.value.sport !== null) {
    query['sportId'] = filters.value.sport.toString();
    console.log(filters.value.sport)
    query['sportName'] = sports.find(sport => sport.id === filters.value.sport)?.name || '';
  }
  router.push({query});
}

const initializeFiltersFromQuery = () => {
  console.log(router)
  const query = router.currentRoute.value.query;
  if (query.sportId) {
    filters.value.sport = parseInt(query.sportId as string);
  }
}

const resetFilter = () => {
  filters.value.sport = null;
  updateQuery();
}

onMounted(() => {
  initializeFiltersFromQuery();
});
</script>
<template>
  <div class="app-container">
    {{ filters }}
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

