import React, {useState} from "react";
import {Row, Col, Table, FormGroup, Label, Input} from 'reactstrap';
import {Map, Polygon, YMaps} from "react-yandex-maps";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Font} from '@react-pdf/renderer';
import {  Table as TableBill, TableCell, TableHeader, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table';

import LineChart from "./charts/LineChart";
import PieChart from "./charts/PieChart";
import HorizontalBarChart from "./charts/HorBarChart";

/* Регистрируем шрифт */
Font.register({
    family: "Roboto",
    src:
        "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});



/* Формирование .pdf */
export function PDFDocument(props) {
    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#fff'
        },
        section: {
            padding: 10,
            margin: 5
        },
        header: {
            margin: 10,
            fontSize: 22,
            fontFamily: 'Roboto',
            textAlign: 'center'
        },
        table: {
            fontSize: 10,
            fontFamily: 'Roboto',
            textAlign: 'center'
        },
        resume: {
            fontSize: 10,
            fontFamily: 'Roboto',
            textAlign: 'left'
        }
    });

    return(
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.header}>Отчет по объекту {props.data[0].name} от 1.11</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.resume}>Застройщик: {props.data[0].company_name}</Text>
                    <Text style={styles.resume}>Адрес: {props.data[0].address_str}</Text>
                    <Text style={styles.resume}>Гос. контракт: ГК №12/114 от 01.11.2020</Text>
                    <Text style={styles.resume}>Разрешение на строительство: №755 от 01.11.2020</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.resume}>Количество рабочих по специальностям</Text>
                    <TableBill>
                        <TableHeader>
                            <TableCell><Text style={styles.table}>Название специальности</Text></TableCell>
                            <TableCell><Text style={styles.table}>Количество</Text></TableCell>
                        </TableHeader>
                        <TableBody>
                            <DataTableCell getContent="Каменщик" />
                            <DataTableCell getContent="Хуй"/>
                        </TableBody>
                        <TableHeader>
                            <TableCell><Text style={styles.table}>Название специальности</Text></TableCell>
                            <TableCell><Text style={styles.table}>Количество</Text></TableCell>
                        </TableHeader>
                    </TableBill>
                </View>
                <View style={styles.section}>
                    <Text style={styles.resume}>Сформировал      ______________________________</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.resume}>Подпись          ______________________________</Text>
                </View>
            </Page>
        </Document>
    );
}

export default function Report(props) {
    const [period, setPeriod] = useState('');

    return (
        <React.Fragment ><Row><Col sm="4">
        <FormGroup style={{ margin: '1em' }}>
            <Label for="period">Период</Label>
            <Input type="select" name="period" id="period" value={period} onChange={event => setPeriod(event.target.value)}>
                <option value="за прошедший день">За прошедший день</option>
                <option value="за прошедшую неделю">За прошедшую неделю</option>
                <option value="за прошедший месяц">За прошедший месяц</option>
                <option value="за прошедший квартал">За прошедший квартал</option>
                <option value="за прошедший год">За прошедший год</option>
                <option value="5">Другое</option>
            </Input>
        </FormGroup >
            {period === "5" ?
                <FormGroup style={{ margin: '1em' }}>
                <Label for="name">C</Label>
                <Input type="date" name="name" id="name" placeholder='1900-01-01' />
                <br />
                <Label for="surname">По</Label>
                <Input type="date" name="surname" id="surname" placeholder='2100-01-01' />
                </FormGroup>
            : null}

        </Col></Row>
        <Row>
            <Col sm="4">
                <React.Fragment >
                    <div style={{ margin: '1em' }} >
                        <YMaps>
                            <Map width={'100%'} height={300} defaultState={{ center: [`${props.data[0].polygon_lat1}`, `${props.data[0].polygon_lon1}`], zoom: 16 }} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}>
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
                        <td>Сохранить</td><td><PDFDownloadLink style={{ margin: '1em' }} document={<PDFDocument data={props.data}/>} fileName='bill.pdf'>
                        Экспорт в pdf
                    </PDFDownloadLink></td>
                    </tr>
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
        <Row style={{ margin: '0.5em' }}>
            <Col sm="4">
                 <PieChart />
            </Col>
            <Col sm="4">
                <HorizontalBarChart/>
            </Col>
            <Col sm="4">
                <LineChart/>
            </Col>
        </Row>
        <Row >
        <br/>
        <br/>
        </Row>
        </React.Fragment>

    );
}
