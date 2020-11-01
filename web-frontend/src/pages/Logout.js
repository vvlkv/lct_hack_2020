import React, {useContext} from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

function Logout() {
    const { setAuthToken }  = useContext(AuthContext);
    setAuthToken();
    return <Redirect to="/" />;
}

export default Logout;
