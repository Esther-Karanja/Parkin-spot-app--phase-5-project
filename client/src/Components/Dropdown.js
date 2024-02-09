import React,{ useState} from 'react';
import PropTypes from 'prop-types';
import { Select as BaseSelect} from '@mui/base/Select';
import { Option} from '@mui/base/Option';
import { styled } from '@mui/system';
import '../reviews.css'

export default function Dropdown({setLocation, locationOptions}) {
    const [value, setValue] = useState("");

    const handleSelect = (newValue) => {
        setValue(newValue) 
        setLocation(newValue)
    }

  
    return (
      <div className='locations-dropdown'>
        <Select value={value} onChange={(_, newValue) => {handleSelect(newValue)}}>
            {locationOptions.map((locationOption) => {
                return (<Option key={locationOption.id} value={locationOption.location}>
                    {locationOption.location}
                 </Option>)})}
        </Select>
      </div>
    );
  }

  function Select(props) {
    const slots = {
      listbox: Listbox,
      ...props.slots,
    };
  
    return <BaseSelect {...props} slots={slots} />;
  }
  
  Select.propTypes = {
    slots: PropTypes.shape({
      listbox: PropTypes.elementType,
      popup: PropTypes.elementType,
      root: PropTypes.elementType,
    }),
  };

  const Listbox = styled('ul')(
    () => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 320px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: white;
    `,
);