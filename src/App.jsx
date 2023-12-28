import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './App.css'

function App() {
  const [amount , setAmount] = useState('')
  const [convertedAmount , setConvertedAmount] = useState('')
  const [from , setFrom] = useState("usd")
  const [to , setTo] = useState("inr")

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo) 

  const swap =()=>{
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convert = () =>{
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://c4.wallpaperflare.com/wallpaper/163/392/912/map-wold-map-technology-world-wallpaper-preview.jpg')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        convert();
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            selectCurrency={from}
                            currencyOptions={options}
                            onCurrencyChange={(currency)=>setAmount(currency)}
                            onAmountChange={(amount)=>setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                            
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            selectCurrency={to}
                            currencyOptions={options}
                            onCurrencyChange={(currency)=>setTo(currency)}
                            amountDisable
                            
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        {`convert ${to} to ${from}`}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App
