<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        ITEMS
      </h1>
       <v-autocomplete
          v-model="item"
          :items="searchOptions"
          :loading="loadingItems"
          :search-input.sync="search"
          hide-no-data
          item-text="name"
          item-value="id"
          label="Item"
          placeholder="Item Zoeken"
          clearable
          return-object
        ></v-autocomplete>
       <v-card
        class="mx-auto"
        max-width="400"
        tile
      >
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-content>
            <v-list-item-title>
                {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import _ from 'lodash'

export default {
   data () {
    return {
      items: [],
      item: null,
      searchOptions: [],
      search: '',
      loadingItems: false
    }
  },
  async asyncData ({ $axios }) {
    const data = await $axios.$get('/api/get-items')
    console.log(data);
    return {items: data}
  },
  head () {
    return {
      title: 'Items'
    }
  },
  components: {
    Logo
  },
  methods: {
     makeSearch: async (value, self) => {
        // Handle empty value
        if (!value) {
          self.searchOptions = [];
          self.item = '';
        }
        // Items have already been requested
        if (self.loadingItems) {
          return
        }

        self.loadingItems = true

        await self.$axios.$get('/api/get-item', {
          params: {
            name: value
          }
        }).finally(() => { self.loadingItems = false; });
    }
  },
  watch: {
    search(value) {
      if(!value) {
        return
      }

      this.makeSearch(value, this);

    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
