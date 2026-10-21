# Gestion du parc informatique

Application Vue.js 3 réalisée pour gérer une liste d'ordinateurs sans serveur ni base de données externe.

## Installation et lancement

```bash
npm install
npm run dev
```

Pour générer la version de production :

```bash
npm run build
```

## Fonctionnalités

- affichage des ordinateurs sous forme de cartes ;
- ajout et modification avec validation des champs obligatoires ;
- suppression avec confirmation ;
- persistance automatique dans le `localStorage` ;
- recherche par modèle ou processeur ;
- tri par modèle, mémoire ou capacité du disque ;
- navigation avec Vue Router.

## Images

Les images des cartes sont chargées depuis `src/assets/images/`. Les images actuellement utilisées sont :

- `Acer Aspire 5.jpeg`
- `ASUS TUF Gaming F15.jpeg`
- `Dell Latitude 5540.jpeg`
- `HP ProBook 450 G10.jpeg`
- `Lenovo ThinkPad E14.jpeg`

Si vous remplacez ces fichiers par d'autres images, modifiez le champ `photo` dans
`src/data/ordinateurs.js`.
