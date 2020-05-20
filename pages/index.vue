<template>
 <v-app>
    <div class="container">
      <div>
        <logo />
        <h1 class="title">
          ITEMS
        </h1>
          <v-text-field
              label="Item Zoeken"
              v-model="search"
              :loading="loadingItems"
          ></v-text-field>
        <v-card
          class="mx-auto"
          max-width="400"
          tile
        >
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-content>
              <v-list-item-title @click="showOverlay(item)">
                  {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
      <v-dialog v-model="overlay" max-width="344">
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">{{"Item ID : " + selectedItem.id }}</div>
              <v-list-item-title class="headline mb-1">{{ selectedItem.name }}</v-list-item-title>
              <v-list-item-subtitle>{{"Price : " + selectedItem.price}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn text @click="overlay = false">Sluiten</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import Logo from '~/components/Logo.vue'
import _ from 'lodash'

export default {
   data () {
    return {
      items: [],
      search: '',
      loadingItems: false,
      overlay: false,
      selectedItem: {
        id: null,
        name: null,
        price: null
      }
    }
  },
  async asyncData ({ $axios }) {
    const data = await $axios.$get('/api/get-items')
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
          self.items = await self.$axios.$get('/api/get-items');
        }
        // Items have already been requested
        if (self.loadingItems) {
          return
        }

        self.loadingItems = true

        self.items = await self.$axios.$get('/api/get-items', {
          params: {
            name: value
          }
        }).finally(() => { self.loadingItems = false; });
    },
    async showOverlay (item) {
      var foundItem = await this.$axios.$get('/api/get-item', {
        params: {
          id: item.id
        }
      });

      this.selectedItem = foundItem;
      this.overlay = true;
    }
  },
  watch: {
    search(value) {
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
