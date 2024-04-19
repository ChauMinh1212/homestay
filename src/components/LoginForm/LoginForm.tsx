import { Button, Link, TextField } from "@mui/material";
import { useFormik } from 'formik';
import { useState } from "react";
import * as yup from 'yup';
import LogoutForm from "../LogoutForm/LogoutForm";

const validationSchema = yup.object({
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const handleSubmit = (values) => {
    console.log(values);

}

const LoginForm = () => {
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
    return (
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
            <Button color="primary" variant="contained" fullWidth type="submit">
                Đăng nhập
            </Button>
        </form>
    )
}

const AuthForm = () => {
    const [login, setLogin] = useState(true)

    return (
        <div>
            <div className="h-[200px] mb-[20px] leading-[1]">
                <img src="/images/logo-header.png" alt="" className="object-cover" />
            </div>
            {login ?
                <>
                    <LoginForm />
                    <div className="text-[13px] text-center font-thin mt-[5px]">Bạn chưa có tài khoản? <Link onClick={() => setLogin(false)} className="cursor-pointer">Đăng ký</Link></div>
                </>
                :
                <>
                    <LogoutForm />
                    <div className="text-[13px] text-center font-thin mt-[5px]">Bạn đã có tài khoản? <Link onClick={() => setLogin(true)} className="cursor-pointer">Đăng nhập</Link></div>
                </>
            }
        </div>

    )
}

export default AuthForm