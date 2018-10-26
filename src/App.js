import React from 'react';
import createUseConnect from './create-use-connect';

const useConnect = createUseConnect(
  (state) => ({ value: state.form.value }),
  (dispatch) => ({ setValue: (value) => dispatch({ type: 'SET_FORM_VALUE', payload: value }) })
)

const App = () => {
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

export default App;
