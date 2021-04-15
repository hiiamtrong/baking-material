import categoryAPI from 'api/categoryApi'
import notify from 'components/Notify'
import { sortBy } from 'lodash-es'
import { useEffect, useState } from 'react'

export function useCategory() {
  const [categories, setCategories] = useState([])
  const [waiting, setWaiting] = useState(true)
  useEffect(() => {
    const fetchUsers = async (params) => {
      try {
        const categories = await categoryAPI.getAll(params)
        setCategories(categories)
      } catch (error) {
        notify.errorFromServer(error)
      } finally {
        setWaiting(false)
      }
    }
    fetchUsers()
  }, [])

  const sortedRoles = sortBy(categories, 'label')
  return [sortedRoles, waiting]
}
