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
      plugins: ["react", "jsx-a11y"],
      rules: {
        "react/prop-types": ["warn"]
      },
      extends: ["eslint:recommended", "plugin:react/recommended", "plugin:jsx-a11y/recommended"],
      env: {
        browser: true,
        node: true,
        es6: true
      }
    }


