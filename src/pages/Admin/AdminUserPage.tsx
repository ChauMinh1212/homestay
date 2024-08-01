import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "~/axios/axiosConfig";
import RegisterForm from "~/components/RegisterForm/RegisterForm";
import UserContext from "~/contexts/UserContext";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius: '10px'
};

const AdminUserPage = () => {
    const [users, setUsers] = useState([])
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [openRegister, setOpenRegister] = useState(false)

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
            <div className="text-right">
                <Button variant="contained" onClick={() => setOpenRegister(pre => !pre)}>Thêm user</Button>
            </div>
            <Modal open={openRegister} onClose={() => setOpenRegister(pre => !pre)}>
                <Box sx={style}>
                    <RegisterForm onClose={() => setOpenRegister(pre => !pre)} isAdminRegister={true}></RegisterForm>
                </Box>
            </Modal>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="!font-bold">#</TableCell>
                            <TableCell className="!font-bold">Tên</TableCell>
                            <TableCell className="!font-bold">SĐT</TableCell>
                            <TableCell className="!font-bold">Email</TableCell>
                            <TableCell className="!font-bold">Điểm</TableCell>
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
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.point}</TableCell>
                                <TableCell>
                                    <div className="flex">
                                        <IconButton color="primary" aria-label="Edit">
                                            <Edit />
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