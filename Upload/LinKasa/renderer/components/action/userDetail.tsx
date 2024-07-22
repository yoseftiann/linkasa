import React, { useEffect } from "react";
import { auth } from "../../firebase/firebase";

const getUser = () => {

}

export default function UserDetail(){
    const [currentUser, setCurrentUser] = React.useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })

        return unsubscribe;
    }, []);


}