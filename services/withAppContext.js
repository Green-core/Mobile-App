import React from 'react';
import  AppContext  from './AppProvider';

export function withAppContext(Component) {
    console.log(Component)
    return function WrapperComponent(props) {
        return (
            <AppContext.Consumer>
                {state => <Component {...props} context={state} />}
            </AppContext.Consumer>
        );
    };
}