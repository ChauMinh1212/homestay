import { AddCircleOutline, Clear } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { Button, IconButton } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axiosInstance from "~/axios/axiosConfig"
import { VisuallyHiddenInput } from "~/components/Room/AddRoom"
import { showSnackbar } from "~/components/SnackBarCustom/SnackBarSlice"
import UserContext from "~/contexts/UserContext"

const AdminSetting = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [oldBanner, setOldBanner] = useState([])
    const [newBanner, setNewBanner] = useState([])

    const [loading, setLoading] = useState(false)

    const getBanner = async () => {
        try {
            const res = await axiosInstance.get('banner')
            return res.data || []
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (!user || user.role != 1) { navigate('/') }

        (async () => {
            const banner = await getBanner()
            setOldBanner(banner)
        })();

    }, [])

    const handleDeleteBannerOld = (index: number) => {
        setOldBanner(prev => {
            const newListImg = [...prev]
            newListImg.splice(index, 1)
            return newListImg
        })
    }

    const handleDeleteBannerNew = (index: number) => {
        setNewBanner(prev => {
            const newListImg = [...prev]
            newListImg.splice(index, 1)
            return newListImg
        })
    }

    const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files
        const listImg = []
        for (let i = 0; i < selectedFile.length; i++) {
            listImg.push(selectedFile[i])
        }
        setNewBanner((prev) => {
            const newArr = [...prev, ...listImg]
            return newArr
        })
    }

    const handleSaveBanner = async () => {
        const formData = new FormData()

        newBanner.length != 0 && newBanner.map((item, index) => {
            formData.append(`file[${index}]`, item)
        })
        try {
            setLoading(true)
            const upload = newBanner.length != 0 ? await axiosInstance.post('upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }) : { data: [] }
            await axiosInstance.post('banner/create', { banner: [...oldBanner, ...upload.data] })
            dispatch(showSnackbar({message: 'Cập nhật thành công', status: 'success'}))
        } catch (error) {
            console.log(error);
            dispatch(showSnackbar({message: 'Lỗi', status: 'error'}))
        }
        setLoading(false)
    }

    return (
        <div className="max-w-7xl mx-auto px-[20px]">
            <div>
                <p className="font-semibold text-[30px]">Cài đặt banner trang chủ</p>
                <div className="flex gap-[5px] flex-nowrap overflow-x-auto mb-[20px]">
                    {oldBanner && oldBanner.map((item, index) => (
                        <div key={index} className="flex-[0_0_130px] h-[130px] relative">
                            <img src={`${import.meta.env.VITE_REACT_APP_URL_RESOURCE}${item}`} alt="" className="object-cover" />
                            <div className="absolute top-[10px] right-[10px]" onClick={() => handleDeleteBannerOld(index)}>
                                <IconButton>
                                    <Clear ></Clear>
                                </IconButton>
                            </div>
                        </div>
                    ))}
                    {
                        newBanner && newBanner.map((item, index) => (
                            <div key={index} className="flex-[0_0_130px] h-[130px] relative">
                                <img src={URL.createObjectURL(item)} alt="" className="object-cover" />
                                <div className="absolute top-[10px] right-[10px]" onClick={() => handleDeleteBannerNew(index)}>
                                    <IconButton>
                                        <Clear ></Clear>
                                    </IconButton>
                                </div>
                            </div>
                        ))
                    }
                    <div className="flex justify-center items-center flex-col" key={988172378}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<AddCircleOutline />}
                        >
                            Thêm hình
                            <VisuallyHiddenInput type="file" onChange={handleUploadImage} multiple />
                        </Button>
                        <LoadingButton loading={loading} variant="outlined" fullWidth className="!mt-[10px]" onClick={handleSaveBanner}>
                            Lưu
                        </LoadingButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminSetting