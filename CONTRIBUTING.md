# Contribuer à Opn Dashboard

Merci de votre intérêt pour **Opn Dashboard** 🎉 !

Ce projet est une application web en **HTML + JavaScript pur** permettant de créer un panneau d’affichage personnalisable (horloge, météo, widgets, etc).

Nous accueillons avec plaisir vos contributions : corrections, nouvelles fonctionnalités, documentation, ou idées d’amélioration.

---

## 🚀 Comment contribuer ?

### 1. Signaler un problème

* Vérifiez si le problème n’a pas déjà été signalé dans l’onglet [Issues]().
* Créez une nouvelle *issue* en décrivant :
  * le bug rencontré (avec captures si possible),
  * la version du navigateur / OS,
  * les étapes pour reproduire.

### 2. Proposer une amélioration

* Ouvrez une *issue* pour discuter de l’idée avant de coder.
* Décrivez le widget ou la fonctionnalité souhaitée et son intérêt.

### 3. Faire une Pull Request (PR)

1. **Forkez** le dépôt et créez une branche (`git checkout -b feature/ma-fonction`).
2. Développez vos changements dans du **JavaScript / HTML pur** (pas de frameworks lourds).
3. Respectez la structure existante du projet :
   * `/widgets` → widgets individuels,
   * `/assets` → images, icônes,
   * `/css` → styles,
   * `/js` → scripts.
4. Testez vos modifications sur plusieurs navigateurs.
5. Ouvrez une PR avec :
   * une description claire,
   * la référence à l’*issue* associée si existante,
   * éventuellement des captures d’écran.

---

## 🧹 Style de code

* Utilisez une indentation de  **2 espaces** .
* Nommez les fichiers en anglais et en minuscules (`clock.js`, `weather-widget.js`).
* Évitez les dépendances externes inutiles : le projet doit rester  **léger et portable** .
* Commentez le code si nécessaire pour expliquer la logique.

---

## ✅ Bonnes pratiques

* Ajoutez de la documentation si vous créez un widget.
* Favorisez du code **modulaire** (chaque widget dans son propre fichier).
* Vérifiez les performances : un tableau de bord doit rester fluide.
* Évitez le code dupliqué.

---

## 📜 Licence

En contribuant, vous acceptez que votre code soit publié sous la licence du projet (MIT).
