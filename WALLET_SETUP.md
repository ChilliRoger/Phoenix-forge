# 🔐 Wallet Connection Setup

Your Phoenix Forge app now has **real wallet connection** enabled using RainbowKit!

## ✅ What's Been Implemented

1. **RainbowKit Integration**: Full wallet connection UI with custom dark theme
2. **Multi-Chain Support**: Ethereum, Sepolia, Polygon, Optimism, Arbitrum
3. **Custom Styling**: Matches your Phoenix theme (red accent #ef4444)
4. **Smart States**: Shows different UI for disconnected, connected, and wrong network

## 🚀 Quick Start

### Step 1: Get WalletConnect Project ID (FREE)

1. Visit https://cloud.walletconnect.com/
2. Sign in with GitHub or email
3. Create a new project
4. Copy your **Project ID**

### Step 2: Configure Environment

Open `.env.local` and replace `your_project_id_here`:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=abc123your_actual_project_id
```

### Step 3: Start Development Server

```bash
npm run dev
```

## 🎯 How It Works

### Connect Button States

1. **Disconnected**: Shows "Connect" button
   - Click to open wallet selection modal
   - Supports MetaMask, WalletConnect, Coinbase, Rainbow, etc.

2. **Connected**: Shows address (e.g., "0x71C...9A23")
   - Click to open account modal
   - View balance, copy address, disconnect
   - Pulsing red dot indicator

3. **Wrong Network**: Shows "Wrong Network" in yellow
   - Click to switch to supported chain

### Supported Wallets

- MetaMask
- WalletConnect (mobile wallets)
- Coinbase Wallet
- Rainbow
- Trust Wallet
- And 300+ more!

## 🔧 Technical Details

### Files Modified

1. **`app/layout.tsx`**: Wrapped app with `Web3Provider`
2. **`components/Navbar.tsx`**: Replaced mock button with `ConnectButton.Custom`
3. **`.env.local`**: Added WalletConnect configuration

### Files Used

- **`lib/wagmi.config.ts`**: Chain configuration (mainnet, sepolia, polygon, optimism, arbitrum)
- **`lib/web3Provider.tsx`**: RainbowKit provider with dark theme

### Custom Styling

The connect button matches your Phoenix theme:
- **Disconnected**: Gray with white border
- **Connected**: Red accent (#ef4444) with glow effect
- **Wrong Network**: Yellow warning state

## 🧪 Testing

1. **Without Project ID**: Button will work but show "Invalid projectId" error
2. **With Project ID**: Full wallet connection functionality
3. **Mobile**: Test with WalletConnect QR code

## 📱 Mobile Support

WalletConnect automatically generates QR codes for mobile wallets:
- Trust Wallet
- MetaMask Mobile
- Rainbow
- Coinbase Wallet
- And more!

## 🎨 Customization

Want to change the theme? Edit `lib/web3Provider.tsx`:

```tsx
darkTheme({
  accentColor: '#your-color',    // Change accent color
  accentColorForeground: 'white',
  borderRadius: 'small',         // 'none' | 'small' | 'medium' | 'large'
  fontStack: 'system',
})
```

## 🔐 Security Notes

- Never commit your Project ID to public repos (use `.env.local`)
- WalletConnect Project ID is safe to expose (it's public by design)
- RainbowKit handles all wallet security best practices

## 🚨 Troubleshooting

### "Invalid projectId" error
- Make sure `.env.local` has valid WalletConnect Project ID
- Restart dev server after changing `.env.local`

### Wallet not connecting
- Check browser console for errors
- Ensure you have a wallet extension installed (MetaMask, etc.)
- Try clearing browser cache

### Wrong network warning
- Click "Wrong Network" to switch
- Or manually switch to Ethereum/Polygon in your wallet

## 🎉 Next Steps

Now that wallet connection works, you can:

1. **Use Connected Address**: Access via `useAccount()` hook from wagmi
2. **Read Balance**: Use `useBalance()` hook
3. **Sign Messages**: Use `useSignMessage()` hook
4. **Send Transactions**: Use `useSendTransaction()` hook

Check `WEB3_INTEGRATION.md` for full API reference!
