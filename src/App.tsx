import { SnackbarProps } from '@mui/material';
import i18n from 'i18next';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { initReactI18next } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import SnackBarCustom from './components/SnackBarCustom/SnackBarCustom';
import MenuLoginContext from './contexts/MenuLoginContext';
import ProfileOpenContext from './contexts/ProfileOpenContext';
import SnackBarContext from './contexts/SnackBarContext';
import UserContext from './contexts/UserContext';
import languages from './languages';
import routes from './routes';

function App() {
  i18n.use(initReactI18next).init({
    resources: languages,
    lng: 'vi', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự phòng nếu không tìm thấy
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },

  });

  const [user, setUser] = useState(Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null)
  const [snackBar, setSnackBar] = useState<SnackbarProps & { status: 'success' | 'error' }>({
    message: 'success',
    open: false,
    autoHideDuration: 4000,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    status: 'success'
  })
  const [openMenuLogin, setOpenMenuLogin] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <SnackBarContext.Provider value={{ snackBar, setSnackBar }}>
        <MenuLoginContext.Provider value={{ openMenuLogin, setOpenMenuLogin }}>
          <ProfileOpenContext.Provider value={{ openProfile, setOpenProfile }}>
            <SnackBarCustom />
            <Header />
            <div className="mt-[137px]"></div>
            <Routes>
              {routes.map((item, index) => (
                <Route key={index} path={item.path} element={<item.element />} />
              )
              )}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
            <Footer />
          </ProfileOpenContext.Provider>
        </MenuLoginContext.Provider>

      </SnackBarContext.Provider>
    </UserContext.Provider>
  )
}

export default App

