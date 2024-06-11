import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { customTheme } from './src/customTheme';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: `rgb(var(--theme-font-color-base))`,
						a: {
							color: `rgb(var(--color-primary-500))`,
							'&:hover': {
								color: `rgb(var(--color-primary-400))`
							}
						},
						h1: {
							color: `rgb(var(--theme-font-color-base))`
						},
						h2: {
							color: `rgb(var(--theme-font-color-base))`
						},
						h3: {
							color: `rgb(var(--theme-font-color-base))`
						},
						h4: {
							color: `rgb(var(--theme-font-color-base))`
						},
						blockquote: {
							color: `rgb(var(--theme-font-color-base))`,
							borderLeftColor: `rgb(var(--color-primary-500))`
						},
						strong: {
							color: `rgb(var(--theme-font-color-base))`
						}
					}
				},
				dark: {
					css: {
						color: `rgb(var(--theme-font-color-dark))`,
						a: {
							color: `rgb(var(--color-primary-500))`,
							'&:hover': {
								color: `rgb(var(--color-primary-400))`
							}
						},
						h1: {
							color: `rgb(var(--theme-font-color-dark))`
						},
						h2: {
							color: `rgb(var(--theme-font-color-dark))`
						},
						h3: {
							color: `rgb(var(--theme-font-color-dark))`
						},
						h4: {
							color: `rgb(var(--theme-font-color-dark))`
						},
						blockquote: {
							color: `rgb(var(--theme-font-color-dark))`,
							borderLeftColor: `rgb(var(--color-primary-500))`
						},
						strong: {
							color: `rgb(var(--theme-font-color-dark))`
						}
					}
				}
			})
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true
					},
					{
						name: 'wintry',
						enhancements: true
					},
					{
						name: 'modern',
						enhancements: true
					},
					{
						name: 'hamlindigo',
						enhancements: true
					},
					{
						name: 'rocket',
						enhancements: true
					},
					{
						name: 'sahara',
						enhancements: true
					},
					{
						name: 'gold-nouveau',
						enhancements: true
					},
					{
						name: 'vintage',
						enhancements: true
					},
					{
						name: 'seafoam',
						enhancements: true
					},
					{
						name: 'crimson',
						enhancements: true
					}
				],
				custom: [customTheme]
			}
		})
	]
} satisfies Config;
