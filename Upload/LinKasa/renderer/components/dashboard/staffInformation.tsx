import {
  Chip,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import React from "react";
import MediumPaper from "../cards/FlexiblePaper";
import StaffForm from "../action/staffForm";
import PopUp from "../action/popUp";
import Title from "../utils/title";

// Color Map
const getChipColor = (status) => {
  if (status === false) {
    return "#ffe6e2"; // red
  } else if (status === true) {
    return "#e0f6e8"; // green
  }
};

//Text Color Map
const getTextColor = (status) => {
  if (status === false) {
    return "#b71d18"; // red
  } else if (status === true) {
    return "#128d57"; // green
  }
};

export default function StaffInformation() {
  const [staff, setStaff] = React.useState([]);
  const [openPopUp, setOpenPopUp] = React.useState(false);

  //State handler
  const [selectedStaff, setSelectedStaff] = React.useState(null);

  React.useEffect(() => {
    const staffCollectionRef = collection(db, "staffs");

    const unsubscribe = onSnapshot(staffCollectionRef, (snapshot) => {
      const updatedStaffs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStaff(updatedStaffs);
    });

    return () => unsubscribe();
  }, []);

  //On click Delete
  const deleteStaff = async (id) => {
    await deleteDoc(doc(db, "staffs", id));
  };

  const onClickDelete = async (id) => {
    try {
      //Delete as Staff
      await deleteStaff(id);

      console.log("Deleting : ", id);
    } catch (error) {
      console.log("Error Deleting :", error);
    }
  };

  //On Click Edit
  const onClickEdit = (staff) => {
    setSelectedStaff(staff);
    setOpenPopUp(true);
    console.log(staff);
  };

  const onClickAdd = () => {
    setSelectedStaff(null);
    setOpenPopUp(true);
  };

  //Add
  const addStaff = async (newStaff) => {
    try {
      await addDoc(collection(db, "staffs"), newStaff);
    } catch (error) {
      console.error(error);
    }
  };

  //Update
  const updateStaff = async (id, newStaff) => {
    try {
      const staffDoc = doc(db, "staffs", id);
      await updateDoc(staffDoc, newStaff);
    } catch (error) {
      console.error("Error updating staff : ", error);
    }
  };

  // Create dummy data for staff
  const dummyStaffs = [
    {
      name: "John Doe",
      gender: "female",
      email: "xxx@gmail.com",
      department: "HRD",
      role: "HRD",
      address: "123 Maple Street",
      active: true,
    },
    {
      name: "Jane Smith",
      gender: "male",
      email: "xxx@gmail.com",
      department: "Finance",
      role: "Accountant",
      address: "456 Oak Avenue",
      active: true,
    },
    {
      name: "William Johnson",
      gender: "male",
      email: "xxx@gmail.com",
      department: "Marketing",
      role: "Brand Manager",
      address: "789 Pine Road",
      active: false,
    },
    {
      name: "Patricia Brown",
      gender: "female",
      email: "xxx@yahoo.com",
      department: "Sales",
      role: "Sales Representative",
      address: "321 Birch Blvd",
      active: true,
    },
    {
      name: "Michael Davis",
      gender: "other",
      email: "xxx@yahoo.com",
      department: "IT",
      role: "Systems Analyst",
      address: "654 Cedar Lane",
      active: false,
    },
  ];

  const generateDummyData = () => {
    dummyStaffs.forEach(async (newStaff) => {
      try {
        await addStaff(newStaff);
        console.log("Flight inputted : ", newStaff);
      } catch {
        console.log("Flight failed to input");
      }
    });
  };

  return (
    <MediumPaper
      width={"100%"}
      height={"640px"}
      color={"white"}
      flexDirection={"column"}
    >
      <button onClick={generateDummyData}>Generate Data</button>
      <button onClick={() => onClickAdd()}>Create Data</button>
      <div
        style={{
          maxHeight: "auto",
          overflow: "auto",
        }}
      >
        <div>
          <Title>Staff Employee</Title>
        </div>

        {/* Table */}
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "#626263",
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "#f5f6f8",
                  borderRadius: "8px 0 0 8px",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#626263",
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "#f5f6f8",
                }}
              >
                Age
              </TableCell>
              <TableCell
                sx={{
                  color: "#626263",
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "#f5f6f8",
                }}
              >
                Department
              </TableCell>
              <TableCell
                sx={{
                  color: "#626263",
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "#f5f6f8",
                }}
              >
                Role
              </TableCell>
              <TableCell
                sx={{
                  color: "#626263",
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "#f5f6f8",
                }}
              >
                Address
              </TableCell>
              <TableCell
                sx={{
                  color: "#626263",
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "#f5f6f8",
                  borderRadius: "0 8px 8px 0",
                }}
                align="right"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((row) => (
              <TableRow key={row.id}>
                {/* Gate */}
                <TableCell>
                  <Chip
                    label={row.name}
                    sx={{
                      backgroundColor: getChipColor(row.active),
                      color: getTextColor(row.active), // Set the text color
                      fontWeight: "bold",
                    }}
                  />
                </TableCell>
                {/* Departure / Time */}
                <TableCell>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={row.email} />
                  </ListItem>
                </TableCell>
                {/* Arrival / Time */}
                <TableCell>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={row.department} />
                  </ListItem>
                </TableCell>
                {/* Serial Number */}
                <TableCell>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={row.role} />
                  </ListItem>
                </TableCell>
                {/* Remarks */}
                <TableCell align="left">{row.address}</TableCell>
                {/* Actions */}
                <TableCell align="right">
                  <EditRoundedIcon
                    onClick={() => onClickEdit(row)}
                    sx={{
                      color: "#bbbbbb",
                      paddingX: "1px",
                      marginRight: "1px",
                      "&:hover": {
                        color: "#6a6a6a",
                      },
                    }}
                  />
                  <DeleteRoundedIcon
                    onClick={() => onClickDelete(row.id)}
                    sx={{
                      color: "#efbbb8",
                      paddingX: "1px",
                      marginRight: "1px",
                      "&:hover": {
                        color: "red",
                      },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PopUp
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          title={"Staff Detail"}
        >
          <StaffForm
            key={selectedStaff ? selectedStaff.id : "new"}
            onUpdate={updateStaff}
            onSubmit={addStaff}
            setOpenPopUp={setOpenPopUp}
            staff={selectedStaff}
            isEdit={selectedStaff != null}
            role={"HRD"}
          />
        </PopUp>
      </div>
    </MediumPaper>
  );
}
