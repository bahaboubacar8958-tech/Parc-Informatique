<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { chargerOrdinateurs, sauvegarderOrdinateurs } from '@/services/storage'

const route = useRoute()
const router = useRouter()
const ordinateurs = chargerOrdinateurs()
const id = Number(route.params.id)
const ordinateurExistant = ordinateurs.find((ordinateur) => ordinateur.id === id)
const modeModification = computed(() => Boolean(route.params.id))

const formulaire = reactive({
  modele: ordinateurExistant?.modele ?? '',
  processeur: ordinateurExistant?.processeur ?? '',
  memoire: ordinateurExistant?.memoire ?? '',
  disque: ordinateurExistant?.disque ?? '',
  carteGraphique: ordinateurExistant?.carteGraphique ?? '',
  photo: ordinateurExistant?.photo ?? '',
})
const erreurs = reactive({})
const photoSaisie = ref(ordinateurExistant?.photo?.startsWith('data:image/') ? '' : ordinateurExistant?.photo ?? '')
const nomImage = ref(ordinateurExistant?.photo?.startsWith('data:image/') ? 'Image enregistrée' : ordinateurExistant?.photo ?? '')

const images = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const apercuImage = computed(() => {
  if (formulaire.photo.startsWith('data:image/')) return formulaire.photo
  const nom = formulaire.photo.split(/[\\/]/).pop()?.replace(/\.[^/.]+$/, '').toLowerCase()
  const fichier = Object.entries(images).find(([chemin]) => {
    return chemin.split('/').pop()?.replace(/\.[^/.]+$/, '').toLowerCase() === nom
  })
  return fichier?.[1] ?? ''
})

function choisirImage(event) {
  const fichier = event.target.files?.[0]
  if (!fichier) return

  if (!fichier.type.startsWith('image/')) {
    erreurs.photo = 'Veuillez choisir un fichier image.'
    event.target.value = ''
    return
  }

  const lecteur = new FileReader()
  lecteur.addEventListener('load', () => {
    formulaire.photo = String(lecteur.result)
    photoSaisie.value = fichier.name
    nomImage.value = fichier.name
    delete erreurs.photo
  })
  lecteur.addEventListener('error', () => {
    erreurs.photo = 'Impossible de lire cette image.'
  })
  lecteur.readAsDataURL(fichier)
}

function valider() {
  Object.keys(erreurs).forEach((cle) => delete erreurs[cle])
  if (!formulaire.modele.trim()) erreurs.modele = 'Le modèle est obligatoire.'
  if (!formulaire.processeur.trim()) erreurs.processeur = 'Le processeur est obligatoire.'
  if (!formulaire.memoire || Number(formulaire.memoire) <= 0) erreurs.memoire = 'La mémoire doit être positive.'
  if (!formulaire.disque || Number(formulaire.disque) <= 0) erreurs.disque = 'Le disque doit être positif.'
  if (!formulaire.photo) erreurs.photo = 'Veuillez choisir une image.'
  return Object.keys(erreurs).length === 0
}

function enregistrer() {
  if (!valider()) return
  const donnees = {
    modele: formulaire.modele.trim(),
    processeur: formulaire.processeur.trim(),
    memoire: Number(formulaire.memoire),
    disque: Number(formulaire.disque),
    carteGraphique: formulaire.carteGraphique.trim(),
    photo: formulaire.photo,
  }
  if (modeModification.value && ordinateurExistant) {
    Object.assign(ordinateurExistant, donnees)
  } else {
    ordinateurs.push({ id: Date.now(), ...donnees })
  }
  sauvegarderOrdinateurs(ordinateurs)
  router.push('/ordinateurs')
}
</script>

<template>
  <section class="form-page">
    <RouterLink class="back-link" to="/ordinateurs">← Retour aux ordinateurs</RouterLink>
    <div class="page-header compact">
      <div>
        <p class="eyebrow">{{ modeModification ? 'Mise à jour' : 'Nouvel équipement' }}</p>
        <h1>{{ modeModification ? 'Modifier un ordinateur' : 'Ajouter un ordinateur' }}</h1>
        <p class="lead">Renseignez les caractéristiques techniques de l’équipement.</p>
      </div>
    </div>

    <form class="computer-form" novalidate @submit.prevent="enregistrer">
      <div class="form-layout">
        <div class="form-photo">
          <div v-if="apercuImage" class="form-photo-preview">
            <img :src="apercuImage" :alt="`Aperçu du ${formulaire.modele || 'ordinateur'}`" />
          </div>
          <div v-else class="form-photo-preview image-placeholder">
            <span>Aperçu de l’image</span>
          </div>
          <label class="file-picker">
            <span>Choisir une image</span>
            <input class="visually-hidden" accept="image/*" type="file" @change="choisirImage" />
          </label>
          <small>ou indiquez un nom ou un chemin à droite</small>
        </div>
        <div class="form-grid">
        <label :class="{ invalid: erreurs.modele }">
          <span>Modèle *</span>
          <input v-model="formulaire.modele" type="text" placeholder="Ex. Latitude 7440" />
          <small v-if="erreurs.modele">{{ erreurs.modele }}</small>
        </label>
        <label :class="{ invalid: erreurs.processeur }">
          <span>Processeur *</span>
          <input v-model="formulaire.processeur" type="text" placeholder="Ex. Intel Core i7" />
          <small v-if="erreurs.processeur">{{ erreurs.processeur }}</small>
        </label>
        <label :class="{ invalid: erreurs.memoire }">
          <span>Mémoire RAM (Go) *</span>
          <input v-model="formulaire.memoire" min="1" type="number" />
          <small v-if="erreurs.memoire">{{ erreurs.memoire }}</small>
        </label>
        <label :class="{ invalid: erreurs.disque }">
          <span>Disque (Go) *</span>
          <input v-model="formulaire.disque" min="1" type="number" />
          <small v-if="erreurs.disque">{{ erreurs.disque }}</small>
        </label>
        <label>
          <span>Carte graphique</span>
          <input v-model="formulaire.carteGraphique" type="text" placeholder="Ex. Intel Iris Xe" />
        </label>
        <label :class="{ invalid: erreurs.photo }">
          <span>Photo (nom ou chemin)</span>
          <input v-model="photoSaisie" type="text" placeholder="Ex. dell.jpg ou C:\images\dell.jpg" @input="formulaire.photo = photoSaisie" />
          <small v-if="nomImage">Fichier sélectionné : {{ nomImage }}</small>
          <small v-if="erreurs.photo">{{ erreurs.photo }}</small>
        </label>
        </div>
      </div>
      <div class="form-actions">
        <RouterLink class="button button-secondary" to="/ordinateurs">Annuler</RouterLink>
        <button class="button button-primary" type="submit">Enregistrer</button>
      </div>
    </form>
  </section>
</template>
