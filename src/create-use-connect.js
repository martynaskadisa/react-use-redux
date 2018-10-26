import { useContext, useState, useEffect } from "react";
import StoreContext from "./context";

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
  const { getState, dispatch, subscribe } = useContext(StoreContext);

  const getProps = () =>
    mergeProps(
      mapStateToProps(getState(), ownProps),
      mapDispatchToProps(dispatch, ownProps)
    );

  const [state, setState] = useState(getProps());

  useEffect(() => subscribe(() => setState(getProps())));

  return state;
};

export default createUseConnect;
