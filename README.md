# 💬 Ethereum Instant Messenger

> Send encrypted messages to any address - Built with Scaffold-Eth

See demo here: [https://ethereum-instant-messenger.surge.sh](https://ethereum-instant-messenger.surge.sh)

A prototype to demonstrate the use of public key cryptography for the sending and receiving of messages.
Through the use of ephemeral keys, we can encrypt and decrypt messages without using/exposing a users
private key. Their ephemeral set of keys is derived from their signature so it can be replicated on any
device.
              
By default, this app uses burner wallets so signing occurs without any prompt to the user. If you wish to
use a web3 wallet then you can do that as well. When you first change accounts you will be asked to sign a
message. This message is then used as entropy for generating a new private and public key pair. Because we
are using an ephemeral set of keys for the encryption you must "register" with the smart contract after
generating your new keys. This way any user can look up your web3 address and find your associated public
key. Now other users are able to encrypt messages using your public key that only you can read (with your
private key).
            
To test the app, open two windows, with at least one being a private browsing window so they don't share
local storage. You can then add the address of the opposite window to your list of contacts and send
messages back and forth. The content of these messages are completely visible on chain. Now click the
"Register" button on each window. Each session should now recognize that the contact has registered with
the smart contract and any messages will be encrypted and not able to be read on chain without the private
key.

Real world use cases for a messaging app built on top of Ethereum is very small considering the cost of
block space and the lack of need for message permanence in most cases.

Here are some ideas to improve:  
- Build on top of Lens Protocol
- Integrate with IPFS or Arweave so that the only thing sent on-chain is the hash of the content
- Implement Lit Protocol
- Only use ECDSA with public key cryptography to send a shared secret and use AES (symmetric key cryptography) for the content encryption
- Perhaps we could reliable store messages off-chain and only use the chain for secret sharing and sharing the location of messages
- Look for the potential to use a users existing keys instead of generating ephemeral ones. The functionality for this is currently being deprecated in Metamask
- Securely store ephemeral keys. Currently using Local Storage which is not a good idea

Built with [Scaffold-Eth](https://github.com/scaffold-eth/scaffold-eth), a forkable Ethereum
development stack focused on fast product iterations.

Scaffold-Eth is built and maintained by the [Buidl Guidl](https://buidlguidl.com/), a curated
group of Ethereum builders creating products, prototypes, and tutorials to enrich the web3 ecosystem with
a special focus on on-boarding developers to the Ethereum ecosystem.
  
# 🏄‍♂️ Quick Start

Prerequisites: [Node (v18 LTS)](https://nodejs.org/en/download/) plus [Yarn (v1.x)](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

🚨 If you are using a version < v18 you will need to remove `openssl-legacy-provider` from the `start` script in `package.json`

> clone/fork 🏗 ethereum-instant-messenger:

```bash
git clone https://github.com/escottalexander/ethereum-instant-messenger.git
```

> install and start your 👷‍ Hardhat chain:

```bash
cd ethereum-instant-messenger
yarn install
yarn chain
```

> in a second terminal window, start your 📱 frontend:

```bash
cd ethereum-instant-messenger
yarn start
```

> in a third terminal window, 🛰 deploy your contract:

```bash
cd ethereum-instant-messenger
yarn deploy
```

🔏 Edit your smart contract `EthereumInstantMessenger.sol` in `packages/hardhat/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

💼 Edit your deployment scripts in `packages/hardhat/deploy`

📱 Open http://localhost:3000 to see the app

# 📚 Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)


# 🍦 Other Flavors
- [scaffold-eth-typescript](https://github.com/scaffold-eth/scaffold-eth-typescript)
- [scaffold-eth-tailwind](https://github.com/stevenpslade/scaffold-eth-tailwind)
- [scaffold-nextjs](https://github.com/scaffold-eth/scaffold-eth/tree/scaffold-nextjs)
- [scaffold-chakra](https://github.com/scaffold-eth/scaffold-eth/tree/chakra-ui)
- [eth-hooks](https://github.com/scaffold-eth/eth-hooks)
- [eth-components](https://github.com/scaffold-eth/eth-components)
- [scaffold-eth-expo](https://github.com/scaffold-eth/scaffold-eth-expo)
- [scaffold-eth-truffle](https://github.com/trufflesuite/scaffold-eth)



# 🔭 Learning Solidity

📕 Read the docs: https://docs.soliditylang.org

📚 Go through each topic from [solidity by example](https://solidity-by-example.org) editing `YourContract.sol` in **🏗 scaffold-eth**

- [Primitive Data Types](https://solidity-by-example.org/primitives/)
- [Mappings](https://solidity-by-example.org/mapping/)
- [Structs](https://solidity-by-example.org/structs/)
- [Modifiers](https://solidity-by-example.org/function-modifier/)
- [Events](https://solidity-by-example.org/events/)
- [Inheritance](https://solidity-by-example.org/inheritance/)
- [Payable](https://solidity-by-example.org/payable/)
- [Fallback](https://solidity-by-example.org/fallback/)

📧 Learn the [Solidity globals and units](https://docs.soliditylang.org/en/latest/units-and-global-variables.html)

# 🛠 Buidl

Check out all the [active branches](https://github.com/scaffold-eth/scaffold-eth/branches/active), [open issues](https://github.com/scaffold-eth/scaffold-eth/issues), and join/fund the 🏰 [BuidlGuidl](https://BuidlGuidl.com)!

  
 - 🚤  [Follow the full Ethereum Speed Run](https://medium.com/@austin_48503/%EF%B8%8Fethereum-dev-speed-run-bd72bcba6a4c)


 - 🎟  [Create your first NFT](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)
 - 🥩  [Build a staking smart contract](https://github.com/scaffold-eth/scaffold-eth/tree/challenge-1-decentralized-staking)
 - 🏵  [Deploy a token and vendor](https://github.com/scaffold-eth/scaffold-eth/tree/challenge-2-token-vendor)
 - 🎫  [Extend the NFT example to make a "buyer mints" marketplace](https://github.com/scaffold-eth/scaffold-eth/tree/buyer-mints-nft)
 - 🎲  [Learn about commit/reveal](https://github.com/scaffold-eth/scaffold-eth-examples/tree/commit-reveal-with-frontend)
 - ✍️  [Learn how ecrecover works](https://github.com/scaffold-eth/scaffold-eth-examples/tree/signature-recover)
 - 👩‍👩‍👧‍👧  [Build a multi-sig that uses off-chain signatures](https://github.com/scaffold-eth/scaffold-eth/tree/meta-multi-sig)
 - ⏳  [Extend the multi-sig to stream ETH](https://github.com/scaffold-eth/scaffold-eth/tree/streaming-meta-multi-sig)
 - ⚖️  [Learn how a simple DEX works](https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90)
 - 🦍  [Ape into learning!](https://github.com/scaffold-eth/scaffold-eth/tree/aave-ape)

# 💌 P.S.

🌍 You need an RPC key for testnets and production deployments, create an [Alchemy](https://www.alchemy.com/) account and replace the value of `ALCHEMY_KEY = xxx` in `packages/react-app/src/constants.js` with your new key.

📣 Make sure you update the `InfuraID` before you go to production. Huge thanks to [Infura](https://infura.io/) for our special account that fields 7m req/day!

# 🏃💨 Speedrun Ethereum
Register as a builder [here](https://speedrunethereum.com) and start on some of the challenges and build a portfolio.

# 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with 🏗 scaffold-eth!

---

🙏 Please check out our [Gitcoin grant](https://gitcoin.co/grants/2851/scaffold-eth) too!

### Automated with Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/scaffold-eth/scaffold-eth)
