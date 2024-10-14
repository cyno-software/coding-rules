import path from "path"
import TerserPlugin from "terser-webpack-plugin"
import CompressionPlugin from "compression-webpack-plugin"

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  compress: true,
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "vi",
  },

  webpack: (config, { dev, isServer }) => {
    // Tối ưu hóa cho production builds
    if (!dev) {
      // Sử dụng TerserPlugin để minify JavaScript
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Loại bỏ console.log trong production
            },
            output: {
              comments: false, // Loại bỏ comments
            },
          },
        }),
      )

      // Sử dụng Compression Plugin để nén assets
      config.plugins.push(
        new CompressionPlugin({
          test: /\.(js|css|html|svg)$/,
          algorithm: "gzip",
        }),
      )
    }

    // Thêm alias để giảm độ dài của import paths
    config.resolve.alias["@components"] = path.join(__dirname, "components")
    config.resolve.alias["@lib"] = path.join(__dirname, "lib")

    // Tối ưu hóa cho server-side rendering
    if (isServer) {
      config.externals.push("react", "react-dom")
    }

    // Sử dụng cache để tăng tốc độ build
    config.cache = true

    return config
  },
}

export default config
