import React from 'react';
import { Paper } from '@mui/material';

const SmallPaper = ({ children, flexDirection, height, marginLeft, marginRight }) => {
  return (
    <div style={{ width: '35%', marginRight: marginRight, marginLeft: marginLeft}}>
      <Paper style={{
         padding: '16px',  
         display: 'flex', 
         flexDirection: flexDirection,
         borderRadius: '12px', 
         boxShadow: '0px 0px 4px rgba(31, 38, 135, 0.1)', 
         overflow: 'auto',
        //  maxHeight: height,
         justifyContent:'space-between',
        height: height
        }}>
        {children}
      </Paper>
    </div>
  );
};

export default SmallPaper;