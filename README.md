# 🌟 Discord Server Theme Generator

A lightweight web tool that helps Discord users generate server themes based on popular aesthetics.
[Visit the Site](https://ctrlbandit.github.io/discord-theme-generator/)
Users can select or randomize aesthetics to get:
- Matching emoji sets
- Color palettes
- Pinterest search inspiration
- Theme combinations!

> Built with pure HTML, CSS, and JavaScript — no backend, no frameworks required.

---

## ✨ Features
- Pick one or multiple aesthetics from a dropdown.
- Randomly generate a server vibe with emojis and colors.
- Save and load custom theme presets.
- Copy results easily for server planning.
- Always-visible color palette generator.

---

## 🛠️ Contributing

This project is **open to contributions** — especially new aesthetics!  
Adding new aesthetics is an **easy, beginner-friendly task** —  
**tagged as `good first issue`** 💬

I welcome contributions such as:
- Adding new aesthetics (e.g., bloomcore, scenecore, kidcore)
- Expanding existing emoji sets
- Improving UI design and styling
- Enhancing color palette generation
- Bug fixes and new feature ideas

---

## 📚 How to Add a New Aesthetic (Good First Issue)

1. Open `/js/emoji-data.js`
2. Find the `const emojiThemes = { ... }` object.
3. Add a new entry for your aesthetic in the following format:

```javascript
yourtheme: ['emoji1', 'emoji2', 'emoji3', ...],
