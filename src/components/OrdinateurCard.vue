<script setup>
import { ref } from 'vue'

const images = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  query: '?url',
  import: 'default',
})

defineProps({
  ordinateur: {
    type: Object,
    required: true,
  },
})

const imageIndisponible = ref(false)

const imageUrl = (photo) => {
  if (photo.startsWith('data:image/')) return photo

  const nomSansExtension = photo.replace(/\.[^/.]+$/, '').toLowerCase()
  const fichier = Object.entries(images).find(([chemin]) => {
    const nom = chemin.split('/').pop()?.replace(/\.[^/.]+$/, '').toLowerCase()
    return nom === nomSansExtension
  })
  return fichier ? fichier[1] : ''
}
</script>

<template>
  <article class="computer-card">
    <div v-if="!imageIndisponible && imageUrl(ordinateur.photo)" class="card-image">
      <img :src="imageUrl(ordinateur.photo)" :alt="`Photo du ${ordinateur.modele}`" @error="imageIndisponible = true" />
    </div>
    <div v-else class="card-image image-placeholder" aria-label="Image à ajouter">
      <span>Image à ajouter</span>
      <small>{{ ordinateur.photo }}</small>
    </div>
    <div class="card-content">
      <div class="card-heading">
        <div>
          <h2>{{ ordinateur.modele }}</h2>
        </div>
        <span class="status-dot" title="Équipement enregistré"></span>
      </div>
      <dl class="spec-list">
        <div><dt>Processeur</dt><dd>{{ ordinateur.processeur }}</dd></div>
        <div><dt>Mémoire</dt><dd>{{ ordinateur.memoire }} Go</dd></div>
        <div><dt>Disque</dt><dd>{{ ordinateur.disque }} Go</dd></div>
        <div><dt>Carte graphique</dt><dd>{{ ordinateur.carteGraphique }}</dd></div>
      </dl>
      <div class="card-actions">
        <RouterLink class="button button-secondary" :to="`/ordinateurs/modifier/${ordinateur.id}`">Modifier</RouterLink>
        <button class="button button-danger" type="button" @click="$emit('supprimer', ordinateur.id)">Supprimer</button>
      </div>
    </div>
  </article>
</template>
