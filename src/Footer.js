import React from "react";

const Footer = () => {
    return (
      <>
         <footer id="contactMe" className="footer mt-auto py-3 border-top">
          <div className="row pt-2">
            <div className="col-6">

              <div className="text-center ms-4 pt-3">
                © <a href="https://confident-murdock-8e5bba.netlify.app/"
                    target="_blank"rel="noopener noreferrer"><em>Francis Artemio Landia </em>
                  </a>
              
                <p>2022</p>
              </div>

              </div>

          <div className="col-6 text-center">
            <a
              href="https://github.com/Franz-Art-L"
              className="btn btn-default"
              id="github"
              target="_blank"
              rel="noopener noreferrer">

              <span>Github</span>

            </a>
            
            <a
              href="https://www.linkedin.com/in/francis-artemio-landia-9a1375123/"
              className="btn btn-default"
              id="Linkedin"
              target="_blank"
              rel="noopener noreferrer">

              <span>Linkedin</span>

            </a>
            </div>
          
        </div>
      </footer>
      </>
      
      
    );
  };
  
  export default Footer;