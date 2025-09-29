// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   headers() {
//     // Required by FHEVM 
//     return Promise.resolve([
//       {
//         source: '/',
//         headers: [
//           {
//             key: 'Cross-Origin-Opener-Policy',
//             value: 'same-origin',
//           },
//           {
//             key: 'Cross-Origin-Embedder-Policy',
//             value: 'require-corp',
//           },
//         ],
//       },
//     ]);
//   }
// };

// export default nextConfig;
import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  headers() {
    // Required by FHEVM 
    return Promise.resolve([
      {
        source: "/",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ]);
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // ✅ 给浏览器端注入 global
      config.plugins.push(
        new webpack.ProvidePlugin({
          global: require.resolve("global"),
        })
      );
    }
    return config;
  },
};

export default nextConfig;
