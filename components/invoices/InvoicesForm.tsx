import { useState, useEffect } from "react";
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Base, Typography, Forms } from "../../styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import ordersModel from "../../models/orders";
import invoicesModel from "../../models/invoices";
import Invoice from "../../interfaces/invoice";
import Order from '../../interfaces/order';

function zeroPad(number: number): string {
    if (number < 10) {
        return "0" + number;
    }
    return "" + number;
}

function formatDate(date: Date): string {
    return `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`;
}



export default function OrderForm({ navigation , setOrders }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});

    function DateDropDown(props) {
        const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
        const [show, setShow] = useState<Boolean>(false);

        const showDatePicker = () => {
            setShow(true);
        };

        return (
            <View>
                {Platform.OS === "android" && (
                    <Button onPress={showDatePicker} title="Visa datumväljare" />
                )}
                {(show || Platform.OS === "ios") && (
                    <DateTimePicker
                        onChange={(event, date) => {
                            setDropDownDate(date);

                            props.setInvoice({
                                ...props.invoice,
                                creation_date: formatDate(date),
                            });

                            setShow(false);
                        }}
                        value={dropDownDate}
                    />
                )}
            </View>
        );
    }

    function OrderDropDown(props) {
        const [orders, setOrders] = useState<Order[]>([]);
        let productsHash: any = {};

        useEffect(async () => {
            setOrders(await ordersModel.getOrders());
        }, []);

        const ordersList = 
        orders.filter(order => order.status_id < 600)
        .map((order, index) => {
            return <Picker.Item key={index} label={order.name} value={order.id} />;
        });

        return (
            <Picker
                selectedValue={props.invoice?.order_id}
                onValueChange={(itemValue) => {
                    props.setInvoice({ ...props.invoice, order_id: itemValue });
                }}>
                {ordersList}
            </Picker>
        );
    }

    async function createInvoice() {
        navigation.navigate("List", { reload: true });
        await invoicesModel.createInvoice(invoice);

        // const updatedProduct = {
        //     ...currentProduct,
        //     stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        // };

        // await productModel.updateProduct(updatedProduct);
        // setProducts(await productModel.getProducts());
    }

    return (
        <ScrollView style={{ ...Base.container }}>
            <Text style={{ ...Typography.header2 }}>Skapa faktura</Text>

            <Text style={{ ...Typography.label }}>Order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                required="required"
            />

            <Text style={{ ...Typography.label }}>Fakturadatum</Text>
            <Text style={{ ...Typography.label }}>{invoice.creation_date}</Text>
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                required="required"
            />


            <Button
                title="Skapa faktura"
                onPress={() => {
                    createInvoice();
                }}
            />

        </ScrollView>
    );
};