# On React

Notes on React

## Basic Setup with Babel & Webpack 4

    npm i react react-dom
    npm i -D @babel/core @babel/preset-env @babel/preset-react
    npm i -D babel-loader webpack webpack-cli webpack-dev-server

Create `webpack.config.js`:

    module.exports = {
      entry: './src/index.js',
      output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
      },
      resolve: {
        extensions: ['*', '.js']
      },
      devServer: {
        contentBase: './dist'
      }
    };

Create an entry file `src/index.js`:

    import React from 'react'
    import ReactDOM from 'react-dom'
    import App from './app'

    ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('app'))

Create `.babelrc`:

    {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
      ]
    }

In order to support ES6/7/8 features, add further babel plugins, like e.g.

    npm i -D @babel/plugin-proposal-class-properties

```diff
    {
      "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
+     plugins: [
+       '@babel/plugin-proposal-class-properties'
+     ]
    }
```

Start Development Server

    webpack-dev-server --mode development

or

    npm start

## ESLint

    npm i -D babel-eslint eslint eslint-loader eslint-plugin-react

Add `eslint-loader` to Webpack Config:

```diff
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
-            use: ['babel-loader']
+            use: ['babel-loader', 'eslint-loader']
          }
        ]
      },
```

and add a ESLint configuration `.eslintrc`:

    {
      parser: "babel-eslint",
      plugins: ["react"],
      rules: {
        "react/prop-types": ["warn"]
      },
      extends: ["eslint:recommended", "plugin:react/recommended"],
      env: {
        browser: true,
        node: true,
        es6: true
      }
    }

## Accessibility (a11y) in React

Lint and audit for Accessibility issues using **ESLint** and **React-axe**.

First install

    npm i -D eslint-plugin-jsx-a11y react-axe

then extend `.exlintrc` configuration

```diff
    {
      parser: "babel-eslint",
-     plugins: ["react"],
+     plugins: ["react", "jsx-a11y"],
      rules: {
        "react/prop-types": ["warn"]
      },
-     extends: ["eslint:recommended", "plugin:react/recommended"],
+     extends: ["eslint:recommended", "plugin:react/recommended", "plugin:jsx-a11y/recommended"],
      env: {
        browser: true,
        node: true,
        es6: true
      }
    }
```

and add in your **entry file** a call to `axe()` for **development only**. Audit runs in the browser and results will show in the Chrome DevTools console.

```diff
    import React from 'react'
    import ReactDOM from 'react-dom'
    import App from './App'

+   if (process.env.NODE_ENV === 'development') {
+     const axe = require('react-axe')
+     axe(React, ReactDOM, 1000)
+   }
    ReactDOM.render(<App />, document.getElementById('app'))
```

## Error Boundaries

A JavaScript error in a part of the UI shouldn’t break the whole app. `try / catch` only works for **imperative** code, however React components are **declarative** and specify **what** should be rendered.

**Error boundaries** preserve the declarative nature of React.

First create a Error boundary component `./src/`

    import React from 'react'
    export default class DefaultErrorBoundary extends React.Component {
      state = { hasError: false }
      static getDerivedStateFromError() {
        return { hasError: true }
      }
      render() {
        const { hasError } = this.state
        const { children } = this.props
        return hasError ? <div>Something went wrong</div> : children
      }
    }

Then wrap your component or app with it, e.g. like this:

```diff
    import React from 'react'
    import ReactDOM from 'react-dom'
+   import DefaultErrorBoundary from './DefaultErrorBoundary'
    import App from './App'

    ReactDOM.render(
      <React.StrictMode>
+       <DefaultErrorBoundary>
          <App />
+       </DefaultErrorBoundary>
      </React.StrictMode>,
      document.getElementById('app'))
```

React doesn’t need error boundaries to recover from errors in **event handlers**. Unlike the render method and lifecycle methods, the event handlers don’t happen during rendering. So if they throw, React still knows what to display on the screen. 
If you need to catch an error inside event handler, use the regular JavaScript `try / catch` statements.

