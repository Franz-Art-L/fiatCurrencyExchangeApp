import React from "react";
import currencies from "./utils/currencies";
import { checkResponse, json } from './utils/fetchUtils';

class CurrencyConverter extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            rate: 52.2480,

            leftBaseCurrency: "USD",
            baseAmount: 0,

            rightQuoteCurrency: "PHP",
            quoteAmount: 0,

            date: new Date(),

            loading: false,
            error: '',
        }

    }

    changeBaseCurrency(event) {
        this.setState({leftBaseCurrency: event.target.value});
    }

    changeQuoteCurrency(event) {
        this.setState({rightQuoteCurrency: event.target.value});
    }

    forTheBase(amount, rate) {
        return amount * (1 / rate);
    }

    forTheQuote(amount, rate) {
        return amount * rate;
    }

    convert(amount, rate, equation) {
        const input = parseFloat(amount);
        if(Number.isNaN(input)) {
            return "";
        }
        return equation(input, rate).toFixed(3);
    }

    baseValueChange(event) {
        const quoteAmount = this.convert(event.target.value, this.state.rate, this.forTheQuote);
        this.setState({baseAmount: event.target.value, quoteAmount}); 
    }

    quoteValueChange(event) {
        const baseAmount = this.convert(event.target.value, this.state.rate, this.forTheBase);
        this.setState({quoteAmount: event.target.value, baseAmount});
    }
    



    render() {
        const {rate, leftBaseCurrency, baseAmount, rightQuoteCurrency, quoteAmount, date, loading, error  } = this.state;

        const currencyToChooseFrom = Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)
        
        return(
            <>
                <div className="text-center p-3">

                <h3 className="mb-2">🏦Fiat Currency Converter💱</h3>
                
                <p className="text-center">{date.toLocaleDateString()}</p>

                <h4>1 {leftBaseCurrency} to 1 {rightQuoteCurrency} = {rate} {currencies[rightQuoteCurrency].name}</h4>

                </div>
                <div className="container my-3 row-wrapper" id="currencyConverter">
                    <div className="row">

                        <div className="col-4 col-xl-4 mx-auto mt-3 text-center">
                            <select className="form-control text-center" value={leftBaseCurrency} disabled={loading}>{currencyToChooseFrom}</select>
                        </div>

                        <div className="col-4 col-xl-4 mx-auto mt-3 text-center">
                            <button className="btn btn-md btn-outline-dark" onClick={this.switchCurrencies}>🔁</button>
                        </div>

                        <div className="col-4 col-xl-4 mx-auto mt-3 text-center">
                            <select className="form-control text-center" value={rightQuoteCurrency} disabled={loading}>{currencyToChooseFrom}</select>
                        </div>

                        <div className="container my-3 row-wrapper">
                                    <div className="row">
                                            <div className="col-6 col-xl-6 mx-auto mt-0 text-center">
                                                
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            {currencies[leftBaseCurrency].symbol}<input type="number" className="form-control form-control-xl my-3" placeholder="0" min="0" onChange={this.baseValueChange}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                            </div>

                                                <div className="col-6 col-xl-6 mx-auto mt-0 disabled text-center">
                                        
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    {currencies[rightQuoteCurrency].symbol}<input type="number" className="form-control form-control-xl my-3" placeholder="0" min="0" onChange={this.quoteValueChange}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                 </div>
                                        </div>
                            </div>
                
                    </div>
                </div>
            </>
        )
    }

}

export default CurrencyConverter;