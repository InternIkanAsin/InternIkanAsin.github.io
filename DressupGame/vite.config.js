import { defineConfig } from 'vite';

export default defineConfig({
  // Atur base path menjadi path relatif.
  // Ini adalah perbaikan paling penting.
  base: './', 
  build: {
    // Opsi tambahan untuk memastikan aset dimuat dengan benar
    assetsInlineLimit: 0,
  },
});