
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

import VueToast from 'vue-toast-notification';


import App from './App.vue'
import router from './router'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, md } from 'vuetify/iconsets/md'



const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
})


const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedState))
app.use(router)
app.use(vuetify)
app.use(VueToast);

app.mount('#app')
