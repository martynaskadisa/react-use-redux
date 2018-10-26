import { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

const defaultMapStateToProps = () => ({});
const defaultMapDispatchToProps = dispatch => ({ dispatch });
const defaultMergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps
});

const createUseConnect = (
  mapStateToProps = defaultMapStateToProps,
  mapDispatchToProps = defaultMapDispatchToProps,
  mergeProps = defaultMergeProps
) => ownProps => {
  const store = useContext(StoreContext);
  const { getState, dispatch, subscribe } = store;

  const getProps = () =>
    mergeProps(
      mapStateToProps(getState(), ownProps),
      mapDispatchToProps(dispatch, ownProps)
    );

  const [state, setState] = useState(getProps());

  useEffect(() => subscribe(() => setState(getProps())), [store]);

  return state;
};

export { StoreContext, createUseConnect };
