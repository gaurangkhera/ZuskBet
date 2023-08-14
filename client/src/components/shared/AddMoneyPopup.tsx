import { useState } from 'react';
import axios from 'axios';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


const AddMoney = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [amount, setAmount] = useState(0);

    const handlePayment = async () => {
        try {
            const response = await axios.post('/api/addpay', { amount });
            const { data } = response;

            if (stripe && elements) {
                const cardElement = elements.getElement(CardNumberElement);
                if (cardElement) {
                    const result = await stripe.confirmCardPayment(data.clientSecret, {
                        payment_method: {
                            card: cardElement
                        }
                    });

                    if (result.error) {
                        console.error(result.error);
                    } else if (result.paymentIntent.status === 'succeeded') {
                        axios.post('/api/addmoney', { amount })
                        console.log('Payment successful!');
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Add to wallet</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add money to your wallet</DialogTitle>
                    <DialogDescription>
                        Add money to your wallet securely here.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Amount
                        </Label>
                        <Input
                            id="name"
                            value={amount}
                            onChange={(e) => setAmount(parseInt(e.target.value))}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="card" className="text-right">
                            Card Number
                        </Label>
                        <div className="h-10 w-full col-span-3 rounded-md border border-input bg-background px-3 py-2">
                            <CardNumberElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#fff',
                                            '::placeholder': {
                                                color: 'var(--muted-foreground)',
                                            },
                                        },
                                        invalid: {
                                            color: 'red',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="expiry" className="text-right">
                            Expiry Date
                        </Label>
                        <div className="h-10 w-full col-span-3 rounded-md border border-input bg-background px-3 py-2">
                            <CardExpiryElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#fff',
                                            '::placeholder': {
                                                color: 'var(--muted-foreground)',
                                            },
                                        },
                                        invalid: {
                                            color: 'red',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cvc" className="text-right">
                            CVC
                        </Label>
                        <div className="h-10 w-full col-span-3 rounded-md border border-input bg-background px-3 py-2">
                            <CardCvcElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#fff',
                                            '::placeholder': {
                                                color: 'var(--muted-foreground)',
                                            },
                                        },
                                        invalid: {
                                            color: 'red',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handlePayment}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddMoney;
