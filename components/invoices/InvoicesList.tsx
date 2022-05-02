import { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Typography } from "../../styles";
import invoiceModel from "../../models/invoices";
import storage from '../../models/storage';
import { showMessage } from 'react-native-flash-message';

export default function InvoicesList({ route, navigation, setIsLoggedIn }) {
    let { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState([]);

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    async function logOut() {
        storage.deleteToken();
        setIsLoggedIn(false);
        showMessage({
            message: "Utloggad",
            description: "Logga in igen för att hantera fakturor",
            type: "success"
        });
    }

    const invoicesRows = allInvoices // Går bra att lägga till fler Celler med info
        .map((invoice, index) => {
            return <DataTable.Row
            style={Typography.normal}
            key={index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell>{invoice.total_price}</DataTable.Cell>
                <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        });

    return (
        <ScrollView style={Base.container}>
            <Text style={Typography.header2}>Fakturor</Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title>Pris</DataTable.Title>
                    <DataTable.Title>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {invoicesRows}
            </DataTable>
            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
            <Button
                title="Logga ut"
                onPress={async () => {
                    await logOut();
                }}
            />
        </ScrollView>
    );
}