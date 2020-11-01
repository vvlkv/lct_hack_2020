import React from "react";
import { Row, Col, Table } from 'reactstrap';

export default function ObjectEvents(props) {
    return (
        <Row><Col sm="8">
            <Table style={{ margin: '1em' }} size="sm" bordered>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Тип</th>
                    <th>Рабочий</th>
                    <th>Время начала</th>
                    <th>Время реакции</th>
                </tr>
                </thead>
                <tbody>
                {props.data.map(event => (
                    <tr>
                        <td>{event.event_id}</td>
                        <td>{event.event_type_name}</td>
                        <td>{event.surname} {event.user_name} {event.lastname}</td>
                        <td>{event.begin_dt}</td>
                        <td>{event.end_dt}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Col>
        </Row>
    );
}
