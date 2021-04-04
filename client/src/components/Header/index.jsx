import {
  ShoppingCartOutlined,
  UserSwitchOutlined,
  HomeOutlined,
  SettingFilled,
} from '@ant-design/icons'
import { Menu } from 'antd'
import { clearUser } from 'features/Auth/authSlice'
import { isEmpty } from 'lodash'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import history from 'utils/history'

const { SubMenu } = Menu

export const Header = () => {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    const action = clearUser()
    dispatch(action)
    history.push('/auth/login')
  }

  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Cake Store</Link>
      </Menu.Item>

      {/* Menu account  */}
      <SubMenu
        hidden={isEmpty(user)}
        key="subMenuAccounts"
        icon={<UserSwitchOutlined />}
        title="Accounts"
      >
        <Menu.ItemGroup title="Users">
          <Menu.Item key="account:1">
            <Link to="/users">List Users</Link>
          </Menu.Item>
          <Menu.Item key="account:2">
            <Link to="/users/create">Create An User</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Customers">
          <Menu.Item key="account:3">List Customers</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      {/* Menu Product */}
      <SubMenu
        hidden={isEmpty(user)}
        key="subMenuProducts"
        icon={<ShoppingCartOutlined />}
        title="Products"
      >
        <Menu.ItemGroup title="Products">
          <Menu.Item key="product:1">List Products</Menu.Item>
          <Menu.Item key="product:2">Create A Product</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title="Bills">
          <Menu.Item key="product:3">List Bills</Menu.Item>
          <Menu.Item key="product:4">Summary Revenue</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>

      <Menu.SubMenu
        key="subMenuSetting"
        icon={<SettingFilled />}
        title={isEmpty(user) ? 'Settings' : user.displayName}
      >
        <Menu.Item key="setting:1" hidden={!isEmpty(user)}>
          <Link to="/auth/login">Login</Link>
        </Menu.Item>
        <Menu.Item
          key="setting:2"
          onClick={() => handleLogout()}
          hidden={isEmpty(user)}
        >
          Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}
