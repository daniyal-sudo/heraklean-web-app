import React from 'react';

const WorkSearchBar = () => {
      return (
          <div className="row justify-content-center mt-3">
            <div className="search-work">
              <input
                type="text"
                className="form-control"
                placeholder="Search Here"
                aria-label="Search"
              />
            </div>
          </div>
      );
    
};

export default WorkSearchBar;
