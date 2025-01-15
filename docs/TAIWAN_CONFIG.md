# Taiwan Config

- [DESIGN TOKENS GUIDE](https://github.com/ivedadigital/cerebro/blob/dev/docs/DESIGN_TOKENS_GUIDE.md)
- [MAPBOX GUIDE](https://github.com/ivedadigital/cerebro/blob/dev/docs/MAPBOX_GUIDE.md)

```bash
yarn add --dev cross-env
```

🚨 If you encounter any errors related to modules, try clearing your **yarn cache** completely and then remove the **node_modules** directory and **yarn.lock** file.

```js
// dev

"scripts": {
 "dev:taiwan": "cross-env VITE_STYLE=taiwan yarn sync-local-tokens && yarn transform-taiwan-tokens && yarn tokens && cross-env VITE_STYLE=taiwan vite"
}
```

```js
// build

"scripts": {
 "build:taiwan": "cross-env VITE_STYLE=taiwan yarn sync-local-tokens && yarn transform-taiwan-tokens && yarn tokens && cross-env VITE_STYLE=taiwan vite build --mode production"
}
```
