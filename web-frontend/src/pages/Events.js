import React, {useState, useEffect, useContext} from "react";
import { Card, CardBody, UncontrolledAlert, Button, Row, Col, Input, Form, Table, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';



import axios from 'axios';

import Header from "../d1-components/Header";

import { AuthContext } from "../context/auth";
import { api_url } from "../config";
import {Link} from "react-router-dom";


export default function Events(props) {
    const { authToken } = useContext(AuthContext);

    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    /* Загрузка событий */
    const [data, setData] = useState(  []);
    const [url, setUrl] = useState(
        `${api_url}/api_events?_tkn=${authToken}&sort=-begin_dt&_debug=1&limit=40`,
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
    }, [url]);


    /* Протарифицировать записи */
    const [urlTariff, setUrlTariff] = useState('12');
    const [isOk, setIsTariffOk] = useState(false);
    const [isTariffError, setIsTariffError] = useState(false);
    useEffect(() => {
        const addObject = async () => {
            setIsTariffError(false);
            await axios.get(urlTariff)
                .then(result => {
                    setIsTariffOk(true);
                }).catch(e => {
                    setIsTariffError(true);
                });
        };
        addObject();
    }, [urlTariff]);

    /* Поля формы по умолчанию */
    const [objectType, setObjectType] = useState('');
    const [provider, setProvider] = useState(0);
    const [wireSearchMask, setWireSearchMask] = useState('');
    const [onlyComplete, setOnlyComplete] = useState(false);

    /* Информация о провайдерах */
    const [providersData, setProvidersData] = useState(  []);
    const [providersUrl, setProvidersUrl] = useState(
        `${api_url}/api_clients?_tkn=${authToken}&_debug=1&`,
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

    /* Информация о типах объектов */
    const [objectTypesData, setObjectTypesData] = useState(  []);
    const [objectTypesUrl, setObjectTypesUrl] = useState(
        `${api_url}/api_wire_types?_tkn=${authToken}&_debug=1&`,
    );
    const [isObjectTypesDataLoaded, setIsObjectTypesDataLoaded] = useState(false);
    const [isObjectTypesDataError, setIsObjectTypesDataError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsObjectTypesDataError(false);
            await axios.get(objectTypesUrl)
                .then(result => {
                    console.log(result);
                    setObjectTypesData(result.data.data);
                    setIsObjectTypesDataLoaded(true);
                }).catch(e => {
                    setIsObjectTypesDataError(true);
                });
        };
        fetchData();
    }, [objectTypesUrl]);


    function filter_and_search() {
        if (onlyComplete) {
            provider !== '0' ?
                setUrl(`${api_url}/api_events?_tkn=${authToken}&sort=-begin_dt&filters[wire_name-x]=${wireSearchMask}&&_debug=1&filters[client_id-a]=${provider}&filters[wire_type_code-x]=${objectType}&filters[end_dt-nn]`)
            :   setUrl(`${api_url}/api_events?_tkn=${authToken}&sort=-begin_dt&filters[wire_name-x]=${wireSearchMask}&&_debug=1&filters[wire_type_code-x]=${objectType}&filters[end_dt-nn]`);
        } else {
            provider !== '0' ?
                setUrl(`${api_url}/api_events?_tkn=${authToken}&sort=-begin_dt&filters[wire_name-x]=${wireSearchMask}&&_debug=1&filters[client_id-a]=${provider}&filters[wire_type_code-x]=${objectType}`)
            :   setUrl(`${api_url}/api_events?_tkn=${authToken}&sort=-begin_dt&filters[wire_name-x]=${wireSearchMask}&&_debug=1&filters[wire_type_code-x]=${objectType}`);
        }
    }

    function reset() {
        setUrl(`${api_url}/api_events?_tkn=${authToken}&sort=-begin_dt&_debug=1&limit=40`);
        setOnlyComplete(false);
        setObjectType( '');
        setProvider(0);
    }

    return (
        <React.Fragment>
            <Header/>
            <div className="container-fluid">
                <h1>События</h1>
                <br />
                <Row><Col sm="12">
                    <Card>
                        <CardBody>
                            <Form inline>
                                {isProvidersDataLoaded ?
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0" check>
                                    <Input type="select" name="cmplnt-type" id="cmplnt-type" bsSize="sm" value={provider} onChange={event => setProvider(event.target.value)}>
                                        <option value={0}>Все</option>
                                        {providersData.map(provider => (
                                            <option value={provider.client_id}>{provider.name}</option>
                                        ))}
                                    </Input>
                                </FormGroup> : null }
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="phone" className="mr-sm-2">Объект</Label>
                                    <Input
                                        type="text"
                                        name="number"
                                        id="phone"
                                        bsSize="sm"
                                        value={wireSearchMask}
                                        onChange={event => setWireSearchMask(event.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0" check>
                                    <Label check>
                                        <Input type="checkbox" value={onlyComplete} checked={onlyComplete} onChange={event => setOnlyComplete(!onlyComplete)}/> Только обработанные
                                    </Label>
                                </FormGroup>
                                <Button color="primary" size="sm" onClick={filter_and_search}>Поиск</Button>
                                <Button color="link" onClick={reset}>Сброс</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col></Row><br/>
                <Row>
                    <Col sm="12">
                        {isLoading ? <p>Загрузка...</p> :
                            <React.Fragment>
                                <Table size="small" bordered responsive>
                                    <thead>
                                    <tr>
                                        <th className="r">ID</th>
                                        <th className="c">Тип события</th>
                                        <th className="c">Рабочий</th>
                                        <th className="c">Время начала</th>
                                        <th className="c">Время реакции</th>
                                        <th className="c">Объект</th>
                                        <th className="c">Застройщик</th>
                                        <th className="c">Связаться с диспетчером</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map(event => (
                                        <tr>
                                            <td className="r">{event.event_id}</td>
                                            <td>{event.event_type_name}</td>
                                            <td>{event.surname} {event.user_name} {event.lastname}</td>
                                            <td>{event.begin_dt}</td>
                                            <td>{event.end_dt}</td>
                                            <td><Link to={`/openobject/${event.object_id}`}>{event.object_name}</Link></td>
                                            <td>{event.company_name}</td>
                                            <td><Button color="danger" onClick={toggle}>Обработать</Button>
                                                <Modal isOpen={modal} toggle={toggle} className={className}>
                                                    <ModalHeader toggle={toggle}>Обработать событие</ModalHeader>
                                                    <ModalBody>
                                                        Для обработки события нажмите кнопку "Звонок диспетчеру" для совершения звонка на площадку или "Оповестить всех" для отправки уведомления всем рабочим на плозадке.
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" onClick={toggle}>Звонок диспетчеру</Button>{' '}
                                                        <Button color="primary" onClick={toggle}>Оповестить всех</Button>{' '}
                                                        <Button color="secondary" onClick={toggle}>Отмена</Button>
                                                    </ModalFooter>
                                                </Modal></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            </React.Fragment>
                        }</Col>
                </Row>
            </div>
        </React.Fragment>
    );
}
