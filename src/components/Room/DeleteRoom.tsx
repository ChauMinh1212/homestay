import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, IconButton, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "~/axios/axiosConfig";
import { showSnackbar } from "../SnackBarCustom/SnackBarSlice";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    pt: 5,
    borderRadius: '10px',
    overflow: 'hidden'
};

const DeleteRoomModal = ({ open, onClose, room, handleDeleteRoom }) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleClickDeleteRoom = async () => {
        try {
            setLoading(true)
            await axiosInstance.post('room/delete', { id: room.id })
            setLoading(false)
            handleDeleteRoom()
            onClose()
            dispatch(showSnackbar({message: 'Xoá phòng thành công', status: 'success'}))
        } catch (error) {
            dispatch(showSnackbar({message: error?.message || '', status: 'error'}))

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
                <div className="text-center">
                    <p>Bạn có chắc chắn muốn xoá phòng <span className="font-bold">{room?.code || ''}</span>?</p>
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