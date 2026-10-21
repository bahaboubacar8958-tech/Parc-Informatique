import { ordinateursExemples } from '@/data/ordinateurs'

const STORAGE_KEY = 'gestion-parc-ordinateurs'

export function chargerOrdinateurs() {
  const sauvegarde = localStorage.getItem(STORAGE_KEY)
  if (!sauvegarde) {
    const exemples = structuredClone(ordinateursExemples)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exemples))
    return exemples
  }

  try {
    const ordinateurs = JSON.parse(sauvegarde)
    if (!Array.isArray(ordinateurs)) return []

    const anciennesImages = ordinateurs.some((ordinateur) => ordinateur.photo?.startsWith('ordinateur-'))
    if (anciennesImages) {
      const ordinateursMisAJour = ordinateurs.map((ordinateur) => {
        const exemple = ordinateursExemples.find((item) => item.id === ordinateur.id)
        return exemple ? { ...ordinateur, photo: exemple.photo } : ordinateur
      })
      sauvegarderOrdinateurs(ordinateursMisAJour)
      return ordinateursMisAJour
    }

    return ordinateurs
  } catch {
    localStorage.removeItem(STORAGE_KEY)
    return chargerOrdinateurs()
  }
}

export function sauvegarderOrdinateurs(ordinateurs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ordinateurs))
}
