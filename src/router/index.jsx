import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import PrivateRoute from '../components/PrivateRoute/PrivateRoute'
import HomePage from '../pages/HomePage/HomePage'
import ProductsPage from '../pages/ProductsPage/ProductsPage'
import ProductDetailPage from '../pages/ProductDetailPage/ProductDetailPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import CartPage from '../pages/CartPage/CartPage'
import WishlistPage from '../pages/WishlistPage/WishlistPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'profile', element: <ProfilePage /> },
          { path: 'cart', element: <CartPage /> },
          { path: 'wishlist', element: <WishlistPage /> }
        ]
      },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
])
