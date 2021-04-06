import { Space, Table, Tag } from 'antd'
import Loading from 'components/Loading'
import { useRole  } from 'hook/useRole'
import PropTypes from 'prop-types'
import React from 'react'

function UserList() {
  const [roles, waiting] = useRole()
  return <div>{Loading(UserListView)({ roles, isLoading: waiting })} </div>
}

const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    render: (code) => <a>{code}</a>,
  },
  {
    title: 'Label',
    dataIndex: 'label',
    key: 'label',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'active' ? 'success' : 'error'}>{status}</Tag>
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

export const UserListView = ({ roles = [], waiting }) => {
  return (
    <div>
      <Table
        columns={columns}
        pagination={{ position: ['topRight'] }}
        dataSource={roles}
        loading={waiting}
        rowKey="_id"
        size="small"
      />
    </div>
  )
}
UserListView.propTypes = {
  roles: PropTypes.array.isRequired,
  waiting: PropTypes.bool,
}

export default UserList
