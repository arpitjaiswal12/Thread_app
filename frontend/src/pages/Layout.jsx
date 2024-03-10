
import Topbar from '../components/Topbar'
import { Outlet } from 'react-router-dom'
import Bottombar from '../components/Bottombar'

export default function Layout() {
  return (
    <div>
      <Topbar/>
      <Outlet/>
      <Bottombar/>
    </div>
  )
}
