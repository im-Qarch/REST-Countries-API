import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'flex items-center gap-2 w-max px-4 py-1 rounded inline-block text-gray-800 dark:text-gray-100 drop-shadow-xl cursor-pointer disabled:cursor-default disabled:opacity-50 bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-yellow-600 !outline-none'],
    ['input-select', 'block w-full rounded min-w-[150px] shadow-sm border-0 bg-white dark:bg-gray-900 py-3.5 px-3 text-gray-700 placeholder:text-gray-300 focus:bg-white focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm sm:leading-6'],
    ['input-text', 'block w-full rounded shadow-sm border-0 bg-white dark:bg-gray-900 py-3 pl-10 pr-3 text-gray-700 placeholder:text-gray-300 focus:bg-white focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm sm:leading-6 min-w-[270px] md:min-w-[300px] lg:min-w-[400px]'],
    ['btn-primary', ''],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'Nunito Sans',
      },
    }),
  ],
})
