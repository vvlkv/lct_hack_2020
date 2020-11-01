import React from "react";
import { Row, Col, Table } from 'reactstrap';

export default function ObjectWorkers(props) {
    return (
        <Row><Col sm="8">
            <Table style={{ margin: '1em' }} size="sm" bordered>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Специальность</th>
                    <th>Рабочий</th>
                    <th>Время начала</th>
                    <th>Время конца</th>
                </tr>
                </thead>
                <tbody>
                {props.data.map(worker => (
                    <tr>
                        <td>{worker.id}</td>
                        <td>{worker.user_group_name}</td>
                        <td>{worker.surname} {worker.user_name} {worker.lastname}</td>
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
