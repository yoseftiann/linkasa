import MuiDrawer from '@mui/material/Drawer';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import List from '@mui/material/List';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import React from 'react';
import { ListItem, Typography } from '@mui/material';
import DrawerItemList from './drawerItemList';
import DrawerDivider from './textDivider';
import Image from 'next/image'
import { roleFeatureAccess } from '../utils/const';
import { Inbox } from '@mui/icons-material';


const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  })
);

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
    }),
  );

const MiniDrawer = (props) => {
   const {drawerOpen, onSelectContent, userRole} = props;
   const [activeItem, setActiveItem] = React.useState('');

    const handleListItemClick = (item) => {
      console.log(item);
      
      setActiveItem(item);
      onSelectContent(item);
    };

    // Mapping Icon From Text


    return (
        <Drawer 
          variant="permanent" 
          open={drawerOpen}
          sx={{
            '& .MuiDrawer-paper': {
              borderWidth: 0,
              boxSizing: 'border-box',
              backgroundColor: 'rgba(248,249,250,255)'
            },
            border:"none"
          }}
        >
        <DrawerHeader>
          {/* masukin logo */}
          <div style={{
            width: '240px',
            height: '120px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <Image 
              style={{
                  backgroundColor: 'rgba(248,249,250,255)'
              }}
              src='/images/LinKasa_logoBG.png'
              width='100%'
              height='100%'
              alt="LinKasa_Logo"
            />
            <div
            style={{
              flexGrow: '1',
              // backgroundColor: 'red'
            }}>
              <Typography style={{
                fontWeight: 'bold',
                fontSize: '24px',
                textAlign: 'center'
              }}>
                LINKASA
              </Typography>
              <Typography style={{
                fontWeight: '500',
                fontSize: '14px',
                letterSpacing: '6px',
                textAlign: 'center'
              }}>
                airport
              </Typography>
            </div>
          </div>

        </DrawerHeader>
        {/* <Divider /> */}
        <DrawerDivider
            text={"DASHBOARD"}
            open={drawerOpen}
        />
        {/* Rendering Condition */}
        <List>
          {roleFeatureAccess[userRole]?.map(featureKey => {
            return(
              <DrawerItemList
              key={featureKey}
              title={featureKey}
              referencedTo={`/${featureKey.toLowerCase()}`}
              IconComponent={Inbox}
              open={drawerOpen}
              isActive={activeItem === `/${featureKey.toLowerCase()}`}
              onClick={() => handleListItemClick(`/${featureKey.toLowerCase()}`)}
            />
            )
          })}
        </List>

        {/* <List>
          {['Flight', 'Weather', 'Staff', 'Test'].map((text, index) => (
            <DrawerItemList
                key={text}
                title={text}
                referencedTo={`/${text.toLowerCase()}`}
                IconComponent={index % 2 === 0 ? InboxIcon : MailIcon}
                open={drawerOpen}
                isActive={activeItem === `/${text.toLowerCase()}`}
                onClick={() => handleListItemClick(`/${text.toLowerCase()}`)}
            />
          ))}
        </List> */}
        {/* <DrawerDivider
            text={"OTHERS"}
            open={drawerOpen}
        /> */}
        {/* <List>
          {['Chat','All Mail', 'Spam'].map((text, index) => (
            <DrawerItemList
                key={text}
                title={text}
                referencedTo={`/${text.toLowerCase()}`}
                IconComponent={index % 2 === 0 ? InboxIcon : MailIcon}
                open={drawerOpen}
                isActive={activeItem === `/${text.toLowerCase()}`}
                onClick={() => handleListItemClick(`/${text.toLowerCase()}`)}
            />
          ))}
        </List> */}
      </Drawer>
    );
}
export default MiniDrawer;