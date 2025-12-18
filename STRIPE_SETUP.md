# Configuration Stripe pour votre Landing Page

## 🎯 Vue d'ensemble

Votre site est maintenant prêt à accepter des paiements via Stripe ! Voici comment finaliser la configuration.

## 📋 Étapes de configuration

### 1. Créer un compte Stripe

1. Allez sur [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Créez votre compte (gratuit, pas de frais mensuels)
3. Activez le mode TEST pour commencer (clé commençant par `pk_test_`)

### 2. Récupérer votre clé publique

1. Connectez-vous au [Dashboard Stripe](https://dashboard.stripe.com)
2. Cliquez sur **Développeurs** → **Clés API**
3. Copiez la **Clé publiable** (commence par `pk_test_` pour le test, `pk_live_` pour la production)
4. Ouvrez le fichier `src/app/services/stripe.service.ts`
5. Remplacez la ligne 16 :
   ```typescript
   private readonly stripePublicKey = 'VOTRE_CLE_PUBLIQUE_ICI';
   ```

### 3. Créer vos produits et prix dans Stripe

#### Option A : Via le Dashboard Stripe (Recommandé pour débuter)

1. Dans le Dashboard Stripe, allez dans **Produits** → **Ajouter un produit**
2. Créez 4 produits correspondant à vos offres :

   **Produit 1 : Pack Essentiel**
   - Nom : Pack Essentiel - 10h/mois
   - Prix : 450€
   - Type : Récurrent (mensuel)
   - Copiez l'ID du prix (commence par `price_...`)

   **Produit 2 : Pack Pro**
   - Nom : Pack Pro - 20h/mois
   - Prix : 850€
   - Type : Récurrent (mensuel)
   - Copiez l'ID du prix

   **Produit 3 : Pack Premium**
   - Nom : Pack Premium - 40h/mois
   - Prix : 1500€
   - Type : Récurrent (mensuel)
   - Copiez l'ID du prix

   **Produit 4 : Tarif Horaire** (optionnel)
   - Nom : Tarif Horaire
   - Prix : 45€
   - Type : Paiement unique
   - Copiez l'ID du prix

3. Mettez à jour les IDs dans `src/app/services/stripe.service.ts` lignes 24-45 :
   ```typescript
   private pricingPlans: PricingPlan[] = [
     {
       id: 'essential',
       stripePriceId: 'price_ABC123...', // ← Collez l'ID ici
       // ...
     },
     // ... pour chaque plan
   ];
   ```

### 4. Tester les paiements

1. Une fois vos clés configurées, cliquez sur un bouton "Choisir..."
2. Vous serez redirigé vers Stripe Checkout
3. Utilisez une carte de test :
   - Numéro : `4242 4242 4242 4242`
   - Date : n'importe quelle date future
   - CVC : n'importe quels 3 chiffres
   - Code postal : n'importe lequel

### 5. Gérer les URLs de succès/échec

Les URLs sont configurées dans `stripe.service.ts` ligne 71 :
```typescript
successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
cancelUrl: `${window.location.origin}/#services`,
```

Vous devrez créer :
- Une page `/success` pour remercier le client après paiement
- Gérer l'annulation (actuellement retour à #services)

### 6. Passer en production

Quand vous serez prêt :

1. Activez votre compte Stripe (vérification d'identité requise)
2. Remplacez `pk_test_...` par `pk_live_...`
3. Créez les mêmes produits en mode LIVE
4. Mettez à jour les `stripePriceId` avec les IDs de production

## 🔒 Sécurité

**Important** :
- ✅ La clé publique (`pk_...`) peut être exposée côté client
- ❌ Ne JAMAIS exposer votre clé secrète (`sk_...`) côté client
- Pour la production, il est recommandé de créer une API backend qui génère les sessions Stripe

## 💡 Fonctionnalités actuelles

✅ Paiement par carte bancaire
✅ Abonnements mensuels récurrents
✅ Paiement unique (tarif horaire)
✅ Interface Stripe Checkout sécurisée
✅ Support des cartes de test en mode développement
✅ Localisation française

## 🚀 Pour aller plus loin

### Backend recommandé (pour la production)

Pour plus de sécurité, créez une API backend qui :
1. Crée les sessions Stripe côté serveur
2. Gère les webhooks Stripe (confirmations de paiement)
3. Met à jour votre base de données après paiement

Exemple avec Node.js/Express dans le fichier `stripe.service.ts` (ligne 95).

### Webhooks Stripe

Configurez les webhooks pour être notifié :
- Quand un paiement réussit
- Quand un abonnement est annulé
- Quand un paiement échoue

Dashboard → Développeurs → Webhooks

## 📞 Support

- Documentation Stripe : [https://stripe.com/docs](https://stripe.com/docs)
- Dashboard : [https://dashboard.stripe.com](https://dashboard.stripe.com)
- Mode test : utilisez toujours des cartes de test (4242 4242 4242 4242)

## 🎨 Personnalisation

Vous pouvez personnaliser l'apparence de Stripe Checkout depuis :
Dashboard → Paramètres → Branding

- Logo
- Couleurs
- Nom de l'entreprise
