import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles';

import productModel from "../models/products.ts";

function StockList({products, setProducts}) {
    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const list = products.map((product, index) => {
        return <Text style={{ ...Typography.normal }} key={index}>
                { product.name }:    { product.stock }
                </Text>
    });

    return (
        <View>
            {list}
        </View>
    );
};

export default function Stock({products, setProducts}) {
    return (
        <View>
            <Text style={Typography.header2}>Lagerförteckning</Text>
            <Text style={Typography.normal}>Produkt:    Antal</Text>
        <StockList products={products} setProducts={setProducts}/>
        </View>
    );
}