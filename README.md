# react-use-redux

Alternative Redux bindings with upcoming [React hooks](http://reactjs.org/hooks). 

Note: this is an experimental package and hooks are still a proposal/alpha. I do not recommend using this in production. You're probably better off using [react-redux](https://github.com/reduxjs/react-redux) for now.

## Installing

```
npm install react-use-redux
```

or 

```
yarn add react-use-redux
```

## Examples

Usage is very similar to what `react-redux` provides, except it uses hooks.


Firstly let's wrap our app with provider from `react-use-redux`:

```jsx
import { StoreContext } from 'react-use-redux';

const store = configureStore(/* ... */)

const AppWithStore = () => (
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
)
```

Now that we have that taken care of we can connect our functional components to Redux store:

```jsx
import { createUseConnect } from 'react-use-redux'

const useConnect = createUseConnect((state) => ({ user: state.user }))

const Profile = () => {
  const { user } = useConnect()

  return (
    <div>
      <div>Name: {user.name}</div>
      <div>Surname: {user.surname}</div>
    </div>
  )
}
```

And that's it! Now we can use redux state in our components without hocs or render props.

## API

### `StoreContext`

React context which has two properties: `Provider` and `Consumer`. Value provided to `<StoreContext.Provider />` should be an instance of Redux store. Use this as a top level wrapper of your app.

### `createUseConnect([mapStateToProps], [mapDispatchToProps], [mergeProps])`

Hook creator which returns `useConnect` hook to be used inside a component. Behaviour is almost identical to `connect` from `react-redux`. `useConnect` returns an object of props.

#### `mapStateToProps((state, ownProps) => object)`

Called everytime when store is updated. Used to calculate props from current state.

#### `mapDispatchToProps((dispatch, ownProps) => object)`

Used to wrap dispatch over provided functions. If `mapDispatchToProps` is not provided, it will fallback to returning `dispatch` to props.

#### `mergeProps((stateProps, dispatchProps, ownProps) => object)`

Used to tweak how props should be merged, this is an advanced property. When this function is not provided left-to-right merge is applied:
```js
(stateProps, dispatchProps, ownProps) => ({ ...stateProps, ...dispatchProps, ...ownProps })
```

## License

MIT
