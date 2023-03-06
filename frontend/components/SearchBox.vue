<template>
  <div v-if="(searchPerformed)">
    <div class="fixed z-10 top-0 left-0 h-screen w-full bg-gray-200/50 grid md:grid-cols-5 lg:grid-cols-6">
      <div></div>
      <div
        class="md:col-span-3 lg:col-span-4 mt-14 md:mt-20 m-4 md:min-h-2/3 max-h-screen md:h-[70vh] bg-white rounded-lg overflow-y-scroll">
        <div class="m-4 md:mt-10 md:mx-10 flex justify-between">
          <span class="p-2 text-lg text-sky-700 font-semibold">Search Result for "{{ searchQuery }}"</span>
          <button class="p-2" @click="handleClose">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                fill="#0369A1" />
            </svg>
          </button>
        </div>
        <div class="grid gap-2 md:gap-3 lg:gap-4">
          <div v-if="searchResults.length > 0">
            <div v-for="item in searchResults" class="mx-auto border-b-2 border-dashed border-gray-100 w-5/6">
              <NuxtLink :to="item.url.substring(item.url.indexOf('#') + 1)" class="text-sky-700 my-2">{{
                item.title
              }}</NuxtLink>
              <p class="w-full text-sm md:text-base">...{{
                item.content.substring(Math.max(item.content.indexOf(searchQuery)
                  - 50, 0),
                  item.content.indexOf(searchQuery) + 300)
              }}...</p>
            </div>
          </div>
          <div v-else>
            <div class="mx-auto w-5/6">No result found</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-300 flex items-center w-28 lg:w-40 h-8 rounded">
    <input
      class="bg-gray-300 h-full w-full border-0 rounded text-sm text-gray-700 pr-2 focus:outline-none focus:ring-2 focus:ring-sky-700"
      type="text" id="search" placeholder="  Search..." v-model="searchQuery" />
    <div class="grid place-items-center rounded h-full w-10 text-white bg-sky-700">
      <button @click="search()"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      searchPerformed: false,
      searchResults: []
    };
  },
  methods: {
    handleClose() {
      this.searchResults = [];
      this.searchPerformed = false;
    },
    search() {
      if (this.searchQuery === "") {
        return [];
      }
      const keywordFilter = this.searchQuery.toLowerCase();
      // console.log("result is being filtered");
      const { data: fetchedContents } = useFetch("https://doctor-today-back.herokuapp.com/keywordSearch")
      if (fetchedContents.value) {
        this.searchResults = fetchedContents.value.filter(result =>
          result.content.toLowerCase().includes(keywordFilter)
        )
      }
      this.searchPerformed = true
    }
  }
};
</script>