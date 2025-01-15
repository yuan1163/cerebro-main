# Cerebro Dashboard

Cerebro is the DX solutions automation system for IoT and Smart Cities management - [https://cerebro.iveda.ai](https://cerebro.iveda.ai/)

## Tech Stack

Uses [Vite](https://vitejs.dev/) as the builder, `index.html` as the app page, `src/main.tsx` as the root module.

- Language: Typescript 4.x
- Framework: React 18.x
- State management: MobX 6.x

The Project uses [Prettier](https://prettier.io/) for code formatting. File `.prettierrc.json` contains the configuration.

### Install Dependencies

Prepare project for the local development.

```bash
yarn install
```

### Available Scripts

Runs the app in the development mode.Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

```bash
yarn dev
```

Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed.

```bash
yarn build
```

Builds and runs the app in the production mode.\
Open [http://localhost:4173](http://localhost:4173) to view it in the browser.

```bash
yarn preview
```

## Source Code

### Folders

`.` - config files\
`src` - source code

See [src/README.md](src/README.md) for more details.

### Aliases

Please use aliases for imports:

- @app for `./src/app`; see [src/app/README.md](src/app/README.md) for more details.
- @core for `./src/core`; see [src/core/README.md](src/core/README.md) for more details.
- @solutions for for `./src/solutions`; see [src/solutions/README.md](src/solutions/README.md) for more details.

## Development Flow

The Project uses Git version control system. The main branch is `main` and the development branch is `dev`.

Each new feature should reside in its own branch, which can be pushed to the central repository for backup/collaboration following the next flow:

1. Create feature branch using `dev` as its parent branch.
1. When you ready to begin the process of merging new code changes with the project repository, open a pull request (merge request) with `dev` branch.
1. After team's review and approval, the code is merged into `dev` branch.

When the `dev` branch is ready for release, it is merged into `main` branch to deploy. Features should never interact directly with `main`.

## Dependencies

### Libraries

Core libraries used within the project:

- [Headless UI](https://headlessui.dev/)
- [react-popper](https://popper.js.org/react-popper/)
- [SimpleBar](https://github.com/Grsmto/simplebar)
- [Swiperjs](https://swiperjs.com/)

### Data Collections

- [Moment](https://momentjs.com/)
- [Moment Timezone](https://momentjs.com/timezone/)

### Visual Theme

Read more about [Design System](DesignSystemREADME.md).

- [TailwindCSS](https://tailwindcss.com/) framework as the set of great mixins so it needs `"scss.lint.unknownAtRules": "ignore"` setting in VSCode IDE to use `@apply`, `@theme` etc...
- [tailwindcss-box-shadow](https://www.npmjs.com/package/tailwindcss-box-shadow)
- [Tokens Studio for Figma](https://docs.tokens.studio/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/#/)
- [token-transformer](https://www.npmjs.com/package/token-transformer)
- [tinycolor2](https://www.npmjs.com/package/tinycolor2)

### Localization

1. Integrate Translation Utility to the File.

Insert the following import at the beginning of your file:

```bash
import { t } from '@core/utils/translate';
```

2. Add Key, Value, and Description.

Before proceeding, it's recommended to check if a similar key or value already exists in the en.json file.

Navigate to:

```bash
@core > utils > translations > en.json

"general": {
   "nextButton": {
       "label": {
           "translation": "Next",
           "notes": "Next button or link."
       }
   }
}
```

Use in your components as:

```bash
aria-label='Next'
aria-label={t('general.nextButton.label', 'Next', 'Next button or link.')}
```

For general/common values, we prefer using the general prefix.

3. Run the Script.

Execute the following command:

```bash
yarn i18n
```

4. Upload the Generated en.json File to the Translation Service.

Navigate to [Lokalise](https://app.lokalise.com/projects) website. Go to:

```bash
DX Solutions > Upload
```

And upload your file.

5. Downloading the Files

From the list, select the format Structured JSON (.json).

After downloading, place the files in the following directory:

```bash
@core > utils > translations

zh_CN.json
zh_TW.json
vi.json
```
