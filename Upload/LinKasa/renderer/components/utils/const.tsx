import Chat from "../dashboard/chat"
import CrewInformation from "../dashboard/crewInformation"
import ViewFlightInformation from "../dashboard/flightInformation"
import JobVacancies from "../dashboard/jobVacancies"
import PassengerInformation from "../dashboard/passengerInformation"
import StaffInformation from "../dashboard/staffInformation"
import TestForm from "../dashboard/testForm"
import ViewSchedule from "../dashboard/viewSchedule"
import ViewWeather from "../information/viewWeather"

export const departments = [
    { value: 'CustomerService', description: 'Handles customer inquiries, complaints, and provides assistance.' },
    { value: 'Information', description: 'Provides information and guidance to visitors and staff.' },
    { value: 'LostAndFound', description: 'Manages items that are lost and found within the facility.' },
    { value: 'Operation', description: 'Oversees daily operational activities and logistics.' },
    { value: 'Flight', description: 'Manages flight-related operations, scheduling, and coordination.' },
    { value: 'Ground', description: 'Responsible for ground services and support for aircraft.' },
    { value: 'Landside', description: 'Manages landside operations including parking, traffic, and ground transportation.' },
    { value: 'Maintenance', description: 'Handles maintenance of facilities and equipment.' },
    { value: 'HumanResource', description: 'Manages employee relations, recruitment, and organizational development.' },
    { value: 'Security', description: 'Ensures safety and security of the premises and its occupants.' },
    { value: 'Engineering', description: 'Focuses on technical and engineering aspects of projects and facilities.' },
    { value: 'Logisctic', description: 'Manages logistics, supply chain, and transportation of goods.' },
    { value: 'Cargo', description: 'Handles the storage, transfer, and management of cargo.' },
    { value: 'Finance', description: 'Responsible for financial planning, management, and accounting.' }
];


export const roles=[
    {value: 'Customer Service Manager',label: 'Customer Service Manager',department :'CustomerService'},
    {value: 'Information Desk Staff',label: 'Information Desk Staff',department :'Information'},
    {value: 'Lost and Found Staff',label: 'Lost and Found Staff',department :'LostAndFound'},
    {value: 'Check In Staff',label: 'Check In Staff',department :'Security'},
    {value: 'Gate Agents',label: 'Gate Agents',department :'Gate'},
    {value: 'Airport Operations Manager',label: 'Airport Operations Manager',department :'Operation'},
    {value: 'Flight Operation Manager',label: 'Flight Operation Manager',department :'Flight'},
    {value: 'Ground Handling Manager',label: 'Ground Handling Manager',department :'Ground'},
    {value: 'Landside Operator Manager',label: 'Landside Operator Manager',department :'Landside'},
    {value: 'Maintenance Manager',label: 'Maintenance Manager',department :'Maintenance'},
    {value: 'Custom and Border Control Officer',label: 'Custom and Border Control Officer',department :'CustomerService'},
    {value: 'Human Resource Director',label: 'Human Resource Director',department :'HumanResource'},
    {value: 'Chief Security Officer/CSO',label: 'Chief Security Officer/CSO',department :'Security'},
    {value: 'Civil Engineering Manager',label: 'Civil Engineering Manager',department :'Engineering'},
    {value: 'Fuel Manager',label: 'Fuel Manager',department :'Operation'},
    {value: 'Logistic Manager',label: 'Logistic Manager',department :'Logistic'},
    {value: 'Cargo Handler',label: 'Cargo Handler',department :'Cargo'},
    {value: 'Cargo Manager',label: 'Cargo Manager',department :'Cargo'},
    {value: 'Baggage Security Supervisor',label: 'Baggage Security Supervisor',department :'Security'},
    {value: 'Chief Operation Offcier/COO',label: 'Chief Operation Offcier/COO',department :'Operation'},
    {value: 'Airport Director/CEO',label: 'Airport Director/CEO',department :'CEO'},
    {value: 'Chief Financial Officer/CFO',label: 'Chief Financial Officer/CFO',department :'Finance'},
]

export const featureComponents = {
    chat : Chat,
    flight : ViewFlightInformation,
    weather : ViewWeather,
    staff : StaffInformation,
    test : TestForm,
    job : JobVacancies,
    schedule : ViewSchedule,
    crew : CrewInformation,
    passenger : PassengerInformation
}

export const roleFeatureAccess = { 
    'Customer Service Manager': ['flight', 'chat', 'test'],
    'Information Desk Staff': ['weather', 'staff','chat'],
    'Lost and Found Staff': ['chat', 'weather','staff','job','test','schedule'],
    'user' : ['chat'],
    'Human Resource Director' : ['staff','chat'],
    'Flight Operation Manager' : ['flight', 'crew','chat'],
    'Custom and Border Control Officer' : ['chat','passenger'],
    'Check In Staff' : ['chat', 'flight','passenger'],
    'Chief Security Officer/CSO' : ['chat'],
    'Civil Engineering Manager' : ['chat'],
    'Cargo Manager' : ['chat'],
    'Logistic Manager' : ['chat'],
    'Gate Agents' : ['chat', 'flight' ,'passenger'],
    'Ground Handling Manager' : ['chat','schedule'],
    'Landside Operator Manager' : ['chat', 'schedule'],
    'Baggage Security Supervisor' : ['chat'],
    'Cargo Handler' : ['chat'],
    'Chief Operation Offcier/COO' : ['chat','flight','schedule'],
    'Airport Operations Manager' : ['chat', 'weather','flight'],
    'Maintenance Manager' : ['chat', 'schedule']
}