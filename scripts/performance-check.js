// scripts/performance-check.js
// Adicione este script ao package.json para verificar performance

const fs = require("fs");
const path = require("path");

class PerformanceChecker {
  constructor() {
    this.components = [];
    this.bundleSizeLimit = 500; // KB
  }

  checkComponentSize(componentPath) {
    try {
      const stats = fs.statSync(componentPath);
      const sizeInKB = stats.size / 1024;

      if (sizeInKB > 50) {
        // Alert para componentes > 50KB
        console.warn(
          `⚠️  Componente grande detectado: ${componentPath} (${sizeInKB.toFixed(
            2
          )}KB)`
        );
      }

      return sizeInKB;
    } catch (error) {
      console.error(`Erro ao verificar ${componentPath}:`, error);
      return 0;
    }
  }

  checkImages() {
    const imagesDir = path.join(process.cwd(), "public/images");
    if (fs.existsSync(imagesDir)) {
      const images = fs.readdirSync(imagesDir);
      images.forEach((image) => {
        const imagePath = path.join(imagesDir, image);
        const stats = fs.statSync(imagePath);
        const sizeInKB = stats.size / 1024;

        if (sizeInKB > 200) {
          console.warn(
            `🖼️  Imagem muito grande: ${image} (${sizeInKB.toFixed(2)}KB)`
          );
        }
      });
    }
  }
}

// Executar verificação
if (require.main === module) {
  const checker = new PerformanceChecker();
  checker.checkImages();
  console.log("✅ Verificação de performance concluída");
}

module.exports = PerformanceChecker;
