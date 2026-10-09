import FaqSection from "@/components/ui/faq-section"

const DOWNLOAD_FAQ = [
  {
    question: "Is Vultisig free?",
    answer:
      "Yes. Vultisig is free to download and use, with no subscription. Swaps carry a 0.50% fee, which drops to as low as 0% for $VULT holders.",
  },
  {
    question: "Which devices does Vultisig run on?",
    answer:
      "iPhone, Android, macOS, Windows, Linux and a browser extension. One vault can span devices on different platforms.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No account and no KYC. A Fast Vault asks for an email address so it can send you the encrypted backup of VultiServer's key share. A Secure Vault needs only your own devices.",
  },
  {
    question: "Is there a seed phrase?",
    answer:
      "No. Vultisig never creates a seed phrase. Each device holds a key share and exports its own backup file.",
  },
  {
    question: "How do I verify my download?",
    answer:
      "Compare the file's SHA-256 checksum with the one listed on this page before you install it.",
  },
]

const DOWNLOAD_FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DOWNLOAD_FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
}

/** Answers the questions people have before installing, in the server HTML. */
export default function DownloadsFaq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DOWNLOAD_FAQ_JSON_LD) }}
      />
      <FaqSection
        className="px-0 md:px-0"
        items={DOWNLOAD_FAQ}
        aside={
          <h2 className="text-v5-title2 font-medium text-v5-text-inverse md:text-v5-download-heading md:font-semibold v5wide:w-[476px] v5wide:shrink-0">
            Before you download
          </h2>
        }
      />
    </>
  )
}
