# 🚗 GarageLocation - Site de Location de Véhicules

Un site moderne et responsive de location de véhicules créé avec React.js et TailwindCSS.

## ✨ Fonctionnalités

- **Page d'accueil attractive** avec hero section et présentation des services
- **Catalogue de véhicules** avec filtrage par catégorie, prix et recherche
- **Pages détaillées** pour chaque véhicule avec spécifications complètes
- **Formulaire de réservation** complet avec calcul automatique des prix
- **Pages institutionnelles** (À propos, Contact)
- **Design responsive** adapté à tous les écrans
- **Interface moderne** avec animations et transitions fluides

## 🛠️ Technologies utilisées

- **React 18** - Bibliothèque JavaScript pour l'interface utilisateur
- **Vite** - Outil de build rapide et moderne
- **TailwindCSS** - Framework CSS utilitaire
- **React Router** - Gestion du routing
- **Lucide React** - Icônes modernes
- **PostCSS & Autoprefixer** - Traitement CSS

## 📁 Structure du projet

```
frontend/
├── public/
│   ├── index.html
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── VehicleGrid.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── VehicleDetails.jsx
│   │   ├── Booking.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── vehicles.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Installation et démarrage

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation

1. **Cloner le projet**

   ```bash
   git clone [url-du-repo]
   cd "Garage Dev/frontend"
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**

   ```bash
   npm run dev
   ```

4. **Ouvrir l'application**
   - L'application sera accessible à l'adresse : `http://localhost:3000`

### Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualisation du build de production

## 🎨 Fonctionnalités détaillées

### Page d'accueil

- Hero section avec call-to-action
- Section des avantages (4 points forts)
- Moteur de recherche et filtrage des véhicules
- Grille des véhicules disponibles
- Statistiques de l'entreprise
- Section call-to-action finale

### Catalogue de véhicules

- **Filtrage avancé** : par catégorie, prix, recherche textuelle
- **Cards véhicules** avec image, spécifications, prix et actions
- **Responsive design** : 1-2-3 colonnes selon l'écran
- **États disponible/indisponible** avec badges colorés

### Page détail véhicule

- Grande image du véhicule
- Spécifications complètes
- Liste des équipements inclus
- Garanties et services
- Bloc de réservation avec prix
- Design responsive

### Formulaire de réservation

- **Sélection dates** avec validation
- **Informations client** complètes
- **Options supplémentaires** (GPS, conducteur additionnel, etc.)
- **Calcul automatique** du prix total
- **Résumé de commande** en temps réel
- **Validation** des champs obligatoires

### Pages institutionnelles

- **À propos** : histoire, valeurs, équipe, statistiques
- **Contact** : formulaire, informations, FAQ, carte

## 🎨 Design et UX

- **Palette de couleurs** : Bleu primaire avec accents
- **Typographie** : Inter pour une lecture optimale
- **Icons** : Lucide React pour la cohérence
- **Animations** : Transitions fluides et hover effects
- **Responsive** : Mobile-first avec breakpoints adaptés

## 📱 Responsive Design

- **Mobile** (< 768px) : Navigation hamburger, layout 1 colonne
- **Tablet** (768px - 1024px) : Layout 2 colonnes, navigation complète
- **Desktop** (> 1024px) : Layout 3 colonnes, toutes les fonctionnalités

## 🚧 Améliorations possibles

- [ ] Intégration d'une vraie API backend
- [ ] Système d'authentification utilisateur
- [ ] Paiement en ligne
- [ ] Géolocalisation et cartes interactives
- [ ] Système de notifications
- [ ] Mode sombre
- [ ] Tests automatisés
- [ ] Optimisation SEO avancée

## 📄 Licence

Ce projet est développé à des fins éducatives et de démonstration.

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Committer vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

---

**GarageLocation** - Votre partenaire mobilité 🚗
