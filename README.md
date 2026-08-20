# React + Vite

This project is a React application built with **Vite**, providing a fast and modern development environment with **Hot Module Replacement (HMR)** and ESLint support.

## Tech Stack

* **React** — UI library for building component-based interfaces.
* **Vite** — Fast development server and build tool.
* **ESLint** — Helps identify and prevent code-quality issues.
* **JavaScript/TypeScript** — Depending on the project's configured template.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

The application will be available at the local URL provided by Vite, typically:

```text
http://localhost:5173
```

### 3. Create a Production Build

```bash
npm run build
```

### 4. Preview the Production Build

```bash
npm run preview
```

### 5. Run ESLint

```bash
npm run lint
```

## Vite React Plugins

This project can use either of the official React plugins:

* **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)** — Uses Oxc for React support and transformation.
* **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)** — Uses SWC for fast compilation.

The specific plugin used depends on the project's Vite configuration.

## React Compiler

The **React Compiler** is not enabled by default in this template because it can have an impact on development and build performance.

If compiler support is required, follow the official [React Compiler installation documentation](https://react.dev/learn/react-compiler/installation).

## ESLint Configuration

For production applications, it is recommended to use **TypeScript** together with type-aware ESLint rules.

For more information, see the [Vite React TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) and [typescript-eslint](https://typescript-eslint.io/).

## Project Structure

A typical project structure looks like:

```text
src/
├── assets/
├── components/
├── App.jsx
├── main.jsx
└── index.css

public/
package.json
vite.config.js
eslint.config.js
README.md
```

The exact structure may vary depending on the features implemented in the project.

## Development Guidelines

* Keep components small and reusable.
* Use meaningful names for components, variables, and functions.
* Keep business logic separate from presentation logic where appropriate.
* Follow ESLint rules and resolve linting issues before committing code.
* Avoid unnecessary state and keep state as close as possible to the components that use it.
* Use appropriate React patterns such as props, Context API, and reducers when required by the application.

## Useful Commands

| Command           | Purpose                      |
| ----------------- | ---------------------------- |
| `npm install`     | Install project dependencies |
| `npm run dev`     | Start development server     |
| `npm run build`   | Create production build      |
| `npm run preview` | Preview production build     |
| `npm run lint`    | Run ESLint                   |

## References

* [React Documentation](https://react.dev/)
* [Vite Documentation](https://vite.dev/)
* [React Compiler Documentation](https://react.dev/learn/react-compiler/installation)
* [TypeScript ESLint](https://typescript-eslint.io/)
* [Vite React Templates](https://github.com/vitejs/vite/tree/main/packages/create-vite)
