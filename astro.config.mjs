import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import addClasses from 'rehype-add-classes'

// https://astro.build/config
export default defineConfig({
  site: 'https://irah.vercel.app/',
  integrations: [sitemap(), react(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), tailwind()],
  markdown:{
    extendDefaultPlugins: true,
    rehypePlugins:[
      [
        addClasses,
        {
          h1: 'text-4xl font-bold font-mplus',
          h2: 'text-2xl font-bold font-mplus',
          h3: 'text-xl font-bold font-mplus',
          h4: 'text-lg font-bold font-mplus',
          h5: 'font-bold font-mplus',
        }
      ]
    ]
  }
  
});