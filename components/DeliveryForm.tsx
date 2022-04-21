import { useState, useEffect } from "react";
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import { Base, Typography, Forms } from "../styles";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

import productModel from "../models/products";
import deliveryModel from "../models/deliveries";
import Delivery from "../interfaces/delivery";
import Product from '../interfaces/product';



export default function DeliveryForm({ navigation , setProducts }) {
    const [delivery, setDelivery] = useState<Partial <Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

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

                            props.setDelivery({
                                ...props.delivery,
                                delivery_date: date.toLocaleDateString('se-SV'),
                            });

                            setShow(false);
                        }}
                        value={dropDownDate}
                    />
                )}
            </View>
        );
    }

    function ProductDropDown(props) {
        const [products, setProducts] = useState<Product[]>([]);
        let productsHash: any = {};

        useEffect(async () => {
            setProducts(await productModel.getProducts());
        }, []);

        const itemsList = products.map((prod, index) => {
            productsHash[prod.id] = prod;
            return <Picker.Item key={index} label={prod.name} value={prod.id} />;
        });

        return (
            <Picker
                selectedValue={props.delivery?.product_id}
                onValueChange={(itemValue) => {
                    props.setDelivery({ ...props.delivery, product_id: itemValue });
                    props.setCurrentProduct(productsHash[itemValue]);
                }}>
                {itemsList}
            </Picker>
        );
    }

    async function addDelivery(navigation, delivery, setProducts) {
        navigation.navigate("List", { reload: true });
        await deliveryModel.addADelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);
        setProducts(await productModel.getProducts());
    }

    return (
        <ScrollView style={{ ...Base.container }}>
            <Text style={{ ...Typography.header2 }}>Ny inleverans</Text>

            <Text style={{ ...Typography.label }}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
                required="required"
            />

            <Text style={{ ...Typography.label }}>Leveransdatum</Text>
            <Text style={{ ...Typography.label }}>{delivery.delivery_date}</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                required="required"
            />

            <Text style={{ ...Typography.label }}>Antal</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) });  
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
            />

            <Text style={{ ...Typography.label }}>Kommentar</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content });
                }}
                value={delivery?.comment}
            />


            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery(navigation, delivery, setProducts);
                }}
            />

        </ScrollView>
    );
};