import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

// Convierte la URL a un path
const __filename = fileURLToPath(import.meta.url)
// Usa el path
const __dirname = path.dirname(__filename)

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@pages': path.resolve(__dirname, 'src/views/pages'),
            '@layouts': path.resolve(__dirname, 'src/views/layouts'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@data': path.resolve(__dirname, 'src/data'),
            '@assets': path.resolve(__dirname, 'src/assets'),
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                category: path.resolve(__dirname, 'src/views/pages/category/category.html'),
                checkout: path.resolve(__dirname, 'src/views/pages/checkout/checkout.html'),
                search: path.resolve(__dirname, 'src/views/pages/search/search.html'),
                profile: path.resolve(__dirname, 'src/views/users/profile/profile.html'),
                login: path.resolve(__dirname, 'src/views/users/login/login.html'),
                notFound: path.resolve(__dirname, '404.html'),
            }
        }
    },
    server: {
        open: true,
    }
})
