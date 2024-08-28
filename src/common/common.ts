export function removeVietnameseTones(str: string) {
    return str.normalize('NFD') // Chuẩn hóa chuỗi
              .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
              .replace(/đ/g, 'd') // Chuyển đ thành d
              .replace(/Đ/g, 'D'); // Chuyển Đ thành D
}