<script setup lang="ts" generic="T extends any, O extends any">
import { CountryService } from '~/services'

defineOptions({
  name: 'IndexPage',
})

interface Country {
  flags: {
    png: string
    alt: string
  }
  name: {
    common: string
  }
  region: string
  capital: string
  population: number
  value: Country
  length: number
}

// Data
const loading = ref(false)
const selected_region = ref('all')
const search_text = ref('')
const route = useRoute()
const Countries = ref([]) as unknown as Country

/**
 * get all countries for initial list
 */
function fetchAll() {
  loading.value = true
  CountryService.getCountries()
    .then((result: any) => {
      Countries.value = result
    })
    .finally(() => loading.value = false)
}
/**
 * filter country list by provided proprty name and value
 */
function fetchFiltered(property: string, value: string) {
  loading.value = true
  CountryService.getFilteredCountries(property, value)
    .then((result: any) => {
      Countries.value = result
    })
    .catch(() => {
      // placed here cause REST COUNTRIES API return 404 if country no exist
      Countries.value = [] as unknown as Country
    })
    .finally(() => loading.value = false)
}
/**
 * debounce for typing in search text
 */
const Search = useDebounceFn(() => {
  if (search_text.value && !!search_text.value?.trim()) {
    selected_region.value = 'all'
    fetchFiltered('name', search_text.value)
  }
  else { fetchAll() }
}, 500)

/**
 * watcher on route to fetch and update data based on url query and reverse
 */
watch(
  () => route,
  () => {
    // TODO:Query params not implemented :))
    fetchAll()
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <!-- Main Content -->
  <section class="main_height" overflow-y-auto flex flex-col items-start gap="6 lg:16" p="6 lg:10">
    <!-- Toolbar -->
    <div flex flex-col sm:flex-row gap-4 justify-between w-full>
      <!-- Search section -->
      <div>
        <div relative>
          <div pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3>
            <i i-carbon:search inline-block />
          </div>
          <input v-model="search_text" input-text name="search" type="search" placeholder="Search for a country" @input="Search">
        </div>
      </div>
      <!-- Filter section -->
      <div>
        <select
          v-model="selected_region" name="region" input-select @change="() => {
            search_text = '';
            if (selected_region === 'all') {
              fetchAll()
            }
            else fetchFiltered('region', selected_region)
          }"
        >
          <option value="all">
            All Region
          </option>
          <option value="africa">
            Africa
          </option>
          <option value="americas">
            Americas
          </option>
          <option value="asia">
            Asia
          </option>
          <option value="europe">
            Europe
          </option>
          <option value="oceania">
            Oceania
          </option>
        </select>
      </div>
    </div>
    <!-- List -->
    <div w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap="6 lg:16">
      <!-- Start Load State -->
      <template v-if="loading">
        <div v-for="(i) in 12" :key="i" animate-pulse rounded w-full drop-shadow h="[300px]" place-self-center max-w="[250px]" bg="gray-300 dark:gray-700" />
      </template>
      <!-- End Load State -->

      <!-- Start Empty State -->
      <div
        v-else-if="!Countries?.length" text="gray-300 dark:gray-600"
        col-span="md:3 xl:4" w-full flex flex-col gap-2 items-center justify-center mt-6
      >
        <i i-carbon-align-box-middle-center text="[10rem]" />
        <span text="[2rem]">No Country Found . . . </span>
      </div>
      <!-- End Empty State -->

      <!-- Start Ready State -->
      <RouterLink
        v-for="(country, i) in (Countries as unknown as Country[])"
        v-else
        :key="i"
        :to="{ name: 'detail-name', params: { name: country?.name?.common } }"
        class="rounded cursor-pointer w-full gap-y-5 drop-shadow hover:drop-shadow-xl h-[300px] place-self-center max-w-[250px] bg-white dark:bg-gray-900"
      >
        <!-- Flag -->
        <img :src="country?.flags?.png" :alt="country?.flags?.alt" loading="lazy" min-h-36 h-36 w-full rounded-t>
        <!-- Detail -->
        <div text-sm flex flex-col items-start gap-y-0.5 p="3 lg:6">
          <!-- Name -->
          <div max-w="[200px]" truncate text-lg font-bold mb-2>
            {{ country?.name?.common }}
          </div>
          <!-- Population -->
          <span text="gray-600 dark:gray-300" font-semibold>Population : <span max-w="[200px]" truncate text-gray-500 font-medium>{{ new Intl.NumberFormat().format(country?.population) }}</span></span>
          <!-- Capital -->
          <span text="gray-600 dark:gray-300" font-semibold>Capital : <span max-w="[200px]" truncate text-gray-500 font-medium>{{ country?.capital[0] }}</span></span>
          <!-- Region -->
          <span text="gray-600 dark:gray-300" font-semibold>Region : <span max-w="[200px]" truncate text-gray-500 font-medium>{{ country?.region }}</span></span>
        </div>
      </RouterLink>
      <!-- End Ready State -->
    </div>
  </section>
</template>

<style>
.main_height {
  height: calc(100vh - 160px);
  max-height: calc(100vh - 160px);
}
</style>
