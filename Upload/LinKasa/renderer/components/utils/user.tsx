import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const createFirebaseUser = async (email, password) => {
    const auth = getAuth();
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Firebase user created successfully");
    } catch (error) {
        console.error("Error creating Firebase user: ", error);
    }
};

export default createFirebaseUser;