import { Space, Table, Tag } from 'antd'
import Loading from 'components/Loading'
import { useCategory } from 'hook/useCategory'
import PropTypes from 'prop-types'
import React from 'react'

function CategoryList() {
  const [categories, waiting] = useCategory()
  return (
    <div>{Loading(CategoryListView)({ categories, isLoading: waiting })} </div>
  )
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

export const CategoryListView = ({ categories = [], waiting }) => {
  return (
    <div>
      <br />
      <h2>Danh sách phân loại sản phẩm  </h2>
      <Table
        columns={columns}
        pagination={{ position: ['topRight'] }}
        dataSource={categories}
        loading={waiting}
        rowKey="_id"
        size="small"
      />
    </div>
  )
}
CategoryListView.propTypes = {
  categories: PropTypes.array.isRequired,
  waiting: PropTypes.bool,
}

export default CategoryList
