import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const imgUrl = [
        ['vi', '/images/l-vn.png'],
        ['en', '/images/l-en.png'],
        ['kr', '/images/l-kr.png'],
    ]
    const [srcUrl, setSrcUrl] = useState(imgUrl[0][1])
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSelect = (e) => {
        i18n.changeLanguage(imgUrl[e.target.value][0])
        setSrcUrl(imgUrl[e.target.value][1])
        handleClose()
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Language settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'language-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            <img className="cursor-pointer" src={srcUrl} alt="" />
                        </Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="language-menu"
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
                    <MenuItem onClick={handleSelect} value={0}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                            <img className="cursor-pointer" src="/images/l-vn.png" alt="" />
                        </Avatar> Vietnamese
                    </MenuItem>
                    <MenuItem onClick={handleSelect} value={1}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                            <img className="cursor-pointer" src="/images/l-en.png" alt="" />
                        </Avatar> English
                    </MenuItem>
                    <MenuItem onClick={handleSelect} value={2}>
                        <Avatar sx={{ width: 32, height: 32 }}>
                            <img className="cursor-pointer" src="/images/l-kr.png" alt="" />
                        </Avatar> Korean
                    </MenuItem>

                </Menu>
            </Box>
        </>
    )
}

export default LanguageSelect