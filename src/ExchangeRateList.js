import React from "react";
import currencies from "./utils/currencies";
import {checkResponse, json } from './utils/fetchUtils';
import CurrencyTable from "./CurrencyTable";

class ExchangeRateList extends React.Component {
    constructor() {
        super();
        this.state = {
            baseCurrency: 'USD',
            exchangeRates: null,
            loading: true,
        }
     
    }

    componentDidMount() {
        this.getTheDataOfRates(this.state.baseCurrency);
    }

    getTheDataOfRates = baseCurrency => {
        this.setState({loading: true})
        fetch(`https://www.frankfurter.app/latest?from=${baseCurrency}`)
        .then(checkResponse)
        .then(json)
        .then(data => {
            if(data.error) {
                throw new Error(data.error);
            }
            
            const exchangeRates = Object.keys(data.rates)
            .filter(acronym => acronym !== baseCurrency)
            .map(acronym => ({
                acronym,
                rate: data.rates[acronym],
                name: currencies[acronym].name,
                symbol: currencies[acronym].symbol,
            }))

            
            this.setState({exchangeRates, loading: false});
        })
        .catch(error => console.error(error.message));
    }

    changeBaseCurrency = event => {
        this.setState({baseCurrency: event.target.value});
        this.getTheDataOfRates(event.target.value);
    }
    
    render() {
        const {baseCurrency, exchangeRates, loading} = this.state;
        return(
            <>
                 <div className="container my-3 row-wrapper" id="exchangeRateList">
                     <div className="row">

                        <div className="col-6 col-xl-6 mx-auto mt-4 pt-3 disabled text-center">
                            
                            <h5>1 {baseCurrency}</h5>
                            
                            <h5>Exchange Rates</h5>
                        
                        </div>

                        <div className="col-6 col-xl-6 mx-auto mt-4 disabled text-center">
                            <form className="p-3 bg-light form-inline justify-content-center" id="baseCurrencyForm">
                                
                                <h5>Base Currency</h5>

                                <select value={baseCurrency} onChange={this.changeBaseCurrency} className="form-control form-control-md text-center mb-2" disabled={loading}>
                                {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
                                </select>

                            </form>
                        </div>  

                        <CurrencyTable baseCurrency={baseCurrency} exchangeRates={exchangeRates}/> 
                        
                     </div>                      
                </div>
            </>
        )
    }
}

export default ExchangeRateList;