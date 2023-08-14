import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AddMoney from '../../components/shared/AddMoneyPopup';



const stripePromise = loadStripe('pk_test_51Nf01HSJta2f9afKAikfTsoIHNxSZSslblmrngu4GYm35mautfrU3e14I6RoM1psV4ZvIzl8nLloA4YJ7S0msEZW00owHeQvQC');
const Wallet = () => {
    return (
            <div className='mt-24'>
                <Elements stripe={stripePromise}>
            <AddMoney />
        </Elements>
            </div>
        
    );
};

export default Wallet;
