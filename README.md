# On React

Some **unstructured notes** and **example code** on React

# Basic Setup with Babel & Webpack 4

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

# React Concepts

## Components

Always prefer **composition over inheritance**.for components.

**Container components** don’t know their children ahead of time, for example generic boxes like dialogs:

```
    const Dialog = (props) => {
      return (
        <div>
          <div style={{background:"#eee"}} {...props} />
        </div>
      )
    }

    function App() {
      return (
        <div>
          <Dialog>Hello Dialog</Dialog>
        </div>
      )
    }
```

**Specialization** is achieved by composition, where a more *specific* component renders a more *generic* one and configures it with `props`:

```diff
-   const Dialog = (props) => {
+   const Dialog = ({title, ...props}) => {
      return (
        <div>
+         {title ? <h3>{title}</h3> : null}
          <div style={{background:"#eee"}} {...props} />
        </div>
      )
    }

+   const WelcomeDialog = props => {
+     return <Dialog title="Welcome" {...props} />
+   }

    function App() {
      return (
        <div>
-         <Dialog>Hello Dialog</Dialog>
+         <WelcomeDialog>Hello Welcome Dialog</WelcomeDialog>
        </div>
      )
    }
```

## JSX

Babel compiles JSX down to `React.createElement()` calls:

```jsx
const element = (
  <h1 className="greeting">Hello World</h1>
)
```

is identical to:

```javascript
const element = React.createElement('h1', {className: 'greeting'}, 'Hello World')
```

## State

**Always** use `setState` function to change state and **never** mutate it directly.

Execution of `setState` is **asynchronous**, so do not rely on it to update the state immediately.

`setState` can either take a **new state object** or **a function**. As second argument, it can also have an optional callback which is executed when the state is updated.

    state = { a: 1 }
    this.setState(state => ({a: state.a + 1}))

If your new `state` doesn't depend on the old `state`, then you can use the `this.setState(object)` construct.

If your new `state` depends on the old `state` then use `this.setState(function(currentState){ ... })` construct.

## Props

The difference between `state` and `props` is, that `state` is **owned by the component** itself while `props` is something that is passed down to the component by it's **parent**.

And the similarity (sort of) is that React **automatically re-renders** your component when either the component's `state` changes or when the component's `props` changes.

# Error Boundaries

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

# Testing React with Jest

First install **jest** test runner

    npm i -D jest
    npm i -D react-testing-library jest-dom
    npm i -D babel-jest babel-core@bridge

then add a jest configuration `jest.config.js` for **testing globals**:

    module.exports = {
      setupTestFrameworkScriptFile: '<rootDir>/testSetup.js'
    }

and create this referenced setup script `testSetup.js`:

    import 'jest-dom/extend-expect'
    import 'react-testing-library/cleanup-after-each'

and then create a **test file** matching this filename pattern `**/__tests__/**/*.js?(x),**/?(*.)+(spec|test).js?(x)`, e.g. `./src/App.test.js`

    import React from 'react'
    import { render } from 'react-testing-library'
    import App from './App'

    describe('App', () => {
      it('should render', () => {
        render(<App/>)
      })
    })

and run test with 

    nps test jest
    mpn t

## Tests with Dynamic Imports

For **dynamic imports**, we need **babel-plugin-dynamic-import-node**:

    npm i -D babel-plugin-dynamic-import-node

and a environment specific plugin setting in `.babelrc`:

```diff
    {
      presets: [
        "@babel/preset-env",
        "@babel/preset-react"
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import'
      ],
+     env: {
+       test: {
+         plugins: [
+           'dynamic-import-node'
+         ]
+       }
+     }
    }
```

# Main Concepts

TODO

# Refs

Refs provide a way to **access DOM nodes or React elements** created in the render method.

Refs are attached to React elements via the `ref` attribute.

Refs are either created by using `React.createRef()` and referenced with the `current` attribute of the ref or by simply using a callback pattern `el => this.myRef = el` and a referrenc of `myRef`.

The value of the ref depends on the type of node:

1. When the ref attribute is used on an **HTML element**, the ref receives the underlying **DOM element** as its current property. You can use the `ref` attribute inside a function component as long as you refer a DOM element.

2. When the ref attribute is used on a **custom class component**, the ref object receives the **mounted instance of the component** as its current. You can not use the `ref` attribute on function components.

### Example using the callback pattern

```jsx
class TextInput extends Component {
  componentDidMount() {
    this.textInput.focus()
  }
  render() {
    return (
      <input type="text" ref={el => this.textInput = el} />
    )
  }
}
```

### Example using createRef

```diff
    class TextInput extends Component {
+     textInput = React.createRef()
      componentDidMount() {
-       this.textInput.focus()
+       this.textInput.current.focus()
      }
      render() {
        return (
-         <input type="text" ref={el => this.textInput = el} />
+         <input type="text" ref={this.textInput} />
        )
      }
    }
```

# Render Props

The term **render prop** refers to a pattern for sharing code between React components using a **prop** whose value is a **function**.

### Example

Having a stateful component `WithState.jsx` which expects a function rendering this state

```jsx
const WithState = props => {
  const name = 'foobar'
  return (
    <div>
      {props.children(name)}
    </div>
  )
}
```

you can then use this component and implement non-dependent components which use this state like this

```jsx
const App = () => {
  return (
    <div>
      <WithState>
        {value => <Headline value={value}/>}
      </WithState>
      <WithState>
        {value => <Paragraph value={value}/>}
      </WithState>
    </div>
  )
}

const Headline = ({value}) => <h1>{value}</h1>
const Paragraph = ({value}) => <p>{value}</p>
```

This is analogue to a closure:

```javascript
const withState = fn => {
  const state = 'foobar'
  fn(state)
}

const app = () => {
  withState(value => {
    // do something with value
  })
}

```

# React Ecosystem

## React Router

**React Router** provides browser features like

1. browser should **change the URL** when you navigate to a different screen.

2. **Deep linking** should work.

3. The **browser back (and forward) button** should work like expected.

**React Router** provides two different kind of routes using the **History API**:

1. `BrowserRouter` which builds classic URLs like `https://application.com/dashboard`

2. `HashRouter` which builds URLs like `https://application.com/#/dashboard`

### Install

    npm install react-router-dom

### Components

1. `BrowserRouter`, usually aliased as `Router` wraps all your Route components

2. `Link` generate links to your routes

3. `Route` show - or hide - the components they contain

### BrowserRouter

A `<BrowserRouter>` component can only have one child element, hence wrapps the complete application.

```diff
    import React from 'react'
+   import { BrowserRouter as Router } from 'react-router-dom'

    export default () => {
      return (
+       <Router>
          <div>
            // Application
          </div>
+       </Router>
      )
    }
```

### Link

The `<Link>` component is used to trigger new routes.

```diff
    import React from 'react'
-   import { BrowserRouter as Router } from 'react-router-dom'
+   import { BrowserRouter as Router, Link } from 'react-router-dom'

    export default () => {
      return (
        <Router>
          <div>
            // Application
+           <nav>
+             <Link to={'/home'}>Home</Link>
+             <Link to={'/about'}>About</Link>
+           </nav>
          </div>
        </Router>
      )
    }
```

### Route

Anywhere that you want to only render content based on the location’s pathname, you should use a `<Route>` element.

```diff
    import React from 'react'
-   import { BrowserRouter as Router, Link } from 'react-router-dom'
+   import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
+   import { Home, About } from './Pages'

    export default () => {
      return (
        <Router>
          <div>
-           // Application
+           <main>
+             <Route exact path='/' component={Home} />
+             <Route path='/about' component={About} />
+           </main>
            <nav>
              <Link to={'/home'}>Home</Link>
              <Link to={'/about'}>About</Link>
            </nav>
          </div>
        </Router>
      )
    }
```

Without the `exact` attribute, `path='/'` would also match `/about`, since `/` is contained in the route.

Routes have three props that can be used to define what should be rendered when the route’s path matches. **Only one** should be provided to a `<Route>` element.

1. `component`: a React component.

2. `render`: a function that returns a React element.

3. `children`: a function that returns a React element. Unlike the prior two props, this will always be rendered, regardless of whether the route’s path matches the current location.

```jsx
<Route path='/page' component={Page} />

<Route path='/page' render={ props => (
  <Page {...props} data={extraProps}/>
)}/>

<Route path='/page' children={ props => (
  props.match ? <Page {...props}/> : <EmptyPage {...props}/>
)}/>
```

