import {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  query,
  onSnapshot,
  QuerySnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.js";
import React, { useEffect } from "react";
import ViewFlight from "../information/viewFlight";
import FlightForm from "../action/newFlightForm";
import MediumPaper from "../cards/FlexiblePaper";
import dayjs from "dayjs";
import { Flight } from "@mui/icons-material";

//Update [Belum Di buat]
export default function ViewFlightInformation() {
  const [flights, setFlights] = React.useState([]);
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [selectedFlight, setSelectedFlight] = React.useState();

  // Generate FlightID Unique

  React.useEffect(() => {
    const flightCollectionRef = collection(db, "flights");

    const unsubscribe = onSnapshot(flightCollectionRef, (snapshot) => {
      const updatedFlights = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFlights(updatedFlights);
    });

    return () => unsubscribe();
  }, []);

  //Add
  const addFlight = async (newFlight) => {
    await addDoc(collection(db, "flights"), newFlight);
  };

  //On Click Edit
  const onClickEdit = (flight) => {
    setSelectedFlight(flight);
    setOpenPopUp(true);
    console.log(flight);
  };

  //Update
  const updateFlight = async (id, newFlight) => {
    try {
      console.log("Updating data . . . ");
      const staffDoc = doc(db, "flights", id);
      await updateDoc(staffDoc, newFlight);
    } catch (error) {
      console.error("Error updating flight : ", error);
    }
  };

  //On click Delete
  const deleteFlight = async (flight) => {
    await deleteDoc(doc(db, "flights", flight));
  };

  const onClickDelete = async (flight) => {
    try {
      await deleteFlight(flight);
      // onFlightDelete(flight);
      console.log("Deleting : ", flight);
    } catch (error) {
      console.log("Error Deleting :", error);
    }
  };

  const dummyFlights = [
    {
      airline: "Garuda Indonesia",
      serialNumber: "SN001",
      arrival: "New York",
      departure: "London",
      departureTime: dayjs().format(),
      arrivalTime: dayjs().format(),
      status: "arrived",
      gate: "G11",
    },
    {
      airline: "Batik Airline",
      serialNumber: "SN002",
      arrival: "Los Angeles",
      departure: "Tokyo",
      departureTime: dayjs().format(),
      arrivalTime: dayjs().format(),
      status: "cancelled",
      gate: "F12",
    },
    {
      airline: "Jet Super",
      serialNumber: "SN003",
      arrival: "Paris",
      departure: "Berlin",
      departureTime: dayjs().format(),
      arrivalTime: dayjs().format(),
      status: "on-going",
      gate: "A02",
    },
    {
      airline: "Air Asia",
      serialNumber: "SN004",
      arrival: "Sydney",
      departure: "Auckland",
      departureTime: dayjs().format(),
      arrivalTime: dayjs().format(),
      status: "on-going",
      gate: "B03",
    },
    {
      airline: "Lion Air",
      serialNumber: "SN005",
      arrival: "Toronto",
      departure: "Mexico City",
      departureTime: dayjs().format(),
      arrivalTime: dayjs().format(),
      status: "delayed",
      gate: "A15",
    },
  ];

  const generateDummyData = () => {
    dummyFlights.forEach(async (newFlight) => {
      try {
        await addFlight(newFlight);
        console.log("Flight inputted : ", newFlight);
      } catch {
        console.log("Flight failed to input");
      }
    });
  };

  return (
    <div style={{}}>
      <button onClick={generateDummyData}>Generate Data</button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Large Paper - View */}
        <ViewFlight
          flights={flights}
          onUpdate={updateFlight}
          onDelete={onClickDelete}
          onClick={onClickEdit}
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          selectedFlight={selectedFlight}
        />
        {/* Small Paper - Insert */}
        <FlightForm addFlight={addFlight} />
      </div>
      <div
        style={{
          marginTop: "2rem",
        }}
      >
        {/* Large Paper Wide - Detail */}
        <MediumPaper
          height={"320px"}
          width={"100%"}
          flexDirection={"row"}
          color={"white"}
        >
          <h1>Hello</h1>
        </MediumPaper>
      </div>
    </div>
  );
}
