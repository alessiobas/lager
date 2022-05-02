import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "../../styles";
import { DataTable } from 'react-native-paper';

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';

import getCoordinates from "../../models/nominatim";

export default function ShipOrder({ route }) {
    const {order} = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const orderInfo = (
        <Text style={Typography.normal}>
            {order.name}{"\n"}
            {order.address}{"\n"}
            {order.zip} {order.city}{"\n"}
            {order.country}{"\n"}
        </Text>
    );

    const orderItemsInfo = order.order_items
        .map((item, index) => {
            return <DataTable.Row key={index}>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell>{item.article_number}</DataTable.Cell>
                    <DataTable.Cell>{item.amount}</DataTable.Cell>
                    <DataTable.Cell>{item.location}</DataTable.Cell>
                </DataTable.Row>
        });

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
    
            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }
    
            const currentLocation = await Location.getCurrentPositionAsync({});
    
            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);

    return (
        <View style={Base.container}>
            <Text style={Typography.header2}>Skicka order</Text>
            {orderInfo}
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Produkt</DataTable.Title>
                    <DataTable.Title>Artikelnummer</DataTable.Title>
                    <DataTable.Title>Antal</DataTable.Title>
                    <DataTable.Title>Plats</DataTable.Title>
                </DataTable.Header>
                {orderItemsInfo}
            </DataTable>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }} >
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});