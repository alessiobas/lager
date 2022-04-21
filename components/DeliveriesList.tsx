import { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from "react-native";
import { Base, Typography } from "../styles";
import deliveryModel from "../models/deliveries";

export default function DeliveriesList({ route, navigation }) {
    let { reload } = route.params || true;
    const [allDeliveries, setEveryDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setEveryDeliveries(await deliveryModel.getDeliveries());
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    const listOfDeliveries = allDeliveries
        .map((delivery, index) => {
            return <Text
            style={Typography.normal}
            key={index}>
                Produkt - {delivery.product_name}{"\n"}
                Antal - {delivery.amount}{"\n"}
                Leveransdatum - {delivery.delivery_date}{"\n"}
                Kommentar - {delivery.comment}{"\n"}
            </Text>
        });

    return (
        <ScrollView style={Base.container}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {listOfDeliveries.length === 0 ? <Text style={Typography.header3}>Inga Inleveranser</Text> :
            listOfDeliveries
            }
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
}