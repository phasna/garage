# 🚗 GarageLocation - Site de Location de Véhicules

Un site moderne et responsive de location de véhicules avec un backend API REST complet.

## ✨ Fonctionnalités

### Frontend (React)
- **Page d'accueil attractive** avec hero section et présentation des services
- **Catalogue de véhicules** avec filtrage par catégorie, prix et recherche
- **Pages détaillées** pour chaque véhicule avec spécifications complètes
- **Formulaire de réservation** complet avec calcul automatique des prix
- **Pages institutionnelles** (À propos, Contact)
- **Design responsive** adapté à tous les écrans
- **Interface moderne** avec animations et transitions fluides

### Backend (Symfony API)
- **API REST complète** avec documentation Swagger automatique
- **Authentification JWT** sécurisée pour l'administration
- **Gestion des véhicules** (CRUD complet)
- **Gestion des équipements** (CRUD complet)
- **Système de disponibilité** des véhicules avec motifs d'indisponibilité
- **Récupération de mot de passe** avec code garage sécurisé
- **Base de données SQLite** légère et portable
- **API Platform 4** pour une API REST moderne

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Bibliothèque JavaScript pour l'interface utilisateur
- **Vite** - Outil de build rapide et moderne
- **TailwindCSS** - Framework CSS utilitaire
- **React Router** - Gestion du routing
- **Lucide React** - Icônes modernes
- **PostCSS & Autoprefixer** - Traitement CSS

### Backend
- **Symfony 7.1** - Framework PHP moderne
- **API Platform 4.1** - Framework API REST
- **SQLite** - Base de données légère
- **JWT Authentication** - Authentification sécurisée
- **Doctrine ORM** - Gestion de la base de données

## 📁 Structure du projet

```
garage/
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   ├── pages/           # Pages de l'application
│   │   └── data/            # Données statiques
│   └── CLAUDE.md           # Documentation frontend
│
└── backend/                 # API Symfony
    ├── src/
    │   ├── Entity/          # Entités Doctrine
    │   │   ├── User.php
    │   │   ├── Vehicle.php
    │   │   └── Equipment.php
    │   ├── Repository/      # Repositories Doctrine
    │   ├── Controller/      # Contrôleurs API
    │   │   ├── AuthController.php
    │   │   └── PublicApiController.php
    │   └── Command/         # Commandes CLI
    │       └── InitDataCommand.php
    ├── config/              # Configuration Symfony
    ├── var/
    │   └── data.db         # Base de données SQLite
    └── CLAUDE.md           # Documentation API complète
```

## 🚀 Installation et démarrage

### Prérequis

- **Node.js** (version 16 ou supérieure)
- **PHP** 8.2 ou supérieur
- **Composer** (gestionnaire de dépendances PHP)
- **Symfony CLI** (optionnel mais recommandé)

### Installation du Backend

1. **Naviguer vers le dossier backend**

   ```bash
   cd garage/backend
   ```

2. **Installer les dépendances PHP**

   ```bash
   composer install
   ```

3. **Initialiser la base de données avec les données de démonstration**

   ```bash
   php bin/console app:init-data --with-vehicles
   ```

   Cela créera :
   - Un compte admin (username: `admin`, password: `admin123`)
   - 13 équipements de base
   - 12 véhicules de démonstration

4. **Lancer le serveur Symfony**

   ```bash
   symfony server:start
   # ou
   php -S localhost:8000 -t public
   ```

   L'API sera accessible à : `http://localhost:8000/api`

### Installation du Frontend

1. **Naviguer vers le dossier frontend**

   ```bash
   cd garage/frontend
   ```

2. **Installer les dépendances Node**

   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**

   ```bash
   npm run dev
   ```

   L'application sera accessible à : `http://localhost:5173`

### Scripts disponibles

#### Backend
- `php bin/console app:init-data` - Initialiser les données
- `php bin/console app:init-data --with-vehicles` - Initialiser avec véhicules
- `php bin/console app:init-data --reset` - Réinitialiser toutes les données
- `symfony server:start` - Démarrer le serveur

#### Frontend
- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualisation du build

### Configuration

#### Backend (.env)
```env
DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"
GARAGE_CODE=GARAGE2024  # Code pour mot de passe oublié
CORS_ALLOW_ORIGIN='^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$'
```

### Documentation API

- **Documentation interactive Swagger** : `http://localhost:8000/api`
- **Documentation complète** : Voir `backend/CLAUDE.md`

## 🔌 Endpoints API principaux

### Authentification
- `POST /api/login` - Connexion admin
- `POST /api/admin/forgot-password` - Vérifier code garage
- `PUT /api/admin/reset-password` - Réinitialiser mot de passe

### API Publique
- `GET /api/vehicles` - Liste des véhicules
- `GET /api/vehicles/{id}` - Détails d'un véhicule
- `GET /api/equipments` - Liste des équipements
- `GET /api/categories` - Liste des catégories

### API Admin (JWT requis)
- `GET /api/admin/vehicles` - Liste admin des véhicules
- `POST /api/admin/vehicles` - Créer un véhicule
- `PUT /api/admin/vehicles/{id}` - Modifier un véhicule
- `PATCH /api/admin/vehicles/{id}/availability` - Changer disponibilité
- `DELETE /api/admin/vehicles/{id}` - Supprimer un véhicule
- `GET /api/admin/equipments` - Liste admin des équipements
- `POST /api/admin/equipments` - Créer un équipement

Voir `backend/CLAUDE.md` pour la documentation complète avec exemples de requêtes.

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

## ✅ Fonctionnalités réalisées

- [x] **Intégration d'une vraie API backend** (Symfony + API Platform)
- [x] **Système d'authentification admin** avec JWT
- [x] **Gestion complète des véhicules** via API
- [x] **Gestion des équipements** via API
- [x] **Système de disponibilité** des véhicules
- [x] **Récupération de mot de passe** sécurisée
- [x] **Base de données SQLite** avec migrations
- [x] **Documentation API** Swagger automatique

## 🚧 Améliorations possibles

- [ ] Interface d'administration frontend (React)
- [ ] Connexion frontend avec le backend API
- [ ] Système d'authentification client
- [ ] Système de réservation complet avec validation
- [ ] Paiement en ligne
- [ ] Géolocalisation et cartes interactives
- [ ] Système de notifications par email
- [ ] Mode sombre
- [ ] Tests automatisés (PHPUnit, Jest)
- [ ] Optimisation SEO avancée
- [ ] Upload d'images pour les véhicules
- [ ] Génération de contrats PDF

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
