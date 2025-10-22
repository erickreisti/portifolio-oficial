// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ativa o SWC minification (padrão, mas bom garantir)
  swcMinify: true,

  // Esta configuração garante que você possa importar imagens como fizemos no Hero.tsx
  // Se você usar imagens de domínio externo (ex: projetos), adicione-os aqui.
  images: {
    // Por enquanto, não precisamos de domínios remotos, pois todas as imagens estão em /public.
    // Se um dia precisar:
    // remotePatterns: [{ protocol: 'https', hostname: 'seusiteexterno.com' }],
  },

  // Adicione outras configurações de otimização se necessário,
  // como a configuração do Server Actions, se for usá-los no formulário de contato:
  // experimental: {
  //   serverActions: true,
  // },
};

module.exports = nextConfig;
