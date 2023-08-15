import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AddMoney from '../../components/shared/AddMoneyPopup';
import axios from 'axios';
import { Bet } from '../../lib/types';

const stripePromise = loadStripe('pk_test_51Nf01HSJta2f9afKAikfTsoIHNxSZSslblmrngu4GYm35mautfrU3e14I6RoM1psV4ZvIzl8nLloA4YJ7S0msEZW00owHeQvQC');

const Wallet = () => {
    const [balance, setBalance] = useState(0);
    const [bets, setBets] = useState<Bet[]>([]);

    useEffect(() => {
        // Fetch balance function
        const fetchBalance = async () => {
            try {
                const resp = await axios.get('/api/user');
                setBalance(resp.data['money']);
                setBets(resp.data['bets'])
            } catch (error) {
                console.log("Not authenticated");
            }
        };

        // Fetch balance initially
        fetchBalance();

        // Fetch balance every second
        const interval = setInterval(fetchBalance, 1000);

        // Clean up interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className='bg-slate h-screen text-white mt-24'>
            <div className='container mx-auto px-4 py-12'>
                <h1 className='text-3xl font-semibold mb-6 text-center'>My Wallet</h1>
                <div className='max-w-md mx-auto'>
                    <p className='mb-4'>Welcome to your wallet page! Here, you can manage your funds and make transactions.</p>
                    <Elements stripe={stripePromise}>
                        <AddMoney />
                    </Elements>
                    <div className='mt-8'>
                        <h2 className='text-xl font-semibold mb-2'>Account balance</h2>
                        <p className='text-lg'>Rs. {balance}</p>
                    </div>
                    <div className='mt-8'>
                        <h2 className='text-xl font-semibold mb-2'>My Bets</h2>
                        <ul>
                            {bets.map(bet => (
                                <li key={bet.id} className='mb-2'>
                                    <span className='font-medium'>For {bet.betFor}</span>, Rs. {bet.amount}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
