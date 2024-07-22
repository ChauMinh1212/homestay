import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "~/axios/axiosConfig";
import EditRoomModal from '~/components/Room/EditRoom'

const homestay = ['Home', 'Apartment', 'Habour', 'Garden']

const AdminRoomPage = () => {
    const [room, setRoom] = useState([])
    const [roomDetail, setRoomDetail] = useState(null)

    const [openEdit, setOpenEdit] = useState(false)

    const getAllRoom = async () => {
        try {
            const res = await axiosInstance.get(`room`)
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
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

    const handleOnClickEdit = (value) => {
        setRoomDetail(value)
        setOpenEdit(true)
    }

    return (
        <>
            <EditRoomModal open={openEdit} onClose={() => setOpenEdit(false)} room={roomDetail} handleUpdateRoom={handleUpdateRoom} />
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
                                        <IconButton color="secondary" aria-label="Delete">
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