import React from 'react';
import { Paper } from '@mui/material';

const LargePaper = ({ children, flexDirection, height, marginLeft, marginRight }) => {
  return (
    <div style={{ width: '65%', marginRight: marginRight, marginLeft: marginLeft}}>
      <Paper style={{
         height: height,
         padding: '16px',  
         display: 'flex', 
         flexDirection: flexDirection,
         borderRadius: '12px', 
         boxShadow: '0px 0px 4px rgba(31, 38, 135, 0.1)', 
         overflow: 'hidden'}
         }>
        {children}
      </Paper>
    </div>
  );
};

export default LargePaper;
