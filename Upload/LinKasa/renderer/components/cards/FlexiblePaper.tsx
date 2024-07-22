import React from 'react';
import { Paper } from '@mui/material';

const MediumPaper = ({ children, flexDirection, height, width, color}) => {
  return (
    <div style={{marginRight: '8px', width: width }}>
      <Paper 
        style={{ 
          backgroundColor: color,
          opacity: '0.85',
          padding: '16px', 
          height: height, 
          display: 'flex', 
          flexDirection: flexDirection,
          borderRadius: '12px', 
          boxShadow: '0px 0px 4px rgba(31, 38, 135, 0.1)', 
          // backgroundImage: 'linear-gradient(180deg, #719499 0%, #2A3D51 100%)'
        }}
      >
        {children}
      </Paper>
    </div>
  );
};

export default MediumPaper;
