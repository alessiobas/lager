import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";
import { Base, Typography } from '../styles';

import productModel from "../models/products";
import StockList from './StockList';

export default function Stock({ products, setProducts }) {
    return (
        <View>
            <Text style={Typography.header2}>Lagerförteckning</Text>
            <Text style={Typography.normal}>Produkt:    Antal</Text>
        <StockList products={products} setProducts={setProducts}/>
        </View>
    );
}