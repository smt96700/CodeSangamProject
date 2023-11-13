import { useProfileContext } from '../hooks/useProfileContext';

function Profile () {
    const {profileInfo} = useProfileContext()
    console.log(profileInfo)
    return (
        <>
        <h1>name : {profileInfo.name}</h1>
        </>
    )
}

export default Profile