import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	base: '/cf-rune-calculator/',
	plugins: [vue()],
	server: {
		host: '0.0.0.0',
		port: 3003,
		strictPort: true,
		open: true,
	},
	preview: {
		host: '0.0.0.0',
		port: 3003,
		strictPort: true,
		open: true,
	},
});
