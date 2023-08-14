import BetDropDown from "../../components/shared/BetDropDown"
import { Button } from "../../components/ui/button"
import {useState} from 'react';
import { Input } from "../../components/ui/input";
import axios from "axios";

const Bet = () => {
  const [position, setPosition] = useState("Select bet");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log(position)
    try{
      axios.post('/api/bet',
      {
        position: position,
        amount: amount
      })

      alert('bet successful.')
    }catch (e){
      console.log(e)
    }
  }
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 mt-24">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Musk v. Zuckerberg</h1>
        <p className="mt-4 text-gray-500">Bet on the cagefight.</p>
      </div>
      <form className="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
        <div className="ml-36">
        <BetDropDown position={position} setPosition={setPosition} />
        </div>
        <Input placeholder="Amount" className="col-span-3" onChange={(e) => setAmount(parseInt(e.target.value))} />
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 w-3/4">By betting on ZuskBet, you agree that we cannot be held accountable for any money loss.</p>
          <Button onClick={handleSubmit}>Pay</Button>
        </div>
      </form>

    </div>
  )
}

export default Bet