import { defineConfig } from 'vite';
import path from 'path';

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
    }
});
