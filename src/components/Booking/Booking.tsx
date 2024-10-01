import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, IconButton, Link, Modal, Typography } from "@mui/material";
import moment from "moment";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import axiosInstance from "~/axios/axiosConfig";
import UserContext from "~/contexts/UserContext";
import { showSnackbar } from "../SnackBarCustom/SnackBarSlice";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    pt: 7,
    borderRadius: '10px'
};

const Booking = ({ open, onClose, infoBooking, afterBooking }) => {
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleBooking = async () => {
        try {
            setLoading(true)
            await axiosInstance.post('/booking/create', { from: infoBooking.from, to: infoBooking.to, quantity: infoBooking.quantity, id: infoBooking.id })
            setLoading(false)
            dispatch(showSnackbar({message: 'Bạn đã đặt phòng thành công, chúng tôi sẽ liên hệ bạn sớm nhất', status: 'success'}))

            onClose()
            afterBooking()
        } catch (e) {
            setLoading(false)
            dispatch(showSnackbar({message: e?.message || '', status: 'error'}))
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
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
                <Typography variant="h6" align="center">
                    THÔNG TIN ĐẶT PHÒNG
                </Typography>
                <div className="flex mt-[10px]">
                    <div className="flex-1 font-semibold">
                        <p>Ngày đến</p>
                        <p>Ngày đi</p>
                        <p>Phòng</p>
                        <p>Số người ở</p>
                    </div>
                    <div className="flex-1">
                        <p>: {moment(infoBooking?.from).format('DD-MM-YYYY')}</p>
                        <p>: {moment(infoBooking?.to).format('DD-MM-YYYY')}</p>
                        <p>: {infoBooking?.code}</p>
                        <p>: {infoBooking?.quantity}</p>
                    </div>
                </div>
                <div className="text-center mt-[15px]">
                    <LoadingButton
                        onClick={handleBooking}
                        variant="contained"
                        className=""
                        disabled={!user ? true : false}
                        loading={loading}
                    >
                        Đặt ngay
                    </LoadingButton>
                    {!user && <p className="text-[12px] mt-[5px]">Vui lòng đăng nhập để đặt phòng, hoặc liên hệ fanpage <br /><LinkRouter to="https://www.facebook.com/profile.php?id=100087459135207" target="_blank"><Link>Sirena Homestay</Link></LinkRouter></p>}
                </div>
            </Box>
        </Modal>
    )
}

export default Booking