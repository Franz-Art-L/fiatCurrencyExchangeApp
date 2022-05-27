import React from "react";
import currencies from "./utils/currencies";

class ExchangeRateList extends React.Component {
    constructor() {
        super();
        this.state = {
            baseCurrency: 'USD',
            exchangeRates: null,
        }

        this.changeInputAmount = this.changeInputAmount.bind(this);
     
    }

    changeInputAmount() {

    }

    changeBaseCurrency = event => {
        this.setState({baseCurrency: event.target.value});
    }

    render() {
        const {baseCurrency, exchangeRates} = this.state;
        return(
            <>
                 <div className="container my-3 row-wrapper">
                    <h2 className="text-center">Exchange Rates</h2>
                     <div className="row">
                            <div className="row text-center">
                                    <div className="col-6 col-xl-6 mx-auto mt-4 text-center">
                                        <input type="number" className="form-control form-control-xl my-3" placeholder="1" min="0" onChange={this.changeInputAmount}/>
                                    </div>
                                    <div className="col-6 col-xl-6 mx-auto mt-4 disabled text-center">
                                        <form className="p-3 bg-light form-inline justify-content-center">

                                            <select value={baseCurrency} onChange={this.changeBaseCurrency} className="form-control form-control-lg mb-2">

                                            {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}

                                            </select>

                                        </form>
                                    </div>
                                </div>                        
                                


                        
                     </div>
                 </div>
            </>
        )
    }
}

export default ExchangeRateList;