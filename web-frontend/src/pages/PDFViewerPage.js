import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer, PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function PDFViewerPage(props) {


// Create styles
    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

// Create Document Component
    const MyDocument = () => (
        <Document>
            <Page>
                <View style={styles.section}>
                    <Text>Hello</Text>
                </View>
            </Page>
        </Document>
    );

    return (
        <div>
            <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
        </div>
    );
}
