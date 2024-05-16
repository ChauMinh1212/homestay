import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal } from "@mui/material";
import { useContext, useState } from "react";
import axiosInstance from "~/axios/axiosConfig";
import SnackBarContext from "~/contexts/SnackBarContext";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: '10px',
    overflow: 'hidden'
};

const DeleteRoomModal = ({ open, onClose, roomId, handleDeleteRoom }) => {
    const [loading, setLoading] = useState(false)
    const { snackBar, setSnackBar } = useContext(SnackBarContext)
    const handleClickDeleteRoom = async () => {
        try {
            setLoading(true)
            await axiosInstance.post('room/delete', { id: roomId })
            setLoading(false)
            handleDeleteRoom()
            onClose()
            setSnackBar({
                ...snackBar,
                open: true,
                status: 'success',
                message: 'Xoá phòng thành công'
            })
        } catch (error) {
            setSnackBar({
                ...snackBar,
                open: true,
                status: 'error',
                message: error?.message || ''
            })
            setLoading(false)
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => { onClose() }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableAutoFocus={true}
        >
            <Box sx={style}>
                <div className="text-center">
                    <p>Bạn có chắc chắn muốn xoá phòng?</p>
                    <div className="flex mt-[35px]">
                        <Button onClick={onClose} className="flex-1">Huỷ</Button>
                        <LoadingButton onClick={handleClickDeleteRoom} className="flex-1" color="error" loading={loading}>Xoá</LoadingButton>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default DeleteRoomModal