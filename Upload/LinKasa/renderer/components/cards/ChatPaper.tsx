import React from 'react';
import { Paper, Typography } from '@mui/material';

const ChatPaper = ({ type, msg }) => {
  return (
    <div style={{ marginRight: '8px', display: 'inline-block' }}>
      <div style={{ 
        display: 'inline-block' ,
        }}>
        <Paper
          style={{
            color:!type ? 'black' : 'white',
            backgroundColor: !type ? '#f8f9fa' : '#414141',
            opacity: '0.85',
            padding: '6px 20px 6px 16px',
            display: 'flex',
            borderRadius: !type ? '0px 14px 14px 14px' : '14px 0px 14px 14px',
            boxShadow: '0px 0px 8px rgba(31, 38, 135, 0.15)',
          }}
        >
          <Typography sx={{ fontSize: '1rem', fontWeight: '500' }}>{msg}</Typography>
        </Paper>
      </div>
    </div>
  );
};

export default ChatPaper;
