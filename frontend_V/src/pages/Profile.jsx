import { useProfileContext } from '../hooks/useProfileContext';
import moment from 'moment-timezone';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
function Profile () {
    const {profileInfo, dispatch} = useProfileContext()
    const {user}= useAuthContext();
    //console.log(profileInfo)

    //conditional styling for light, dark mode
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';

    const utcTimestamp = profileInfo &&  profileInfo.dateOfBirth;
    const newTimestamp = moment(utcTimestamp).tz('Asia/Kolkata');
    const dateTime= newTimestamp.format("dddd, MMMM D, YYYY")
    useEffect(()=>{
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
        <> 
        <div className={`profile ${isDarkMode? 'bg-zinc-700' : 'bg-white'}`}>
            <div className="px-4">
            <h1 className = "flex flex-wrap justify-center text-3xl font-light font-serif py-2">My Profile</h1>
                <p className="flex flex-wrap justify-center    ">Personal details.</p>
            </div>
            <div className="flex flex-wrap justify-center mt-6 border-t-2 border-gray-300">
                <dl className="divide-y divide-gray-300">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className=" font-semibold leading-6 ">Full name</dt>
                        <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.name}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className=" font-semibold leading-6 ">Date of Birth</dt>
                        <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{dateTime}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className=" font-semibold leading-6 ">Gender</dt>
                        <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.gender}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className=" font-semibold leading-6 ">Mobile Number</dt>
                        <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.contactNumber}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className=" font-semibold leading-6 ">Currency</dt>
                        <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.currency}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className=" font-semibold leading-6 ">Monthly Salary</dt>
                        <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.monthlySalary}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className=" font-semibold leading-6 ">Monthly Expense (Expected)</dt>
                        <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.monthlyExpense}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className=" font-semibold leading-6 ">Address</dt>
                        <dd className="mt-1  leading-6  sm:col-span-2 sm:mt-0">{profileInfo.city},  {profileInfo.state},  {profileInfo.country}</dd>
                    </div>
                </dl>
            </div>
        </div>

        </>
    ) : (
        <div><h1>Hello</h1></div>
    )
}

export default Profile