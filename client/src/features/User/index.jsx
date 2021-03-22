import usersAPI from 'api/usersApi'
import React, { useEffect, useState } from 'react'
import notify from '../../components/Notify/index'
import UserList from './UserList'
UserFeature.propTypes = {}

function UserFeature() {
  const [users, setUsers] = useState([])
  const [waiting, setWaiting] = useState(true)
  useEffect(() => {
    const fetchUsers = async (params) => {
      try {
        const users = await usersAPI.getAll(params)
        setUsers(users)
        notify.success('Fetching users successful')
      } catch (error) {
        notify.errorFromServer(error)
      } finally {
        setWaiting(false)
      }
    }
    fetchUsers()
  }, [])
  return (
    <div>
      <UserList users={users} waiting={waiting} />
    </div>
  )
}

export default UserFeature
