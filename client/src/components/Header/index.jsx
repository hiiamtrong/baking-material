import {
  HomeOutlined,
  SettingFilled,
  ShoppingCartOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import RootContext from 'context'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

const { SubMenu } = Menu

export const Header = observer(() => {
  const history = useHistory()
  const { authenticationStore } = useContext(RootContext)
  const { logout, isAuthenticated, user } = authenticationStore
  const handleLogout = () => {
    logout()
    history.push('/auth/login')
  }

  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Cake Store</Link>
      </Menu.Item>

      {/* Menu account  */}
      <SubMenu
        hidden={!isAuthenticated}
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
        hidden={!isAuthenticated}
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
        title={!isAuthenticated ? 'Settings' : user.displayName}
      >
        <Menu.Item key="setting:1" hidden={isAuthenticated}>
          <Link to="/auth/login">Login</Link>
        </Menu.Item>
        <Menu.Item
          key="setting:2"
          onClick={() => handleLogout()}
          hidden={!isAuthenticated}
        >
          Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
})
