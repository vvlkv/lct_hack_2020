import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import {TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, UncontrolledAlert, Table} from 'reactstrap';
import { HouseFill, Person } from 'react-bootstrap-icons';
import classnames from 'classnames';
import axios from 'axios';

import Header from "../d1-components/Header";

import ProviderInfo from "../platex-components/ProviderInfo";

import { AuthContext } from "../context/auth";
import { api_url } from "../config";

export function ObjectsList(props) {
    return (
        <Row>
            <Col sm="10">
                <React.Fragment>
                    <Table style={{ margin: '1em' }} size="sm" bordered>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th className="c">Застройщик</th>
                            <th className="c">Адрес</th>
                            <th className="c">Добавлен</th>

                        </tr>
                        </thead>
                        <tbody>
                        {props.data.map(object => (
                            <tr>
                                <td className="c">{object.id}</td>
                                <td><Link to={`/openobject/${object.id}`}>{object.name}</Link></td>
                                <td className="c">{object.company_name}</td>
                                <td className="c">{object.address_str}</td>
                                <td className="c">{object.begin_dt}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </React.Fragment>
            </Col>
        </Row>

    );
}

export default function OpenProvider() {
    const { id } = useParams();

    const [addBillCount, setAddBillCount] = useState(0);

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const { authToken } = useContext(AuthContext);

    /* Информация об провайдере */
    const [providerData, setProviderData] = useState(  []);
    const [providerUrl, setProviderUrl] = useState(
        `${api_url}/companies?_tkn=${authToken}&_debug=1&filters[id-a]=${id}`,
    );
    const [isProviderDataLoaded, setIsProviderDataLoaded] = useState(false);
    const [isProviderDataError, setIsProviderDataError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsProviderDataError(false);
            await axios.get(providerUrl)
                .then(result => {
                    console.log(result);
                    setProviderData(result.data.data);
                    setIsProviderDataLoaded(true);
                }).catch(e => {
                    setIsProviderDataError(true);
                });
        };
        fetchData();
    }, [providerUrl]);

    /* Информация об объекте */
    const [objectData, setObjectData] = useState(  []);
    const [objectUrl, setObjectUrl] = useState(
        `${api_url}/api_objects?_tkn=${authToken}&_debug=1&filters[company_id-a]=${id}`,
    );
    const [isObjectDataLoaded, setIsObjectDataLoaded] = useState(false);
    const [isObjectDataError, setIsObjectDataError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsObjectDataError(false);
            await axios.get(objectUrl)
                .then(result => {
                    console.log(result);
                    setObjectData(result.data.data);
                    setIsObjectDataLoaded(true);
                }).catch(e => {
                    setIsObjectDataError(true);
                });
        };
        fetchData();
    }, [objectUrl]);


    return (
        <React.Fragment>
            <Header/>
            <br />
            <div className="container-fluid">
                <Row><Col sm="6"><h1>Застройщик {isProviderDataLoaded ? providerData[0].name : null}</h1></Col></Row>
                <br />
                <Row><Col sm="12">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                <Person viewBox="0 0 20 20" size={24}/>Застройщик
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                <HouseFill viewBox="0 0 20 20" size={24}/>Объекты ({objectData.length})
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="1">
                            <Row>
                                <Col sm="12">
                                    {isProviderDataLoaded ? <ProviderInfo data={providerData}/> : null}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="2">
                            <Row>
                                <Col sm="12">
                                    {isObjectDataLoaded ? <ObjectsList data={objectData} /> : null}
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col></Row>
            </div>
        </React.Fragment>
    );
}
