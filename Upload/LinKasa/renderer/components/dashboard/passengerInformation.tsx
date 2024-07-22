import {
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import React from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import PopUp from "../action/popUp";
import VisaForm from "../action/visaForm";
import PassportForm from "../action/passportForm";
import CustomDeclarationForm from "./customDeclarationForm";

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

export default function PassengerInformation() {
  const [passengers, setPassengers] = React.useState([]);
  const [selectedPassenger, setSelectedPassenger] = React.useState();
  const [openVisaPopUp, setOpenVisaPopUp] = React.useState(false);
  const [openPassportPopUp, setOpenPassportPopUp] = React.useState(false);
  const [visa, setVisa] = React.useState({});
  const [passport, setPassport] = React.useState({});
  const [customDeclaration, setCustomDeclaration] = React.useState({});
  const [openCustomDeclarationPopUp, setOpenCustomDeclarationPopUp] =
    React.useState(false);

  //Handler
  const handleVisaClick = async (passenger) => {
    setSelectedPassenger(passenger);
    const visaData = await searchByPassengerID(passenger.id, "visas");
    setVisa(visaData);
    setOpenVisaPopUp(true);
  };

  const handlePassportClick = async (passenger) => {
    setSelectedPassenger(passenger);
    const passportData = await searchByPassengerID(passenger.id, "passports");
    setPassport(passportData);
    setOpenPassportPopUp(true);
  };

  const handleCustomDeclarationClick = async (passenger) => {
    setSelectedPassenger(passenger);
    const customDeclarationData = await searchByPassengerID(passenger.id, "customDeclarations");
    setCustomDeclaration(customDeclarationData);
    setOpenCustomDeclarationPopUp(true);
  };

  //Add
  const addPassenger = async (newPassenger) => {
    try {
      await addDoc(collection(db, "passengers"), newPassenger);
    } catch (error) {
      console.error(error);
    }
  };

  const generateDummyData = () => {
    console.log("ini dummy: ", dummyPassenger);

    dummyPassenger.forEach(async (newPassenger) => {
      try {
        await addPassenger(newPassenger);
      } catch (error) {
        console.log(error);
      }
    });
  };

  //Check
  const checkForVisa = async (passengerID) => {
    const visaCollectionRef = collection(db, "visas");
    const q = query(visaCollectionRef, where("passengerID", "==", passengerID));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  };
  
  const checkForPassport = async (passengerID) => {
    const passportCollectionRef = collection(db, "passports");
    const q = query(passportCollectionRef, where("passengerID", "==", passengerID));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  };
  
  const checkForCustomDeclaration = async (passengerID) => {
    const customDeclarationCollectionRef = collection(db, "customDeclarations");
    const q = query(customDeclarationCollectionRef, where("passengerID", "==", passengerID));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.size > 0)
    {
      return querySnapshot.docs[0].data();
    }
    else{
      return null;
    }
  };
  

  //Use effect
  React.useEffect(() => {
    const staffCollectionRef = collection(db, "passengers");
  
    const unsubscribe = onSnapshot(staffCollectionRef, async (snapshot) => {
      const updatedPassengers = await Promise.all(snapshot.docs.map(async (doc) => {
        const passengerData = doc.data();
        const passengerID = doc.id;
  
        // Check for each document
        const hasVisa = await checkForVisa(passengerID);
        const hasPassport = await checkForPassport(passengerID);
        const customDeclarationData = await checkForCustomDeclaration(passengerID);

        const countryToVisit = customDeclarationData ? customDeclarationData.country || '-' : '-';
        const purposeOfVisit = customDeclarationData ? customDeclarationData.purpose || '-' : '-';
  
        return {
          id: passengerID,
          ...passengerData,
          visa : hasVisa,
          passport : hasPassport,
          custom_declaration : !!customDeclarationData,
          countryToVisit,
          purposeOfVisit
        };
      }));
  
      setPassengers(updatedPassengers);
      console.log(passengers);
      
    });
  
    return () => unsubscribe();
  }, []);
  

  //Searching
  const searchByPassengerID = async (passengerID, collectionName) => {
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, where("passengerID", "==", passengerID));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 1) {
        const docSnapshot = querySnapshot.docs[0];
        const docData = docSnapshot.data();
        return { id: docSnapshot.id, ...docData };
      } else {
        console.log("No matching document found");
        return null;
      }
    } catch (error) {
      console.error("Error searching data:", error);
      return null;
    }
  };

  //Add
  const addNew = async (newData, collectionName) => {
    try {
      await addDoc(collection(db, collectionName), newData);
    } catch (error) {
      console.log("error while adding to ", collectionName);
    }
  };

  //Update
  const updateCollection = async (id, newData, collectionName) => {
    try {
      console.log(id);
      const staffDoc = doc(db, collectionName, id);
      await updateDoc(staffDoc, newData);
    } catch (error) {
      console.error("Error updating : ", error);
    }
  };

  //Delete Passenger
  const deletePassenger = async (id) => {
    await deleteDoc(doc(db, "passengers", id));
  };

  //OnClick Delete
  const onClickDelete = async (id) => {
    try {
      //Delete
      await deletePassenger(id);

      console.log("Deleting : ", id);
    } catch (error) {
      console.log("Error Deleting :", error);
    }
  };

  const dummyPassenger = [
    {
      name: "Victor Halim",
      gender: "male",
      age: "21",
      visa: false, //reference to visa database
      passport: false, //reference to passport database
      custom_declaration: false, //reference to custom_declaration database
    },
    {
      name: "Eldrian Daniswara",
      gender: "male",
      age: "19",
      visa: false, //reference to visa database
      passport: false, //reference to passport database
      custom_declaration: false, //reference to custom_declaration database
    },
  ];

  return (
    <div>
      <button onClick={generateDummyData}>generateDummyData</button>
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
              Country To Visit
            </TableCell>
            <TableCell
              sx={{
                color: "#626263",
                border: "none",
                boxShadow: "none",
                backgroundColor: "#f5f6f8",
              }}
            >
              Purpose Of Visit
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "#626263",
                border: "none",
                boxShadow: "none",
                backgroundColor: "#f5f6f8",
              }}
            >
              Visa
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "#626263",
                border: "none",
                boxShadow: "none",
                backgroundColor: "#f5f6f8",
              }}
            >
              Passport
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "#626263",
                border: "none",
                boxShadow: "none",
                backgroundColor: "#f5f6f8",
              }}
            >
              Custom Declaration
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
          {passengers.map((row) => (
            <TableRow key={row.id}>
              {/* Name */}
              <TableCell>
                <Chip
                  label={row.name}
                  sx={{
                    backgroundColor: getChipColor(row.active),
                    color: getTextColor(row.active),
                    fontWeight: "bold",
                  }}
                />
              </TableCell>
              {/* Country to Visit */}
              <TableCell>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={row.countryToVisit} />
                </ListItem>
              </TableCell>
              {/* Purpose of Visit */}
              <TableCell>
                <ListItem sx={{ py: 1, px: 0 }}>
                  <ListItemText primary={row.purposeOfVisit} />
                </ListItem>
              </TableCell>
              {/* Visa */}
              <TableCell align="center">
                {row.visa === true ? (
                  <CheckCircleIcon sx={{
                    color:'green'
                  }} onClick={() => handleVisaClick(row)} />
                ) : (
                  <ErrorIcon sx={{
                    color:'red'
                  }} onClick={() => handleVisaClick(row)} />
                )}
              </TableCell>
              {/* Passport */}
              <TableCell align="center">
                {row.passport === true ? (
                  <CheckCircleIcon sx={{
                    color:'green'
                  }} onClick={() => handlePassportClick(row)} />
                ) : (
                  <ErrorIcon sx={{
                    color:'red'
                  }} onClick={() => handlePassportClick(row)} />
                )}
              </TableCell>
              {/* Custom Declaration */}
              <TableCell align="center">
                {row.custom_declaration === true ? (
                  <CheckCircleIcon sx={{
                    color:'green'
                  }}
                    onClick={() => handleCustomDeclarationClick(row)}
                  />
                ) : (
                  <ErrorIcon sx={{
                    color:'red'
                  }}
                    onClick={() => handleCustomDeclarationClick(row)}
                  />
                )}
              </TableCell>
              {/* Actions */}
              <TableCell align="right">
                <EditRoundedIcon
                  //   onClick={() => onClickEdit(row)}
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
      {/* Visa */}
      <PopUp
        openPopUp={openVisaPopUp}
        setOpenPopUp={setOpenVisaPopUp}
        title={"Visa Detail"}
      >
        <VisaForm
          passenger={selectedPassenger}
          onSubmit={addNew}
          onUpdate={updateCollection}
          setOpenPopUp={setOpenVisaPopUp}
          isEdit={visa != null}
          visa={visa ? visa : null}
        />
      </PopUp>
      <PopUp
        openPopUp={openPassportPopUp}
        setOpenPopUp={setOpenPassportPopUp}
        title={"Passport Detail"}
      >
        <PassportForm 
          passenger={selectedPassenger}
          onSubmit={addNew}
          onUpdate={updateCollection}
          setOpenPopUp={setOpenPassportPopUp}
          isEdit={passport != null}
          passport={passport ? passport : null}
        />
      </PopUp>
      <PopUp
        openPopUp={openCustomDeclarationPopUp}
        setOpenPopUp={setOpenCustomDeclarationPopUp}
        title={"Custom Declaration Detail"}
      >
        <CustomDeclarationForm 
          passenger={selectedPassenger}
          onSubmit={addNew}
          onUpdate={updateCollection}
          setOpenPopUp={setOpenCustomDeclarationPopUp}
          isEdit={customDeclaration != null}
          customDeclaration={customDeclaration ? customDeclaration : null}
        />
      </PopUp>
    </div>
  );
}
