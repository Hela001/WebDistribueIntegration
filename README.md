<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>WebDistribue Frontend</title>
</head>
<body>
  <h1>🧱 WebDistribue – Application Frontend</h1>

  <p>
    Ce dépôt contient la partie <strong>frontend</strong> de l’application <strong>WebDistribue</strong>, une plateforme web de gestion de chantiers développée par une équipe de 6 membres. 
    L’application repose sur une architecture <strong>microservices</strong> et permet la gestion complète des opérations liées aux projets de construction.
  </p>

  <h2>🔧 Microservices associés</h2>
  <ul>
    <li><strong>Service Utilisateur</strong> – Gestion des comptes, rôles et authentification</li>
    <li><strong>Service Matériel</strong> – Gestion de l’inventaire des équipements</li>
    <li><strong>Service Commande</strong> – Suivi et gestion des commandes</li>
    <li><strong>Service Facture</strong> – Génération et suivi des factures</li>
    <li><strong>Service Équipe</strong> – Organisation et affectation des équipes</li>
    <li><strong>Service Véhicule</strong> – Gestion des moyens de transport</li>
  </ul>

  <h2>🛠️ Technologies utilisées</h2>
  <ul>
    <li>Angular 16 (CLI 16.2.16)</li>
    <li>TypeScript</li>
    <li>Angular Material</li>
    <li>RxJS</li>
    <li>HTML / SCSS</li>
  </ul>

  <h2>🚀 Installation et exécution</h2>
  <ol>
    <li>Cloner le dépôt :
      <pre><code>git clone https://github.com/votre-repo/frontend-webdistribue.git</code></pre>
    </li>
    <li>Installer les dépendances :
      <pre><code>npm install</code></pre>
    </li>
    <li>Lancer le serveur de développement :
      <pre><code>ng serve</code></pre>
      L'application sera accessible sur <a href="http://localhost:4200">http://localhost:4200</a>
    </li>
  </ol>

  <h2>📁 Structure du projet</h2>
  <ul>
    <li><code>src/app</code> – Composants, services et modules de l'application</li>
    <li><code>src/assets</code> – Fichiers statiques</li>
    <li><code>environments</code> – Fichiers de configuration</li>
  </ul>

  <h2>✅ Tests</h2>
  <ul>
    <li><strong>Tests unitaires :</strong> <code>ng test</code> avec Karma</li>
    <li><strong>Tests end-to-end :</strong> <code>ng e2e</code> (nécessite un outil de e2e comme Cypress ou Protractor)</li>
  </ul>

  <h2>📌 Bonnes pratiques</h2>
  <ul>
    <li>Suivi des conventions Angular CLI</li>
    <li>Utilisation de composants modulaires et réutilisables</li>
    <li>Respect de la séparation des responsabilités (services, composants, interfaces)</li>
    <li>Gestion des erreurs et feedback utilisateur</li>
  </ul>

  <h2>📣 Contributions</h2>
  <p>
    Projet réalisé dans le cadre d’un travail universitaire par une équipe de 6 développeurs. 
    Toute contribution future doit respecter la structure existante et passer par une revue de code.
  </p>

  <hr>

  <p align="center">© 2025 WebDistribue – Tous droits réservés</p>
</body>
</html>
