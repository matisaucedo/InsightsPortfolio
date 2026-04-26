#!/usr/bin/env node
/**
 * One-time image optimization pass.
 * Run: node optimize-images.cjs
 */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const PORTFOLIO = __dirname;
const VAULT_INBOX = "/Users/matisaucedo01/Documents/matias-boveda-main/00-inbox";
const VAULT_ROOT = "/Users/matisaucedo01/Documents/matias-boveda-main";

async function convert(input, output, { width, height, quality = 85, fit = "inside" } = {}) {
  let pipeline = sharp(input);
  if (width || height) pipeline = pipeline.resize(width, height, { fit, withoutEnlargement: true });
  await pipeline.webp({ quality }).toFile(output);
  const inSize = fs.statSync(input).size;
  const outSize = fs.statSync(output).size;
  console.log(`  ✓ ${path.basename(input)} → ${path.basename(output)} ${(inSize/1024).toFixed(0)}KB → ${(outSize/1024).toFixed(0)}KB`);
}

async function main() {
  const team = `${PORTFOLIO}/assets/images/team`;
  const icons = `${PORTFOLIO}/assets/icons`;
  const images = `${PORTFOLIO}/assets/images`;

  console.log("\n📦 Team photos");
  for (const f of ["federico", "juan", "matias", "valentin"]) {
    await convert(`${team}/${f}.png`, `${team}/${f}.webp`, { width: 600, quality: 82 });
  }

  console.log("\n🖼  Cover images");
  await convert(`${images}/donor_cover.jpg`, `${images}/donor_cover.webp`, { width: 1600, quality: 78 });

  console.log("\n⚙️  Feature trio icons");
  const iconMap = [
    ["hf_20260426_202736_2fc1386e-dadd-4f44-b82f-58b433496595.png", "feature-apps.webp"],
    ["hf_20260426_203706_35141cc1-fbda-4260-9f52-bd63e404847b.png", "feature-integrations.webp"],
    ["hf_20260426_204010_eced7813-8224-4f85-a6f6-9af6063f9919.png", "feature-ai.webp"],
  ];
  for (const [src, dest] of iconMap) {
    await convert(`${VAULT_INBOX}/${src}`, `${icons}/${dest}`, { width: 256, height: 256, quality: 90, fit: "contain" });
  }

  console.log("\n🖼  Nosotros speaker image");
  await convert(
    `${VAULT_INBOX}/hf_20260426_201424_ebba8d59-a173-4041-8118-fe79cbd96871.png`,
    `${images}/no-usa-ia.webp`,
    { width: 1200, quality: 83 }
  );

  console.log("\n🏷  Logo");
  // Convert to PNG (small height for crisp nav render), keep as webp too
  await sharp(`${VAULT_ROOT}/Recurso 7.png`)
    .resize(null, 52, { fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(`${icons}/logo-new.png`);

  await sharp(`${VAULT_ROOT}/Recurso 7.png`)
    .resize(null, 52, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 95 })
    .toFile(`${icons}/logo-new.webp`);

  const logoIn = fs.statSync(`${VAULT_ROOT}/Recurso 7.png`).size;
  const logoOut = fs.statSync(`${icons}/logo-new.webp`).size;
  console.log(`  ✓ Recurso 7.png → logo-new.webp ${(logoIn/1024).toFixed(0)}KB → ${(logoOut/1024).toFixed(0)}KB`);

  console.log("\n✅ Done");
}

main().catch(err => { console.error(err); process.exit(1); });
