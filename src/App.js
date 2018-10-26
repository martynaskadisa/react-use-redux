import React from 'react';
import createUseConnect from './create-use-connect';
import StoreContext from './context';
import store from './store';

const useConnect = createUseConnect(
  (state) => ({ value: state.form.value }),
  (dispatch) => ({ setValue: (value) => dispatch({ type: 'SET_FORM_VALUE', payload: value }) })
)

const Form = () => {
  const { value, setValue } = useConnect()

  const handleChange = (e) => setValue(e.target.value);

  return (
    <form>
      <label>
        Name:
        <input value={value} onChange={handleChange} />
      </label>
    </form>
  )
}

const App = () => (
  <StoreContext.Provider value={store}>
    <Form />
  </StoreContext.Provider>
)

export default App;
