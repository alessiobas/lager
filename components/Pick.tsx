import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OrderList from './OrderList.tsx';
import PickList from './PickList.tsx';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="List" screenOptions={{headerShown: false}}>
            <Stack.Screen name="List">
            { (screenProps1) => <OrderList {...screenProps1} allOrders={props.allOrders} setAllOrders={props.setAllOrders} />}
            </Stack.Screen>
            <Stack.Screen name="Details">
                { (screenProps) => <PickList {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}