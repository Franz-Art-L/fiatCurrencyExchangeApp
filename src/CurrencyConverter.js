import React from "react";
import currencies from "./utils/currencies";
import { checkResponse, json } from './utils/fetchUtils';

class CurrencyConverter extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            rate: "",

            leftBaseCurrency: "USD",
            baseAmount: 1,

            rightQuoteCurrency: "PHP",
            quoteAmount: 0,

            date: new Date(),

            loading: false,
            error: '',
        }

    }

    componentDidMount() {
        const {leftBaseCurrency, rightQuoteCurrency} = this.state;
        this.getTheRates(leftBaseCurrency, rightQuoteCurrency);
    }

    getTheRates = (base, quote) => {
        this.setState({loading: true});
        fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}&to=${quote}`)
        .then(checkResponse)
        .then(json)
        .then(data => {
            console.log(data);
            if(data.error) {
                throw new Error(data.error);
            }
            
            const rate = data.rates[quote];

            this.setState({
                rate,
                baseAmount: 1,
                quoteAmount: Number((1 * rate).toFixed(3)),
                loading: false,      
            })
        })
        .catch(error => console.error(error.message));
    }

    changeBaseCurrency = event => {
       const leftBaseCurrency = event.target.value;
       this.setState({leftBaseCurrency});
       this.getTheRates(leftBaseCurrency, this.state.rightQuoteCurrency); 
    }

    changeQuoteCurrency = event => {
       const rightQuoteCurrency = event.target.value;
       this.setState({rightQuoteCurrency});
       this.getTheRates(this.state.leftBaseCurrency, rightQuoteCurrency);
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

    baseValueChange = event => {
        const quoteAmount = this.convert(event.target.value, this.state.rate, this.forTheQuote);
        this.setState({baseAmount: event.target.value, quoteAmount}); 
    }

    quoteValueChange = event => {
        const baseAmount = this.convert(event.target.value, this.state.rate, this.forTheBase);
        this.setState({quoteAmount: event.target.value, baseAmount});
    }
    



    render() {
        const {rate, leftBaseCurrency, baseAmount, rightQuoteCurrency, quoteAmount, date, loading } = this.state;

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
                            <select className="form-control text-center" value={leftBaseCurrency} disabled={loading} onChange={this.changeBaseCurrency}>{currencyToChooseFrom}</select>
                        </div>

                        <div className="col-4 col-xl-4 mx-auto mt-3 text-center">
                            <span id="swapLogo">🔁</span>
                        </div>

                        <div className="col-4 col-xl-4 mx-auto mt-3 text-center">
                        <select className="form-control text-center" value={rightQuoteCurrency} disabled={loading} onChange={this.changeQuoteCurrency}>{currencyToChooseFrom}</select>
                        </div>

                        <div className="container my-3 row-wrapper">
                                    <div className="row">
                                            <div className="col-6 col-xl-6 mx-auto">
                                                
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            {currencies[leftBaseCurrency].symbol}
                                                            <input type="number" className="form-control form-control-xl my-3" value={baseAmount} placeholder="0" min="0" onChange={this.baseValueChange}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                                <div className="col-6 col-xl-6 mx-auto">
                                        
                                                        <div className="input-group d-flex justify-content-end">
                                                            <div className="input-group-prepend">
                                                                <div className="input-group-text">
                                                                    {currencies[rightQuoteCurrency].symbol}
                                                                    <input type="number" value={quoteAmount}className="form-control form-control-xl my-3" placeholder="0" min="0" onChange={this.quoteValueChange}/>
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