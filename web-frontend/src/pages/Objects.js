import React, {useState, useEffect, useContext} from "react";
import {Alert, Button, Row, Col, Label, Input, Table, FormGroup, Nav, NavItem, NavLink, TabPane, TabContent} from 'reactstrap';
import { ListUl, Plus, Map as MapIcon } from 'react-bootstrap-icons';

import { YMaps, Map, Polygon } from 'react-yandex-maps';

import axios from 'axios';
import classnames from 'classnames';

import Header from "../d1-components/Header";

import { AuthContext } from "../context/auth";
import { api_url } from "../config";
import {Link} from "react-router-dom";
import {CreditCard, Person} from "react-bootstrap-icons";
import ClientInfo from "../platex-components/ObjectInfo";
import AccountInfo from "../platex-components/Bills";

export function NewObject(props) {
    const { authToken } = useContext(AuthContext);
    const [provider, setProvider] = useState(props.providers[0].id);
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [lat1, setLat1] = useState('');
    const [lon1, setLon1] = useState('');

    const [url, setUrl] = useState(
        `${api_url}/function/add_object?_tkn=${authToken}&_debug=1`,
    );
    const [isOk, setIsOk] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const addObject = async () => {
            setIsError(false);
            await axios.get(url)
                .then(result => {
                    setIsOk(true);
                    props.setAddObjectCount(props.addObjectCount + 1);
                }).catch(e => {
                    setIsError(true);
                });
        };
        addObject();
    }, [url]);

    return (
        <Row>
            <Col sm={4}>
                <FormGroup style={{ margin: '1em' }}>
                    {isOk ? <Alert color="success">Объект добавлен</Alert> : null}
                    <Label for="provider">Застройщик</Label>
                    <Input type="select" name="provider" id="provider" value={provider} onChange={event => setProvider(event.target.value)}>
                        {props.providers.map(provider => (
                            <option value={provider.id}>{provider.name}</option>
                        ))}
                    </Input>
                    <br />
                    <Label for="name">Название</Label>
                    <Input type="text" name="name" id="name" placeholder="ЖК Дом мечты" value={name} onChange={event => setName(event.target.value)}/>
                    <br />
                    <Label for="address">Адрес размещения</Label>
                    <Input type="text" name="address" id="address" placeholder="Санкт-Петербург, ул. Архивная" value={address} onChange={event => setAddress(event.target.value)}/>
                    <br />
                    <Label for="lat1">Широта центра</Label>
                    <Input type="text" name="lat1" id="lat1" placeholder="55.34" value={lat1} onChange={event => setLat1(event.target.value)}/>
                    <br />
                    <Label for="lon1">Долгота центра</Label>
                    <Input type="text" name="lon1" id="lon1" placeholder="36.44" value={lon1} onChange={event => setLon1(event.target.value)}/>
                    <br />
                    <Button color="success" onClick={() => setUrl(`${api_url}/function/add_object?_tkn=${authToken}&a=${provider}&b=${name}&c=${lat1}&d=${lon1}&e=${address}&_debug=1`) }>Добавить объект</Button>
                </FormGroup>
            </Col>
        </Row>
    );
}

export function ObjectsList(props) {
    return (
        <Row>
            <Col sm="10">
                {props.isLoading ? <p>Загрузка...</p> :
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
                }</Col>
        </Row>

    );
}

export function ObjectMap(props) {
    return(
        <React.Fragment>
        <YMaps>
            <Map width={'100%'} height={580} defaultState={{ center: [55.752956, 37.619505], zoom: 12 }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}>
            {props.data.map(object => (
                <Polygon
                    geometry={[
                        [
                            [`${object.polygon_lat1}`, `${object.polygon_lon1}`],
                            [`${object.polygon_lat2}`, `${object.polygon_lon2}`],
                            [`${object.polygon_lat3}`, `${object.polygon_lon3}`],
                            [`${object.polygon_lat4}`, `${object.polygon_lon4}`],
                        ],
                        [
                        ],
                    ]}
                    options={{
                        fillColor: '#00FF00',
                        strokeColor: '#0000FF',
                        opacity: 0.5,
                        strokeWidth: 5,
                        strokeStyle: 'shortdash',
                    }}
                />
            ))}
            </Map>
        </YMaps>
        </React.Fragment>
    );
}

export default function Objects() {
    const [addObjectCount, setAddObjectCount] = useState(0);
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const { authToken } = useContext(AuthContext);

    /* Объекты мониторинга */
    const [data, setData] = useState(  []);
    const [wireSearchMask, setWireSearchMask] = useState('');
    const [url, setUrl] = useState(
        `${api_url}/api_objects?_tkn=${authToken}&limit=20&_debug=1`,
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            await axios.get(url)
                .then(result => {
                    console.log(result);
                    setData(result.data.data);
                }).catch(e => {
                    setIsError(true);
                });
            setIsLoading(false);
        };
        fetchData();
    }, [url, addObjectCount]);


    /* Информация о застройщиках */
    const [providersData, setProvidersData] = useState(  []);
    const [providersUrl, setProvidersUrl] = useState(
        `${api_url}/companies?_tkn=${authToken}&_debug=1&`,
    );
    const [isProvidersDataLoaded, setIsProvidersDataLoaded] = useState(false);
    const [isProvidersDataError, setIsProvidersDataError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsProvidersDataError(false);
            await axios.get(providersUrl)
                .then(result => {
                    console.log(result);
                    setProvidersData(result.data.data);
                    setIsProvidersDataLoaded(true);
                }).catch(e => {
                    setIsProvidersDataError(true);
                });
        };
        fetchData();
    }, [providersUrl]);

    return (
        <React.Fragment>
            <Header/>
            <div className="container-fluid">
                <h1>Объекты</h1>
                <FormGroup row>
                    <Col sm="2">
                        <Input type="search" size="10" title="search string" value={wireSearchMask} onChange={event => setWireSearchMask(event.target.value)} />
                    </Col>
                    <Button color="primary" onClick={() => setUrl(`${api_url}/objects?_tkn=${authToken}&filters[name-x]=${wireSearchMask}&_debug=1`) }>Поиск</Button>
                </FormGroup>
                <Row><Col sm="12">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                <ListUl viewBox="0 0 20 20" size={24}/> Список
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                <MapIcon viewBox="0 0 20 20" size={24}/> На карте
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}
                            >
                                <Plus viewBox="0 0 20 20" size={24}/>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="1">
                            <ObjectsList data={data} isLoading={isLoading} />
                        </TabPane>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="2">
                            <ObjectMap data={data} />
                        </TabPane>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="3">
                            {isProvidersDataLoaded ? <NewObject providers={providersData} addObjectCount={addObjectCount} setAddObjectCount={setAddObjectCount} /> : null}
                        </TabPane>
                    </TabContent>
                </Col></Row>
            </div>
        </React.Fragment>

    );
}
