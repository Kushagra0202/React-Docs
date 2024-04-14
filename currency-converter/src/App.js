import React, { useState } from 'react'
import './index.css'
import InputBox from './Components/InputBox';
import useCurrencyinfo from './useCurrencyinfo';

export default function App() {

   // const[count,setCount] = useState(0);
    const[to,setTo]       = useState("inr");
    const[from,setFrom]   = useState("usd");
    const[amount,setAmount] = useState(0);
    const[convertedAmount,setconvertedAmount] = useState(0);
    const currencyinfo = useCurrencyinfo(from);

    const options = Object.keys(currencyinfo);

    const swap = () => {
        setTo(from);
        setFrom(to);
        setAmount(convertedAmount);
        setconvertedAmount(amount);
    }
    

    const convert = ()=>{
        setconvertedAmount(amount*currencyinfo[to])
    }

  return (
    <>
<div className='w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat' style={{backgroundImage: 'url("https://media.istockphoto.com/id/1404404925/vector/business-candle-stick-graph-chart-of-stock-market-investment-trading-on-blue-background.jpg?s=1024x1024&w=is&k=20&c=4_p1-yjdDXETi0dPFg65J7pl6Vt7cfM1AYJNJDwWOr0=")'}}>
        <div className='w-full'>
            <div className='w-full max-w-wd mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm  bg-white/30'>
             <form onSubmit={(e) =>{
                e.preventDefault();
                convert();
             }}>
                <div className='w-full mb-1'>
                    <InputBox
                    label="From"
                    amount={amount}
                    currencyOptions={options}
                    onCurrencyChange={(currency)=>setAmount(amount)}
                    selectCurrency={from}
                    onAmountChange={(amount) => setAmount(amount)}
                    />
                </div>
                <div className='relative w-full h-0.5 flex justify-center items-center'>
                    <button 
                     type='button'
                     className='absolute  border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 flex flex-wrap justify-center items-center'
                     onClick={swap}
                     style={{ top: '50%', transform: 'translateY(-50%)' }}
                    >
                        swap
                    </button>
                </div>
                <div className='w-full mb-1'>
                    <InputBox
                     label="to"
                     amount={convertedAmount}
                     currencyOptions={options}
                     onCurrencyChange={(currency)=>setTo(currency)}
                     selectCurrency={to}
                    />
                </div>
                <div className='relative w-full h-0.5 flex justify-center items-center'>
                <button 
                     type='submit'
                     className=' border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5  hover:bg-blue-700 hover:text-gray-100 hover:shadow-lg transition duration-300 ease-in-out'
                    >
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </div>
               
             </form>
            </div>
        </div>
    </div> 
    </>
  )
}
