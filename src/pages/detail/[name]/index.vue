<script setup lang="ts">
import { CountryService } from '~/services'

// TODO:it can be global types :))
interface Country {
  flags: {
    png: string
    alt: string
  }
  name: {
    common: string
    official: string
  }
  region: string
  capital: string
  population: number
  value: Country
  tld: string[]
  borders: string[]
  length: number
  currencies: Record<string, string>[]
  languages: Record<string, string>[]
  subregion: string
  startOfWeek: string
}

// Data
const route = useRoute()
const loading = ref(false)
const country = ref(null) as unknown as Country

/**
 * get all detail of specific country
 */
function fetch() {
  loading.value = true
  CountryService.getCountry((route?.params?.name as string))
    .then((result: any) => {
      country.value = result?.length ? result[0] : null
    })
    .finally(() => loading.value = false)
}

/**
 * watcher on route to fetch and update data based on url query and reverse
 */
watch(
  () => route,
  () => {
    fetch()
  },
  { immediate: true, deep: true },
)
</script>

<template>
  <!-- Start Load State -->
  <div v-if="loading" animate-pulse w-full grid grid-cols-1 lg:grid-cols-2 gap-10 place-self-center p-6>
    <div bg="gray-300 dark:gray-700" rounded drop-shadow h="[300px]" />
    <div bg="gray-300 dark:gray-700" rounded drop-shadow h="[300px]" />
  </div>
  <!-- End Load State -->

  <!-- Start Empty State -->
  <div
    v-else-if="!country" text="gray-300 dark:gray-600"
    col-span="md:3 xl:4" w-full flex flex-col gap-2 items-center justify-center my-20
  >
    <i i-carbon-align-box-middle-center text="[10rem]" />
    <span text="[2rem]">No Country Found . . . </span>
  </div>
  <!-- End Empty State -->

  <!-- Start Ready State -->
  <section v-else w-full flex flex-col gap-y-6 lg:gap-y-14 mx-auto p-4 lg:p-10>
    <!-- Navigate -->
    <RouterLink class="btn" to="/">
      <i i-carbon-arrow-left /> Back
    </RouterLink>
    <!-- Detail -->
    <div grid grid-cols-1 lg:grid-cols-2 gap-16 items-center>
      <!-- Flag -->
      <img :src="country?.flags?.png" :alt="country?.flags?.alt" loading="lazy" w-full rounded-t>
      <!-- Detail -->
      <div text-sm flex flex-col items-start gap-y-8>
        <!-- Name -->
        <div text-2xl font-bold mb-2>
          {{ country?.name?.common }}
        </div>
        <div grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 justify-items-start>
          <!-- Native Name -->
          <span text="gray-600 dark:gray-300" font-semibold>Native Name : <span text-gray-500 font-medium>{{ country?.name?.official }}</span></span>
          <!-- Top Level Domain -->
          <span text="gray-600 dark:gray-300" font-semibold>Top Level Domain : <span text-gray-500 font-medium>{{ country?.tld.join(',') }}</span></span>
          <!-- Population -->
          <span text="gray-600 dark:gray-300" font-semibold>Population : <span text-gray-500 font-medium>{{ new Intl.NumberFormat().format(country?.population) }}</span></span>
          <!-- Currencies -->
          <span text="gray-600 dark:gray-300" font-semibold>Currencies : <span text-gray-500 font-medium>{{ Object.values(country?.currencies).map(c => c.name).join(',') }}</span></span>
          <!-- Region -->
          <span text="gray-600 dark:gray-300" font-semibold>Region : <span text-gray-500 font-medium>{{ country?.region }}</span></span>
          <!-- Languages -->
          <span text="gray-600 dark:gray-300" font-semibold>Languages : <span text-gray-500 font-medium>{{ Object.values(country?.languages).join(',') }}</span></span>
          <!-- Sub Region -->
          <span text="gray-600 dark:gray-300" font-semibold>Sub Region : <span text-gray-500 font-medium>{{ country?.subregion }}</span></span>
          <!-- startOfWeek -->
          <span text="gray-600 dark:gray-300" font-semibold>Start Of Week : <span text-gray-500 font-medium>{{ country?.startOfWeek }}</span></span>
          <!-- Capital -->
          <span text="gray-600 dark:gray-300" font-semibold>Capital : <span text-gray-500 font-medium>{{ country?.capital[0] }}</span></span>
        </div>

        <div flex flex-wrap items-center gap-2 mt-10>
          <span font-bold>Border Countries :</span>
          <div v-for="border in country?.borders" :key="border" btn>
            {{ border }}
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Ready State -->
</template>
