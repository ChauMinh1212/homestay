import { Close, Menu } from "@mui/icons-material";
import { Backdrop, Box, Button, Fade, IconButton, Modal } from "@mui/material";
import { useContext, useState } from "react";
import { useTranslation } from 'react-i18next';
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import UserContext from "~/contexts/UserContext";
import Account from "../Account/Account";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import AuthForm from "../LoginForm/LoginForm";
import './Header.css';

const styleMenu = {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    // transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: '#C8B997',
    boxShadow: 24,
    // borderRadius: '10px',
    overflow: 'hidden'
};

const Header = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const location = useLocation()

    const [menuActive, setMenuActive] = useState(location.pathname == '/' ? t('home') : t(location.pathname.slice(1)))

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenMenu = () => setOpenMenu(true)
    const handleCloseMenu = () => setOpenMenu(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '10px'
    };
    const { user } = useContext(UserContext);

    return (
        <div className="fixed top-0 left-0 right-0 z-10 bg-white">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-[10px] py-[5px]">
                <div className="flex tracking-[1px] items-center md:hidden"><IoIosMail className="text-[22px] mr-[4px]" /> Gmail: forwork.sirenahomestay@gmail.com</div>
                <div className="flex items-center md:justify-between md:flex-1">
                    <div className="flex items-center">
                        <FaPhoneAlt className="mr-[4px]" /> Hotline: 0941 252 218
                    </div>
                    <div className="md:hidden">
                        <LanguageSelect></LanguageSelect>
                    </div>
                    {!user ?
                        <Button onClick={handleOpen}>Đăng nhập</Button>
                        :
                        <Account user={user}></Account>
                    }
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <AuthForm onClose={handleClose}></AuthForm>
                            </Box>
                        </Fade>
                    </Modal>
                </div>
            </div>
            <div className="header_bottom md:after:top-[43%] md:after:w-[110px] md:after:h-[110px] bg-primary relative z-[2] font-bold shadow-[0_20px_10px_-13px_rgba(0,0,0,0.3)]">
                <div className="hidden md:flex h-[66px] items-center px-[20px] md:justify-between">
                    <IconButton onClick={handleOpenMenu}>
                        <Menu></Menu>
                    </IconButton>
                    <div className="w-[100px] text-right">
                        <p className="text-[13px]">{menuActive}</p>

                    </div>
                </div>
                <div className="md:hidden h-[66px] max-w-7xl mx-auto flex gap-[200px] justify-between text-center lg:text-[15px]">
                    <div className="flex flex-1">
                        <NavLink onClick={() => { setMenuActive(t('home')) }} to="/" className="flex-1 hover:text-second flex items-center justify-center relative">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('home')}</span>
                            )}
                        </NavLink>
                        <NavLink onClick={() => { setMenuActive(t('about')) }} to="/about" className="flex-1 hover:text-second flex items-center justify-center">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('about')}</span>
                            )}
                        </NavLink>
                        <NavLink onClick={() => { setMenuActive(t('homestay')) }} to="/homestay" className="flex-1 hover:text-second flex items-center justify-center">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('homestay')}</span>
                            )}
                        </NavLink>
                    </div>
                    <div className="flex flex-1">
                        <NavLink onClick={() => { setMenuActive(t('service')) }} to="/service" className="flex-1 hover:text-second flex items-center justify-center">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('service')}</span>
                            )}
                        </NavLink>
                        <NavLink onClick={() => { setMenuActive(t('event')) }} to="/event" className="flex-1 hover:text-second flex items-center justify-center">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('event')}</span>
                            )}
                        </NavLink>
                        <NavLink onClick={() => { setMenuActive(t('shop')) }} to="/shop" className="flex-1 hover:text-second flex items-center justify-center">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('shop')}</span>
                            )}
                        </NavLink>
                        <NavLink onClick={() => { setMenuActive(t('contact')) }} to="/contact" className="flex-1 hover:text-second flex items-center justify-center">
                            {({ isActive }) => (
                                <span className={isActive ? "text-white coconut" : ""}>{t('contact')}</span>
                            )}
                        </NavLink>
                    </div>

                </div>
            </div>

            {/* Menu sidebar */}
            <div>
                <Modal
                    open={openMenu}
                    onClose={handleCloseMenu}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableAutoFocus={true}
                >
                    <Box sx={styleMenu}>
                        <div className="text-center text-[20px] relative">
                            <div className="absolute top-0 right-0" onClick={handleCloseMenu}>
                                <IconButton>
                                    <Close></Close>
                                </IconButton>
                            </div>
                            <div className="p-4 pt-10 flex flex-col gap-[30px]" onClick={handleCloseMenu}>
                                <NavLink onClick={() => { setMenuActive(t('home')); handleCloseMenu() }} to="/" className="hover:text-second relative flex items-center justify-center">
                                    {({ isActive }) => (
                                        <span className={isActive ? "text-white coconut-mobile" : ""}>{t('home')}</span>
                                    )}
                                </NavLink>
                                <NavLink onClick={() => { setMenuActive(t('about')); handleCloseMenu() }} to="/about" className="hover:text-second relative flex items-center justify-center">
                                    {({ isActive }) => (
                                        <span className={isActive ? "text-white coconut-mobile" : ""}>{t('about')}</span>
                                    )}
                                </NavLink>
                                <NavLink onClick={() => { setMenuActive('HOMESTAY / RESORT');; handleCloseMenu() }} to="/homestay" className="hover:text-second relative flex items-center justify-center">
                                    {({ isActive }) => (
                                        <span className={isActive ? "text-white coconut-mobile" : ""}>{t('homestay')}</span>
                                    )}
                                </NavLink>
                                <NavLink onClick={() => { setMenuActive(t('service')); handleCloseMenu() }} to="/service" className="hover:text-second relative flex items-center justify-center">
                                    {({ isActive }) => (
                                        <span className={isActive ? "text-white coconut-mobile" : ""}>{t('service')}</span>
                                    )}
                                </NavLink>
                                <NavLink onClick={() => { setMenuActive(t('event')); handleCloseMenu() }} to="/event" className="hover:text-second relative flex items-center justify-center">
                                    {({ isActive }) => (
                                        <span className={isActive ? "text-white coconut-mobile" : ""}>{t('event')}</span>
                                    )}
                                </NavLink>
                                <NavLink onClick={() => { setMenuActive(t('shop')); handleCloseMenu() }} to="/shop" className="hover:text-second relative flex items-center justify-center">
                                    {({ isActive }) => (
                                        <span className={isActive ? "text-white coconut-mobile" : ""}>{t('shop')}</span>
                                    )}
                                </NavLink>
                                <NavLink onClick={() => { setMenuActive(t('contact')); handleCloseMenu() }} to="/contact" className="hover:text-second relative flex items-center justify-center">
                                    {({ isActive }) => (
                                        <span className={isActive ? "text-white coconut-mobile" : ""}>{t('contact')}</span>
                                    )}
                                </NavLink>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}

export default Header