import React, {useContext} from 'react'
import {context} from '../main'

const Profile = () => {
  const {isAuthenticated,loading,user} = useContext(context);

  return (
    <div style={{marginLeft: 50}} >
      <h2>{user?.name}</h2>
      <h4>{user?.email}</h4>
    </div>
  )
}

export default Profile