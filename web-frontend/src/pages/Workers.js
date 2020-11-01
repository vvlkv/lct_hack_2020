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

import Header from "../d1-components/Header";

import { AuthContext } from "../context/auth";
import { api_url } from "../config";
import {Link} from "react-router-dom";
import {ListUl, Plus} from "react-bootstrap-icons";


import classnames from 'classnames';


export function NewWorker(props) {
    const { authToken } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [lastname, setLastname] = useState('');
    const [ident, setIdent] = useState('');
    const [phone, setPhone] = useState('');
    const [provider, setProvider] = useState(props.providersData[0].id);
    const [skill, setSkill] = useState(props.skillsData[0].user_group_id);

    const [url, setUrl] = useState(
        `${api_url}/function/add_user?_tkn=${authToken}&_debug=1`,
    );
    const [isOk, setIsOk] = useState(false);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const addProvider = async () => {
            setIsError(false);
            await axios.get(url)
                .then(result => {
                    setIsOk(true);
                    props.setAddWorkerCount(props.addWorkerCount + 1);
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
                    {isOk ? <Alert color="success">Рабочий добавлен</Alert> : null}
                    <Label for="provider">Застройщик</Label>
                    <Input type="select" name="provider" id="provider" value={provider} onChange={event => setProvider(event.target.value)}>
                        {props.providersData.map(provider => (
                            <option value={provider.id}>{provider.name}</option>
                        ))}
                    </Input>
                    <br />
                    <Label for="skill">Специальность</Label>
                    <Input type="select" name="skill" id="skill" value={skill} onChange={event => setSkill(event.target.value)}>
                        {props.skillsData.map(skill => (
                            <option value={skill.user_group_id}>{skill.name}</option>
                        ))}
                    </Input>
                    <br />
                    <Label for="name">Имя</Label>
                    <Input type="text" name="name" id="name" placeholder='Василий' value={name} onChange={event => setName(event.target.value)}/>
                    <br />
                    <Label for="surname">Фамилия</Label>
                    <Input type="text" name="surname" id="surname" placeholder='Васильев' value={surname} onChange={event => setSurname(event.target.value)}/>
                    <br />
                    <Label for="surname">Отчество</Label>
                    <Input type="text" name="surname" id="surname" placeholder='Васильевич' value={lastname} onChange={event => setLastname(event.target.value)}/>
                    <br />
                    <Label for="phone">Телефон</Label>
                    <Input type="text" name="phone" id="phone" placeholder="4650000" value={phone} onChange={event => setPhone(event.target.value)}/>
                    <br />
                    <Label for="ident">Номер договора</Label>
                    <Input type="text" name="ident" id="ident" placeholder="111/11" value={ident} onChange={event => setIdent(event.target.value)}/>
                    <br />
                    <Button color="success" onClick={() => setUrl(`${api_url}/function/add_user?_tkn=${authToken}&a=${name}&b=${surname}&c=${lastname}&d=${phone}&e=${skill}&f=${ident}&g=${provider}&_debug=1`)}>Добавить рабочего</Button>
                </FormGroup>
            </Col>
        </Row>
    );
}

export function WorkersList(props) {
    return (
        <Row>
            <Col sm="10">
                {props.isLoading ? <p>Загрузка...</p> :
                    <React.Fragment>
                        <Table style={{ margin: '1em' }} size="small" bordered >
                            <thead>
                            <tr>
                                <th className="r">ID</th>
                                <th className="c">Специальность</th>
                                <th className="c">ФИО</th>
                                <th className="c">Телефон</th>
                                <th className="c">Состояние</th>
                                <th className="c">Договор</th>
                                <th className="c">Оформлен</th>
                                <th className="c">Застройщик</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.data.map(worker => (
                                <tr>
                                    <th className="r">{worker.user_id}</th>
                                    <td className="c">{worker.user_group_name}</td>
                                    <td><Link to={`/openworker/${worker.user_id}`}>{worker.surname} {worker.name} {worker.lastname}</Link></td>
                                    <td className="c">{worker.phone}</td>
                                    <td className="c">{worker.user_state_name}</td>
                                    <td className="c">{worker.ident}</td>
                                    <td className="c">{worker.begin_dt}</td>
                                    <td className="c">{worker.company_name}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </React.Fragment>
                }</Col>
        </Row>
    );
}

export default function Workers() {
    const { authToken } = useContext(AuthContext);

    const [addWorkerCount, setAddWorkerCount] = useState(0);
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const [data, setData] = useState(  []);
    const [clientSearchMask, setClientSearchMask] = useState('');
    const [url, setUrl] = useState(
        `${api_url}/api_workers?_tkn=${authToken}&limit=20&_debug=1`,
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

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

    /* Информация о специальностях */
    const [skillsData, setSkillssData] = useState(  []);
    const [skillsUrl, setSkillssUrl] = useState(
        `${api_url}/user_groups?_tkn=${authToken}&_debug=1&`,
    );
    const [isSkillsDataLoaded, setIsSkillsDataLoaded] = useState(false);
    const [isSkillsDataError, setIsSkillsDataError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsSkillsDataError(false);
            await axios.get(skillsUrl)
                .then(result => {
                    console.log(result);
                    setSkillssData(result.data.data);
                    setIsSkillsDataLoaded(true);
                }).catch(e => {
                    setIsSkillsDataError(true);
                });
        };
        fetchData();
    }, [skillsUrl]);

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
    }, [url, addWorkerCount]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    console.log(data);

    return (
        <React.Fragment>
            <Header/>
            <div className="container-fluid">
                <h1>Рабочие</h1>
                <FormGroup row>
                    <Col sm="2">
                        <Input type="search" size="10" title="search string" value={clientSearchMask} onChange={event => setClientSearchMask(event.target.value)} />
                    </Col>
                    <Button color="primary" onClick={() => setUrl(`${api_url}/api_workers?_tkn=${authToken}&filters[name-x]=${clientSearchMask}&_debug=1`) }>Поиск</Button>
                </FormGroup>
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
                        <WorkersList data={data} isLoading={isLoading} />
                    </TabPane>
                    <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="2">
                        { isProvidersDataLoaded && isSkillsDataLoaded ? <NewWorker providersData={providersData} skillsData={skillsData} addWorkerCount={addWorkerCount} setAddWorkerCount={setAddWorkerCount}/> : null }
                    </TabPane>
                </TabContent>

            </div>
        </React.Fragment>

    );
}
