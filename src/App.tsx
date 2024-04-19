import { Route, Routes } from 'react-router-dom'
import './App.css'
import routes from './routes'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languages from './languages';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {
  i18n.use(initReactI18next).init({
    resources: languages,
    lng: 'vi', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự phòng nếu không tìm thấy
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },

  });
  return (
    <>
      <Header />
      <div className="mt-[106px]"></div>
      <Routes>
        {routes.map((item, index) => (
          <Route key={index} path={item.path} element={<item.element />} />
        )
        )}
      </Routes>
      <Footer />
    </>


  )
}

export default App

