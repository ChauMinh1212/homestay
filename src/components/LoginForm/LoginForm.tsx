import { LoadingButton } from "@mui/lab";
import { Link, TextField } from "@mui/material";
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from 'yup';
import axiosInstance from "~/axios/axiosConfig";
import UserContext from "~/contexts/UserContext";
import RegisterForm from "../RegisterForm/RegisterForm";
import { showSnackbar } from "../SnackBarCustom/SnackBarSlice";

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(7, 'Password should be of minimum 7 characters length')
        .required('Password is required'),
});



const LoginForm = (prop) => {
    const { setUser } = useContext(UserContext)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { onClose } = prop
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });

    const handleSubmit = async (values) => {
        try {
            setLoading(true)
            const res = await axiosInstance.post('/auth/login', {
                email: values.email,
                password: values.password,
            })
            setLoading(false)
            Cookies.set('at', res.data.access_token)
            Cookies.set('rt', res.data.refresh_token)

            const user = {
                username: res.data.username,
                avatar: res.data.avatar,
                phone: res.data.phone,
                email: res.data.email,
                role: res.data.role
            }

            Cookies.set('user', JSON.stringify(user))
            setUser(user)
            formik.setErrors({ email: '', password: '' })
            dispatch(showSnackbar({message: 'Đăng nhập thành công', status: 'success'}))
            onClose()
        } catch (error) {
            setLoading(false)
            setError(error.message)
            formik.setErrors({ email: ' ', password: ' ' })
        }
    }

    return (
        <>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                    helperText={formik.touched.email && (formik.errors.email == ' ' ? '' : formik.errors.email)}
                />
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    // className="!mb-[20px]"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && (formik.errors.password == ' ' ? '' : formik.errors.password)}
                />
                {error && <div className="text-[11px] text-red-600 text-center font-thin leading-none mt-[3px]">{error}</div>}
                <LoadingButton color="primary" variant="contained" fullWidth type="submit" className="!mt-[20px]" loading={loading}>
                    Đăng nhập
                </LoadingButton>
            </form>
        </>

    )
}

const AuthForm = (prop) => {
    const [login, setLogin] = useState(true)
    const { onClose } = prop
    return (
        <div>
            <div className="h-[200px] mb-[20px] leading-[1]">
                <img src="/images/logo-header.png" alt="" className="object-cover" />
            </div>
            {login ?
                <>
                    <LoginForm onClose={onClose} />
                    <div className="text-[13px] text-center font-thin mt-[5px]">Bạn chưa có tài khoản? <Link onClick={() => setLogin(false)} className="cursor-pointer">Đăng ký</Link></div>
                </>
                :
                <>
                    <RegisterForm onClose={onClose} />
                    <div className="text-[13px] text-center font-thin mt-[5px]">Bạn đã có tài khoản? <Link onClick={() => setLogin(true)} className="cursor-pointer">Đăng nhập</Link></div>
                </>
            }
        </div>

    )
}

export default AuthForm