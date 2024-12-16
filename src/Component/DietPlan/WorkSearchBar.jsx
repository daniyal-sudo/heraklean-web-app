import React from 'react';

const WorkSearchBar = () => {
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 search-work">
              <input
                type="text"
                className="form-control"
                placeholder="Search Here"
                aria-label="Search"
              />
            </div>
          </div>
        </div>
      );
    
};

export default WorkSearchBar;
