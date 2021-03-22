import { Space, Table, Tag } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
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
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
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

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  waiting: PropTypes.bool,
}

function UserList({ users = [], waiting }) {
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

export default UserList
