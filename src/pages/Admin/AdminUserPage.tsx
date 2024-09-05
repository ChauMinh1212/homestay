import { Close, Edit } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "~/axios/axiosConfig";
import RegisterForm from "~/components/RegisterForm/RegisterForm";
import ModalUpdateUser from "~/components/User/ModalUpdateUser";
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
    pt: 7,
    borderRadius: '10px'
};

const AdminUserPage = () => {
    const [users, setUsers] = useState([])
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [openRegister, setOpenRegister] = useState(false)
    const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false)
    const [userInfo, setUserInfo] = useState(null)

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

    const handleUpdateUser = (values) => {
        setUsers(prev => {
            const newUsers = [...prev]
            const index = newUsers.findIndex(item => item.id == values.id)
            newUsers[index] = values
            return newUsers
        })
        setOpenModalUpdateUser(false)
    }

    const handleAddUser = (values) => {
        setUsers(prev => {
            const newUsers = [...prev, values]
            return newUsers
        })
    }

    return (
        <>
            <div className="text-right mb-[20px]">
                <Button variant="contained" onClick={() => setOpenRegister(pre => !pre)}>Thêm user</Button>
            </div>
            <Modal open={openRegister} onClose={() => setOpenRegister(pre => !pre)}>
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenRegister(pre => !pre)}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <Close />
                    </IconButton>
                    <RegisterForm onClose={() => setOpenRegister(pre => !pre)} isAdminRegister={true} handleAddUser={handleAddUser}></RegisterForm>
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
                                        <IconButton onClick={() => { setOpenModalUpdateUser(true); setUserInfo(row) }} color="primary" aria-label="Edit">
                                            <Edit />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ModalUpdateUser userInfo={userInfo} open={openModalUpdateUser} handleClose={() => setOpenModalUpdateUser(false)} handleUpdateUser={handleUpdateUser}></ModalUpdateUser>
        </>
    )
}

export default AdminUserPage