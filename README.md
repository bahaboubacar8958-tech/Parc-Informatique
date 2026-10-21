# Gestion du parc informatique

Application Vue.js 3 permettant de consulter et de gérer une liste
d'ordinateurs sans serveur ni base de données externe.

## Fonctionnalités

- affichage des ordinateurs sous forme de cartes ;
- ajout d'un ordinateur ;
- modification d'un ordinateur ;
- suppression avec confirmation ;
- validation des champs obligatoires ;
- sélection d'une image depuis l'explorateur de fichiers ;
- saisie directe du nom ou du chemin d'une image ;
- aperçu de l'image dans le formulaire ;
- recherche par modèle ou processeur ;
- tri par modèle, mémoire ou capacité du disque ;
- sauvegarde des données dans le `localStorage` ;
- interface responsive.

## Technologies utilisées

- Vue.js 3 ;
- Vue Router 4 ;
- Vite ;
- JavaScript et Composition API ;
- HTML/CSS ;
- `localStorage`.

## Installation

Placez-vous dans le dossier du projet puis installez les dépendances :

```bash
npm install
```

## Lancer l'application

Pour lancer le serveur de développement :

```bash
npm run dev
```

Vite affichera l'adresse locale à ouvrir dans le navigateur.

## Compiler le projet

Pour vérifier et compiler l'application en mode production :

```bash
npm run build
```

Pour prévisualiser la version compilée :

```bash
npm run preview
```

## Routes disponibles

| Route | Description |
| --- | --- |
| `/ordinateurs` | Affiche la liste des ordinateurs |
| `/ordinateurs/ajouter` | Ouvre le formulaire d'ajout |
| `/ordinateurs/modifier/:id` | Ouvre le formulaire de modification |

## Organisation du projet

```text
src/
├── assets/
│   └── images/
├── components/
│   └── OrdinateurCard.vue
├── data/
│   └── ordinateurs.js
├── services/
│   └── storage.js
├── views/
│   ├── ListeOrdinateurs.vue
│   └── EditOrdinateur.vue
├── App.vue
├── main.js
└── style.css
```

## Images

Les images fournies avec le projet se trouvent dans :

```text
src/assets/images/
```

Images utilisées actuellement :

- `Acer Aspire 5.jpeg`
- `ASUS TUF Gaming F15.jpeg`
- `Dell Latitude 5540.jpeg`
- `HP ProBook 450 G10.jpeg`
- `Lenovo ThinkPad E14.jpeg`

Lors de l'ajout ou de la modification d'un ordinateur, deux méthodes sont
disponibles :

1. saisir le nom ou le chemin de l'image dans le champ **Photo (nom ou chemin)** ;
2. cliquer sur **Choisir une image** et sélectionner un fichier image dans
   l'explorateur.

Les images sélectionnées sont conservées dans le `localStorage` avec les données
de l'ordinateur.

## Persistance des données

Les ordinateurs sont enregistrés dans le stockage local du navigateur sous la
clé `gestion-parc-ordinateurs`. Les données restent disponibles après un
rechargement de la page.

Le bouton **Réinitialiser**, lorsqu'il est disponible dans l'interface, permet
de supprimer les données locales et de recréer les exemples initiaux.

## Compte rendu

Le compte rendu détaillé du projet est disponible dans :

[COMPTE_RENDU.md](./COMPTE_RENDU.md)