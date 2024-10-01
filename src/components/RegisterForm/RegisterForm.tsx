import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import Cookies from 'js-cookie';
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from 'yup';
import axiosInstance from "~/axios/axiosConfig";
import UserContext from "~/contexts/UserContext";
import { showSnackbar } from "../SnackBarCustom/SnackBarSlice";

interface IRegister {
    name: string,
    phone: string,
    password: string,
    email: string
}

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Name is required'),
    phone: yup
        .string()
        .min(10, 'Phone should be of minimum 8 characters length'),
    email: yup
        .string()
        .email('Enter a valid email'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required')
        .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
});

const RegisterForm = (prop) => {
    const { setUser } = useContext(UserContext)
    const { onClose, isAdminRegister, handleAddUser } = prop
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = async (values: IRegister) => {
        try {
            setLoading(true)
            const res = await axiosInstance.post('/auth/register', {
                email: values.email,
                username: values.name,
                password: values.password,
                phone: values.phone
            })
            setLoading(false)
            dispatch(showSnackbar({message: 'Đăng ký thành công', status: 'success'}))
            if (!isAdminRegister) {
                Cookies.set('at', res.data.access_token)
                Cookies.set('rt', res.data.refresh_token)

                const user = {
                    email: values.email,
                    username: values.name,
                    phone: values.phone,
                    avatar: '',
                    role: 0
                }

                setUser(user)
                Cookies.set('user', JSON.stringify(user))
            }

            handleAddUser({
                id: res.data.id,
                username: values.name,
                email: values.email,
                phone: values.phone,
                point: 0,
            })
            onClose()
        } catch (e) {
            setLoading(false)
            dispatch(showSnackbar({message: e.message, status: 'error'}))
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });
    return (
        <div>

            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Tên"
                    className="!mb-[20px]"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
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
                    helperText={formik.touched.phone && formik.errors.phone}
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
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    className="!mb-[20px]"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    className="!mb-[20px]"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <LoadingButton color="primary" variant="contained" fullWidth type="submit" loading={loading}>
                    Đăng Ký
                </LoadingButton>
            </form>
        </div>

    )
}

export default RegisterForm