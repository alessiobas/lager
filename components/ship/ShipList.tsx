import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { Typography, Base } from "../../styles";
import orderModel from "../../models/orders";


export default function ShipList({ route, navigation }) {
    let { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Order', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View style={Base.container}>
            <Text style={Typography.header2}>Ordrar redo att skickas</Text>
            {listOfOrders}
        </View>
    );
}