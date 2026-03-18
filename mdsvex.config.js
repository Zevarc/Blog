import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { getSingletonHighlighter } from 'shiki';

const codeHightlighter=getSingletonHighlighter({
  themes: ['github-dark','github-light','monokai'],
  langs: ['javascript', 'typescript', 'svelte', 'css', 'html','jade','kotlin','python','shell','java','cpp']
});
const config = defineConfig({
  extensions: ['.md'],

  highlight: {
    highlighter: async (code, lang) => {
      const html = (await codeHightlighter).codeToHtml(code, { lang:lang??'text', theme: 'github-light' });
      return `{@html \`${html}\` }`;
    }
  },

  remarkPlugins: [],
  rehypePlugins: []
});

export default config;