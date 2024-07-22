import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React from "react";
import { roles } from "../utils/const";
import { auth, db } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


export default function StaffForm(props)
{
    const {onSubmit, onUpdate, setOpenPopUp, staff, isEdit} = props;

    React.useEffect(() => {
        if (staff) {
            setName(staff.name);
            setAddress(staff.address);
            setEmail(staff.email);
            setGender(staff.gender);
            setRole(staff.role);
            setActive(staff.active);
        }else{
            handleReset();
        }
    }, [staff]);

    const handleReset = () => {
        setName('');
        setAddress('');
        setEmail('');
        setGender('');
        setRole('');
        setActive(false);
        console.log("handle reset");
    };

    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [role, setRole] = React.useState('');
    const [active, setActive] = React.useState(true);
    const [department, setDepartment] = React.useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value
        setRole(selectedRole);

        const roleObj = roles.find(role => role.value === selectedRole)
        if(roleObj)
        {
            setDepartment(roleObj.department);
            console.log(department);
        }
        else
        {
            setDepartment('-');
        }
    };

    const handleActiveChange = (value) => {
        setActive(value)
    }

    const handleButton = async () => {
        const staffData = {name, address, email, gender, role, active, department};

        const names = name.split(' ');
        try {
            if (isEdit) {
                console.log("Updating staff...");
                await onUpdate(staff.id, staffData);
            } else {
                console.log("Adding new staff...");
                try{
                    await createUserWithEmailAndPassword(auth,email,'123123')
                    .then((userCredentials) => {
                        const uid = userCredentials.user.uid;

                        setDoc(doc(db,"users",uid), {
                            firstname: names[0],
                            lastname: names[1] || '',
                            email: email,
                            role: role
                        })
                    });
                }
                catch(error){
                    console.log("error : ",error);
                    
                }

                await onSubmit(staffData);
            }
            console.log("Operation successful, closing dialog.");
            setOpenPopUp(false);
        } catch (error) {
            console.error('Error in operation: ', error);
        }
    };

    return(
        <div style={{
            display: "flex",
            flexDirection: 'row',
            width:'100%',
            gap: '1rem',
            padding:'0.5rem'
        }}>
            <div style={{
                display: "flex",
                flexDirection: 'column',
                width:'50%',
                gap:'1rem',
                justifyContent:'space-between',
            }}>
                <TextField id="outlined-basic" value={name} label="Name" variant="outlined" onChange={handleNameChange} />
                <TextField id="outlined-basic" value={address} label="Address" variant="outlined" onChange={handleAddressChange}/>
                <TextField id="outlined-basic" value={email} label="Email" variant="outlined" onChange={handleEmailChange}/>
            </div>
            <div style={{
                display: "flex",
                flexDirection: 'column',
                width:'50%',
                gap:'0.5rem',
                justifyContent:'space-between'
            }}>
                {/* Gender */}
                <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                        row
                        value={gender}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleGenderChange}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                
                {/* Role */}
                <FormControl>
                    <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={role}
                    label="Role"
                    onChange={handleRoleChange}
                    >
                    {roles.map((role) => (
                        <MenuItem value={role.value}>
                            {role.label}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>

                <div style={{
                    height:'20px'
                }}>
                </div>
                
               <div style={{
                    display:'flex',
                    flexDirection:'row',
                    gap:'1rem',
                    justifyContent:'flex-end',
                    margin:'0',
                    padding:'0',
               }}> 
                    <Button variant="contained" onClick={handleButton}>{isEdit ? 'Update' : 'Submit'}</Button>
                    <Button variant="outlined" onClick={() => handleReset()}>reset</Button>
                </div>
            </div>
        </div>
    )
}