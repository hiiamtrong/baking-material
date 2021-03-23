import { Space, Table, Tag } from 'antd'
import usersAPI from 'api/usersApi'
import notify from 'components/Notify'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

function UserList() {
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
      <UserListView users={users} waiting={waiting} />
    </div>
  )
}

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (username) => <a>{username}</a>,
  },
  {
    title: 'DisplayName',
    dataIndex: 'displayName',
    key: 'displayName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Roles',
    key: 'roles',
    dataIndex: 'roles',
    render: (roles) => (
      <span>
        {roles.map((tag) => {
          let color = 'red'
          if (tag === 'admin') {
            color = 'blue'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
]

export const UserListView = ({ users = [], waiting }) => {
  return (
    <div>
      <Table
        columns={columns}
        pagination={{ position: ['topRight'] }}
        dataSource={users}
        loading={waiting}
      />
    </div>
  )
}
UserListView.propTypes = {
  users: PropTypes.array.isRequired,
  waiting: PropTypes.bool,
}

export default UserList
