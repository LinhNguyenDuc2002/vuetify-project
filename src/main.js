/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import I18n from './i18n/i18n'

const app = createApp(App)

registerPlugins(app)
app.use(I18n);
app.mount('#app')
