import React, {useState, useEffect, useContext} from "react";
import { Redirect } from "react-router-dom";
import { Alert, Button, Row, Col, Input } from 'reactstrap';
import axios from 'axios';

import Header from "../d1-components/Header";
import { AuthContext } from "../context/auth";

import { api_url } from "../config";

function Login() {
    const [url, setUrl] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(0);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthToken }  = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(url)
                .then(result => {
                    if (result.data.meta.status === 200) {
                        console.log("Authorization success")
                        setAuthToken(result.data.data.token);
                        setLoggedIn(true);
                    } else {
                        console.log("Authorization failed")
                        setIsError(1);
                    }
                }).catch(e => {
                    setIsError(2);
                })
        };
        fetchData();

    }, [url]);

    if (isLoggedIn) {
        return <Redirect to="/objects" />;
    }

    return (
        <React.Fragment>
        <Header/>
            <Alert color="primary">
                Требуется авторизация
            </Alert>
        <div className="container-fluid" >
            <Row>
                <Col sm="5"></Col>
                <Col sm="2">
                <p>
                    <label htmlFor="login">Логин </label><br />
                    <Input type="text" name="login" id="login" value={userName} onChange={e => { setUserName(e.target.value); }}/>
                </p>
                <p>
                    <label htmlFor="pass">Пароль </label><br />
                    <Input type="password" name="pass" id="pass" value={password} onChange={e => { setPassword(e.target.value); }}/>
                </p>
                <p>
                    <Button color="primary" onClick={() => setUrl(`${api_url}/token?login=${userName}&pass=${password}&personal=1`)}>Войти</Button>
                </p>
                { console.log(isError) }
            { isError === 1 ? <Alert color="danger">Ошибка: неверный логин/пароль</Alert> : null}
                </Col>
                <Col sm="5"></Col>
            </Row>
        </div>
        </React.Fragment>
    );
}

export default Login;
