import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup'

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

const LogoutForm = () => {
    const handleSubmit = (values) => {
        console.log(values);

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
            <Button color="primary" variant="contained" fullWidth type="submit">
                Đăng Ký
            </Button>
        </form>
    )
}

export default LogoutForm