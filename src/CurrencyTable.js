import React from 'react';

const CurrencyTable = props => {
    const {baseCurrency, exchangeRates} = props;

    if(!exchangeRates) {
        return null;
    }

    return(
        <>
        <table className='table table-sm bg-light mt-4'>
            <tbody>
                {exchangeRates.map(currency => 
                    <tr key={currency.acronym}>
                        <td className='pl-4 py-2'>
                            {currency.name}
                            <small>
                                ({currency.acronym})
                            </small>
                        </td>
                        <td className='text-right pr-4 py-2'>
                            {currency.rate.toFixed(6)}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    )
}

export default CurrencyTable;