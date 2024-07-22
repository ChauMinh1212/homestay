import { Logout, Settings } from "@mui/icons-material";
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import Cookies from 'js-cookie';
import { useContext, useState } from "react";
import UserContext from "~/contexts/UserContext";
import User from "../User/User";
import ProfileOpenContext from "~/contexts/ProfileOpenContext";

const Account = ({ user }) => {
    const {openProfile :openModalInfoUser, setOpenProfile: setOpenModalInfoUser} = useContext(ProfileOpenContext)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { setUser } = useContext(UserContext)
    const open = Boolean(anchorEl);

    const handleOpenModalInfoUser = () => setOpenModalInfoUser(true);
    const handleCloseModalInfoUser = () => setOpenModalInfoUser(false);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        setUser(null)
        Cookies.remove('user')
        Cookies.remove('at')
        Cookies.remove('rt')
    }
    return (
        <>
            <User open={openModalInfoUser} onClose={handleCloseModalInfoUser}/>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }} />
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            }
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => { handleClose(); handleOpenModalInfoUser() }}>
                        <Avatar />  {user.username}
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="medium" />
                        </ListItemIcon>
                        Cài đặt
                    </MenuItem>
                    <MenuItem onClick={() => { handleClose(); handleLogout() }}>
                        <ListItemIcon>
                            <Logout fontSize="medium" />
                        </ListItemIcon>
                        Đăng xuất
                    </MenuItem>

                </Menu>
            </Box >
        </>
    )
}

export default Account