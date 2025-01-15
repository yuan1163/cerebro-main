# Design Tokens

See specific instructions in [TAIWAN_CONFIG.md](https://github.com/ivedadigital/cerebro/blob/dev/docs/TAIWAN_CONFIG.md)

## Project Setup

To set up the project environment, it is necessary to install the following dependencies:

```js
// package.json

dependencies: {
  "style-dictionary": "",
  "token-transformer": "",
  "tailwindcss-box-shadow": "",
  "tinycolor2": "",
}
```

🚨 If you encounter any errors related to modules, try clearing your **yarn cache** completely and then remove the **node_modules** directory and **yarn.lock** file.
_Additionally, don't forget to regularly update your dependencies to ensure that token modifications are processed correctly_.

```bash
# const stringWidth = require('string-width');

yarn cache clean --all
```

The project has a standard file structure. The design tokens are placed within the **styles** folder.

```bash
styles
├── tokens
│   ├── input
│   │   ├── baseTokens
│   │   │   ├── base
│   │   │   │   └── global.json
│   │   │   └── themes
│   │   │       ├── dark
│   │   │       │   └── dark.json
│   │   │       └── light
│   │   │           └── light.json
│   │   ├── taiwanTokens
│   │   │   ├── base
│   │   │   │   └── global.json
│   │   │   └── themes
│   │   │       ├── dark
│   │   │       │   └── dark.json
│   │   │       └── light
│   │   │           └── light.json
│   │   └── nobrandTokens
│   │       ├── base
│   │       │   └── global.json
│   │       └── themes
│   │           ├── dark
│   │           │   └── dark.json
│   │           └── light
│   │               └── light.json
│   └── output
│       ├── dark.json
│       ├── global.json
│       └── light.json
├── dark.css
├── global.css
├── index.css
└── light.css
```

The **build.js** file, which runs Style Dictionary, is located in the **scripts** folder.

```bash
├── scripts
│   ├── tokens
│   │   ├── build.js
│   │   └── fns.js
│   │   └── syncLocalTokens.js
```

## Design Tokens Processing

The Figma project is synchronized with the repository, and when the designer pushes any changes, that triggers a pipeline, which transforms raw data into CSS variables.

Design Token files must go through several transformation steps to return valid style sheets. The [token-transformer utility](https://github.com/tokens-studio/figma-plugin/tree/main/token-transformer) replaces the references with calculated values so that the JSON object conforms to the Style Dictionary standards. The **--expandTypography** option can be used to convert every font-related property into an individual object.

```js
// package.json

"scripts": {
  "transform-tokens-dark": "npx token-transformer src/styles/tokens/input/baseTokens/themes/dark src/styles/tokens/output/dark.json",
  "transform-tokens-global": "npx token-transformer src/styles/tokens/input/baseTokens/base src/styles/tokens/output/global.json --expandTypography",
  "transform-tokens-light": "npx token-transformer src/styles/tokens/input/baseTokens/themes/light src/styles/tokens/output/light.json",
  "transform-tokens": "yarn transform-tokens-dark && yarn transform-tokens-global && yarn transform-tokens-light",
  "sync-local-tokens": "node scripts/tokens/syncLocalTokens.js",
  "tokens": "node src/styles/script/build.js",
}
```

### Branded Tokens

If your project requires modifications to the current colors of the design system, it's recommended to apply the **synchronization** script for taiwan/nobrand tokens. In this process, the **fs** module is responsible for reading and writing token files, while **deepMerge** ensures their precise combination, including the processing of nested structures.

After every launch, the file will synchronize with the base tokens **each time**. This means that any changes or updates made to the base tokens will be reflected in your project's design tokens automatically, ensuring that your design system remains consistent and up-to-date with the foundational styles.

**Basic tokens** - the foundation of the design system, stored in the folder:

```bash
src/styles/tokens/input/baseTokens
```

**Taiwan tokens** - specific changes for the project, located in the folder:

```bash
src/styles/tokens/input/taiwanTokens
```

**Nobrand tokens** - specific changes for the project, located in the folder:

```bash
src/styles/tokens/input/nobrandTokens
```

The synchronization process includes the following steps:

1. Make changes to the taiwan/nobrand tokens located in the taiwanTokens/nobrandTokens folder. For example, you might only change the token value for the border color. Note that when modifying tokens for the light theme, similar adjustments must also be made to the dark theme.

🚨 _Please use the colors that are already provided by the [Design System](https://github.com/ivedadigital/storybook)._

```json
{
  "color": {
    "border": {
      "default": {
        "value": "rgba({color.red.500}, 0.5)",
        "type": "color"
      }
    }
  }
}
```

2. Run the update script using the command

```bash
yarn dev:taiwan
yarn build:taiwan
```

```bash
yarn dev:nobrand
yarn build:nobrand
```

The script will analyze the changes in the taiwan/nobrand tokens, merge them with the base ones, and generate updated token files for each theme and global settings in the output directory.

After running the synchronization script, execute the token processing script, which will create three files in the style folder used by the Tailwind CSS configurator. This will ensure the successful integration of your updated tokens with the Tailwind system.

In dev mode, you'll see the variables in the file change as follows:

```js
// base

"value": "rgba({color.neutral.900}, 0.1)" // input > light.json
"value": "#1e24291a" // output > light.json
--color-border-default: hsla(207, 15%, 14%, 0.1) // light.css

"value": "rgba({color.neutral.900}, 0.12)" // input > dark.json
"value": "#f4f4f51f" // output > dark.json
--color-border-default: hsla(240, 5%, 96%, 0.12) // dark.css

// taiwan

"value": "rgba({color.red.500}, 0.5)" // input > light.json
"value": "#f5563d80" // output > light.json
 --color-border-default: hsla(8, 90%, 60%, 0.5) // light.css

"value": "rgba({color.red.500}, 0.9)" // input > dark.json
"value": "#f35b44e6" // output > dark.json
--color-border-default: hsla(8, 88%, 61%, 0.9) // dark.css
```

When you build the project, the file in the dist folder will show:

```js
// dist > assets > index.css

// base

--color-border-default: hsla(207, 15%, 14%, .1); // light
--color-border-default: hsla(240, 5%, 96%, .12); // dark

// taiwan

--color-border-default: hsla(8, 90%, 60%, .5); // light
--color-border-default: hsla(8, 88%, 61%, .9); // dark
```

### Global Style Settings

In **global.json** file, we've established a foundational set of design variables that are essential across the entire project. This includes crucial aspects like typography, size and z-index.

Style Dictionary allows us to define functions and then to modify input values. For example, you can specify the letter-spacing property in ems.

```js
// build.js

function transformLetterSpacing(value) {
  if (value.endsWith('%')) {
    const percentValue = value.slice(0, -1);
    return `${percentValue / 100}em`;
  }
  return value;
}

StyleDictionaryPackage.registerTransform({
  name: 'size/letterspacing',
  type: 'value',
  transitive: true,
  matcher: (token) => token.type === 'letterSpacing',
  transformer: (token) => transformLetterSpacing(token.value),
});
```

### Themed Styles

Dark and Light mode definitions.

In **dark.json** and **light.json** files, we focus on theme-specific styles, primarily defining colors and shadows tailored for dark and light modes.

The transform function can combine the number of parameters that define the appearance of a box-shadow into a CSS variable. The resulting value can be used in the theme configuration file after installing the [tailwindcss-box-shadow](https://www.npmjs.com/package/tailwindcss-box-shadow) plugin.

```js
// tailwind.config.js

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {},
  plugins: [require('tailwindcss-box-shadow')],
};
```

```js
// build.js

StyleDictionaryPackage.registerTransform({
  name: 'shadow/css',
  type: 'value',
  transitive: true,
  matcher: (token) => token.type === 'boxShadow',
  transformer: (token) => {
    const shadow = Array.isArray(token.value) ? token.value : [token.value];
    const value = shadow.map((s) => {
      const { x, y, blur, spread, color } = s;
      return `${x}px ${y}px ${blur}px ${spread}px ${tinycolor(color).toHslString()}`;
    });
    return value.join(', ');
  },
});
```

### Color Modifiers

Tokens Studio uses **modifiers** for fine-tuning color tokens, including lightening, darkening, mixing, and adjusting opacity. By creating transformers like color/hslAdjust in Style Dictionary, we can adapt tokens, darkening colors by a specified percentage and returning the result in HSL format. This approach allows for dynamic visual changes in interface elements, for example, darkening the hover token by 27% when the user hovers over it.

```js
// light.json

"hover": {
  "value": "{color.blue.500}",
  "type": "color",
  "$extensions": {
  "studio.tokens": {
    "modify": {
      "type": "darken",
      "value": "0.27",
      "space": "hsl"
      }
    }
  }
}
```

```js
// build.js

function resolveTokenValue(token, dictionary) {
  if (typeof token.value === 'string' && token.value.startsWith('{') && token.value.endsWith('}')) {
    const resolvedToken = dictionary.getReferences(token.value);
    return resolvedToken ? resolvedToken.value : token.value;
  }
  return token.value;
}

function transformHSL(token, dictionary) {
  const resolvedValue = resolveTokenValue(token, dictionary);
  let color = tinycolor(resolvedValue);
  const modification = token.$extensions?.['studio.tokens']?.modify;
  if (modification && modification.type === 'darken') {
    color = color.darken(parseFloat(modification.value) * 100);
  }
  if (modification && modification.type === 'lighten') {
    color = color.lighten(parseFloat(modification.value) * 100);
  }
  return color.toHslString();
}

StyleDictionaryPackage.registerTransform({
  name: 'color/hslAdjust',
  type: 'value',
  matcher: (token) => token.type === 'color' && token.$extensions,
  transformer: (token, dictionary) => transformHSL(token, dictionary),
});
```

### Theme

Finally, during the building process, a set of CSS variables will be created. Style Dictionary will add selectors to style sheets as a combination of a **:root** pseudo-class and a themed class. These can be used later to swap from light to dark mode.

```js
// build.js

files: [
  {
    destination: `${theme}.css`,
    format: 'css/variables',
    selector: `:root.${theme}`,
  },
];
```

The Tailwind configuration file stores the object that represents the current theme. And Design Tokens can be attached to component styles through **CSS variables**. Thus, we can update the external presentation of the UI by changing the values of the **tailwind.config.js**.

```js
// tailwind.config.js

theme: {
  colors: {
    primary: {
      DEFAULT: 'var(--color-primary-default)';
    }
  }
}
```

To maintain consistency in UI design, we created a **ThemeProvider** component and placed it at the top-level of the React tree. That wrapper uses the **Context API** to pass the current theme data down to child components.

```tsx
// App.tsx

export const App = () => <ThemeContextWrapper>{/* children */}</ThemeContextWrapper>;
```
