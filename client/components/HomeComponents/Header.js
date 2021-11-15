import React from 'react';

const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <p>Welcome Home.</p>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
