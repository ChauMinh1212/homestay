import { Box, Button, IconButton, Modal, TextField } from "@mui/material"
import { useFormik } from "formik";
import * as yup from 'yup'
import TextEditor from "../Editor/Editor";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { VisuallyHiddenInput } from "../Room/AddRoom";
import { LoadingButton } from "@mui/lab";
import { Clear, CloudUpload } from "@mui/icons-material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    overflow: 'auto',
    height: '90%'
    // maxHeight: '700px',
};

interface IEvent {
    title: string
    content: string
    img: string
    from: string
    to: string
}

const validationSchema = yup.object({
    title: yup
        .string()
        .required('code is required'),
    content: yup
        .string()
        .required('name is required'),
    img: yup
        .string(),
    from: yup
        .string(),
    to: yup
        .string()
});

const AddEventModal = ({ onClose, open, handleAddEvent }) => {
    const [content, setContent] = useState('')
    const formik = useFormik<IEvent>({
        initialValues: {
            title: '',
            content: '',
            img: '',
            from: '',
            to: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });

    const handleSubmit = (values) => {

    }

    return (
        <Modal
            open={open}
            onClose={() => { onClose() }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableAutoFocus={true}
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="Tên chương trình"
                        className="!mb-[20px]"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title ? (formik.errors.title || '') : ''}
                    />
                    <TextEditor defaultValue={content} setDescription={setContent}></TextEditor>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Basic date picker" />
                        </DemoContainer>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker label="Basic date picker" />
                        </DemoContainer>
                    </LocalizationProvider>
                    {/* <TextField
                        fullWidth
                        id="color"
                        name="color"
                        className="!mb-[20px]"
                        label="Màu nền"
                        value={formik.values.color}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.color && Boolean(formik.errors.color)}
                        helperText={formik.touched.color ? (formik.errors.color || '') : ''}
                    /> */}

                    {image.length != 0 && (
                        <div className="flex gap-[5px] flex-nowrap overflow-x-auto mb-[20px]">
                            {image.map((item, index) => (
                                <div key={index} className="flex-[0_0_130px] h-[130px] relative">
                                    <img src={URL.createObjectURL(item)} alt="" className="object-cover" />
                                    <div className="absolute top-[10px] right-[10px]" onClick={() => handleDeleteImageRoom(index)}>
                                        <IconButton>
                                            <Clear ></Clear>
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Button
                        component="label"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                    >
                        Thêm hình
                        <VisuallyHiddenInput type="file" onChange={handleUploadImage} multiple />
                    </Button>
                    <LoadingButton color="primary" variant="contained" fullWidth type="submit" className="!mt-[20px]" loading={loading}>
                        Thêm mới
                    </LoadingButton>
                </form>
            </Box>
        </Modal>
    )
}

export default AddEventModal