# React App Specification

## 4.1 React Project File Structure

```bash
src/
├─app/                      # routes and context providers
│  ├─AppRoutes
│  ├─DataAccessAdapter
│  ├─ThemeAdapter
│  ├─TranslationAdapter
│  └─UIAdapter
├─assets/
├─config/
├─constants/
├─core/
│  ├─api
│  ├─context
│  ├─hooks
│  ├─storages              # Data persistence and storage logic
│  ├─ui                    # UI components
│  └─utils                 # Utility functions and helpers
│      ├─mapbox            # mapbox style
│      └─translations      # Translation files for localization
├─solutions/               # solutions specified components
├─stories/
├─styles/                  # Global styles
└─main.tsx                 # Entry point for the React app
```

## 4.2 React Component Specifications

### Component Folder Structure

```
ComponentName/
├── index.tsx             # Main component file (default export)
├── styles.module.scss    # Scoped styles for the component
```

### Props Summary

```ts
type ComponentProps<T extends React.ElementType> = {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  variant?: string;
  size?: string;
  disabled?: boolean;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLElement>;
```

## 4.3 Router Configuration

This project uses **React Router v6** for client-side routing, managed via a central `AppRoutes` component. The routing logic is enriched with **MobX stores** (`auth`, `ui`) and dynamically generated based on the `solutions` array.

### Routing Entry Point

File: `src/app/AppRoutes/index.tsx`

- Uses `<Routes>` and `<Route>` from `react-router-dom`
- Observes global UI state with `mobx-react` and processes redirects
- Conditionally redirects to `/solutions` or `/login` based on authentication

### Route Guard (Auth)

```tsx
<Route path='/' element={<Navigate replace to={auth.isAuthenticated() ? '/solutions' : '/login'} />} />
```

- Authenticated users go to `/solutions`
- Unauthenticated users are redirected to `/login`

### Static Routes

| Path         | Component               | Purpose                      |
| ------------ | ----------------------- | ---------------------------- |
| `/login`     | `AuthLoginPage`         | Login interface              |
| `/reset`     | `AuthResetPage`         | Password reset form          |
| `/error`     | `ErrorPage`             | Generic error display        |
| `/solutions` | `SolutionsPage`         | Dashboard for solution links |
| `/cerebro`   | Redirect → `/solutions` | Legacy route handling        |

### Dynamic Routes from Solutions

The `solutions` array dynamically generates module routes:

```tsx
<Route path={`/${solution.url}/*`} element={<ModulesPage modules={solution.modules} />} />
```

- Each `solution` defines a unique `url` and `modules` to render
- Supports nested and wildcard routing (`*`)

### Command-Specific Routes

Nested command routes (e.g., `/utilus/command-x`) are generated with:

```tsx
<Route path={`/${solution.url}/${command.url}`} element={command.element} />
```

- Each `command` is defined under its respective `solution`
- Commands are expected to have `url`, `element`, and `id`

### UI Side Effects (MobX)

```tsx
useEffect(() => ui.process(navigate), [ui.redirect]);
```

- Uses global MobX `ui` store to handle side effects like redirects
- Reacts to changes in `ui.redirect` and updates navigation

## 4.4 API Integration Logic

This project uses a **modular API integration layer** located in the `src/core/api/` directory. The structure promotes separation of concerns by organizing API logic by entity (e.g., alerts, users, assets) under the `entities/` subfolder.

### Folder Structure Overview

```
api/
├── index.ts                # Central API entry point
├── types.ts                # Shared API type definitions
├── typesDesignSystem.ts    # Design system enums & theme tokens
└── entities/               # Modular APIs per domain/entity
```

### Integration Pattern

- API calls are made using `fetch`, `axios`, or an internal HTTP utility
- Each file under `entities/` exports functions related to a specific domain
- Types are centralized in `types.ts` and reused across calls

## 4.5 State Management with MobX

This project uses **MobX** for state management, following a modular and domain-specific store architecture. Stores are grouped under `src/core/storages/`, with additional feature-specific logic in the `controllers/` subdirectory.

### Store Directory Structure

```
storages/
├── async.ts           # Tracks loading states and pending actions
├── auth.ts            # Manages authentication state and user session
├── errors.ts          # Stores global error state for centralized handling
├── modals.ts          # Controls visibility of modal components
├── popovers.ts        # Handles positioning and open/close state of popovers
├── translation.ts     # Manages current language and i18n settings
├── ui.ts              # Global UI interactions (e.g., redirect handling)
├── controllers/       # Domain-specific MobX stores for app modules
│   ├── alerts.ts
│   ├── devices.ts
│   ├── comments.ts
│   └── ...
```

### Core Store Examples

#### `auth.ts`

Handles:

- User login session
- `isAuthenticated()` logic
- Storing logged-in user data

Common usage:

```ts
const auth = useAuth();
if (!auth.isAuthenticated()) navigate('/login');
```

#### `ui.ts`

Handles:

- UI-triggered redirects
- Toasts, banners, etc.

```tsx
useEffect(() => ui.process(navigate), [ui.redirect]);
```

### Integration with React

Stores are consumed via custom hooks:

```ts
const ui = useUI();
const modals = useModals();
```

And wrapped in observers when needed:

```tsx
export const AppRoutes = observer(() => {
  const auth = useAuth();
  ...
});
```

## 4.6 React and Node.js Versions

- React Version: v18.2.0
- Node.js Version: v22.14.0
