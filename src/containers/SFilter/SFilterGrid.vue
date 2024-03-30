<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { hasOwnKeys } from '../../utils'

interface ISport {
  id: number;
  name: string;
  division: string;
  country: string;
}

interface IFilterQuery<T> {
  [key: string]: T | undefined;
}

const route = useRoute()
const router = useRouter()

const sports: ISport[] = [
  { id: 1, name: "Football", division: "EPL", country: "England" },
  { id: 2, name: "Basketball", division: "NBA", country: "USA" },
  { id: 3, name: "Volleyball", division: "Seria A", country: "Italy" },
];

const isReset = ref(false);
let filters = reactive<IFilterQuery<string | number>>({});

const parseQueryFilters = <T extends string | number>(): void => {
  try {
    const query = route.query;
    for (const key in query) {
      if (hasOwnKeys(query, key)) {
        filters[key] = query[key] as T;
      }
    }
  } catch (error) {
    console.error('Error parseQueryFilters', error)
  }
}

const parsedFilters = computed<IFilterQuery<string | number>>({
  get: () => {
    if (isReset.value) {
      return {} as IFilterQuery<string | number>;
    }
    return filters;
  },
  set: (newValue: IFilterQuery<string | number>) => {
    filters = newValue;
  }
});

const updateFilters = (newFilters: IFilterQuery<string | number>) => {
  try {
    router.push({
      query: {
        ...newFilters,
      }
    });
  } catch (error) {
    console.warn('Error updateFilters', error)
  }
}

const resetFilters = () => {
  isReset.value = true;
  router.replace({ query: {} })
}

parseQueryFilters()

</script>
<template>
  <div>
    <select v-model="parsedFilters.id" @change="updateFilters(parsedFilters)">
      <option v-for="sport in sports" :key="sport.id" :value="sport.id">
        {{ sport.id }}
      </option>
    </select>
    <select v-model="parsedFilters.name" @change="updateFilters(parsedFilters)">
      <option v-for="sport in sports" :key="sport.id" :value="sport.name">
        {{ sport.name }}
      </option>
    </select>
    <select v-model="parsedFilters.division" @change="updateFilters(parsedFilters)">
      <option v-for="sport in sports" :key="sport.id" :value="sport.division">
        {{ sport.division }}
      </option>
    </select>
    <br />
    <button class="btn" @click="resetFilters">Стереть значение в селекте</button>
  </div>
</template>