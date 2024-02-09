import * as React from 'react';
import { Input } from '@mui/base/Input';

export default function Searchbar({onChange}) {
  return (
    <React.Fragment>
      <Input
        slotProps={{ input: { className: 'CustomInputIntroduction' } }}
        aria-label="Demo input"
        placeholder="Enter location(e.g KICC Parking)"
        onChange={onChange}
      />
      <Styles />
    </React.Fragment>
  );
}

function Styles() {

  return (
    <style>
      {`
      .CustomInputIntroduction {
        width: 320px;
        display: flex;
        flex-direction: column;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        float: left;
        margin-left: 200px;
        width: 120%;
        margin-top: 20px;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid ;
        box-shadow: 0px 2px 4px rgba(0,0,0, 0.05);
        };
      }
      `}
    </style>
  );
}