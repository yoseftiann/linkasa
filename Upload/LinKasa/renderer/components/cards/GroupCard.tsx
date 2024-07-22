import { Avatar, Typography } from "@mui/material";

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = [];
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color.push(value);
    }
    /* eslint-enable no-bitwise */
  
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.75)`
  }

function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width:'28px',
        height:'28px',
        fontSize: '0.85rem',
        fontWeight : 'bold'
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`,
    };
  }

export default function GroupCard({group, onclick}){
    return (
        <div key={group.id} style={{
            display:'flex',
            flexDirection: 'row',
            justifyContent:'flex-start',
            alignItems:'center',
            paddingTop:'0.75rem',
            gap:'1rem'
        }}
        onClick={() => onclick(group)}
        >
            <Avatar {...stringAvatar(group.name)} variant="rounded"/>
            <Typography sx={{
                fontSize: '0.9rem',
                fontWeight:'500',
                color:'white'
            }}>{group.name}</Typography>
        </div>
    )
}