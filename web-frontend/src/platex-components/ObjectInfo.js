import React from "react";
import { Row, Col, Table } from 'reactstrap';
import {Map, Polygon, YMaps} from "react-yandex-maps";

export default function ObjectInfo(props) {
    return (
        <Row>
        <Col sm="4">
            <React.Fragment >
                <div style={{ margin: '1em' }} >
                <YMaps>
                    <Map width={'100%'} height={260} defaultState={{ center: [`${props.data[0].polygon_lat1}`, `${props.data[0].polygon_lon1}`], zoom: 16 }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}>
                            <Polygon
                                geometry={[
                                    [
                                        [`${props.data[0].polygon_lat1}`, `${props.data[0].polygon_lon1}`],
                                        [`${props.data[0].polygon_lat2}`, `${props.data[0].polygon_lon2}`],
                                        [`${props.data[0].polygon_lat3}`, `${props.data[0].polygon_lon3}`],
                                        [`${props.data[0].polygon_lat4}`, `${props.data[0].polygon_lon4}`],
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
                    </Map>
                </YMaps></div>
            </React.Fragment>
        </Col>
        <Col sm="4">
            <Table style={{ margin: '1em' }} size="sm" bordered>
            <tr>
                <td>Название</td><td>{props.data[0].name}</td>
            </tr>
            <tr>
                <td>Застройщик</td><td>{props.data[0].company_name}</td>
            </tr>
            <tr>
                <td>Адрес</td><td>{props.data[0].address_str}</td>
            </tr>
            <tr>
                <td>Заведен</td><td>{props.data[0].begin_dt}</td>
            </tr>
            <tr>
                <td>Гос. контракт</td><td>ГК №12/114 от 01.11.2020</td>
            </tr>
            <tr>
                <td>Разрешение на строительство</td><td>№755 от 01.11.2020</td>
            </tr>
            </Table>
        </Col>

        </Row>
    );
}
