import usersAPI from 'api/usersApi'
import React, { useEffect, useState } from 'react'
import notify from '../../components/Notify/index'
UserFeature.propTypes = {}

function UserFeature() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchUsers = async (params) => {
      try {
        const users = await usersAPI.getAll(params)
        setUsers(users)
        notify.success('Fetching users successful')
      } catch (error) {
        notify.errorFromServer(error)
      }
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
