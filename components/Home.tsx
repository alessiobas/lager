import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from '../assets/warehouse.jpg';
import Stock from '../components/Stock';
import { Base, Typography } from '../styles';

export default function Home({route, products, setProducts}) {
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.header}>Lager-Appen</Text>
        <Image source={warehouse} style={{width: 320, height: 240 }} />
        <Stock products={products} setProducts={setProducts}/>
        <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: Base.container,
  header: Typography.header1,
});
