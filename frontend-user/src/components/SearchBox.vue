<template>
  <div class="md:m-0">
    <div
      class="
        bg-black
        flex
        items-center
        w-full
        h-8
        rounded
        focus-within:shadow-lg
      "
    >
      <input
        class="
          bg-gray-300
          h-full
          w-full
          border-0
          rounded
          text-sm text-gray-700
          pr-2
        "
        type="text"
        id="search"
        placeholder="Search..."
        v-model="searchQuery"
      />
      <!-- <div class="bg-blueDark grid place-items-center h-full w-10 text-gray-300 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      searchResults: [],
    };
  },
  computed: {
    filteredResults() {
      if (this.searchQuery === "") {
        return [];
      }

      return this.searchResults.filter((result) => {
        return result.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
  },
};
</script>