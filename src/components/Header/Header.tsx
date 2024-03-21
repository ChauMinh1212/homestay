import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import './Header.css'

const Header = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="fixed top-0 left-0 right-0 z-10 bg-white">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-[10px] py-[5px]">
                <div className="flex tracking-[1px] items-center md:hidden"><IoIosMail className="text-[22px] mr-[4px]" /> Gmail: forwork.sirenahomestay@gmail.com</div>
                <div className="flex items-center md:justify-between md:flex-1">
                    <div className="flex items-center">
                        <FaPhoneAlt className="mr-[4px]" /> Hotline: 0941 252 218
                    </div>
                    <div className="flex ml-[10px] gap-[5px]">
                        <img className="cursor-pointer" src="/images/l-vn.png" alt="" onClick={() => i18n.changeLanguage('vi')} />
                        <img className="cursor-pointer" src="/images/l-en.png" alt="" onClick={() => i18n.changeLanguage('en')} />
                        <img className="cursor-pointer" src="/images/l-kr.png" alt="" onClick={() => i18n.changeLanguage('en')} />
                    </div>
                </div>
            </div>
            <div className="header_bottom bg-primary relative z-[2] font-bold shadow-[0_20px_10px_-13px_rgba(0,0,0,0.3)]">
                <div className="h-[66px] max-w-7xl mx-auto flex gap-[200px] justify-between text-center lg:text-[15px]">
                    <div className="flex flex-1">
                        <NavLink to="/" className="flex-1 hover:text-second flex items-center justify-center relative">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('home')}</span>
                            )}
                        </NavLink>
                        <NavLink to="/about" className="flex-1 hover:text-second flex items-center justify-center">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('introduce')}</span>
                            )}
                        </NavLink>
                        <NavLink to="/homestay" className="flex-1 hover:text-second flex items-center justify-center">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>HOMESTAY / RESORT</span>
                            )}
                        </NavLink>
                    </div>
                    <div className="flex flex-1">
                        <NavLink to="/service" className="flex-1 hover:text-second flex items-center justify-center">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('service')}</span>
                            )}
                        </NavLink>
                        <NavLink to="/event" className="flex-1 hover:text-second flex items-center justify-center">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('event')}</span>
                            )}
                        </NavLink>
                        <NavLink to="/shop" className="flex-1 hover:text-second flex items-center justify-center">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('shop')}</span>
                            )}
                        </NavLink>
                        <NavLink to="/contact" className="flex-1 hover:text-second flex items-center justify-center">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('contact')}</span>
                            )}
                        </NavLink>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Header