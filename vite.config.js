import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Vite 8에서 Recharts가 내부 lodash-es를 온전히 인지하도록 의존성을 묶어줍니다.
    include: ['recharts', 'lodash-es'],
  }
});