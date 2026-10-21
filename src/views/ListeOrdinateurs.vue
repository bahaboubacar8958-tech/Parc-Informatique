<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import OrdinateurCard from '@/components/OrdinateurCard.vue'
import { chargerOrdinateurs, sauvegarderOrdinateurs } from '@/services/storage'

const router = useRouter()
const ordinateurs = ref(chargerOrdinateurs())
const recherche = ref('')
const tri = ref('modele')

const ordinateursFiltres = computed(() => {
  const terme = recherche.value.trim().toLowerCase()
  return [...ordinateurs.value]
    .filter((ordinateur) => !terme || `${ordinateur.modele} ${ordinateur.processeur}`.toLowerCase().includes(terme))
    .sort((a, b) => {
      if (tri.value === 'memoire') return b.memoire - a.memoire
      if (tri.value === 'disque') return b.disque - a.disque
      return a.modele.localeCompare(b.modele)
    })
})

function supprimer(id) {
  const ordinateur = ordinateurs.value.find((item) => item.id === id)
  if (!ordinateur || !window.confirm(`Supprimer « ${ordinateur.modele} » ?`)) return
  ordinateurs.value = ordinateurs.value.filter((item) => item.id !== id)
  sauvegarderOrdinateurs(ordinateurs.value)
}

function reinitialiser() {
  if (!window.confirm('Réinitialiser la liste avec les cinq exemples ?')) return
  localStorage.removeItem('gestion-parc-ordinateurs')
  ordinateurs.value = chargerOrdinateurs()
}

function modifierDepuisLaListe(id) {
  router.push(`/ordinateurs/modifier/${id}`)
}
</script>

<template>
  <section
    v-if="ordinateursFiltres.length"
    class="computer-grid"
    :class="`computer-grid--${Math.min(ordinateursFiltres.length, 6)}`"
  >
    <OrdinateurCard
      v-for="ordinateur in ordinateursFiltres"
      :key="ordinateur.id"
      :ordinateur="ordinateur"
      @supprimer="supprimer"
      @modifier="modifierDepuisLaListe"
    />
  </section>
  <div v-else class="empty-state">
    <h2>Aucun ordinateur trouvé</h2>
    <p>Essayez une autre recherche ou ajoutez un nouvel équipement.</p>
  </div>
</template>
