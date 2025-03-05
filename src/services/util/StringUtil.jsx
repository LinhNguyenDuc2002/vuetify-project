export const formatUrl = (name) => {
    name = name.toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .normalize('NFD')
            .replace(/đ/g, 'd')
            .replace(/[\u0300-\u036f]/g, '');

    return name;
};

export const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(value);
};