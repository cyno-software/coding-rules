<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

# Table of content
- [Table of content](#table-of-content)
- [Rules for operations on the Backend](#rules-for-operations-on-the-backend)
  - [Api](#️api)
  - [Validate incoming requests](#validate-incoming-requests)
    - [NodeJS](#nodejs) 
    - [Go](#golang) 

<!-- TOC end -->

<!-- TOC --><a name="rules-for-operations-on-the-backend"></a>
# Rules for operations on the Backend

<!-- TOC --><a name="api"></a>
## API
Bất kì api nào cũng phải có mã xác thực. 
Đối với các api yêu cầu tài khoản đăng nhập thì sử dụng mã xác thực lấy từ token api đăng nhập (login) hoặc api lấy thông tin tài khoản đăng nhập hiện thời (getMe). 
Đối với các api dành cho tài khoản khách phải sử dụng mã xác thực được cấu trúc để sử dụng theo ngày, mỗi ngày một mã xác thực khác nhau. Có thể sử dụng mã xác thực từ tài khoản đã đăng nhập để sử dụng.

Phân tách Api dành cho tài khoản người dùng và tài khoản khách riêng, Api dành cho tài khoản quản trị riêng.

<!-- TOC --><a name="validate-incoming-requests"></a>
## Validate incoming requests
Tất cả các api đều phải validate input

<!-- TOC --><a name="nodejs"></a>
### NodeJS
Sử dụng thư viện: class-validator (https://github.com/typestack/class-validator)

<!-- TOC --><a name="golang"></a>
### GO
Sử dụng thư viện: github.com/go-playground/validator/v10
