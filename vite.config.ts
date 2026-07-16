import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		vue(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				id: '/',
				name: 'CF 无尽挑战符文计算器',
				short_name: 'CF 符文计算器',
				description: 'CF 穿越火线无尽挑战符文计算器，支持 PC 和移动端。',
				theme_color: '#102a43',
				background_color: '#102a43',
				display: 'standalone',
				lang: 'zh-CN',
				start_url: '/',
				scope: '/',
				icons: [
					{
						src: 'icons/rune-calculator-192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'icons/rune-calculator-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
			},
		}),
	],
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
