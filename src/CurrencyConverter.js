import React from "react";
import currencies from "./utils/currencies";
import { checkResponse, json } from "./utils/fetchUtils";

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

    render() {
        const {rate, leftBaseCurrency, baseAmount, rightQuoteCurrency, quoteAmount, loading, error, date  } = this.state;

        const currencyOptions = Object.keys(currencies).map(currencyAcronym => 
        <option key={currencyAcronym} value={currencyAcronym}>
        {currencyAcronym}
        </option>);
        
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
                            <h4>{leftBaseCurrency}</h4>
                            <select name="currencies" id="currencyChoices" className=""></select>
                        </div>
                        <div className="col-4 col-xl-4 mx-auto mt-3 text-center">
                            <button className="btn btn-md btn-outline-dark" onClick={this.switchCurrencies}>🔁</button>
                        </div>
                        <div className="col-4 col-xl-4 mx-auto mt-3 text-center">
                            <h4>{rightQuoteCurrency}</h4>
                            <select name="currencies" id="currencyChoices"></select>
                        </div>
                        <div className="row text-center">
                            <div className="col-6 col-xl-6 mx-auto mt-4 text-center">
                                <input type="number" className="form-control form-control-xl my-3" placeholder="0" min="0" onChange={this.changeInputAmount}/>
                            </div>
                            <div className="col-6 col-xl-6 mx-auto mt-4 disabled text-center">
                                <input type="number" className="form-control form-control-xl my-3" placeholder="0" onChange={this.changeInputAmount}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default CurrencyConverter;