import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({	fallback: 'index.html', pages: 'docs'}),
		prerender: {
			// use relative URLs similar to an anchor tag <a href="/test/1"></a>
			// do not include group layout folders in the path such as /(group)/test/1
			entries: ['/ea/editor','/ea/query', '/ea/flows', '/ea/services']
		},
		paths: {
			base: '/pages/access-for-ecom-doc/electronic-architect',
		}
	}
};

export default config;
