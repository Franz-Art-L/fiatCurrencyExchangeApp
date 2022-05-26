import React from "react";
import { checkResponse, json } from "./utils";

class CurrencyConverter extends React.Component {
    constructor(props) {
        super();
        
        this.state = {
            listOfCurrencies: [],
            leftBaseCurrency: "USD",
            currencyRight: "PHP",
            amountToBeExchange: 0,
            resultOfConversion: '',
            rates: [],
            error: '',
        }

        this.getRates = this.getRates.bind(this);
        this.changeInputAmount = this.changeInputAmount.bind(this);
        this.rightCurrencyDropDown = this.rightCurrencyDropDown.bind(this);
        this.leftCurrencyDropDown = this.leftCurrencyDropDown.bind(this);
        this.switchCurrencies = this.switchCurrencies.bind(this);
        this.conversionCalculator = this.conversionCalculator.bind(this);

    }

    componentDidMount() {
            const {leftBaseCurrency} = this.state;
            this.getRates(leftBaseCurrency);
    }

    changeInputAmount(event) {
        
    }

    getRates() {
        fetch(`https://altexchangerateapi.herokuapp.com/latest?from={leftBaseCurrency}`)
        .then(checkResponse)
        .then(json)
        .then(data => {
            console.log(data);
            this.setState({rates: data})
        }).catch(error => {
            console.log(error.message)
            this.setState({error: error})
        })
    }


    rightCurrencyDropDown() {

    }

    leftCurrencyDropDown() {

    }

    switchCurrencies() {

    }

    conversionCalculator() {
       
    }


    render() {
        const {leftBaseCurrency, currencyRight } = this.state;

        return(
            <>
                <div className="container my-3 row-wrapper">
                    <div className="row">
                        <div className="col-4 col-xl-4 mx-auto mt-3 text-center">
                            <h4>{leftBaseCurrency}</h4>
                            <select name="currencies" id="currencyChoices" className=""></select>
                        </div>
                        <div className="col-4 col-xl-4 mx-auto mt-3 text-center">
                            <button className="btn btn-md btn-outline-dark" onClick={this.switchCurrencies}>🔁</button>
                        </div>
                        <div className="col-4 col-xl-4 mx-auto mt-3 text-center">
                            <h4>{currencyRight}</h4>
                            <select name="currencies" id="currencyChoices" className=""></select>
                        </div>
                        <div className="row text-center">
                            <div className="col-6 col-xl-6 mx-auto mt-4 text-center">
                                <input type="number" className="form-control form-control-xl my-3" placeholder="1" min="0" onChange={this.changeInputAmount}/>
                            </div>
                            <div className="col-6 col-xl-6 mx-auto mt-4 disabled text-center">
                                <input type="number" className="form-control form-control-xl my-3" placeholder readOnly value=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default CurrencyConverter;