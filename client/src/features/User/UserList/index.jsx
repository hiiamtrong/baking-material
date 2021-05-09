import { Space, Table, Tag } from 'antd'
import usersAPI from 'api/usersApi'
import Loading from 'components/Loading'
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
        notify.success('Tải thành công')
      } catch (error) {
        notify.errorFromServer(error)
      } finally {
        setWaiting(false)
      }
    }
    fetchUsers()
  }, [])
  return <div>{Loading(UserListView)({ users, isLoading: waiting })} </div>
}

const columns = [
  {
    title: 'Tên đăng nhập',
    dataIndex: 'username',
    key: 'username',
    render: (username) => <a>{username}</a>,
  },
  {
    title: 'Họ tên',
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
        {roles.map((role) => {
          let color = 'red'
          if (role.code === 'admin') {
            color = 'blue'
          }
          return (
            <Tag color={color} key={role._id}>
              {role.label}
            </Tag>
          )
        })}
      </span>
    ),
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Edit {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
]

export const UserListView = ({ users = [], waiting }) => {
  return (
    <div>
      <br />
      <h2>Danh sách người dùng</h2>
      <Table
        columns={columns}
        pagination={{ position: ['topRight'] }}
        dataSource={users}
        loading={waiting}
        rowKey="_id"
        size="middle"
      />
    </div>
  )
}
UserListView.propTypes = {
  users: PropTypes.array.isRequired,
  waiting: PropTypes.bool,
}

export default UserList
