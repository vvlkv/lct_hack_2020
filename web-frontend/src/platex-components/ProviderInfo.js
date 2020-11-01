import React from "react";
import { Row, Col, Table } from 'reactstrap';

export default function ProviderInfo(props) {
    return (
        <Row><Col sm="4">
            <Table style={{ margin: '1em' }} size="sm" bordered>
                <tr>
                    <td>ID</td><td>{props.data[0].id}</td>
                </tr>
                <tr>
                    <td>Название</td><td>{props.data[0].name}</td>
                </tr>
                <tr>
                    <td>Телефон</td><td>{props.data[0].phone}</td>
                </tr>
                <tr>
                    <td>Email</td><td>{props.data[0].email}</td>
                </tr>
                <tr>
                    <td>Контактное лицо</td><td>{props.data[0].contact_person}</td>
                </tr>
                <tr>
                    <td>Почтовый адрес</td><td>{props.data[0].postal_address}</td>
                </tr>
            </Table>
        </Col>
        </Row>
    );
}
