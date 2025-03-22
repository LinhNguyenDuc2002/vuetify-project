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
    if (value >= 1e9) {
        const billions = value / 1e9;
        return `${billions.toFixed(1)}B ₫`;
    } else if (value >= 1e6) {
        const millions = value / 1e6;
        return `${millions.toFixed(1)}M ₫`;
    }
    else {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    }
};