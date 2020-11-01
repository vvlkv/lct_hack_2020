import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./context/auth";

function PrivateRoute({ component: Component, ...rest }) {
    const { authToken } = useContext(AuthContext);

    console.log(authToken);
    return (
        <Route
            {...rest}
            render={props =>
                authToken ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default PrivateRoute;
