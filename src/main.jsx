import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import App from './App'
import { ToastProvider } from './context/ToastContext'
import { AuthProvider } from './context/AuthContext'
import { getAlgodConfigFromViteEnvironment } from './utils/network/getAlgoClientConfigs'
import './styles/main.css'

const algodConfig = getAlgodConfigFromViteEnvironment()

const walletManager = new WalletManager({
  wallets: [WalletId.PERA, WalletId.DEFLY, WalletId.EXODUS, WalletId.LUTE],
  defaultNetwork: 'testnet',
  networks: {
    testnet: {
      algod: {
        baseServer: algodConfig.server,
        port: algodConfig.port,
        token: String(algodConfig.token),
      },
    },
    localnet: {
      algod: {
        baseServer: 'http://localhost',
        port: '4001',
        token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WalletProvider manager={walletManager}>
          <ToastProvider>
            <App />
          </ToastProvider>
        </WalletProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
