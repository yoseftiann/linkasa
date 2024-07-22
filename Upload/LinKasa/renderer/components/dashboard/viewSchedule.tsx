import {
  Button,
  Chip,
  IconButton,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import MediumPaper from "../cards/FlexiblePaper";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";
import PopUp from "../action/popUp";
import ScheduleForm from "../action/scheduleForm";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { VariantProps } from "@nextui-org/react";

// Color Map
const getChipColor = (status) => {
  if (status === "staff") {
    return "#5FBDFF";
  } else if (status === "applicant") {
    return "#7360DF";
  } else if (status === "all") {
    return "#57375D";
  }
};

//Text Color Map
const getTextColor = (status) => {
  if (status === "staff") {
    return "#C5FFF8";
  } else if (status === "applicant") {
    return "#F2AFEF";
  } else if (status === "all") {
    return "#FFC8C8";
  }
};

export default function ViewSchedule() {
  const [schedules, setSchedules] = React.useState([]);
  const [selectedSchedule, setSelectedSchedule] = React.useState();
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [filter, setFilter] = React.useState("all");

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  //Filter
  const filteredSchedules = schedules.filter((schedule) => {
    if (filter === "all") {
      return true;
    }
    return schedule.participant === filter;
  });

  //On Click
  const onClickAdd = () => {
    setSelectedSchedule(null);
    setOpenPopUp(true);
  };

  const onClickEdit = (schedule) => {
    setSelectedSchedule(schedule);
    setOpenPopUp(true);
  };

  //Generate Unique ID
  const generateUniqueId = () => {
    const randomString = Math.random().toString(36).substring(2, 8);

    const timestamp = new Date().getTime().toString(36);

    return "sc" + randomString + timestamp;
  };

  //Add
  const addSchedule = async (newSchedule) => {
    try {
      await addDoc(collection(db, "schedules"), newSchedule);
      console.log(newSchedule);
    } catch (error) {
      console.log(error);
    }
  };

  //Delete
  const deleteSchedule = async (id) => {
    try {
      await deleteDoc(doc(db, "schedules", id));
      console.log("deleted");
    } catch (error) {
      console.log("error : ", error);
    }
  };

  //Update
  const updateSchedule = async (id, newSchedule) => {
    try {
      const staffDoc = doc(db, "schedules", id);
      await updateDoc(staffDoc, newSchedule);
    } catch (error) {
      console.error("Error updating job : ", error);
    }
  };

  //Use Effect
  React.useEffect(() => {
    const staffCollectionRef = collection(db, "schedules");

    const unsubscribe = onSnapshot(staffCollectionRef, (snapshot) => {
      const updatedSchedules = snapshot.docs.map((doc) => ({
        firestoreID: doc.id,
        ...doc.data(),
      }));
      setSchedules(updatedSchedules);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <MediumPaper
        width={"100%"}
        height={"640px"}
        color={"white"}
        flexDirection={"column"}
      >
        <div style={{
            height:'90%',
            overflow:'auto'
        }}>
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
                  Activity / ID
                </TableCell>
                <TableCell
                  sx={{
                    color: "#626263",
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "#f5f6f8",
                  }}
                >
                  Date & Time
                </TableCell>
                <TableCell
                  sx={{
                    color: "#626263",
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "#f5f6f8",
                  }}
                >
                  Location
                </TableCell>
                <TableCell
                  sx={{
                    color: "#626263",
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "#f5f6f8",
                  }}
                >
                  Participant
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
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  {/* Activity / ID */}
                  <TableCell>
                    <ListItem sx={{ py: 1, px: 0 }}>
                      <ListItemText
                        primary={schedule.activity}
                        secondary={schedule.id}
                        primaryTypographyProps={{
                          sx: { fontWeight: "bold" },
                        }}
                      />
                    </ListItem>
                  </TableCell>
                  {/* Arrival / Time */}
                  <TableCell>
                    <ListItem sx={{ py: 1, px: 0 }}>
                      <ListItemText
                        primary={schedule.date}
                        secondary={schedule.time}
                      />
                      {/* secondary time */}
                    </ListItem>
                  </TableCell>
                  {/* Location */}
                  <TableCell>
                    <ListItem sx={{ py: 1, px: 0 }}>
                      <ListItemText primary={schedule.location} />
                    </ListItem>
                  </TableCell>
                  {/* Remarks */}
                  <TableCell align="left">
                    <Chip
                      label={schedule.participant}
                      sx={{
                        backgroundColor: getChipColor(schedule.participant),
                        color: getTextColor(schedule.participant), // Set the text color
                        fontWeight: "bold",
                      }}
                    />
                  </TableCell>
                  {/* Actions */}
                  <TableCell align="right">
                    <EditRoundedIcon
                      onClick={() => onClickEdit(schedule)}
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
                      onClick={() => deleteSchedule(schedule.firestoreID)}
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
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: "10%",

          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={filter}
            exclusive
            onChange={handleFilterChange}
            aria-label="Platform"
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="staff">Staff</ToggleButton>
            <ToggleButton value="applicant">Applicant</ToggleButton>
          </ToggleButtonGroup>
          <IconButton onClick={() => onClickAdd()}>
            <AddCircleIcon
              sx={{
                color: "green",
                fontSize: "3rem",
              }}
            />
          </IconButton>
        </div>
        <PopUp
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          title={"Schedule Detail"}
        >
          <ScheduleForm
            onSubmit={addSchedule}
            setOpenPopUp={setOpenPopUp}
            generateID={generateUniqueId}
            onUpdate={updateSchedule}
            schedule={selectedSchedule}
            isEdit={selectedSchedule != null}
          />
        </PopUp>
      </MediumPaper>
    </div>
  );
}
