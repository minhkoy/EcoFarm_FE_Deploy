interface Resources {
  "auth": {
    "back-to-login": "quay lại trang đăng nhập",
    "field": {
      "account-type": "loại tài khoản",
      "confirm-password": "xác nhận mật khẩu",
      "forgot-password": "quên mật khẩu",
      "remember-me": "ghi nhớ đăng nhập",
      "your-email": "email của bạn",
      "your-password": "mật khẩu của bạn",
      "your-tax-code": "field.your-tax-code",
      "your-username": "field.your-username"
    },
    "have-account": "đã có tài khoản",
    "login": {
      "success": "đăng nhập thành công"
    },
    "not-have-account": "chưa có tài khoản",
    "sign-up": {
      "success": "đăng ký thành công"
    },
    "validation": {
      "account-type": {
        "isRequired": "loại tài khoản không được để trống"
      },
      "email": {
        "isInValid": "email không hợp lệ",
        "isRequired": "email không được để trống"
      },
      "password": {
        "max": "mật khẩu không được quá {{max}} ký tự",
        "min": "mật khẩu không được ít hơn {{min}} ký tự",
        "notMatch": "nhập lại mật khẩu không khớp"
      },
      "taxCode": {
        "isRequired": "mã số thuế không được để trống"
      },
      "username": {
        "isRequired": "tên đăng nhập không được để trống"
      },
      "usernameOrEmail": {
        "isRequired": "tên đăng nhập hoặc email không được để trống"
      }
    }
  },
  "common": {
    "and": "và",
    "error": "Đã xảy ra lỗi",
    "experience": "trải nghiệm",
    "explore": "khám phá",
    "homepage": "trang chủ",
    "log-out": "đăng xuất",
    "login": "đăng nhập",
    "now": "ngay",
    "or": "hoặc",
    "packages": "gói farming",
    "reset-password": "Thay đổi mật khẩu",
    "sign-up": "đăng ký",
    "success": "thành công",
    "username": "tài khoản",
    "validation": {
      "date": {
        "isInValid": "Định dạng ngày không hợp lệ",
        "isRequired": "Vui lòng nhập ngày"
      }
    }
  },
  "error": {
    "access-denied": {
      "description": "Xin lỗi, bạn Không có quyền truy cập",
      "title": "Truy cập bị từ chối"
    },
    "access-expired": {
      "description": "Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.",
      "title": "Đăng nhập hết hạn"
    },
    "default-error": {
      "title": "Lỗi"
    }
  },
  "farm-package": {
    "info": {
      "farm-package": "thông tin {{total}} gói farming"
    },
    "notFound": {
      "package": "Không tìm thấy gói"
    }
  },
  "select": {
    "account-type": {
      "admin": "Quản trị hệ thống",
      "customer": "Người dùng",
      "seller": "Tổ chức/ cá nhân cung cấp dịch vụ",
      "super-admin": "Quản trị viên cao cấp"
    }
  }
}

export default Resources;
