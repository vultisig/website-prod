import assert from "node:assert/strict"
import { test } from "node:test"

import { contentJsonLd, jsonLdHtml } from "./article-content-jsonld.ts"

const ARTICLE = `
## How to give an agent a wallet with a hard limit

The calls below are the SDK.

1. Install the SDK the agent will import: \`npm install @vultisig/sdk\`. A pipeline that shells out uses \`npm install -g @vultisig/cli\`.

\`\`\`typescript
const vaultId = await sdk.createFastVault({ password })
\`\`\`

\`password\` is the vault password you chose.

2. Create a Fast Vault on the machine that will run the agent. The call generates the device share.
  VultiServer holds the other half.

## FAQ

### What is an MPC wallet for an AI agent?

A vault that signs with a threshold. The key is split into shares on devices you control.

### Can the provider sign without my device?

Not with Vultisig. A Fast Vault needs the share on your device, and VultiServer cannot sign alone. A Secure Vault has no server share. A person co-signs from a device you paired.

### Where does a spend limit bind?

It binds the party who can refuse the signature. On a Fast Vault that party includes your device, because VultiServer cannot complete the signature alone.

### What happens to the funds if the provider is compromised?

An attacker who takes only VultiServer still lacks the device share.

\`\`\`
## FAQ
### This heading is inside a fence
\`\`\`
`

test("derives the live FAQ answers and the numbered how-to", () => {
  const ld = contentJsonLd(ARTICLE)
  const questions = ld.faq?.mainEntity as {
    name: string
    acceptedAnswer: { text: string }
  }[]
  const steps = ld.howto?.step as {
    name: string
    text: string
    position: number
  }[]

  assert.equal(ld.faq?.["@type"], "FAQPage")
  assert.equal(questions.length, 4)
  assert.equal(questions[1]?.name, "Can the provider sign without my device?")
  assert.match(questions[1]?.acceptedAnswer.text ?? "", /share on your device/)
  assert.match(questions[2]?.acceptedAnswer.text ?? "", /includes your device/)
  assert.equal(
    (ld.faq?.mainEntity as { name: string }[])[3]?.name,
    "What happens to the funds if the provider is compromised?",
  )

  assert.equal(ld.howto?.["@type"], "HowTo")
  assert.equal(
    ld.howto?.name,
    "How to give an agent a wallet with a hard limit",
  )
  assert.equal(steps.length, 2)
  assert.equal(steps[0]?.position, 1)
  assert.equal(
    steps[0]?.name,
    "Install the SDK the agent will import: npm install @vultisig/sdk.",
  )
  assert.match(steps[0]?.text ?? "", /npm install -g @vultisig\/cli/)
  assert.doesNotMatch(steps[0]?.text ?? "", /createFastVault/)
  assert.doesNotMatch(steps[0]?.text ?? "", /vault password you chose/)
  assert.match(steps[1]?.text ?? "", /VultiServer holds the other half/)
})

test("a fenced FAQ heading does not add a fifth question", () => {
  const ld = contentJsonLd(ARTICLE)
  const questions = ld.faq?.mainEntity as { name: string }[]
  assert.equal(
    questions.some((item) => item.name === "This heading is inside a fence"),
    false,
  )
})

test("one question and a bullet how-to emit nothing", () => {
  const ld = contentJsonLd(`
## How to get involved

- Try it.
- Tell a friend.

## FAQ

### Only one?

Yes.
`)
  assert.equal(ld.faq, undefined)
  assert.equal(ld.howto, undefined)
})

test("empty markdown emits nothing", () => {
  assert.deepEqual(contentJsonLd(""), {})
})

test("jsonLdHtml cannot close the script tag", () => {
  const html = jsonLdHtml({ text: "</script><script>alert(1)" })
  assert.equal(html.includes("</script>"), false)
  assert.match(html, /\\u003c/)
})
