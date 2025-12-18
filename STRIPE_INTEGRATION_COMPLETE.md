# 💳 Intégration Stripe - Récapitulatif Complet

## 📦 Ce qui a été créé

### Backend Node.js/Express (dossier `/backend`)

```
backend/
├── server.js              ← Serveur Express avec API Stripe
├── package.json           ← Dépendances (express, stripe, cors, dotenv)
├── .env                   ← Configuration (clés Stripe, prix)
├── .env.example           ← Template de configuration
├── .gitignore            ← Fichiers à ne pas commiter
├── README.md              ← Documentation complète
├── QUICK_START.md         ← Guide de démarrage rapide
└── test-api.js           ← Script de test de l'API
```

### Frontend Angular (mis à jour)

- `src/app/services/stripe.service.ts` - Service Stripe configuré pour communiquer avec le backend
- `src/app/components/services/services.component.ts` - Boutons de paiement activés
- `src/app/components/services/services.component.html` - Événements de clic configurés

## 🚀 Démarrage Rapide (15 minutes)

### 1. Créer un compte Stripe
👉 [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)

### 2. Récupérer vos clés API
Dashboard → Développeurs → Clés API
- Clé publiable: `pk_test_...`
- Clé secrète: `sk_test_...`

### 3. Créer 3 produits dans Stripe
Dashboard → Produits → Ajouter un produit

**Pack Essentiel** - 450€/mois (récurrent)
**Pack Pro** - 850€/mois (récurrent)
**Pack Premium** - 1500€/mois (récurrent)

➡️ Copiez les Price IDs de chaque produit

### 4. Configurer le backend

```bash
cd backend
```

Éditez `.env`:
```env
STRIPE_SECRET_KEY_TEST=sk_test_VOTRE_CLE_ICI
STRIPE_PUBLISHABLE_KEY_TEST=pk_test_VOTRE_CLE_ICI
STRIPE_MODE=test
PORT=3000
FRONTEND_URL=http://localhost:4200

PRICE_ID_ESSENTIAL=price_ABC123...
PRICE_ID_PRO=price_DEF456...
PRICE_ID_PREMIUM=price_GHI789...
```

### 5. Configurer le frontend

Éditez `src/app/services/stripe.service.ts` ligne 16:
```typescript
private readonly stripePublicKey = 'pk_test_VOTRE_CLE_PUBLIQUE_ICI';
```

### 6. Démarrer les serveurs

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm start
```

### 7. Tester un paiement

1. Ouvrez [http://localhost:4200](http://localhost:4200)
2. Cliquez sur "Choisir Pro"
3. Carte de test: `4242 4242 4242 4242`
4. Date: `12/25`, CVC: `123`

✅ **Le paiement fonctionne !**

## 📡 API Endpoints

Le backend expose ces endpoints:

### `GET /api/health`
Vérifier que le serveur fonctionne
```bash
curl http://localhost:3000/api/health
```

### `GET /api/plans`
Liste des plans configurés
```bash
curl http://localhost:3000/api/plans
```

### `POST /api/create-checkout-session`
Créer une session de paiement
```bash
curl -X POST http://localhost:3000/api/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"planId":"pro"}'
```

### `GET /api/checkout-session/:sessionId`
Récupérer les détails d'une session

### `POST /api/webhook`
Recevoir les notifications Stripe

## 🧪 Tester l'API

```bash
cd backend
node test-api.js
```

Ce script teste automatiquement tous les endpoints.

## 🔐 Cartes de test Stripe

### ✅ Paiement réussi
- **4242 4242 4242 4242** - Visa
- **5555 5555 5555 4444** - Mastercard
- **3782 822463 10005** - American Express

### ❌ Paiement refusé
- **4000 0000 0000 0002** - Carte refusée
- **4000 0000 0000 9995** - Fonds insuffisants

### 🔒 Authentification 3D Secure
- **4000 0027 6000 3184** - Nécessite une authentification

[Plus de cartes de test](https://stripe.com/docs/testing)

## 📊 Modes de paiement disponibles

### ✅ Mode TEST (actuel)
- Paiements simulés
- Cartes de test uniquement
- Gratuit
- Idéal pour développement

### 🚀 Mode LIVE (production)
- Vrais paiements
- Vraies cartes bancaires
- Frais Stripe: 1,5% + 0,25€ par transaction
- Nécessite activation du compte

## 🔄 Passer en production

### 1. Activer votre compte Stripe
- Complétez les informations d'entreprise
- Vérification d'identité requise
- Ajoutez vos coordonnées bancaires

### 2. Recréer les produits en mode LIVE
- Dashboard → Activer le mode LIVE (toggle en haut à droite)
- Recréez vos 3 produits
- Copiez les nouveaux Price IDs (commencent par `price_live_`)

### 3. Mettre à jour .env
```env
STRIPE_SECRET_KEY_LIVE=sk_live_...
STRIPE_PUBLISHABLE_KEY_LIVE=pk_live_...
STRIPE_MODE=live
PRICE_ID_ESSENTIAL=price_live_...
PRICE_ID_PRO=price_live_...
PRICE_ID_PREMIUM=price_live_...
```

### 4. Déployer le backend

**Options recommandées:**

#### Heroku (gratuit pour commencer)
```bash
# Installer Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

cd backend
heroku login
heroku create mon-backend-stripe
git init
git add .
git commit -m "Backend Stripe"
heroku git:remote -a mon-backend-stripe
git push heroku main

# Configurer les variables d'environnement
heroku config:set STRIPE_SECRET_KEY_LIVE=sk_live_...
heroku config:set STRIPE_MODE=live
# ... etc pour toutes les variables
```

#### Railway (très facile)
1. Allez sur [railway.app](https://railway.app)
2. Connectez votre compte GitHub
3. Créez un nouveau projet depuis le dossier `/backend`
4. Ajoutez les variables d'environnement dans l'interface
5. Railway déploie automatiquement ✅

#### DigitalOcean / AWS / Google Cloud
Documentation disponible sur leurs sites respectifs.

### 5. Mettre à jour le frontend

`src/app/services/stripe.service.ts` ligne 84:
```typescript
const response = await fetch('https://votre-backend.herokuapp.com/api/create-checkout-session', {
  // ...
});
```

Ligne 16:
```typescript
private readonly stripePublicKey = 'pk_live_VOTRE_CLE_LIVE';
```

### 6. Déployer le frontend

Compilez pour production:
```bash
npm run build
```

Déployez le dossier `dist/` sur:
- **Netlify** (gratuit, facile)
- **Vercel** (gratuit, facile)
- **Firebase Hosting**
- Votre propre serveur

## 🔔 Configurer les Webhooks (important)

Les webhooks permettent à Stripe de notifier votre backend quand:
- Un paiement réussit
- Un abonnement est annulé
- Un paiement échoue
- etc.

### En développement local

1. Installez Stripe CLI:
```bash
# Windows (Scoop)
scoop install stripe

# Mac
brew install stripe/stripe-cli/stripe
```

2. Connectez-vous:
```bash
stripe login
```

3. Écoutez les webhooks:
```bash
stripe listen --forward-to localhost:3000/api/webhook
```

4. Copiez le secret affiché et ajoutez-le dans `.env`:
```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

### En production

1. Dashboard Stripe → Développeurs → Webhooks
2. Cliquez sur "Ajouter un endpoint"
3. URL: `https://votre-backend.com/api/webhook`
4. Événements à écouter:
   - `checkout.session.completed`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
   - `customer.subscription.updated`
5. Copiez le "Signing secret" et ajoutez-le dans vos variables d'environnement

## 💰 Frais Stripe

### Tarification européenne
- **Cartes européennes**: 1,5% + 0,25€ par transaction
- **Cartes non-européennes**: 2,9% + 0,25€ par transaction
- **Pas de frais mensuels**
- **Pas de frais d'installation**

### Exemple de calcul
Pack Pro à 850€:
- Frais: (850 × 1,5%) + 0,25€ = 13,00€
- Vous recevez: 837,00€

## 🔒 Sécurité

### ✅ Déjà implémenté
- Clés secrètes dans .env (jamais dans le code)
- CORS configuré
- Validation des données
- Gestion des erreurs
- Webhooks signés

### ⚠️ À faire en production
- Utiliser HTTPS (obligatoire)
- Valider les webhooks avec la signature
- Logger les erreurs (Sentry, LogRocket)
- Monitorer les paiements
- Mettre en place des alertes

## 📊 Dashboard Stripe

Votre Dashboard Stripe vous permet de:
- 📈 Voir les statistiques de paiement
- 👥 Gérer les clients
- 💳 Voir toutes les transactions
- 🔄 Gérer les abonnements
- 💰 Faire des remboursements
- 📧 Envoyer des factures
- 📊 Exporter les données

## 🆘 Dépannage

### "Cannot connect to backend"
➡️ Le backend n'est pas démarré
```bash
cd backend && npm start
```

### "Invalid API key"
➡️ Vérifiez vos clés dans `.env`
- Clé secrète: commence par `sk_test_` ou `sk_live_`
- Mode cohérent avec les clés

### "Price not found"
➡️ Les Price IDs ne sont pas corrects dans `.env`
- Vérifiez dans Dashboard Stripe → Produits
- Format: `price_ABC123...`

### "Stripe not initialized"
➡️ Clé publique manquante dans `stripe.service.ts`

### Le paiement ne redirige pas
➡️ Vérifiez la console du navigateur (F12)
➡️ Vérifiez les logs du serveur backend

## 📚 Documentation

- **Guide complet**: [backend/README.md](backend/README.md)
- **Démarrage rapide**: [backend/QUICK_START.md](backend/QUICK_START.md)
- **Documentation Stripe**: [stripe.com/docs](https://stripe.com/docs)
- **Dashboard Stripe**: [dashboard.stripe.com](https://dashboard.stripe.com)

## ✅ Checklist finale

- [ ] Compte Stripe créé
- [ ] 3 produits créés avec Prix récurrents
- [ ] Clés API récupérées (publique + secrète)
- [ ] Backend configuré (.env)
- [ ] Frontend configuré (clé publique)
- [ ] Backend démarré (port 3000)
- [ ] Frontend démarré (port 4200)
- [ ] Test de paiement réussi avec carte 4242
- [ ] Paiement visible dans Dashboard Stripe

## 🎉 Félicitations !

Votre système de paiement Stripe est opérationnel !

Vous pouvez maintenant:
- ✅ Accepter des paiements en mode test
- ✅ Gérer des abonnements mensuels
- ✅ Voir les transactions dans Stripe
- ✅ Tester avec des cartes fictives

Pour passer en production, suivez les étapes de la section "Passer en production" ci-dessus.

## 📞 Support

Si vous rencontrez des problèmes:
1. Consultez [backend/QUICK_START.md](backend/QUICK_START.md)
2. Consultez [backend/README.md](backend/README.md)
3. Documentation Stripe: [stripe.com/docs](https://stripe.com/docs)
4. Support Stripe: [support.stripe.com](https://support.stripe.com)
