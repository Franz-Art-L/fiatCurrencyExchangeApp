import React, { useState } from 'react';

const Navbar = props => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className='container-fluid'>
                <a className="navbar-brand font-weight-bolder d-flex justify-content-start" href="/">
                    <span className="">myFiatExchange🔁</span>
                </a>
                  
            <button className="custom-toggler navbar-toggler" 
            type="button" 
            data-toggle="collapse" data-target="#navbarsExample09" 
            aria-controls="navbarsExample09" 
            aria-expanded={!isNavCollapsed ? true : false} 
            aria-label="Toggle navigation" onClick={handleNavCollapse}>
                <span className="navbar-toggler-icon"></span>
            </button>

            
                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarsExample09">
                        <div className='d-flex flex-wrap'>
                        <a className="nav-link text-info" href="#converter">Converter</a>
                            <a className="nav-link text-info" href="#chart">Chart</a>
                            <a className="nav-link text-info" href="#exchange-rate">Exchange Rate</a>
                            <a className="nav-link text-info" href="#contact-me">Contact Me</a>
                        </div>
                    </div>
        </div>
    
      
    </nav>
  );
}

export default Navbar;