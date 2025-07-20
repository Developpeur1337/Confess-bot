# Confession Bot

![License](https://img.shields.io/badge/license-MIT-green)

## Description

**Confession Bot** est un bot Discord permettant aux utilisateurs d’envoyer des confessions anonymes en toute sécurité.

L’objectif est de créer un espace d’expression libre et confidentiel, où chaque membre peut partager ses pensées, histoires ou secrets sans être identifié.

Le processus est simple et intuitif :

- L’utilisateur lance la commande `/confession`.
- Il reçoit un message privé lui demandant d’envoyer sa confession.
- Une fois envoyée, le bot la publie anonymement dans le salon configuré à cet effet.

Le système bloque automatiquement toute tentative de publicité ou de spam, et alerte les modérateurs en cas de lien suspect.

Le bot utilise exclusivement des commandes slash (full slash commands) pour une meilleure intégration et ergonomie.

---

## Fonctionnalités principales

- Commande `/confession` entièrement anonyme.
- Réception de la confession en DM, avec délai de 5 minutes.
- Envoi dans un salon spécifique (configurable via `/channel`).
- Vérification anti-lien et système anti-pub automatique.
- Alertes dans un salon de logs si un message est suspect.
- Supporte les confessions texte et les images.

---

## Crédits & Contact

Développé par **Developpeur1337**  
Pour toute question, suggestion ou besoin de support, contacte-moi sur Discord : **@developpeur1337**

---

## Installation

1. Clone ce dépôt :

```bash
git clone https://github.com/Developpeur1337/Confess-bot.git
cd Confess-bot
npm install
node index.js
