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

## 9. User Manual

### 9.1 System Login and Frontend Interface Operation Guide

#### 9.1.1 System Login

1. **Accessing the Login Page**
   - Open your browser and enter the system URL
   - The system displays the login page with input fields: email and password

2. **Login Steps**
   - Enter your email address in the "Email" field
   - Enter your password in the "Password" field
   - Optional: Check "Remember me" to stay logged in
   - Click the "Sign In" button to submit login information

3. **Forgotten Password Process**
   - If you forget your password, click the "Forgot password" link
   - Enter your email address and submit
   - The system will send password reset instructions to your email
   - Check your email and follow the instructions to reset your password

4. **Password Reset Process**
   - Open the password reset email sent by the system
   - Click on the password reset link in the email
   - Set a new password that meets system security requirements:
     - At least 8 characters in length
     - At least one uppercase letter
     - At least one number
     - At least one special character
   - Confirm the new password and submit

#### 9.1.2 System Interface Navigation

1. **Main Navigation Areas**
   - Top navigation bar: Displays current page title, user information, and settings options
   - Left sidebar: Provides quick navigation to various system function blocks

2. **User Information and Settings**
   - Click the user avatar in the top-right corner to open the user menu
   - User information: Displays name, job title, and other personal information
   - Language settings: Choose the system interface language
   - Dark/light mode toggle: Adjust system display theme
   - Logout option: Safely exit the system

3. **Module Navigation and Switching**
   - Select different modules (solutions) from the left menu
   - The system displays accessible modules based on user permissions
   - Click the back arrow to return to the previous page
   - Click the grid icon to return to the solutions page

### 9.2 Main Feature Usage Flow Examples

#### 9.2.1 User Management Features

1. **Viewing User List**
   - Navigate to the user management page
   - Use the top toggle buttons to switch between admins, contacts, and groups
   - Use the search field to quickly find specific users
   - Use filters to filter by job title, role, etc.

2. **Adding a New User**
   - Click the "Add User" button
   - Fill in required information: name, email, phone, etc.
   - Select user type: administrator or general contact
   - If administrator, set roles and permissions
   - Assign the user's location
   - Upload a user avatar (optional)
   - Click the "Save" button to store the data

3. **Editing User Information**
   - Select the user to edit from the user list
   - Click the edit button next to the user details
   - Modify the necessary information
   - Click "Save changes" to apply the modifications

4. **Resetting User Password**
   - On the user details page, click the functions menu
   - Select "Send reset password email" or "Reset password" option
   - If direct reset, the system will generate a temporary password and display it
   - If sending reset email, the system will automatically send a password reset link to the user's email

5. **Deleting a User**
   - On the user details page, click the functions menu
   - Select the "Delete account" option
   - The system displays a confirmation window
   - Click the confirm button to complete the deletion

#### 9.2.2 Asset Management Features

1. **Viewing Asset List**
   - Navigate to the asset management page
   - Use search and filter functions to find specific assets

2. **Adding a New Asset**
   - Click the "Add Asset" button
   - Fill in asset information: name, serial number, etc.
   - Upload asset image (optional)
   - Assign asset location
   - Click save button

3. **Viewing Asset Details**
   - Click on any asset from the asset list
   - View detailed asset information: location, status, etc.
   - View asset-related records and operation history

4. **Editing Asset Information**
   - On the asset details page, click the "Edit asset" button
   - Modify asset information
   - Click save button to store changes

### 9.3 Parameter Settings and Management

#### 9.3.1 Personal Account Settings

1. **Viewing Personal Profile**
   - Click the user avatar in the top-right corner
   - View personal information summary

2. **Modifying Personal Information**
   - Navigate to the personal profile page
   - Click the "Edit User" button
   - Modify personal information
   - Click the save button

3. **Changing Password**
   - Navigate to the personal profile edit page
   - In the security section, enter your current password
   - Enter a new password (must meet password complexity requirements)
   - Re-enter the new password to confirm
   - Click the "Change" button to submit the changes

#### 9.3.2 System Settings

1. **Language Settings**
   - Click the user avatar in the top-right corner to open the dropdown menu
   - Select the "Language" option
   - Choose your desired language from the available language list
   - The system interface will immediately switch to the selected language

2. **Display Theme Settings**
   - Click the user avatar in the top-right corner to open the dropdown menu
   - Click the "Dark mode" toggle
   - Switch between system display modes (dark/light)

### 9.4 Exception Handling (Error Handling)

#### 9.4.1 Login Issue Handling

1. **Incorrect Account or Password**
   - System prompts "Incorrect email or password, please try again"
   - Check if the entered email address is correct
   - Ensure password capitalization is entered correctly
   - Try using the "Forgot password" function to reset password

2. **Account Locked**
   - If you enter an incorrect password multiple times, your account may be temporarily locked
   - Wait for the system-specified time before attempting to log in again
   - Or contact the system administrator to unlock your account

#### 9.4.2 Permission-Related Issues

1. **Limited Function Access**
   - If you attempt to access a function without permission, the system will display an insufficient permissions notice
   - Contact the system administrator to request necessary permissions

2. **Limited Resource Access**
   - If you cannot view certain resources or data, check your user role
   - Contact the system administrator to confirm your permission settings

#### 9.4.3 System Operation Errors

1. **Data Input Errors**
   - The system validates data when forms are submitted
   - Follow error prompts to correct input data
   - Ensure all required fields are filled in with the correct format

2. **Operation Timeout**
   - If network connection is unstable or system load is high during operations
   - Try refreshing the page and operating again
   - Confirm network connection is stable

3. **System Not Responding**
   - Check your network connection status
   - Try refreshing the page
   - Clear browser cache and try again
   - If the problem persists, contact system support

#### 9.4.4 Contacting Support

If you encounter issues that cannot be resolved on your own, please seek assistance through the following methods:
1. Contact the system administrator
2. Send an email to the support inbox
3. Submit a problem description through the system's built-in issue reporting function
