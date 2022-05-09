import { render } from '@testing-library/react-native';
import DeliveryForm from '../components/DeliveryForm';

const setProducts = () => false;

test('form should contain header Ny inleverans and fields to fill in Produkt, Leveransdatum, Antal and Kommentar', async () => {
    const { getByText } = render(<DeliveryForm setProducts={setProducts}/>);
    const header = await getByText('Ny inleverans');
    const productField = await getByText('Produkt');
    const dateField = await getByText('Leveransdatum');
    const amountField = await getByText('Antal');
    const commentFiled = await getByText('Kommentar');

    expect(header).toBeDefined();
    expect(productField).toBeDefined();
    expect(dateField).toBeDefined();
    expect(amountField).toBeDefined();
    expect(commentFiled).toBeDefined();
});