import { useId } from "react";
import { useTheme } from '@mui/material/styles';

// reusable component
function InputBox({ label, amount, onAmountChange, onCurrencyChange, currOptions = [], selectCurrency = 'usd', currencyDisable = false, amountDisable = false }) {
      const amountInputId = useId();

      //conditional styling for light, dark mode
      const theme = useTheme();
      const isDarkMode = theme.palette.mode === 'dark';

      return (
            <div className={`w-80 p-2 m-2 flex flexwrap rounded-lg justify-between ${isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}>
                  <div className={`p-2  flex flex-col ${isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}>
                        <label className="font-Poppins font-medium" htmlFor={amountInputId}> {label}</label>
                        <input
                              id={amountInputId}
                              type="number"
                              placeholder="amount"
                              value={amount}
                              disabled={amountDisable}
                              className={`w-40 outline-none ${isDarkMode ? 'bg-zinc-700 text-white' : ''}`}
                              onChange={(e) => {
                                    onAmountChange && onAmountChange(Number(e.target.value));
                              }} />
                  </div>

                  <div className={`relative p-2 ${isDarkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}>
                        <label className="text-sm font-Poppins font-medium" htmlFor="From"><p>Currency Type</p> </label>
                        <select
                              name=""
                              id=""
                              className={`w-20 mt-3  outline-none rounded-lg p-1 float-right ${isDarkMode ? 'bg-zinc-700 text-white' : ''}`}
                              value={selectCurrency}
                              disabled={currencyDisable}
                              onChange={(e) => {
                                    onCurrencyChange && onCurrencyChange(e.target.value);
                              }}
                              onMouseEnter={(e) => { e.target.style.cursor = 'pointer' }}>

                              {/* creation of dropdown menu using javascript loop */}
                              {currOptions.map((currency) => {
                                    return (
                                          <option className={`${isDarkMode ? 'bg-zinc-700 text-white' : ''}`} key={currency} value={currency}>{currency}</option>
                                    )
                              })}
                        </select>
                  </div>
            </div>
      )
}
export default InputBox;