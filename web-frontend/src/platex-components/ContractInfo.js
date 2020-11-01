import React, {useState} from "react";
import { Row, Col, Button, Collapse, Table } from 'reactstrap';

export function SGPackages(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return(
        <React.Fragment>
            <Button color="link" onClick={toggle} style={{ verticalAlign: 'baseline' }}>Тарификационные пакеты</Button>
            <Collapse isOpen={isOpen}>
                <Row><Col sm="12">
                    <Table size="sm" bordered responsive>
                        <thead>
                        <tr>
                            <th>Группа пакетов</th>
                            <th>Название</th>
                            <th>С</th>
                            <th>До</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.sgp_data.map(sgp => (
                            sgp.service_group_id === props.sg_id ?
                                <tr>
                                    <td></td>
                                    <td>{sgp.name}</td>
                                    <td>{sgp.begin_dt}</td>
                                    <td>{sgp.end_dt}</td>
                                    <td></td>
                                </tr>: null
                        ))}
                        </tbody>
                    </Table>
                </Col></Row>
            </Collapse>
        </React.Fragment>
    );
}

export function Services(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return(
        <React.Fragment>
            <Button color="link" onClick={toggle} style={{ verticalAlign: 'baseline' }}>Услуги</Button>
            <Collapse isOpen={isOpen}>
                <Row><Col sm="12">
                    <Table size="sm" bordered responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Тип</th>
                            <th>Тарифный план</th>
                            <th>С</th>
                            <th>До</th>
                            <th>Счет</th>
                            <th>Баланс</th>
                            <th>Цена</th>
                            <th>К-во</th>
                            <th>Стоимость</th>
                            <th>Валюта</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.s_data.map(service => (
                        service.service_group_id === props.sg_id ?
                        <tr>
                            <td>{service.service_id}</td>
                            <td></td>
                            <td>{service.tariff_plan}</td>
                            <td>{service.begin_dt}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{service.price}</td>
                            <td></td>
                            <td>{service.qty_sum}</td>
                            <td>{service.currency}</td>
                        </tr>: null
                    ))}
                    </tbody>
                    </Table>
                </Col></Row>
            </Collapse>
        </React.Fragment>
    );
}

export function Wires(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return(
        <React.Fragment>
            <Button color="link" onClick={toggle} style={{ verticalAlign: 'baseline' }}>Ресурсы</Button>
            <Collapse isOpen={isOpen}>
                <Row><Col sm="12">
                    <Table size="sm" bordered responsive>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Источник</th>
                            <th>Имя источника</th>
                            <th>Тип</th>
                            <th>Состояние</th>
                            <th>Дата состояния</th>
                            <th>Счет</th>
                            <th>С</th>
                            <th>До</th>
                            <th>Название</th>
                            <th>К-во</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.w_data.map(wire => (
                            wire.service_group_id === props.sg_id ?
                                <tr>
                                    <td>{wire.wire_id}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>: null
                        ))}
                        </tbody>
                    </Table>
                </Col></Row>
            </Collapse>
        </React.Fragment>
    );
}

export function ServiceGroup(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return(
        <React.Fragment>
            <Button color="link" onClick={toggle} style={{ verticalAlign: 'baseline'}}>Группа услуг {props.sg.name}</Button>
            <Collapse isOpen={isOpen}>
                <Row><Col sm="4">
                    <Table size="sm" bordered responsive>
                        <tr>
                            <td>ID</td><td>{props.sg.service_group_id} </td>
                        </tr>
                        <tr>
                            <td>Название</td><td>{props.sg.name}</td>
                        </tr>
                        <tr>
                            <td>Тип</td><td></td>
                        </tr>
                        <tr>
                            <td>Класс услуг</td><td></td>
                        </tr>
                        <tr>
                            <td>Группа зон</td><td></td>
                        </tr>
                        <tr>
                            <td>С</td>{props.sg.begin_dt}<td></td>
                        </tr>
                        <tr>
                            <td>До</td><td></td>
                        </tr>
                    </Table>
                </Col></Row>
            </Collapse>
        </React.Fragment>
    );
}

export function Contract(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return(
        <React.Fragment>
            <Button color="link" onClick={toggle} style={{ verticalAlign: 'baseline' }}>{props.contract.state_name} {props.contract.ident}</Button>
            <Collapse isOpen={isOpen}>
                <Row><Col sm="4">
                    <Table size="sm" bordered responsive>
                        <tr>
                            <td>ID</td><td>{props.contract.contract_id} </td>
                        </tr>
                        <tr>
                            <td>Номер договора</td><td>{props.contract.ident}</td>
                        </tr>
                        <tr>
                            <td>Предок</td><td></td>
                        </tr>
                        <tr>
                            <td>Тип</td><td>{props.contract.type_name}</td>
                        </tr>
                        <tr>
                            <td>Состояние</td><td>{props.contract.state_name}</td>
                        </tr>
                        <tr>
                            <td>С</td>{props.contract.begin_dt}<td></td>
                        </tr>
                        <tr>
                            <td>До</td><td></td>
                        </tr>
                        <tr>
                            <td>Филиал</td><td></td>
                        </tr>
                        <tr>
                            <td>Оператор</td><td></td>
                        </tr>
                    </Table>
                </Col></Row>
            </Collapse>
        </React.Fragment>
    );
}

export default function ContractInfo(props) {

    return (
        <Row><Col sm="8">
            <ul>
                {props.data.map(contract => (
                <React.Fragment>
                <li>
                    <Contract contract={contract} />
                </li>
                <ul>
                    {props.sg_data.map(sg => (
                        sg.contract_id === contract.contract_id ?
                        <React.Fragment>
                        <li>
                            <ServiceGroup sg={sg} />
                        </li>
                        <ul>
                            <li><SGPackages sgp_data={props.sgp_data} sg_id={sg.service_group_id}/></li>
                            <li><Services s_data={props.s_data} sg_id={sg.service_group_id}/></li>
                            <li><Wires w_data={props.w_data} sg_id={sg.service_group_id}/></li>
                        </ul>
                        </React.Fragment>
                        : null
                    ))}
                </ul>
                </React.Fragment>
                ))}
            </ul>
        </Col>
        </Row>
    );
}
