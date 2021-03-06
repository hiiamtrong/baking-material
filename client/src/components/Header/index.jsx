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
import { Link } from 'react-router-dom'

const { SubMenu } = Menu

export const Header = observer(() => {
  const { authenticationStore } = useContext(RootContext)
  const { isAuthenticated, user } = authenticationStore

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
        <Menu.ItemGroup title="Users" data-cy="menu-user">
          <Menu.Item key="users:1">
            <Link to="/users">List Users</Link>
          </Menu.Item>
          <Menu.Item key="users:2">
            <Link data-cy="menu-create-user" to="/users/create">
              Create An User
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup title="Roles">
          <Menu.Item key="roles:1">
            <Link to="/roles">List Roles</Link>
          </Menu.Item>
          <Menu.Item key="roles:2">
            <Link to="/roles/create">Create A Role</Link>
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup title="Customers">
          <Menu.Item key="customers:1">List Customers</Menu.Item>
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
          <Menu.Item key="product:1">
            <Link to="/products">List Products</Link>
          </Menu.Item>
          <Menu.Item key="product:2">
            <Link to="/products/create">Create A Product</Link>
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup title="Categories">
          <Menu.Item key="category:1">
            <Link to="/categories">List Categories</Link>
          </Menu.Item>
          <Menu.Item key="category:2">
            <Link to="/categories/create">Create A Category</Link>
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.ItemGroup title="Bills">
          <Menu.Item key="bills:1">List Bills</Menu.Item>
          <Menu.Item key="bills:2">Summary Revenue</Menu.Item>
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
        <Menu.Item key="setting:2" hidden={!isAuthenticated}>
          <Link to="/auth/logout">Logout</Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
})
