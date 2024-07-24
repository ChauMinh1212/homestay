import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "~/axios/axiosConfig";
import UserContext from "~/contexts/UserContext";

const AdminUserPage = () => {
    const [users, setUsers] = useState([])
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const getAllUser = async () => {
        try {
            const res = await axiosInstance.get('user')
            return res.data
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (!user || user.role != 1) { navigate('/') }
        (async () => {
            const user = await getAllUser()
            setUsers(user)
        })();
    }, [])

    return (
        <>
            {/* <EditRoomModal open={openEdit} onClose={() => setOpenEdit(false)} room={roomDetail} handleUpdateRoom={handleUpdateRoom} /> */}
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
                        {users.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{row.code}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                {/* <TableCell>{homestay[row.type]}</TableCell> */}
                                <TableCell>{row.capacity}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>
                                    <div className="html-output ml-[30px]" dangerouslySetInnerHTML={{ __html: row.description }} />
                                </TableCell>
                                <TableCell>
                                    <div className="flex">
                                        <IconButton color="primary" aria-label="Edit">
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

export default AdminUserPage