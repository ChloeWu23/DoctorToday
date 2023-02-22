<template>
  <div class="md:m-0">
    <div v-if="searchResults.length > 0">
      <div class="fixed top-0 left-0 h-screen w-screen bg-slate-100/80 z-10">
        <div v-for="item in searchResults">
          <p>{{ item.url }}</p>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
    <div class="
                bg-black
                flex
                items-center
                w-full
                h-8
                rounded
                focus-within:shadow-lg
              ">
      <input class="
                  bg-gray-300
                  h-full
                  w-full
                  border-0
                  rounded
                  text-sm text-gray-700
                  pr-2
                " type="text" id="search" placeholder="Search..." v-model="searchQuery" />
      <div class="bg-blueDark grid place-items-center h-full w-10 text-gray-300 hover:text-gray-700">

        <button @click="search()"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg></button>
      </div>
    </div>
  </div>
</template>

<script>
import KeywordSearch from '../dataRoutes/KeywordSearch';


export default {
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      fetchedContents: []
    };
  },
  methods: {
    stripTags(content) {
      return content.replace(/<\/?[^>]+>/ig, " ");
    },
    search() {
      if (this.searchQuery === "") {
        return [];
      }

      KeywordSearch.get().then(
        res => {
          console.log(res)
          res.data.map(element => {
            const parsedText = this.stripTags(element.value.content);
            this.fetchedContents.push({
              id: element.value.id,
              url: element.value.url,
              content: parsedText
            });
          })
        }).
        then(data => {
          const keywordFilter = this.searchQuery.toLowerCase();
          // console.log("result is being filtered");
          this.searchResults = this.fetchedContents.filter(result =>
            result.content.toLowerCase().includes(keywordFilter)
          )
        })
    }
  }
};
</script>