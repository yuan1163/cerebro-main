App component
implements the `<App />` component and all the Context providers ("adapters"):

- `AppRoutes` impelements the root application router as entry point for all the subroutes

also app wrapped with
- `Wrapper` - provides the Google Maps API context
- `BrowserRouter` - provides the react-router-dom context

also app wrapped with
- `UIAdapter` folder implements `UIAdapter` - provides the UI context
- `DataAccessAdapter` folder implements `DataAccessAdapter` - provides the data access context
- `ThemeAdapter` folder implements `ThemeContextWrapper` - provides the theme context
