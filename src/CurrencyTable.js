import React from 'react';

const CurrencyTable = props => {
    const {exchangeRates} = props;

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
                            <em>{currency.name}</em>
                            <b>
                               <span> </span> ({currency.acronym})
                            </b>
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