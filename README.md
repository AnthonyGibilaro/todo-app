# 📝 Todo App Next.js avec MongoDB

Une application de gestion de tâches moderne et élégante construite avec **Next.js** et **MongoDB**.

## 🚀 Fonctionnalités

- ✨ **Interface utilisateur moderne et responsive**
- 📱 **Design adaptatif** pour mobile et desktop
- ✅ **Création, modification et suppression** de tâches
- 🔄 **Mise à jour en temps réel**
- 🎨 **Animations fluides**

## 🛠️ Technologies Utilisées

| Technologie                                     | Description     |
| ----------------------------------------------- | --------------- |
| [Next.js](https://nextjs.org/)                  | Framework React |
| [MongoDB](https://www.mongodb.com/)             | Base de données |
| [Tailwind CSS](https://tailwindcss.com/)        | Framework CSS   |
| [Framer Motion](https://www.framer.com/motion/) | Animations      |

## 📋 Prérequis

- **Node.js** (version 18 ou supérieure)
- **MongoDB** (local ou Atlas)
- **npm** ou **yarn**

## 🚀 Installation

1. **Clonez le repository**
   ```bash
   git clone git@github.com:AnthonyGibilaro/todo-app.git
   cd todo-app
   ```
2. **Installez les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```
3. **Configuration des variables d'environnement**  
   Créez un fichier `.env.local` à la racine du projet :
   ```plaintext
   MONGODB_URI=votre_uri_mongodb
   ```

💻 **Développement Local**  
Démarrez l'application en mode développement :

```bash
npm run dev
# ou
yarn dev
```

Accédez à l'application : Ouvrez `http://localhost:3000` dans votre navigateur.

🌐 **Configuration MongoDB**

### Configuration Locale

Si vous utilisez MongoDB localement avec Docker :

```yaml
version: "3.8"
services:
  mongodb:
    image: mongo:latest
    container_name: MongoDB-Server
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
      - mongodb_config:/data/configdb

volumes:
  mongodb_data:
    name: mongodb_data_volume
  mongodb_config:
    name: mongodb_config_volume
```

### Configuration MongoDB Atlas

1. Créez un compte sur **MongoDB Atlas**
2. Créez un nouveau cluster
3. Obtenez votre URI de connexion
4. Ajoutez l'URI dans votre fichier `.env.local`

🚀 **Déploiement**  
Déploiement sur **Vercel** :

1. Créez un compte sur **Vercel**
2. Connectez votre repository GitHub
3. Configurez les variables d'environnement dans Vercel :
   - Ajoutez `MONGODB_URI` avec votre URI MongoDB Atlas
4. Déployez !

📝 **Utilisation**

- **Ajouter une tâche**
  - Entrez le texte de la tâche dans le champ de saisie
  - Cliquez sur "Ajouter" ou appuyez sur Entrée
- **Marquer une tâche comme terminée**
  - Cliquez sur la case à cocher à côté de la tâche
- **Supprimer une tâche**
  - Cliquez sur le bouton "Supprimer" à côté de la tâche

👨‍💻 **Auteur**  
**Anthony Gibilaro**

