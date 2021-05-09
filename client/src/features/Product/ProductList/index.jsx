import { Space, Table, Tag } from 'antd'
import productAPI from 'api/productApi'
import Loading from 'components/Loading'
import notify from 'components/Notify'
import { map } from 'lodash-es'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

function ProductList() {
  const [products, setProduct] = useState([])
  const [waiting, setWaiting] = useState(true)
  useEffect(() => {
    const fetchProducts = async (params) => {
      try {
        const products = await productAPI.getAll(params)
        setProduct(products)
        notify.success('Tải thành công')
      } catch (error) {
        notify.errorFromServer(error)
      } finally {
        setWaiting(false)
      }
    }
    fetchProducts()
  }, [])
  return (
    <div>{Loading(ProductListView)({ products, isLoading: waiting })} </div>
  )
}

const columns = [
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    render: (sku) => <a>{sku}</a>,
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Giá bán',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Categories',
    key: 'categories',
    dataIndex: 'categories',
    render: (categories) => (
      <span>
        {map(categories, (category) => {
          let color = 'red'
          return (
            <Tag color={color} key={category._id}>
              {category.label}
            </Tag>
          )
        })}
      </span>
    ),
  },
  {
    title: 'Hình ảnh',
    key: 'images',
    dataIndex: 'images',
    render: (images) => {
      return (
        <span>
          {map(images, (image) => {
            return (
              <img key={image._id} style={{ width: '80px' }} src={image.src} />
            )
          })}
        </span>
      )
    },
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

export const ProductListView = ({ products = [], waiting }) => {
  return (
    <div>
      <br />
      <h2>Danh sách sản phẩm</h2>
      <Table
        columns={columns}
        pagination={{ position: ['topRight'] }}
        dataSource={products}
        loading={waiting}
        rowKey="_id"
        size="middle"
      />
    </div>
  )
}
ProductListView.propTypes = {
  products: PropTypes.array.isRequired,
  waiting: PropTypes.bool,
}

export default ProductList
