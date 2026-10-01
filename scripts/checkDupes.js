const fs = require('fs');

const files = [
  'src/components/MegaHairShowcase.tsx',
  'src/components/MechasShowcase.tsx',
  'src/components/OlharShowcase.tsx',
  'src/components/SpaceCarousel.tsx',
  'src/components/ServicesGrid.tsx',
  'src/components/MediaArchiveGallery.tsx'
];

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const m = [...c.matchAll(/src:\s*["']([^"']+)["']/g)].map(x => x[1]);
  const counts = {};
  m.forEach(s => counts[s] = (counts[s] || 0) + 1);
  const dupes = Object.entries(counts).filter(([k, v]) => v > 1);
  console.log(f, 'total slides:', m.length, 'dupes:', dupes);
});
