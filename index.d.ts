import {
    Component,
    ComponentClass,
    ComponentType,
    StatelessComponent
} from 'react';
import {
    Action,
    Dispatch
} from 'redux';

type NullOrUndefined = null | undefined;
type Optional<T> = T | NullOrUndefined;

interface MapStateToPropsFactory<IStateProps, IOwnProps, IState> {
    (state: IState, ownProps: IOwnProps): MapStateToProps<IStateProps, IOwnProps, IState>;
}

interface MapDispatchToPropsFactory<IDispatchProps, IOwnProps> {
    (dispatch: Dispatch<Action>, ownProps: IOwnProps): MapDispatchToProps<IDispatchProps, IOwnProps>;
}

interface MapStateToProps<IStateProps, IOwnProps, IState> {
    (state: IState, ownProps: IOwnProps): IStateProps;
}
type MapDispatchToProps<IDispatchProps, IOwnProps> =
    MapDispatchToPropsFunction<IDispatchProps, IOwnProps> | IDispatchProps;

interface MapDispatchToPropsFunction<IDispatchProps, IOwnProps> {
    (dispatch: Dispatch<Action>, ownProps: IOwnProps): IDispatchProps;
}

type MapStateToPropsParam<IStateProps, IOwnProps, IState> =
    MapStateToPropsFactory<IStateProps, IOwnProps, IState> |
    MapStateToProps<IStateProps, IOwnProps, IState> |
    NullOrUndefined;

type MapDispatchToPropsParam<IDispatchProps, IOwnProps> =
    MapDispatchToPropsFactory<IDispatchProps, IOwnProps> |
    MapDispatchToProps<IDispatchProps, IOwnProps>;

interface MergeProps<IStateProps, IDispatchProps, IOwnProps> {
    (stateProps: IStateProps, dispatchProps: IDispatchProps, ownProps: IOwnProps)
}


type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type GetProps<C> = C extends ComponentType<infer P> ? P : never;


type Matching<IInjectedProps, DecorationTargetProps> = {
    [P in keyof DecorationTargetProps]: P extends keyof IInjectedProps
        ? IInjectedProps[P] extends DecorationTargetProps[P]
            ? DecorationTargetProps[P]
            : IInjectedProps[P]
        : DecorationTargetProps[P];
};

type Shared<
    InjectedProps,
    DecorationTargetProps extends Shared<InjectedProps, DecorationTargetProps>
    > = {
        [P in Extract<keyof InjectedProps, keyof DecorationTargetProps>]?: InjectedProps[P] extends DecorationTargetProps[P] ? DecorationTargetProps[P] : never;
    };

type ConnectedComponentClass<C, P> = ComponentClass<JSX.LibraryManagedAttributes<C, P>> & {
    WrappedComponent: C;
}

export interface ComponentWithProps<IInjectedProps, INeedsProps> {
    <C extends ComponentType<Matching<IInjectedProps, GetProps<C>>>>(
        component: C
    ): ConnectedComponentClass<C, Omit<GetProps<C>, keyof Shared<IInjectedProps, GetProps<C>>> & INeedsProps>
}


export interface CreateUseConect {
    <IStateProps, IDispatchProps, IOwnProps, IState>(
        mapStateToProps: MapStateToPropsParam<IStateProps, IOwnProps, IState>,
        mapDispatchToProps: NullOrUndefined,
        mergeProps: NullOrUndefined
    ): ComponentWithProps<IStateProps & IDispatchProps, IOwnProps>

    <IStateProps, IDispatchProps, IOwnProps, IState>(
        mapStateToProps: NullOrUndefined,
        mapDispatchToProps: MapDispatchToPropsParam<IDispatchProps, IOwnProps>,
        mergeProps: NullOrUndefined
    ): ComponentWithProps<IStateProps & IDispatchProps, IOwnProps>

    <IStateProps, IDispatchProps, IOwnProps, IState>(
        mapStateToProps: MapStateToPropsParam<IStateProps, IOwnProps, IState>,
        mapDispatchToProps: MapDispatchToPropsParam<IDispatchProps, IOwnProps>,
        mergeProps: NullOrUndefined
    ): ComponentWithProps<IStateProps & IDispatchProps, IOwnProps>

    <IStateProps, IDispatchProps, IOwnProps, IState>(
        mapStateToProps: MapStateToPropsParam<IStateProps, IOwnProps, IState>,
        mapDispatchToProps: MapDispatchToPropsParam<IDispatchProps, IOwnProps>,
        mergeProps: MergeProps<
            Optional<IStateProps>, 
            Optional<IDispatchProps>,
            Optional<IOwnProps>
        >
    ): ComponentWithProps<IStateProps & IDispatchProps, IOwnProps>
}

export declare const createUseConnect: CreateUseConect;