/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2", "@node-rs/bcrypt"],
  },
  output: "standalone",
};

export default nextConfig;
