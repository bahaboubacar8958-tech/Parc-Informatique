import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ListeOrdinateurs from './views/ListeOrdinateurs.vue'
import EditOrdinateur from './views/EditOrdinateur.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/ordinateurs' },
    { path: '/ordinateurs', component: ListeOrdinateurs },
    { path: '/ordinateurs/ajouter', component: EditOrdinateur },
    { path: '/ordinateurs/modifier/:id', component: EditOrdinateur },
  ],
})

createApp(App).use(router).mount('#app')
