import usersAPI from 'api/usersApi'
import React, { useEffect } from 'react'

UserFeature.propTypes = {}

function UserFeature() {
  useEffect(() => {
    const fetchUsers = async (params) => {
      const users = await usersAPI.getAll(params).catch((error) => {
        console.log(error.message)
      })
      console.log(users)
    }
    fetchUsers()
  }, [])
  return <div></div>
}

export default UserFeature
