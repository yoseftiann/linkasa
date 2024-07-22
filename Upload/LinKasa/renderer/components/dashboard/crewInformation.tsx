import {
    Button,
  Chip,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import MediumPaper from "../cards/FlexiblePaper";
import Title from "../utils/title";
import React from "react";
import PopUp from "../action/popUp";
import CrewForm from "../action/crewForm";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

// Color Map
const getChipColor = (status) => {
  if (status === "pilot") {
    return "#ffe6e2"; // red
  } else if (status === "flight crew") {
    return "#e0f6e8"; // green
  } else if (status === "cabin crew") {
    return "#e0f6e8"; // green
  }
};

//Text Color Map
const getTextColor = (status) => {
  if (status === "pilot") {
    return "#ffe6e2"; // red
  } else if (status === "flight crew") {
    return "#e0f6e8"; // green
  } else if (status === "cabin crew") {
    return "#e0f6e8"; // green
  }
};

export default function CrewInformation() {
  const [crews, setCrews] = React.useState([]);
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [selectedCrew, setSelectedCrew] = React.useState();

  //On Click Add
  const onClickAdd = () => {
    setOpenPopUp(true);
    setSelectedCrew(null);
  };

  //Add
  const addCrew = async (newFlight) => {
    await addDoc(collection(db, "crews"), newFlight);
  };

  //Update
  const updateCrew = async (id, newCrew) =>
  {
      try{
          console.log("Updating data . . . ");
          const crewDoc = doc(db, 'crews', id);
          await updateDoc(crewDoc, newCrew);
      }catch(error){
          console.error('Error updating flight : ', error)
      }
  }

  //On Click Edit
  const onClickEdit = (crew) => {
    setSelectedCrew(crew);
    setOpenPopUp(true);
  }

  //Delete
  const deleteFlight = async (crew) => {
    await deleteDoc(doc(db, "crews", crew));
  };

  //On Click Delete
  const onClickDelete = async (crew) => {
    try{
        await deleteFlight(crew);

        console.log('Deleting : ', crew);
    }catch(error){
        console.log('Error Deleting :', error);
    }
  }

  //Use effect to fetch
  React.useEffect(() => {
    const crewCollectionRef = collection(db, "crews");

    const unsubscribe = onSnapshot(crewCollectionRef, (snapshot) => {
      const updatedCrew = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCrews(updatedCrew);
    });

    return () => unsubscribe();
  }, []);

  return (
    <MediumPaper
      width={"100%"}
      height={"600px"}
      color={"white"}
      flexDirection={"column"}
    >
      <div
        style={{
          maxHeight: "auto",
          overflow: "hidden",
        }}
      >
        <div style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            padding:'0.5rem'
        }}>
          <Title>Crew Data</Title>
          <Button onClick={() => onClickAdd()}>New Crew Data</Button>
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
                Gender
              </TableCell>
              <TableCell
                sx={{
                  color: "#626263",
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "#f5f6f8",
                }}
              >
                Assigned To
              </TableCell>
              <TableCell
                sx={{
                  color: "#626263",
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "#f5f6f8",
                }}
              >
                Position
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
            {crews.map((row) => (
              <TableRow key={row.id}>
                {/* Gate */}
                <TableCell>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={row.name} />
                  </ListItem>
                </TableCell>
                {/* Departure / Time */}
                <TableCell>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={row.age} />
                  </ListItem>
                </TableCell>
                {/* Arrival / Time */}
                <TableCell>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={row.gender} />
                  </ListItem>
                </TableCell>
                {/* Serial Number */}
                <TableCell>
                  <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={row.flight ? row.flight : "null"} />
                  </ListItem>
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.position}
                    sx={{
                      backgroundColor: getChipColor(row.active),
                      color: getTextColor(row.active), // Set the text color
                      fontWeight: "bold",
                    }}
                  />
                </TableCell>
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
          title={"Crew Detail"}
        >
          <CrewForm 
          setOpenPopUp={setOpenPopUp} 
          onSubmit={addCrew} 
          onUpdate={updateCrew}
          crew={selectedCrew}
          isEdit={selectedCrew != null}
          />
        </PopUp>
      </div>
    </MediumPaper>
  );
}
