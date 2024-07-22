import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

export default function PopUp(props)
{
    const {title, children, openPopUp, setOpenPopUp} = props;
    return (
        <Dialog open={openPopUp} maxWidth="md" sx={{ '& .MuiDialog-paper': { width: '100%', height: 'auto' } }}>
            {/* Title */}
            <DialogTitle>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'space-between'
                }}>
                    <Typography variant="h6" component="div" style={{
                        flexGrow:'1'
                    }}>
                        {title}
                    </Typography>
                    <IconButton aria-label="cancel" size="small" style={{
                        color: '#9A031E'
                    }}
                    onClick={() => setOpenPopUp(false)}
                    >
                        <CancelIcon fontSize="medium"/>
                        {/* <CancelIcon/> */}
                    </IconButton>
                </div>
            </DialogTitle>
            {/* Content */}
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}