import { View, Text, Button } from "react-native";
import { Typography, Base } from "../../styles";

export default function ShipList({ navigation }) {
    return (
        <View style={Base.container}>
            <Text style={Typography.header2}>Ordrar redo att skickas</Text>
            <Button
                title="Fejk order"
                key="0"
                onPress={() => {
                    navigation.navigate('Order', {
                        order: {
                            "id": 1,
                            "name": "Mister Doe",
                            "address": "Stortorget",
                            "zip": "12345",
                            "city": "Karlskrona",
                            "country": "Sweden",
                            "status": "Packad",
                            "status_id": 200,
                        }
                    });
                }} 
            />
        </View>
    )
}