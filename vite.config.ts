import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  // @stellar/stellar-sdk (used to read live USDC balances) references Node
  // globals like Buffer/process internally — without these polyfills those
  // code paths silently fail in the browser and balance reads return nothing.
  plugins: [react(), nodePolyfills({ globals: { Buffer: true, global: true, process: true } })],
})
