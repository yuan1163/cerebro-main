`ui` is the set of UI components

### Common UI components

- `components` folder implements the set of common (atomic) UI components

Basic building blocks of matter, such as a button, input or a form label. They’re not useful on their own.
Grouping atoms together, such as combining a button, input and form label to build functionality.
Combining molecules together to form organisms that make up a distinct section of an interface (i.e. navigation bar)

- `templates` folder implements the set of layouts

Consisting mostly of groups of organisms to form a page — where clients can see a final design in place.

- `pages` folder implements the set of pages

An ecosystem that views different template renders. We can create multiple ecosystems into a single environment — the application.

All components above are independent of the application logic and can be used in any solution.

### Solutions specified components

- `ai` [folder](ai/README.md) implements IvedaAI solution specified compoments
- `cerebro` [folder](cerebro/README.md) implements IvedaRTLS solution specified compoments
- `connect` [folder](connect/README.md) implements SmartConnect solution specified compoments
- `utilus` [folder](utilus/README.md) implements IvedaUtilus solution specified compoments

see READMEs included for more details 
