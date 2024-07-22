import React from 'react';
import { Paper } from '@mui/material';

const MediumPaper = ({ children, flexDirection, height}) => {
  return (
    <div style={{marginRight: '8px', width: '75%' }}>
      <Paper style={{ padding: '16px', height: height, display: 'flex', flexDirection: flexDirection, borderRadius: '12px', boxShadow: '0px 0px 4px rgba(31, 38, 135, 0.2)'}}>
        {children}
      </Paper>
    </div>
  );
};

export default MediumPaper;
