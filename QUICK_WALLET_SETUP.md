# 🎯 GET YOUR WALLET CONNECTED IN 3 STEPS

## Step 1: Get WalletConnect Project ID (2 minutes)

1. Go to: **https://cloud.walletconnect.com/**
2. Click "Sign Up" or "Login"
3. Create a new project (name it "PhoenixForge")
4. Copy your **Project ID** (looks like: `abc123def456...`)

## Step 2: Add to Environment File (30 seconds)

Open `.env.local` and replace this line:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

With your actual Project ID:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=abc123def456your_actual_id
```

## Step 3: Restart Server (10 seconds)

In your terminal:
1. Press `Ctrl+C` to stop the server
2. Run: `npm run dev`
3. Open: http://localhost:3001

## 🎉 That's It!

Click the **"Connect"** button in the navbar and you'll see:
- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow
- And 300+ more wallets!

---

## 🚀 Already Running?

Your app is live at: **http://localhost:3001**

Just add the Project ID and restart!

---

## ⚠️ Quick Note

The button will work without a Project ID, but you'll see an error message. Once you add the real Project ID, everything will work perfectly!
