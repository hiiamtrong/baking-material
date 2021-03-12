import usersAPI from 'api/usersApi'
import React, { useEffect, useState } from 'react'
import notify from '../../components/Notify/index'
UserFeature.propTypes = {}

function UserFeature() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchUsers = async (params) => {
      const users = await usersAPI.getAll(params).catch((error) => {
        notify.errorFromServer(error)
      })
      setUsers(users)
      notify.success('Fetching users successful')
   
    }
    fetchUsers()
  }, [])
  return (
    <div>
      {users && users.map((user) => <li key={user._id}>{user.username}</li>)}
    </div>
  )
}

export default UserFeature
