import React,{ useState} from 'react';
import PropTypes from 'prop-types';
import { Select as BaseSelect} from '@mui/base/Select';
import { Option as BaseOption} from '@mui/base/Option';
import { styled } from '@mui/system';
import '../reviews.css'

export default function Dropdown({setLocation, locationOptions}) {
    const [value, setValue] = useState(10);

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
    /**
     * The components used for each slot inside the Select.
     * Either a string to use a HTML element or a component.
     * @default {}
     */
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

const Option = styled(BaseOption)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }
    `,
);