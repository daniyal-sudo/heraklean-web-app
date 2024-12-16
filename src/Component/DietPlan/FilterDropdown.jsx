import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import IconDropdown from './IconDropdown';

const FilterDropdown = () => {
  const [selectedItem, setSelectedItem] = useState('Chest Filter');

  const items = ['Chest', 'Biceps', 'Quads', 'Back', 'Hamstring', 'Calves', 'ABS', 'Shoulder'];

  const handleSelect = (item) => {
    setSelectedItem(item); // Select kiya hua item update karein
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="info"
        id="dropdown-basics"
        className="rounded-pill text-white"
      >
 
        {selectedItem}
        <IconDropdown />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item key={index} onClick={() => handleSelect(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterDropdown;
