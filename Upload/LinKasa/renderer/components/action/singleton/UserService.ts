import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import { roles } from "../../utils/const";

class UserService {
    static instance : UserService | null = null;
    userData : any = null;
    roles = roles;

    static getInstance(): UserService{
        if(!UserService.instance)
        {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    async fetchUserData()
    {
        const user = auth.currentUser;
        if(user)
        {
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnapShot = await getDoc(userDocRef);
            if(userDocSnapShot.exists())
            {
                console.log("Exist");
                
                this.userData = userDocSnapShot.data();
                return this.userData;
            }
            else
            {
                console.log("User data is not found in Firestore");
            }
        }
    }

    getUserID()
    {
        const user = auth.currentUser;
        if(user)
        {
            return user.uid;
        }
        else
        {
            return null;
        }
    }

    getUserFirstName() {
        if (this.userData) {
            const { firstname } = this.userData;
            return { firstname };
        } else {
            // Handle case where userData is not available
            return { firstname: null};
        }
    }

    getUserLastName() {
        if (this.userData) {
            const { lastname } = this.userData;
            return { lastname };
        } else {
            // Handle case where userData is not available
            return { lastname: null};
        }
    }

    getUserData() {
        return this.userData;
    }

    getUserDepartmentByRole(role){
        const roleInfo = this.roles.find(r => r.value === role);
        return roleInfo ? roleInfo.department : null;

    }
    
    getUserRole(){
        return this.userData.role;
    }
}

export default UserService;