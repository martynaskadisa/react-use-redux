import { useState, useEffect } from "react";
import store from "./store";

const defaultMapStateToProps = () => ({});
const defaultMapDispatchToProps = dispatch => dispatch;
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
  const { getState, dispatch, subscribe } = store;

  const getProps = () => {
    return mergeProps(
      mapStateToProps(getState(), ownProps),
      mapDispatchToProps(dispatch, ownProps)
    );
  };

  const [state, setState] = useState(getProps());

  useEffect(() => subscribe(() => setState(getProps())));

  return state;
};

export default createUseConnect;
