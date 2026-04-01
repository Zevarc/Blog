import { defineMDSveXConfig as defineConfig,escapeSvelte } from 'mdsvex';
import { getSingletonHighlighter } from 'shiki';

const highlighter=await getSingletonHighlighter({
  themes: ['github-dark','github-light','monokai'],
  langs: ['javascript', 'typescript', 'svelte', 'css', 'html','jade','kotlin','python','shell','java','cpp','cmake','groovy','astro']
});
const config = defineConfig({
  extensions: ['.md'],

  highlight: {
    highlighter: async (code, lang) => {
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang:lang??'text', theme: 'github-light' }));
      return `{@html \`${html}\` }`;
    }
  },

  remarkPlugins: [],
  rehypePlugins: []
});

export default config;