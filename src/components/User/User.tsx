import { Close, Email, Phone, Redeem } from "@mui/icons-material";
import { Avatar, Box, IconButton, Modal, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";
import { useContext, useState } from "react";
import axiosInstance from "~/axios/axiosConfig";
import UserContext from "~/contexts/UserContext";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 5,
    borderRadius: '10px',
    overflow: 'hidden'
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


const User = ({ open, onClose }) => {
    const [value, setValue] = useState(0);
    const { user } = useContext(UserContext)
    const [booking, setBooking] = useState([])

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const hanldeHistoryBooking = async () => {
        const data = await axiosInstance.get('booking/history')
        setBooking(data.data)
    }

    return (
        <Modal
            open={open}
            onClose={() => { onClose(); setValue(0) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableAutoFocus={true}
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <Close />
                </IconButton>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="secondary tabs example"
                    className=""
                >
                    <Tab value={0} className="w-[50%]" label="Thông tin tài khoản" />
                    <Tab value={1} onClick={hanldeHistoryBooking} className="w-[50%]" label="Lịch sử đặt phòng" />
                </Tabs>
                <CustomTabPanel value={value} index={0}>
                    <div className="text-center">
                        <Avatar sx={{ margin: '0 auto', width: '70px', height: '70px' }}></Avatar>
                        <p className="mt-[10px] font-[500] text-[20px]">{user.username}</p>

                        <div className="flex justify-between items-center mt-[20px]">
                            <div className="flex">
                                <Email className="mr-[10px]"></Email>
                                <p>Email</p>
                            </div>
                            <div>
                                {user.email}
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-[20px]">
                            <div className="flex">
                                <Phone className="mr-[10px]"></Phone>
                                <p>Điện thoại</p>
                            </div>
                            <div>
                                {user.phone}
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-[20px]">
                            <div className="flex">
                                <Redeem className="mr-[10px]"></Redeem>
                                <p>Điểm</p>
                            </div>
                            <div>
                                {user?.point || 0}
                            </div>
                        </div>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div className="min-h-[242px]">
                        <TableContainer component={Paper} sx={{ height: '242px' }}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600 }} >Phòng</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }} align="center">Check-in</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }} align="center">Check-out</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }} align="center">Ngày đặt</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }} align="center">Số lượng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {booking.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.code}
                                            </TableCell>
                                            <TableCell align="center">{row.from}</TableCell>
                                            <TableCell align="center">{row.to}</TableCell>
                                            <TableCell align="center">{row.created_at}</TableCell>
                                            <TableCell align="center">{row.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </CustomTabPanel>
            </Box>
        </Modal>
    )
}

export default User