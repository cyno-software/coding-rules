# Bộ Quy Tắc Lập Trình Chuẩn Cho WordPress Developer

## 1. Quy Tắc Chung

### 1.1. Tuân Thủ WordPress Coding Standards
- Tuân thủ [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/) cho PHP, HTML, CSS, và JavaScript.
- Sử dụng công cụ như PHP_CodeSniffer với WordPress Coding Standards để kiểm tra code tự động.

### 1.2. Đặt Tên
- **Prefix**: Sử dụng prefix nhất quán cho tất cả các functions, classes, ids và tên biến để tránh xung đột (ví dụ: `cyno_`, `cyno-`).
- **Functions**: Sử dụng chữ thường và dấu gạch dưới: `cyno_get_post_meta()`.
- **Classes**: Sử dụng PascalCase: `Cyno_Theme_Setup`.
- **Methods và Properties**: Sử dụng camelCase: `$this->getOption()`.
- **Constants**: Sử dụng chữ hoa và dấu gạch dưới: `CYNO_API_KEY`.
- **Files**: Sử dụng chữ thường và dấu gạch: `class-cyno-widget.php`.

### 1.3. Cấu Trúc Thư Mục
- **Theme**:
```
theme-name/
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── fonts/
├── inc/
│   ├── classes/
│   ├── helpers/
│   ├── customizer/
│   └── template-parts/
├── languages/
├── functions.php
├── style.css
├── index.php
└── [các template files]
```

- **Plugin**:
```
plugin-name/
├── admin/
│ ├── css/
│ ├── js/
│ ├── partials/
│ └── class-admin.php
├── includes/
│ ├── class-plugin-name.php
│ └── class-loader.php
├── languages/
├── public/
│ ├── css/
│ ├── js/
│ ├── partials/
│ └── class-public.php
├── index.php
├── uninstall.php
└── plugin-name.php
```
### 1.4. Documentation
- Sử dụng [PHPDoc](https://docs.phpdoc.org/3.0/guide/index.html) cho tất cả functions, classes và methods.
- Mỗi file PHP phải có block comment giới thiệu ở đầu file.
- Mô tả rõ ràng mục đích của function, loại dữ liệu tham số và giá trị trả về.

```php
/**
 * Lấy thông tin meta của bài viết.
 *
 * @param int    $post_id ID của bài viết.
 * @param string $key     Key meta cần lấy.
 * @param bool   $single  Trả về giá trị đơn hay mảng.
 * @return mixed          Giá trị meta của bài viết.
 */
function cyno_get_post_meta($post_id, $key, $single = true) {
    // Code
}
```
## 2. PHP Coding Rules
### 2.1. Bảo Mật
- Kiểm tra dữ liệu đầu vào bằng hàm validate và sanitize của WordPress.
- Sử dụng `esc_html()`, `esc_attr()`, `esc_url()` cho output.
- Sử dụng prepared statements với `$wpdb`.
- Kiểm tra quyền truy cập bằng `current_user_can()`.
- Kiểm tra nonce cho forms.

```php
// Ví dụ về xử lý form
if (!isset($_POST['cyno_nonce']) || !wp_verify_nonce($_POST['cyno_nonce'], 'cyno_action')) {
    die('Bảo mật không hợp lệ');
}

if (!current_user_can('edit_posts')) {
    wp_die('Không có quyền truy cập');
}

$title = isset($_POST['title']) ? sanitize_text_field($_POST['title']) : '';
```
### 2.2. Database
- Sử dụng $wpdb với prepared statements.
- Tránh truy vấn trong vòng lặp.
- Cache kết quả database khi có thể với Transient API.

```php
global $wpdb;
$results = $wpdb->get_results(
    $wpdb->prepare(
        "SELECT * FROM {$wpdb->prefix}posts WHERE post_author = %d AND post_status = %s",
        $user_id,
        'publish'
    )
);
```
### 2.3. Hooks
- Sử dụng priority và số tham số phù hợp khi thêm hooks.
- Tách logic thành các functions riêng biệt.
- Đặt tên callback functions rõ ràng.

```php
add_action('init', 'cyno_register_post_types', 10);
add_filter('the_content', 'cyno_filter_content', 20);
```
### 2.4. Tránh Lỗi
- Khai báo strict_types: declare(strict_types=1);.
- Sử dụng isset() hoặc empty() trước khi truy cập biến.
- Luôn có giá trị mặc định cho tham số functions.
- Bắt exceptions khi cần thiết.

## 3. Theme Development
### 3.1. Chuẩn Theme
- Tuân thủ Theme Handbook.
- Sử dụng template hierarchy chuẩn của WordPress.
- Tách template thành các parts có thể tái sử dụng.
- Sử dụng template tags thay vì truy vấn trực tiếp.

### 3.2. Enqueue Scripts & Styles
- Sử dụng wp_enqueue_script() và wp_enqueue_style() trong hook wp_enqueue_scripts.
- Đăng ký dependencies chính xác.
- Thêm version cho cache busting.
- Sử dụng thư viện đã có trong WordPress khi có thể.

```php
function cyno_enqueue_scripts() {
    wp_enqueue_style(
        'cyno-style',
        get_template_directory_uri() . '/assets/css/main.css',
        array(),
        filemtime(get_template_directory() . '/assets/css/main.css')
    );
    
    wp_enqueue_script(
        'cyno-script',
        get_template_directory_uri() . '/assets/js/main.js',
        array('jquery'),
        filemtime(get_template_directory() . '/assets/js/main.js'),
        true
    );
    
    // Localize script
    wp_localize_script('cyno-script', 'cynoData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('cyno-ajax-nonce')
    ));
}
add_action('wp_enqueue_scripts', 'cyno_enqueue_scripts');
```
### 3.3. Customizer
- Sử dụng Customizer API thay vì options pages tùy chỉnh.
- Tổ chức settings theo panels và sections.
- Sử dụng selective refresh khi có thể.
- Validate dữ liệu input.

### 3.4. Translation
- Sử dụng functions __(), _e(), esc_html__() cho text.
- Load text domain trong functions.php.
- Sử dụng slug nhất quán cho text domain.

## 4. Plugin Development
### 4.1. Chuẩn Plugin
- Tuân thủ [Plugin Handbook](https://developer.wordpress.org/plugins/).
- Sử dụng singleton pattern hoặc OOP.
- Tách frontend và admin code.
- Sử dụng activation/deactivation hooks.

```php
register_activation_hook(__FILE__, array('Cyno_Plugin', 'activate'));
register_deactivation_hook(__FILE__, array('Cyno_Plugin', 'deactivate'));
```

## 4.2. Settings API
- Sử dụng Settings API cho admin options.
- Validate và sanitize tất cả options.
- Tổ chức options thành các nhóm logic.
### 4.3. Uninstall
- Sử dụng uninstall.php để dọn dẹp dữ liệu khi plugin bị xóa.
- Cung cấp option để giữ lại dữ liệu nếu người dùng muốn.

## 5. JavaScript & CSS
### 5.1. JavaScript
- Sử dụng ES6+ với transpiler khi cần.
- Đóng gói code với webpack, rollup hoặc parcel.
- Tránh global scope pollution.
- Sử dụng IIFE hoặc modules.

```javascript
(function($) {
    'use strict';
    
    // Plugin code
    
    $(document).ready(function() {
        // DOM ready code
    });
    
})(jQuery);
```
### 5.2. CSS/SCSS
- Sử dụng preprocessor như SASS.
- Sử dụng BEM hoặc một phương pháp đặt tên CSS nhất quán.
- Tổ chức CSS theo components.
- Tối ưu CSS với minification và combining.

```css
// Component naming (BEM)
.cyno-card {
    // Base styles
    
    &__title {
        // Element styles
    }
    
    &--featured {
        // Modifier styles
    }
}
```

## 6. Hiệu Suất & Optimization
### 6.1. Tối Ưu Database
- Sử dụng custom tables chỉ khi thực sự cần thiết.
- Chuẩn hóa schema và đánh index cho custom tables.
- Sử dụng Object Cache với functions như wp_cache_get() và wp_cache_set().
- Sử dụng Transient API cho cached data có thời hạn.

```php
$cache_key = 'cyno_featured_posts';
$featured_posts = wp_cache_get($cache_key);

if (false === $featured_posts) {
    // Query database
    $featured_posts = get_posts(array(/* args */));
    
    // Cache the results
    wp_cache_set($cache_key, $featured_posts, '', HOUR_IN_SECONDS);
}
```
### 6.2. Asset Optimization
- Minify và combine CSS/JS files.
- Sử dụng defer cho non-critical JavaScript.
- Tối ưu hóa images (lazy loading, kích thước phù hợp).
- Sử dụng WebP hoặc next-gen formats cho images.

### 6.3. Caching
- Tương thích với plugin caching phổ biến.
- Xác định đúng những gì nên và không nên cache.
- Implement cache busting khi cần thiết.

## 7. Testing & Debugging
### 7.1. Environment Setup
- Sử dụng local development environment (Local, DevKinsta, Docker, etc.).
- Thiết lập staging environment gần giống với production.
- Bật WP_DEBUG và các constants liên quan trong development.

```php
// wp-config.php (development)
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);
define('SCRIPT_DEBUG', true);
```

### 7.2. Testing
- Viết unit tests với PHPUnit.
- Viết integration tests.
- Test trên nhiều phiên bản WordPress, PHP và browsers.
- Sử dụng tools như Playwright hoặc Cypress cho end-to-end testing.

### 7.3. Debugging
- Sử dụng error_log() thay vì echo cho debugging.
- Implement logging system cho errors.
- Sử dụng các plugin như Query Monitor trong development.

## 8. Continuous Integration & Deployment
### 8.1. Version Control
- Sử dụng Git flow hoặc một workflow phù hợp.
- Viết commit messages rõ ràng, mô tả chi tiết.
- Sử dụng branches cho features/fixes.

### 8.2. CI/CD
- Thiết lập CI pipeline (GitHub Actions, GitLab CI, etc.).
- Tự động hóa testing.
- Tự động hóa deployment đến staging/production.

## 9. Accessibility
### 9.1. WCAG Compliance
- Tuân thủ WCAG 2.1 (AA) standards.
- Sử dụng semantic HTML.
- Cung cấp text alternatives cho non-text content.
- Đảm bảo keyboard navigability.

### 9.2. ARIA
- Sử dụng ARIA attributes khi cần thiết.
- Kiểm tra accessibility với các công cụ như Wave, Axe.

## 10. Documentation
### 10.1. README
- Cung cấp README.md với installation instructions.
- Mô tả clear về features và cách sử dụng.
- Liệt kê các dependencies.

### 10.2. Code Documentation
- Document tất cả functions, classes, hooks.
- Giải thích các phần phức tạp của code.
- Cập nhật documentation khi code thay đổi.

### 10.3. Changelog
- Maintain CHANGELOG.md theo chuẩn [Keep a Changelog](https://keepachangelog.com/).
- Version theo [Semantic Versioning](https://semver.org/).

---
# Checklist Trước Khi Release
1. Code tuân thủ WordPress Coding Standards
2. Theme/Plugin đã được tested trên các phiên bản WordPress gần đây
3. Tất cả text đã được internationalized
4. Options được xác thực và sanitized
5. Security checks được implement (nonces, capabilities, etc.)
6. Assets đã được minified và optimized
7. Database queries được optimized
8. Accessibility được kiểm tra
9. Documentation đầy đủ
10. Version number được update
11. Changelog được cập nhật
12. Tested trên multiple environments và browsers