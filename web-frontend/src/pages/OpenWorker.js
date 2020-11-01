import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import {TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Table} from 'reactstrap';
import { AlarmFill, HouseFill, PersonFill } from 'react-bootstrap-icons';
import classnames from 'classnames';
import axios from 'axios';

import Header from "../d1-components/Header";


import { AuthContext } from "../context/auth";
import { api_url } from "../config";

export function WorkersHistory(props) {
    return (
        <Row><Col sm="8">
            <Table style={{ margin: '1em' }} size="sm" bordered>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Объект</th>
                    <th>Время начала</th>
                    <th>Время конца</th>
                </tr>
                </thead>
                <tbody>
                {props.data.map(worker => (
                    <tr>
                        <td>{worker.user_id}</td>
                        <td>{worker.object_name}</td>
                        <td>{worker.begin_dt}</td>
                        <td>{worker.end_dt}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Col>
        </Row>
    );
}

export function WorkerInfo(props) {
    return (
        <Row><Col sm="4">
            <Table style={{ margin: '1em' }} size="sm" bordered>
                <tr>
                    <td>ID</td><td>{props.data[0].user_id}</td>
                </tr>
                <tr>
                    <td>Специальность</td><td>{props.data[0].user_group_name}</td>
                </tr>
                <tr>
                    <td>ФИО</td><td>{props.data[0].surname} {props.data[0].name} {props.data[0].lastname}</td>
                </tr>
                <tr>
                    <td>Телефон</td><td>{props.data[0].phone}</td>
                </tr>
                <tr>
                    <td>Состояние</td><td>{props.data[0].user_state_name}</td>
                </tr>
                <tr>
                    <td>Договор</td><td>{props.data[0].ident}</td>
                </tr>
                <tr>
                    <td>Оформлен</td><td>{props.data[0].begin_dt}</td>
                </tr>
                <tr>
                    <td>Застройщик</td><td>{props.data[0].company_name}</td>
                </tr>
            </Table>
        </Col>
        </Row>
    );
}

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


export default function OpenWorker() {
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const { authToken } = useContext(AuthContext);

    /* Информация об работнике */
    const [workerData, setWorkerData] = useState(  []);
    const [workerUrl, setWorkerUrl] = useState(
        `${api_url}/api_workers?_tkn=${authToken}&_debug=1&filters[user_id-a]=${id}`,
    );
    const [isWorkerDataLoaded, setIsWorkerDataLoaded] = useState(false);
    const [isWorkerDataError, setIsWorkerDataError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsWorkerDataError(false);
            await axios.get(workerUrl)
                .then(result => {
                    console.log(result);
                    setWorkerData(result.data.data);
                    setIsWorkerDataLoaded(true);
                }).catch(e => {
                    setIsWorkerDataError(true);
                });
        };
        fetchData();
    }, [workerUrl]);

    /* Информация об объекте */
    const [objectData, setObjectData] = useState(  []);
    const [objectUrl, setObjectUrl] = useState(
        `${api_url}/user_objects?_tkn=${authToken}&_debug=1&filters[user_id-a]=${id}`,
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


    /* Информация о расписании */
    const [worktimesData, setWorktimesData] = useState(  []);
    const [worktimesUrl, setWorktimesUrl] = useState(
        `${api_url}/api_worktimes?_tkn=${authToken}&_debug=1&filters[user_id-a]=${id}`,
    );
    const [isWorktimesDataLoaded, setIsWorktimesDataLoaded] = useState(false);
    const [isWorktimesDataError, setIsWorktimesDataError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsWorktimesDataError(false);
            await axios.get(worktimesUrl)
                .then(result => {
                    console.log(result);
                    setWorktimesData(result.data.data);
                    setIsWorktimesDataLoaded(true);
                }).catch(e => {
                    setIsWorktimesDataError(true);
                });
        };
        fetchData();
    }, [worktimesUrl]);

    return (
        <React.Fragment>
            <Header/>
            <br />
            <div className="container-fluid">
                <Row><Col sm="6"><h1>Рабочий {isWorkerDataLoaded ? workerData[0].surname||' '||workerData[0].name||' '||workerData[0].lastname : null}</h1></Col></Row>
                <br />
                <Row><Col sm="12">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                <PersonFill viewBox="0 0 20 20" size={24}/>Рабочий
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                <HouseFill viewBox="0 0 20 20" size={24}/>Доступные объекты ({objectData.length})
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}
                            >
                                <AlarmFill viewBox="0 0 20 20" size={24}/>История смен ({worktimesData.length})
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="1">
                            <Row>
                                <Col sm="12">
                                    {isWorkerDataLoaded ? <WorkerInfo data={workerData}/> : null}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="2">
                            <Row>
                                <Col sm="12">
                                    {isObjectDataLoaded ? <ObjectsList data={objectData}/> : null}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="3">
                            <Row>
                                <Col sm="12">
                                    {isWorktimesDataLoaded ? <WorkersHistory data={worktimesData}/> : null}
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col></Row>
            </div>
        </React.Fragment>
    );
}
