import React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="d-flex justify-content-center align-items-center searchbar-section">
      <InputGroup className='no-padding-right' style={styles.inputGroup}>
        <FormControl
          placeholder="Search here"
          aria-label="Search"
          aria-describedby="search-icon"
          style={styles.input}
        />
        <Button variant="link" style={styles.searchButton} id="search-icon">
          <FaSearch style={styles.icon} />
        </Button>
      </InputGroup>
    </div>
  );
};

const styles = {
  inputGroup: {
    overflow: 'hidden',
    background: '#F9F9F9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '540px',
    height: '56px',
    borderRadius: '53px',
    position: 'relative',
  },
  input: {
    border: 'none',
    height: '100%',
    borderTopLeftRadius: '25px',
    borderBottomLeftRadius: '25px',
    paddingLeft: '15px',
    outline: 'none',
    fontSize: '16px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    lineHeight: '24px',
    textAlign: 'left',
    paddingRight: '0px !important',
  },
  searchButton: {
    backgroundColor: '#4CAFEB',
    height: '47px',
    width: '47px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '25px',
    border: 'none',
    position: 'relative',
    right: '9px',
    top: '5px',

  },
  icon: {
    color: '#fff',
    fontSize: '20px',
  },
};

export default SearchBar;
