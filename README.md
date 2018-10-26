# react-use-redux

Redux binding for upcoming React hooks


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

- `StoreContext`

  React context which has two properties: `Provider` and `Consumer`. 

- `createUseConnect([mapStateToProps], [mapDispatchToProps], [mergeProps])`

  Hook creator, which returns actual hook to be used inside a component.
