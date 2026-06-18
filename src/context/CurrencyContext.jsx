import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext({ currency: 'AED', setCurrency: () => {} });

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(
    () => localStorage.getItem('crm_currency') || 'AED'
  );

  function setCurrency(c) {
    setCurrencyState(c);
    localStorage.setItem('crm_currency', c);
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
