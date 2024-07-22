import React from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import MediumPaper from "../cards/FlexiblePaper";
import PopUp from "../action/popUp";
import JobForm from "../action/jobForm";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import dayjs from "dayjs";

export default function JobVacancies() {
  //State handler
  const [jobs, setJobs] = React.useState([]);
  const [selectedJob, setSelectedJob] = React.useState([]);
  const [openPopUp, setOpenPopUp] = React.useState(false);

  //Add
  const addJob = async (newJob) => {
    try {
      await addDoc(collection(db, "jobs"), newJob);
    } catch (error) {
      console.log(error);
    }
  };

  //Update
  const updateJob = async (id, newJob) => {
    try {
      const staffDoc = doc(db, "jobs", id);
      await updateDoc(staffDoc, newJob);
    } catch (error) {
      console.error("Error updating job : ", error);
    }
  };

  const OnClickEdit = (job) => {
    setSelectedJob(job);
    setOpenPopUp(true);
  }

  const onClickAdd = () => {
    setSelectedJob(null);
    setOpenPopUp(true);
  }

  //Delete
  const deleteJob = async (id) => {
    await deleteDoc(doc(db, "jobs", id));
  };

  React.useEffect(() => {
    const staffCollectionRef = collection(db, "jobs");

    const unsubscribe = onSnapshot(staffCollectionRef, (snapshot) => {
      const updatedJobs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(updatedJobs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{
      height:'75vh',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      overflow:'hidden'
    }}>
      <div style={{}}>
        <Grid container spacing={2}>
          {jobs.map((job, index) => (
            <Grid item xs={4} key={index}>
              <MediumPaper
                width={"100%"}
                height={"14rem"}
                color={"black"}
                flexDirection={"row"}
              >
                <div
                  style={{
                    padding: "0.25rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      style={{
                        padding: "0",
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        textAlign: "center",
                        color:'white'
                      }}
                    >
                      {job.role}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      gap: "0.75rem",
                      color:'white'
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        Description
                      </Typography>
                      <Typography style={{
                      }}>{job.description}</Typography>
                    </div>
                    <div
                      style={{
                        width: "50%",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                        }}
                      >
                        Last Submission
                      </Typography>
                      <Typography>
                        {dayjs(job.date).format("DD-MM-YYYY")}
                      </Typography>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      gap:'0.5rem'
                    }}
                  >
                    <Button onClick={() => OnClickEdit(job)} variant="outlined" color="success">edit</Button>
                    <Button onClick={() => deleteJob(job.id)} variant="outlined" color="error" >delete</Button>
                  </div>
                </div>
              </MediumPaper>
            </Grid>
          ))}
        </Grid>
        <PopUp  
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          title={"Job Vacancies"}
        >
          <JobForm
            onSubmit={addJob}
            setOpenPopUp={setOpenPopUp}
            onUpdate={updateJob}
            job={selectedJob}
            isEdit={selectedJob != null}
          />
        </PopUp>
      </div>
      <div style={{
          display:'flex',
          flexDirection:'column',
          alignItems:'flex-end',
          height:'10%'
        }}>
          <IconButton
            onClick={() => onClickAdd()}
          >
            <AddCircleIcon 
              sx={{
                color:'green',
                fontSize:'3rem'
              }}
            />
          </IconButton>
        </div>
    </div>
  );
}
