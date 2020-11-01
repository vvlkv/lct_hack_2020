import React, {useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import { AlarmFill, HouseFill, PersonFill, FileEarmarkText } from 'react-bootstrap-icons';
import classnames from 'classnames';
import axios from 'axios';

import Header from "../d1-components/Header";

import ObjectInfo from "../platex-components/ObjectInfo";
import ObjectEvents from "../platex-components/ObjectEvents";
import ObjectWorkers from "../platex-components/ObjectWorkers";
import Report from "../platex-components/Report";

import { AuthContext } from "../context/auth";
import { api_url } from "../config";

export default function OpenObject() {
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const { authToken } = useContext(AuthContext);

    /* Информация об объекте */
    const [objectData, setObjectData] = useState(  []);
    const [objectUrl, setObjectUrl] = useState(
        `${api_url}/api_objects?_tkn=${authToken}&_debug=1&filters[id-a]=${id}`,
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

    /* Информация о событиях */
    const [eventsData, setEventsData] = useState(  []);
    const [eventsUrl, setEventsUrl] = useState(
        `${api_url}/api_events?_tkn=${authToken}&_debug=1&filters[object_id-a]=${id}`,
    );
    const [isEventsDataLoaded, setIsEventsDataLoaded] = useState(false);
    const [isEventsDataError, setIsEventsDataError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsEventsDataError(false);
            await axios.get(eventsUrl)
                .then(result => {
                    console.log(result);
                    setEventsData(result.data.data);
                    setIsEventsDataLoaded(true);
                }).catch(e => {
                    setIsEventsDataError(true);
                });
        };
        fetchData();
    }, [eventsUrl]);


    /* Информация о работниках */
    const [workersData, setWorkersData] = useState(  []);
    const [workersUrl, setWorkersUrl] = useState(
        `${api_url}/api_worktimes?_tkn=${authToken}&_debug=1&filters[object_id-a]=${id}`,
    );
    const [isWorkersDataLoaded, setIsWorkersDataLoaded] = useState(false);
    const [isWorkersDataError, setIsWorkersDataError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsWorkersDataError(false);
            await axios.get(workersUrl)
                .then(result => {
                    console.log(result);
                    setWorkersData(result.data.data);
                    setIsWorkersDataLoaded(true);
                }).catch(e => {
                    setIsWorkersDataError(true);
                });
        };
        fetchData();
    }, [workersUrl]);

    /* Информация о процентах работников */
    const [percentData, setPercentData] = useState(  []);
    const [percentUrl, setPercentUrl] = useState(
        `${api_url}/percent?_tkn=${authToken}&_debug=1&filters[object_id-a]=${id}`,
    );
    const [isPercentDataLoaded, setIsPercentDataLoaded] = useState(false);
    const [isPercentDataError, setIsPercentDataError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsPercentDataError(false);
            await axios.get(percentUrl)
                .then(result => {
                    console.log(result);
                    setPercentData(result.data.data);
                    setIsPercentDataLoaded(true);
                }).catch(e => {
                    setIsPercentDataError(true);
                });
        };
        fetchData();
    }, [percentUrl]);

    return (
        <React.Fragment>
            <Header/>
            <br />
            <div className="container-fluid">
                <Row><Col sm="6"><h1>Объект {isObjectDataLoaded ? objectData[0].name : null}</h1></Col></Row>
                <br />
                <Row><Col sm="12">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                <HouseFill viewBox="0 0 20 20" size={24}/>Объект
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                <PersonFill viewBox="0 0 20 20" size={24}/>Рабочие ({workersData.length})
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggle('3'); }}
                            >
                                <AlarmFill viewBox="0 0 20 20" size={24}/>События ({eventsData.length})
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '4' })}
                                onClick={() => { toggle('4'); }}
                            >
                                <FileEarmarkText viewBox="0 0 20 20" size={24}/>Сформировать отчет
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="1">
                            <Row>
                                <Col sm="12">
                                    {isObjectDataLoaded ? <ObjectInfo data={objectData}/> : null}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="2">
                            <Row>
                                <Col sm="12">
                                    {isWorkersDataLoaded ? <ObjectWorkers data={workersData}/> : null}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="3">
                            <Row>
                                <Col sm="12">
                                    {isEventsDataLoaded ? <ObjectEvents data={eventsData}/> : null}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd', borderRadius: '0px 0px 5px 5px' }} tabId="4">
                            <Row>
                                <Col sm="12">
                                    {isObjectDataLoaded ? <Report data={objectData} /> : null}
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Col></Row>
            </div>
        </React.Fragment>
    );
}
