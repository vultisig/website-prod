---
name: vultisig-cli
description: MPC wallet CLI for secure multi-chain crypto operations across 36+ blockchains. Use when the user wants to create MPC wallets, send crypto, swap tokens cross-chain, check balances, sign transactions, or manage multi-signature vaults. Supports Bitcoin, Ethereum, Solana, and 33+ other chains with threshold signing security.
version: 1.0.0
author: Vultisig
repository: https://github.com/vultisig/vultisig-sdk
metadata:
  openclaw:
    emoji: "🔐"
    homepage: https://github.com/vultisig/vultisig-sdk
    requires:
      bins:
        - vultisig
    install:
      npm: "@vultisig/cli"
tags:
  - crypto
  - wallet
  - mpc
  - cli
  - defi
  - bitcoin
  - ethereum
  - solana
---

# Vultisig CLI

Command-line interface for Vultisig MPC wallet operations. See the [router skill](../SKILL.md) for an overview of MPC benefits and to choose between CLI and SDK.

## Installation

```bash
npm install -g @vultisig/cli
vultisig --version
```

Or run without installing:
```bash
npx @vultisig/cli balance ethereum
```

## Security Considerations

**CRITICAL: Read before executing any commands**

1. **Never store passwords in scripts, logs, or environment variables visible to others**
2. **Use `--password` flag only in secure, ephemeral contexts**
3. **Always verify recipient addresses** - transactions are irreversible
4. **Export backups before destructive operations** - use `vultisig export`
5. **Use `-o json` for automation** - structured output prevents parsing errors

## Vault Types

| Type | Threshold | Signing | Best For |
|------|-----------|---------|----------|
| **FastVault** | 2-of-2 (device + server) | Instant, server-assisted | AI agents, automation, bots |
| **SecureVault** | N-of-M (configurable) | Multi-device coordination | Teams, high-value assets |

**For AI agents, FastVault is recommended** - it enables instant signing without multi-device coordination.

See [references/vault-types.md](references/vault-types.md) for detailed comparison.

## Quick Start

### 1. Create a FastVault

```bash
vultisig create fast --name "agent-wallet" --email "agent@example.com" --password "SecurePass123!"
# Enter email verification code when prompted
```

### 2. Get Addresses

```bash
vultisig addresses -o json
```

### 3. Check Balance

```bash
vultisig balance ethereum -o json
vultisig balance --tokens -o json  # Include ERC-20 tokens
```

### 4. Send Transaction

```bash
vultisig send ethereum 0xRecipient... 0.1 --password "SecurePass123!" -y -o json
```

### 5. Swap Tokens

```bash
vultisig swap-quote ethereum bitcoin 0.1 -o json
vultisig swap ethereum bitcoin 0.1 --password "SecurePass123!" -y -o json
```

## Core Commands

### Vault Management

| Command | Description |
|---------|-------------|
| `create fast --name --email --password` | Create FastVault (server-assisted 2-of-2) |
| `create secure --name --shares N` | Create SecureVault (multi-device N-of-M) |
| `vaults -o json` | List all vaults |
| `switch <vaultId>` | Switch active vault |
| `info -o json` | Show vault details |
| `import <file.vult>` | Import vault from backup |
| `export [path]` | Export vault backup |
| `delete [vault] -y` | Delete vault |
| `verify <vaultId>` | Verify with email code |

### Wallet Operations

| Command | Description |
|---------|-------------|
| `addresses -o json` | Get all addresses |
| `balance [chain] -o json` | Get balance (optional: specific chain) |
| `balance --tokens -o json` | Include token balances |
| `portfolio -o json` | Total portfolio value in fiat |
| `send <chain> <to> <amount>` | Send native token |
| `send <chain> <to> <amount> --token <addr>` | Send ERC-20 token |
| `agent ask "<message>"` | One-shot natural-language mode for AI agents (see [AI Agent Integration](#ai-agent-integration)) |
| `agent` / `agent --via-agent` | Interactive chat TUI / NDJSON agent-to-agent pipe |

### Swap Operations

| Command | Description |
|---------|-------------|
| `swap-chains` | List chains supporting swaps |
| `swap-quote <from> <to> <amount>` | Get swap quote |
| `swap <from> <to> <amount>` | Execute swap |

### Chain & Token Management

| Command | Description |
|---------|-------------|
| `chains` | List active chains |
| `chains --add Solana` | Enable a chain |
| `chains --add-all` | Enable all 36+ chains |
| `chains --remove Litecoin` | Disable a chain |
| `tokens <chain>` | List tokens on chain |
| `tokens <chain> --add <contract>` | Add custom token |

### Advanced Operations

| Command | Description |
|---------|-------------|
| `sign --chain <chain> --bytes <base64>` | Sign pre-hashed bytes |
| `broadcast --chain <chain> --raw-tx <hex>` | Broadcast raw transaction |

## JSON Output Mode

**Always use `-o json` for AI agent automation.** This provides structured, parseable output:

```bash
# Balance
vultisig balance ethereum -o json
# {"chain":"ethereum","balance":{"native":"1.5","symbol":"ETH","usdValue":"3750.00"}}

# Send transaction
vultisig send ethereum 0x... 0.1 -y --password "pass" -o json
# {"txHash":"0x...","chain":"ethereum","explorerUrl":"https://etherscan.io/tx/0x..."}

# Vault info
vultisig info -o json
# {"vault":{"id":"...","name":"...","type":"fast","chains":[...]}}
```

## AI Agent Integration

The CLI is built to run inside agents. Beyond the structured commands above, it offers a natural-language mode and runs unattended without hanging on prompts.

### Non-interactive by default

In a non-TTY environment (pipes, scripts, agents), the CLI auto-detects this and skips interactive prompts. Vault creation falls back to two-step mode automatically:

```bash
# Auto-detects non-TTY, skips the interactive OTP prompt, returns immediately
vultisig create fast --name "agent-wallet" --email "agent@example.com" --password "$VAULT_PASSWORD" -o json

# Verify later, once you have the email code
vultisig verify <vaultId> --code 123456
```

Use `--ci` for full automation mode (equivalent to `--output json --non-interactive --quiet`). Supply the password through `--password` or `VAULT_PASSWORD` so no command blocks on input.

### Agent ask (natural language)

Send a single natural-language message and get a structured response. This mode is designed for AI-to-AI use and routes through the Vultisig agent backend.

```bash
# Query
vultisig agent ask "What is my ETH balance?" --password "$VAULT_PASSWORD"

# Execute a transaction
vultisig agent ask "Send 0.01 ETH to 0x742d..." --password "$VAULT_PASSWORD"

# Continue a conversation, structured JSON for parsing
vultisig agent ask "Now swap it to USDC" --session abc123 --password "$VAULT_PASSWORD" --json
```

```json
{
  "session_id": "abc123-def456",
  "response": "Your ETH balance is 1.5 ETH ($3,750.00 USD).",
  "tool_calls": [{ "action": "get_balances", "success": true }],
  "transactions": [{ "hash": "0x9f8e...", "chain": "ethereum", "explorerUrl": "https://etherscan.io/tx/0x9f8e..." }]
}
```

On failure, stdout is a single JSON object with a human-readable `error` and a stable `code` (for example `BACKEND_UNREACHABLE`, `AUTH_FAILED`, `VAULT_LOCKED`). Branch on `code`, not on the message.

For an interactive chat TUI or NDJSON agent-to-agent piping, use `vultisig agent` and `vultisig agent --via-agent`.

## Common Workflows

### Workflow: First-Time Setup

```bash
# 1. Create vault
vultisig create fast --name "agent-wallet" --email "agent@example.com" --password "SecurePass123!"
# Enter verification code

# 2. Enable desired chains
vultisig chains --add-all

# 3. Get addresses
vultisig addresses -o json

# 4. Check balances
vultisig balance -o json
```

### Workflow: Send Crypto

```bash
# 1. Check balance
BALANCE=$(vultisig balance ethereum -o json | jq -r '.balance.native')

# 2. Verify sufficient funds
if (( $(echo "$BALANCE > 0.1" | bc -l) )); then
  # 3. Send
  vultisig send ethereum 0xRecipient... 0.1 --password "$VAULT_PASSWORD" -y -o json
fi
```

### Workflow: Cross-Chain Swap

```bash
# 1. Get quote
QUOTE=$(vultisig swap-quote ethereum bitcoin 0.1 -o json)
echo "Expected output: $(echo $QUOTE | jq -r '.expectedOutput') BTC"

# 2. Execute swap
vultisig swap ethereum bitcoin 0.1 --password "$VAULT_PASSWORD" -y -o json
```

### Workflow: Backup Vault

```bash
# Export encrypted backup
vultisig export /backups/ --password "$VAULT_PASSWORD"
```

## Environment Variables

```bash
VULTISIG_VAULT="my-wallet"       # Pre-select vault by name/ID
VAULT_PASSWORD="password"         # Vault password (use with caution)
VULTISIG_SILENT=1                # Suppress spinners/info messages
VULTISIG_NO_COLOR=1              # Disable colored output
```

## Error Handling

| Exit Code | Meaning |
|-----------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid usage |
| 4 | Authentication error |
| 5 | Network error |
| 6 | Vault error |
| 7 | Transaction error |

See [references/errors.md](references/errors.md) for common errors and solutions.

## Supported Chains

36+ blockchains including:
- **EVM**: Ethereum, Polygon, Arbitrum, Optimism, BSC, Base, Avalanche, Blast, Cronos, ZkSync, Hyperliquid, Mantle, Sei
- **UTXO**: Bitcoin, Litecoin, Dogecoin, Bitcoin Cash, Dash, Zcash
- **Cosmos**: Cosmos, THORChain, MayaChain, Osmosis, Dydx, Kujira, Terra, Noble, Akash
- **Other**: Solana, Sui, Polkadot, TON, Ripple, Tron, Cardano

See [references/chains.md](references/chains.md) for full list with details.

## Resources

- [GitHub Repository](https://github.com/vultisig/vultisig-sdk)
- [Full CLI Documentation](https://github.com/vultisig/vultisig-sdk/blob/main/clients/cli/README.md)
- [SDK Documentation](https://github.com/vultisig/vultisig-sdk/blob/main/docs/SDK-USERS-GUIDE.md)
