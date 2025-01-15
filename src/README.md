The source code

- `main.tsx` file is the entry point of source code

- `app` [folder](app/README.md) implements the `<App />` component and all the Context providers ("adapters")

- `core` [folder](core/README.md) contains all the core logic: API connectors, state managers, all the common (basic) UI components and utils

- `solutions` [folder](solutions/README.md) contains Solutions specified components

- `assets` folder contains all the static assets

- `styles` folder contains all the global styles

see docs included for more details [folder](docs/)

🚨 If you encounter any errors related to modules, try clearing your **yarn cache** completely and then remove the **node_modules** directory and **yarn.lock** file.

```
// const stringWidth = require('string-width');

yarn cache clean --all
```
