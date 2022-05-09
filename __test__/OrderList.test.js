import { render } from '@testing-library/react-native';
import OrderList from '../components/OrderList';

const allOrders = [
    {
        "id": 1,
        "name": "Anders Andersson",
        "address": "Andersgatan 1",
        "zip": "12345",
        "city": "Anderstorp",
        "country": "Sweden",
        "status": "Ny",
        "status_id": 100,
        "order_items": []
    },

    {
        "id": 2,
        "name": "Bert Bertilsson",
        "address": "Bertilgatan 2",
        "zip": "54321",
        "city": "Bertstorp",
        "country": "Sweden",
        "status": "Ny",
        "status_id": 100,
        "order_items": []
    },

    {
        "id": 3,
        "name": "Ceasar Ceaserson",
        "address": "Kejsargatan 3",
        "zip": "54123",
        "city": "Rom",
        "country": "Sweden",
        "status": "Packad",
        "status_id": 200,
        "order_items": []
    },
];

const route = "false";

const setAllOrders = () => false;

test('header should exist containing text Ordrar redo att plockas', async () => {
    const { getByText } = render(<OrderList route={route} allOrders={allOrders} setAllOrders={setAllOrders}/>);
    const header = await getByText('Ordrar redo att plockas');

    expect(header).toBeDefined();
});

test('list should contain Ordrar with status "Ny" and status_id 100', async () => {
    const { getByText, debug } = render(<OrderList route={route} allOrders={allOrders} setAllOrders={setAllOrders}/>);
    const firstName = await getByText('Anders Andersson', { exact: false });
    const secondName = await getByText('Bert Bertilsson', { exact: false });

    expect(firstName).toBeDefined();
    expect(secondName).toBeDefined();
    debug("Orderlist component");
});
