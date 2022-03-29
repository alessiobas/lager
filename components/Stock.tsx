import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
        .then(response => response.json())
        .then(result => setProducts(result.data));
    }, []);

    const list = products.map((product, index) => <Text style={{fontSize: 17, margin: 5, padding: 5}} key={index}>  { product.name }:    { product.stock }</Text>);

    return (
        <View>
            {list}
        </View>
    );
}

export default function Stock() {
    return (
        <View>
            <Text style={{padding: 5, color: '#333', fontSize: 24}}>Lagerförteckning</Text>
            <Text style={{padding: 5, color: '#333', fontSize: 20}}>   Produkt:    Antal</Text>
        <StockList/>
        </View>
    );
}