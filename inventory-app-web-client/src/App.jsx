import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blank from './pages/Blank'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import Login from './pages/login/Login'
import Transactions from './pages/Transactions'
import Users from './pages/Users'
import Goods from './pages/Goods'
import DetailTransaction from './pages/DetailTransaction'
import CategoryType from './pages/CategoryType'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <MainLayout /> }>
          <Route index element={ <Dashboard /> } />
          <Route path='users' element={ <Users /> } />
          <Route path='transactions' element={ <Transactions /> } />
          <Route path='transactions/detail/:id' element={ <DetailTransaction /> } />
          <Route path='goods' element={ <Goods /> } />
          <Route path='category-type' element={ <CategoryType /> } />
        </Route>
        <Route path='/login' element={ <Login /> }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
