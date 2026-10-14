import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import AuthSync from '../AuthSync/AuthSync'

function Layout() {
  return (
    <div className="app">
      <AuthSync />
      <Header />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout
