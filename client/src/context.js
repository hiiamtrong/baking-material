import { createContext } from 'react'

const { RootStore } = require('store/rootStore')

export const rootStore = new RootStore()
const RootContext = createContext(rootStore)
export default RootContext
