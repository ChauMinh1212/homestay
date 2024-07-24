import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "~/axios/axiosConfig";
import AddRoomModal from "~/components/Room/AddRoom";
import DeleteRoomModal from "~/components/Room/DeleteRoom";
import EditRoomModal from '~/components/Room/EditRoom'
import UserContext from "~/contexts/UserContext";

const homestay = ['Home', 'Apartment', 'Habour', 'Garden']

const AdminRoomPage = () => {
    const [room, setRoom] = useState([])
    const [roomDetail, setRoomDetail] = useState(null)

    const [openEdit, setOpenEdit] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const getAllRoom = async () => {
        try {
            const res = await axiosInstance.get(`room`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!user || user.role != 1) { navigate('/') }
        (async () => {
            const room = await getAllRoom()
            setRoom(room)
        })();
    }, [])

    const handleUpdateRoom = (value) => {
        setRoom(prev => {
            const newRoom = [...prev]
            const index = prev.findIndex(item => item.id == value.id)
            newRoom[index] = value
            return newRoom
        })
    }

    const handleAddRoom = (value) => {
        setRoom(prev => {
            const newRoom = [...prev, ...value]
            return newRoom
        })
    }

    const handleDeleteRoom = () => {
        setRoom(prev => {
            const newRoom = [...prev]
            return newRoom.filter(item => item.id != roomDetail.id)
        })
    }

    const handleOnClickEdit = (value) => {
        setRoomDetail(value)
        setOpenEdit(true)
    }

    const handleOnClickDelete = (value) => {
        setRoomDetail(value)
        setOpenDelete(true)
    }

    return (
        <>
            <AddRoomModal open={openAdd} onClose={() => setOpenAdd(false)} handleAddRoom={handleAddRoom}></AddRoomModal>
            <EditRoomModal open={openEdit} onClose={() => setOpenEdit(false)} room={roomDetail} handleUpdateRoom={handleUpdateRoom} />
            <DeleteRoomModal open={openDelete} onClose={() => setOpenDelete(false)} room={roomDetail} handleDeleteRoom={handleDeleteRoom} />
            <div className="text-right mb-[20px]">
                <Button onClick={() => setOpenAdd(true)} variant="contained">Thêm phòng</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="!font-bold">#</TableCell>
                            <TableCell className="!font-bold">Code</TableCell>
                            <TableCell className="!font-bold">Tên phòng</TableCell>
                            <TableCell className="!font-bold">Loại</TableCell>
                            <TableCell className="!font-bold">Số khách (tối đa)</TableCell>
                            <TableCell className="!font-bold">Địa chỉ</TableCell>
                            <TableCell className="!font-bold">Mô tả</TableCell>
                            <TableCell className="!font-bold">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {room.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{row.code}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{homestay[row.type]}</TableCell>
                                <TableCell>{row.capacity}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>
                                    <div className="html-output ml-[30px]" dangerouslySetInnerHTML={{ __html: row.description }} />
                                </TableCell>
                                <TableCell>
                                    <div className="flex">
                                        <IconButton color="primary" aria-label="Edit" onClick={() => handleOnClickEdit(row)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="secondary" aria-label="Delete" onClick={() => handleOnClickDelete(row)}>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AdminRoomPage