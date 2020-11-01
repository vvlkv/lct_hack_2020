import React, {useState, useEffect, useContext} from "react";
import {
    Button,
    Row,
    Col,
    Input,
    Table,
    FormGroup,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Alert,
    Label
} from 'reactstrap';

import axios from 'axios';

import classnames from 'classnames';

import Header from "../d1-components/Header";

import { AuthContext } from "../context/auth";
import { api_url } from "../config";
import {Link} from "react-router-dom";
import {ListUl, Map as MapIcon, Plus} from "react-bootstrap-icons";

export function NewProvider(props) {
    const { authToken } = useContext(AuthContext);
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [person, setPerson] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [url, setUrl] = useState(
        `${api_url}/function/add_company?_tkn=${authToken}&_debug=1`,
    );
    const [isOk, setIsOk] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const addProvider = async () => {
            setIsError(false);
            await axios.get(url)
                .then(result => {
                    setIsOk(true);
                    props.setAddProviderCount(props.addProviderCount + 1);
                }).catch(e => {
                    setIsError(true);
                });
        };
        addProvider();
    }, [url]);

    return (
        <Row>
            <Col sm={4}>
                <FormGroup style={{ margin: '1em' }}>
                    {isOk ? <Alert color="success">Застройщик добавлен</Alert> : null}
                    <Label for="name">Название</Label>
                    <Input type="text" name="name" id="name" placeholder='ООО "Ромашка"' value={name} onChange={event => setName(event.target.value)}/>
                    <br />
                    <Label for="address">Адрес главного офиса</Label>
                    <Input type="text" name="address" id="address" placeholder="Санкт-Петербург, ул. Архивная" value={address} onChange={event => setAddress(event.target.value)}/>
                    <br />
                    <Label for="person">Контактное лицо</Label>
                    <Input type="text" name="person" id="person" placeholder="Иван Иванов" value={person} onChange={event => setPerson(event.target.value)}/>
                    <br />
                    <Label for="phone">Телефон</Label>
                    <Input type="text" name="phone" id="phone" placeholder="4650000" value={phone} onChange={event => setPhone(event.target.value)}/>
                    <br />
                    <Label for="email">Email</Label>
                    <Input type="text" name="email" id="email" placeholder="test@mail.ru" value={email} onChange={event => setEmail(event.target.value)}/>
                    <br />
                    <Button color="success" onClick={() => setUrl(`${api_url}/function/add_company?_tkn=${authToken}&a=${name}&b=${person}&c=${phone}&d=${email}&e=${address}&_debug=1`) }>Добавить застройщика</Button>
                </FormGroup>
            </Col>
        </Row>
    );
}

export function ProvidersList(props) {
    return (
        <Row>
            <Col sm="10">
                {props.isLoading ? <p>Загрузка...</p> :
                    <React.Fragment>
                        <Table style={{ margin: '1em' }} size="small" bordered >
                            <thead>
                            <tr>
                                <th className="r">ID</th>
                                <th>Название</th>
                                <th className="c">Телефон</th>
                                <th className="c">Email</th>
                                <th className="c">Контактное лицо</th>
                                <th className="c">Почтовый адрес</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.data.map(company => (
                                <tr>
                                    <th className="r">{company.id}</th>
                                    <td><Link to={`/opencompany/${company.id}`}>{company.name}</Link></td>
                                    <td className="c">{company.phone}</td>
                                    <td className="c">{company.email}</td>
                                    <td className="c">{company.contact_person}</td>
                                    <td className="c">{company.postal_address}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </React.Fragment>
                }</Col>
        </Row>
    );
}

export default function Providers() {
    const { authToken } = useContext(AuthContext);

    const [addProviderCount, setAddProviderCount] = useState(0);
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }


    const [data, setData] = useState(  []);
    const [clientSearchMask, setClientSearchMask] = useState('');
    const [url, setUrl] = useState(
        `${api_url}/companies?_tkn=${authToken}&limit=20&_debug=1`,
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
    }, [url, addProviderCount]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    console.log(data);

    return (
        <React.Fragment>
            <Header/>
            <div className="container-fluid">
            <h1>Застройщики</h1>
            <FormGroup row>
                <Col sm="2">
                    <Input type="search" size="10" title="search string" value={clientSearchMask} onChange={event => setClientSearchMask(event.target.value)} />
                </Col>
                <Button color="primary" onClick={() => setUrl(`${api_url}/companies?_tkn=${authToken}&filters[name-x]=${clientSearchMask}&_debug=1`) }>Поиск</Button>
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
                                <Plus viewBox="0 0 20 20" size={24}/>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="1">
                            <ProvidersList data={data} isLoading={isLoading} />
                        </TabPane>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="2">
                            <NewProvider addProviderCount={addProviderCount} setAddProviderCount={setAddProviderCount}/>
                        </TabPane>
                    </TabContent>
                </Col></Row>

            </div>
        </React.Fragment>

    );
}
