
import { useState } from 'react';
import UseCurrencyInfo from '../hooks/UseCurrencyInfo';
import InputBox from './InputBox';
import { useTheme } from '@mui/material/styles';
import SwapVertIcon from '@mui/icons-material/SwapVert';

function CurrencyConverter() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = UseCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  //conditional styling for light, dark mode
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className={`p-6 rounded-lg shadow-md ${isDarkMode? 'bg-zinc-700' : 'bg-gray-200'}`}>
        <div className='flex flex-col'>
          <InputBox
            label='From'
            amount={amount}
            currOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(amount) => setAmount(amount)}
          />
          <div className='mt-3 flex justify-center'>
            <button className= {`${isDarkMode? 'bg-blue-300 text-zinc-800' : 'bg-blue-500 text-white'} px-4 py-2 rounded-md`} style = {{marginTop:'-28px', marginBottom : '-15px',zIndex : '1'}} onClick={() => swap()}>
              Swap <SwapVertIcon/>
            </button>
          </div>
          
          <InputBox
            label='To'
            amount={convertedAmount}
            onAmountChange={(convertedAmount) => setConvertedAmount(convertedAmount)}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            currOptions={options}
            amountDisable
            
          />
          <div className='mt-3 flex justify-center'>
            <button
              className={` px-4 py-2 rounded-md ${isDarkMode? 'bg-blue-300 text-zinc-800' : 'bg-blue-500 text-white'}`}
              onClick={() => setConvertedAmount(amount * currencyInfo[to])}
            >
              Convert {from.toUpperCase()} To {to.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
