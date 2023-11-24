// import { useProfileContext } from '../hooks/useProfileContext';
// import moment from 'moment-timezone';
// import { useTheme } from '@mui/material/styles';
// import { useEffect } from 'react';
// import { useAuthContext } from '../hooks/useAuthContext';
// function Profile () {
//     const {profileInfo, dispatch} = useProfileContext()
//     const {user}= useAuthContext();
//     //console.log(profileInfo)

//     //conditional styling for light, dark mode
//     const theme = useTheme();
//     const isDarkMode = theme.palette.mode === 'dark';

//     const utcTimestamp = profileInfo &&  profileInfo.dateOfBirth;
//     const newTimestamp = moment(utcTimestamp).tz('Asia/Kolkata');
//     const dateTime= newTimestamp.format("dddd, MMMM D, YYYY")
//     useEffect(()=>{
//         const getProfile = async () => {
//           console.log("fetched profile")
    
//           const email = user.email
//           console.log(email)
//           const encodedEmail = encodeURIComponent(email);
//           const response = await fetch(`http://localhost:4000/api/profile/getProfile?email=${encodedEmail}`)
//           const json = await response.json()
    
//           if (response.ok) {
//             dispatch({ type: 'PROFILEADDED', payload: json })
//           }
//         }
//         if (user) {
//           getProfile()
//         }
      
//     }, []);

//     return profileInfo ? (
//         <> 
//         <div className={`profile ${isDarkMode? 'bg-zinc-700' : 'bg-white'}`}>
//             <div className="px-4">
//             <h1 className = "flex flex-wrap justify-center text-3xl font-light font-serif py-2">My Profile</h1>
//                 <p className="flex flex-wrap justify-center    ">Personal details.</p>
//             </div>
//             <div className="flex flex-wrap justify-center mt-6 border-t-2 border-gray-300">
//                 <dl className="divide-y divide-gray-300">
//                     <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                         <dt className=" font-semibold leading-6 ">Full name</dt>
//                         <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.name}</dd>
//                     </div>
//                     <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                         <dt className=" font-semibold leading-6 ">Date of Birth</dt>
//                         <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{dateTime}</dd>
//                     </div>
//                     <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                         <dt className=" font-semibold leading-6 ">Gender</dt>
//                         <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.gender}</dd>
//                     </div>
//                     <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                         <dt className=" font-semibold leading-6 ">Mobile Number</dt>
//                         <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.contactNumber}</dd>
//                     </div>
//                     <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                         <dt className=" font-semibold leading-6 ">Currency</dt>
//                         <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.currency}</dd>
//                     </div>
//                     <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                         <dt className=" font-semibold leading-6 ">Monthly Salary</dt>
//                         <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.monthlySalary}</dd>
//                     </div>
//                     <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                         <dt className=" font-semibold leading-6 ">Monthly Expense (Expected)</dt>
//                         <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.monthlyExpense}</dd>
//                     </div>
//                     <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
//                         <dt className=" font-semibold leading-6 ">Address</dt>
//                         <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.city},  {profileInfo.state},  {profileInfo.country}</dd>
//                     </div>
//                 </dl>
//             </div>
//         </div>

//         </>
//     ) : (
//         <div><h1>Hello</h1></div>
//     )
// }

// export default Profile


import { useProfileContext } from '../hooks/useProfileContext';
import moment from 'moment-timezone';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import '../Profile.css';
import avatarImage from '../assets/avatar.png';
import coverImage from '../assets/businessGrowth.png';


function Profile() {
    const { profileInfo, dispatch } = useProfileContext()
    const { user } = useAuthContext();

    //console.log(profileInfo)
    //conditional styling for light, dark mode
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const utcTimestamp = profileInfo && profileInfo.dateOfBirth;
    const newTimestamp = moment(utcTimestamp).tz('Asia/Kolkata');
    const dateTime = newTimestamp.format("dddd, MMMM D, YYYY")

    useEffect(() => {
        const getProfile = async () => {
            console.log("fetched profile")

            const email = user.email
            console.log(email)
            const encodedEmail = encodeURIComponent(email);
            const response = await fetch(`http://localhost:4000/api/profile/getProfile?email=${encodedEmail}`)
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'PROFILEADDED', payload: json })
            }
        }
        if (user) {
            getProfile()
        }

    }, []);

    return profileInfo ? (

        <div className={`p-12 mx-4 rounded-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-white'}`}>
            <div className="card-body">
                <div className={` ${isDarkMode ? 'bg-zinc-800' : 'bg-white'}`}>
                    <div className='flex flex-wrap justify-center items-center h-full'>
                        <img className='pro-img' src={avatarImage} alt="user" />
                    </div>
                </div>

                <div className="text-center">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className={`text-4xl font-semibold text-center mb-6 font-Poppins bg-sky-600 p-3 text-white rounded-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            My Profile
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className = {`rounded-xl ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-100'}`}>
                                <p className="text-xl font-semibold mb-4 mt-4 underline">Personal Details</p>
                                <dl>
                                    <ProfileDetail label="Full Name" value={profileInfo.name} />
                                    <ProfileDetail label="Date of Birth" value={dateTime} />
                                    <ProfileDetail label="Gender" value={profileInfo.gender} />
                                    <ProfileDetail
                                        label="Mobile Number"
                                        value={profileInfo.contactNumber}
                                    />
                                    <ProfileDetail label="Currency" value={profileInfo.currency} />
                                </dl>
                            </div>
                            <div className = {`rounded-xl ${isDarkMode ? 'bg-zinc-700' : 'bg-gray-100'}`}>
                                <p className="text-xl font-semibold mb-4 mt-4 underline">Financial Details</p>
                                <dl>
                                    <ProfileDetail
                                        label="Monthly Salary"
                                        value={profileInfo.monthlySalary}
                                    />
                                    <ProfileDetail
                                        label="Monthly Expense (Expected)"
                                        value={profileInfo.monthlyExpense}
                                    />
                                    <ProfileDetail
                                        label="Address"
                                        value={`${profileInfo.city}, ${profileInfo.state}, ${profileInfo.country}`}
                                    />
                                </dl>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >


    ) : (
        <></>
    )
}

const ProfileDetail = ({ label, value }) => (
    <div className="mb-4">
        <dt className={!(useTheme().palette.mode === 'dark') ? "font-semibold text-gray-600" : "font-semibold text-white"}>{label}</dt>
        <dd className="mt-1 text-lg">{value}</dd>
    </div>
);

export default Profile



