import rolesAPI from 'api/roleApi'
import notify from 'components/Notify'
import { sortBy } from 'lodash-es'
import { useEffect, useState } from 'react'

export function useRole() {
  const [roles, setRoles] = useState([])
  const [waiting, setWaiting] = useState(true)
  useEffect(() => {
    const fetchUsers = async (params) => {
      try {
        const roles = await rolesAPI.getAll(params)
        setRoles(roles)
      } catch (error) {
        notify.errorFromServer(error)
      } finally {
        setWaiting(false)
      }
    }
    fetchUsers()
  }, [])

  const sortedRoles = sortBy(roles, 'label')
  return [sortedRoles, waiting]
}
