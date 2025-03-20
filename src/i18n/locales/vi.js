const VietNam = {
    login: 'Đăng nhập',
    signup: 'Đăng ký',
    username: 'Tên đăng nhập',
    password: 'Mật khẩu',
    forgot_login_password: 'Quên mật khẩu đăng nhập',
    remember_me: 'Nhớ mật khẩu',
    enter_your_password: 'Nhập mật khẩu',
    sign_in_with_google: "Đăng nhập với google",
    sign_in_with_facebook: 'Đăng nhập với facebook',
    create_an_account: 'Tạo tài khoản mới',
    mail_address: 'Địa chỉ mail',
    phone_number: 'Số điện thoại',
    repeat_your_password: 'Nhập lại mật khẩu',
    home: 'Trang chủ',
    about: 'Về chúng tôi',
    search: 'Tìm kiếm',
    view_orders: 'Xem đơn hàng',
    edit_profile: 'Sửa thông tin hồ sơ',
    settings: 'Cài đặt',
    help: 'Trợ giúp',
    logout: 'Đăng xuất',
    toolbar: {
        home: 'Trang chủ',
        dashboard: 'Thống kê',
        product: 'Quản lý sản phẩm',
        add_product: 'Thêm sản phẩm',
        product_list: 'Danh sách sản phẩm',
        category: 'Quản lý danh mục',
    },

    product: {
        name: 'Tên sản phẩm',
        category: 'Danh mục',
        description: 'Mô tả',
        price: 'Đơn giá',
        quantity: 'Kho hàng',
        image: 'Ảnh',
        typeNumber: 'Số loại sản phẩm',
        status: 'Trạng thái',
        type: 'Tên loại sản phẩm',
        sold: 'Đã bán',
    },

    button: {
        add: 'Thêm',
        delete: 'Xóa'
    },

    message: {
        error: {
            not_empty: 'Không được để trống',
            maximum_image_capacity: 'Số lượng ảnh vượt quá cho phép',
            maximum_length: 'Vượt quá {length} ký tự',
            required_select: 'Bắt buộc chọn một danh mục',
            required_product_detail: 'Bắt buộc phải có tối thiểu một loại sản phẩm',
            username_not_empty: 'Tên đăng nhập không được để trống',
            username_no_spaces: 'Tên đăng nhập không thể chứa khoảng trắng',
            password_not_empty: 'Mật khẩu không được để trống',
            login_fail: 'Tên đăng nhập hoặc mật khẩu không chính xác',
            email_not_empty: 'Email không được để trống',
            email_invalid: 'Đảm bảo địa chỉ email có định dạng đúng, ví dụ: abc@domain.com',
            email_format: 'Email không được chứa khoảng trắng hoặc ký tự đặc biệt không hợp lệ',
            password_length: 'Mật khẩu phải có ít nhất 8 ký tự.',
            password_uppercase: 'Mật khẩu phải có ít nhất một ký tự chữ hoa',
            password_lowercase: 'Mật khẩu phải có ít nhất một ký tự chữ thường',
            password_number: 'Mật khẩu phải có ít nhất một chữ số',
            password_special: 'Mật khẩu phải có ít nhất một ký tự đặc biệt (@, #, $, %)',
            password_no_spaces: 'Mật khẩu không thể chứa khoảng trắng',
            repeat_password: 'Mật khẩu không khớp',
            term_service: 'Bạn chưa đồng ý với điều khoản dịch vụ',
            otp_wrong: 'Mã OTP không chính xác',
            minimum_price: 'Đơn giá tối thiểu 0 đồng',
            maximum_price: 'Đơn giá tối đa là {price}',
            must_be_number: 'Ký tự không hợp lệ',
            minimum_quantity: 'Số lượng tối thiểu là 0',
            maximum_quantity: 'Số lượng tối đa là {quantity}',
            must_be_integer: 'Số lượng không hợp lệ',
            required_file: 'Bắt buộc chọn ảnh minh họa sản phẩm',
            required_type_file: 'Hãy chọn ảnh minh họa cho mỗi loại sản phẩm',
            capacity_file: 'Dung lượng ảnh phải nhỏ hơn {size}MB',
            type_file: 'Định dạng file phải là các dạng JPEG, PNG hoặc PDF',
            existed_selection: 'Tùy chọn này đã tồn tại'
        },

        warn: {
            login_to_check_cart: 'Đăng nhập để xem Giỏ hàng',
        },

        info: {
            otp: 'Chúng tôi đã gửi mã xác thực tới {email}. <br/>Hãy kiểm tra email của bạn và nhập mã code bên dưới.',
            create_account: 'Tạo tài khoản thành công! <br/>Hãy đăng nhập để bắt đầu sử dụng dịch vụ của chúng tôi'
        }
    },

    rule: {
        password: {
            length: 'Mật khẩu phải có ít nhất 8 ký tự',
            case: 'Phải có ít nhất một chữ cái viết hoa và một chữ cái viết thường',
            number: 'Phải chứa ít nhất một chữ số',
            special: 'Bao gồm ít nhất một ký tự đặc biệt (ví dụ: @, #, $, %, &, *)',
        }
    },

    otp: {
        title: 'Xác thực tài khoản',
        message: {
            info: '',
            remind: 'Bạn chưa nhận được mã?'
        },
        btn: {
            verify: 'Xác thực',
            resend: 'Gửi lại mã'
        }
    },

    category: {
        icon: 'Biểu tượng',
        name: 'Tên danh mục',
        number: 'Tổng kho',
        status: 'Trạng thái'
    }
};
  
export default VietNam;