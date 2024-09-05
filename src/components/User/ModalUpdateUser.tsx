import { Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, IconButton, Modal, TextField } from "@mui/material"
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as yup from "yup"
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
    pt: 7,
    borderRadius: '10px'
};

const validationSchema = yup.object({
    username: yup
        .string()
        .required('Name is required'),
    phone: yup
        .string()
        .min(10, 'Phone should be of minimum 8 characters length'),
    email: yup
        .string()
        .email('Enter a valid email'),
    point: yup
        .number()
        .required('Point is required')
});

const ModalUpdateUser = ({ open, handleClose, userInfo, handleUpdateUser }) => {
    const [loading, setLoading] = useState(false)
    const { snackBar, setSnackBar } = useContext(SnackBarContext)

    const formik = useFormik<{ id: Number, username: string, phone: string, email: string, point: number }>({
        initialValues: {
            id: userInfo?.id || 0,
            username: userInfo?.username || '',
            phone: userInfo?.phone || '',
            email: userInfo?.email || '',
            point: userInfo?.point || 0
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            await axiosInstance.post('user/update', values)
            setSnackBar({
                ...snackBar,
                status: 'success',
                message: 'Cập nhật thành công',
                open: true
            })
            handleUpdateUser(values)
        } catch (e) {
            setSnackBar({
                ...snackBar,
                status: 'error',
                message: e.message,
                open: true
            })
        }
        setLoading(false)
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <Close />
                </IconButton>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Tên"
                        className="!mb-[20px]"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username ? (formik.errors.username || '') : undefined}
                    />
                    <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        label="Số điện thoại"
                        className="!mb-[20px]"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone ? (formik.errors.phone || '') : ''}
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        className="!mb-[20px]"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email ? (formik.errors.email || '') : ''}
                    />
                    <TextField
                        fullWidth
                        id="point"
                        name="point"
                        label="Point"
                        className="!mb-[20px]"
                        value={formik.values.point}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.point && Boolean(formik.errors.point)}
                        helperText={formik.touched.point ? (formik.errors.point || '') : ''}
                        type="number"
                    />
                    <LoadingButton color="primary" variant="contained" fullWidth type="submit" loading={loading}>
                        Cập nhật
                    </LoadingButton>
                </form>
            </Box>
        </Modal>
    )
}

export default ModalUpdateUser