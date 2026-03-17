import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.mdx'],
	preprocess: [mdsvex({ extensions: ['.md'] })],
	kit: {
		adapter: adapter({strict: false})
	}
}

export default config
