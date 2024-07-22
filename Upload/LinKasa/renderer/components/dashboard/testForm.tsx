import BroadcastForm from "../action/broadcastForm";
import FlightPopUpForm from "../action/flightPopUpForm";
import JobForm from "../action/jobForm";
import PassportForm from "../action/passportForm";
import ScheduleForm from "../action/scheduleForm";
import StaffForm from "../action/staffForm";
import VisaForm from "../action/visaForm";
import CustomDeclarationForm from "./customDeclarationForm";

export default function TestForm()
{
    return(
        <div>
            testing staff form
            <StaffForm/>
            flight form here
            <FlightPopUpForm/>
            insert broadcast form here
            <BroadcastForm/>
            job vacancies form here
            <JobForm/>
            passport form start here
            <PassportForm/>
            visa form start here
            <VisaForm/>
            custom declaration start here
            <CustomDeclarationForm/>
        </div>
    )
}