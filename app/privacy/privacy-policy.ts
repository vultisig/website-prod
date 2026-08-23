import type { LegalDocument } from "@/components/legal/legal-document"

/**
 * Privacy Policy copy, transcribed from the V5 Figma frame
 * "Privacy Policy - 1440px". The runs carry the weight, accent colour and
 * casing the frame applies; see LegalDocument for how each block renders.
 */
export const PRIVACY_POLICY: LegalDocument = {
  title: "Privacy Policy",
  sections: [
    {
      id: "overview",
      title: "Overview",
      number: 1,
      blocks: [
        {
          kind: "paragraph",
          content: [
            "This privacy policy (“Privacy Policy”) outlines the data privacy practices and processes of Vulti Holdings Limited, Intershore Chambers, Road Town, Tortola, British Virgin Islands (“Vultisig”, “we”, “our”, or “us”). Protection and security of the personal data of our users is very important to Vultisig, as is your trust in us and the services we provide. Vultisig is committed to handling your personal data responsibly and in compliance with all applicable Australian legal requirements. We strive to minimize the collection and storage of personal data, only doing so when voluntarily provided by you or required by law. ",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "This Privacy Policy describes how we may collect, process, use, transfer, and secure your personal data when you access and use Vultisig.org (the “Website”), any of our mobile applications (the “App”) which allow access to various blockchains from a mobile device, or our browser extension (the “Extension”) which allows you to sign blockchain transactions on decentralized applications (the Website, the App and the Extension collectively the “Services”).",
          ],
        },
      ],
    },
    {
      id: "who-is-the-controller-for-processing-your-personal-data",
      title: "Who Is the Controller for Processing Your Personal Data?",
      number: 2,
      titleCase: true,
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Vulti Holdings Limited, Intershore Chambers, Road Town, Tortola, British Virgin Islands is the controller for Vultisig's processing of your personal data under this Privacy Policy, unless we tell you otherwise in an individual case.",
          ],
        },
      ],
    },
    {
      id: "for-whom-and-for-what-purpose-is-the-privacy-policy-intended",
      title: "For Whom and For What Purpose Is the Privacy Policy Intended?",
      number: 3,
      titleCase: true,
      blocks: [
        {
          kind: "paragraph",
          content: [
            'This Privacy Policy applies to all persons whose personal data we may process (hereinafter referred to as "you") when you use our Services, regardless of which channel you use to contact us (e.g., on a website, in an app, via a social network, at an event, etc.). It applies to the processing of personal data that may be collected in the future.',
          ],
        },
      ],
    },
    {
      id: "how-and-what-types-of-personal-data-do-we-collect-and-process",
      title: "How and What Types of Personal Data Do We Collect and Process",
      number: 4,
      titleCase: true,
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Currently, Vultisig does not track or collect any personal data from users within the App. However, on our Website, we collect certain information to help us understand how visitors interact with our site. This information may include:",
          ],
        },
        {
          kind: "list",
          items: [
            [
              "Details about your device, browser, or operating system; time zone setting;",
            ],
            ["Your IP address, anonymized to protect your privacy;"],
            [
              "Information about interactions you have with the Website (such as scrolling and clicks);",
            ],
            [
              "Referral Source: How you arrived at our website (e.g., via a search engine or direct link);",
            ],
            [
              "Demographic Information: Such as age, gender, and interests (this is anonymized and based on Google's demographic reports).",
            ],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "In the future, we may also collect, store, and use certain personal data that you voluntarily provide to us or as required by law. This may include your email address, feedback information, and other personal data you may voluntarily provide, such as your name, address, and other contact details.",
          ],
        },
      ],
    },
    {
      id: "vultisig-browser-extension",
      title: "Vultisig Browser Extension",
      number: 5,
      titleCase: true,
      blocks: [
        {
          kind: "paragraph",
          content: [
            "This section describes how the Vultisig browser extension (the “Extension”), a self-custodial and non-custodial crypto wallet that lets you sign blockchain transactions on decentralized applications (“dApps”), handles user data. Vultisig does not collect, track, or transmit your personal data, private keys, or vault contents to our servers. All wallet data is created and held on your device.",
          ],
        },
        {
          kind: "subheading",
          text: "Data the Extension collects and processes:",
        },
        {
          kind: "list",
          indent: 2,
          items: [
            [
              { text: "Vault and wallet data", weight: "medium" },
              " (public keys, vault metadata, addresses, and user settings) is stored locally on your device using the browser’s local storage. It is never sent to Vultisig.",
            ],
            [
              { text: "Clipboard access", weight: "medium" },
              " is used only when you explicitly copy an address or transaction, or paste an address into the Extension. Clipboard contents are never collected, stored, or transmitted.",
            ],
            [
              { text: "Active tab and website information", weight: "medium" },
              " (the current site’s URL and favicon) is read only to display dApp connection status. It is not collected or shared.",
            ],
            [
              { text: "Notifications", weight: "medium" },
              " are generated locally from transaction-signing requests and are rendered on your device. Notification content is not sent to third parties.",
            ],
            [
              { text: "Host access ", weight: "medium" },
              "is used solely to let connected dApp websites send connection and signing requests to the Extension.",
            ],
          ],
        },
        {
          kind: "paragraph",
          content: [
            { text: "How data is used: ", weight: "semibold" },
            "Any data the Extension accesses is used exclusively to provide wallet functionality — displaying balances, showing dApp connection status, and coordinating transaction signing. To relay multi-device (MPC/TSS) signing messages, encrypted signing payloads may transit Vultisig relay infrastructure; these are used only to complete the signing you initiate and are not used to identify you.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            { text: "How data is stored: ", weight: "semibold" },
            "Wallet and settings data is stored locally on your device. Vultisig operates no server-side store of your wallet contents or private keys.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            { text: "How data is shared: ", weight: "semibold" },
            "Vultisig does not sell or transfer Extension user data to third parties. We do not use Extension data for any purpose unrelated to the wallet’s single purpose, nor for creditworthiness or lending purposes.",
          ],
        },
      ],
    },
    {
      id: "for-what-purposes-do-we-use-your-personal-data",
      title: "For What Purposes Do We Use Your Personal Data",
      number: 6,
      titleCase: true,
      blocks: [
        {
          kind: "paragraph",
          content: [
            "If we begin collecting personal data in the future, we may use it for the following purposes:",
          ],
        },
        {
          kind: "list",
          items: [
            ["Communication with you"],
            [
              "Provision, execution and administration (including support) of Services",
            ],
            [
              "Marketing, improvement and maintenance of Services as well as services and product development",
            ],
            ["Security and prevention"],
            ["Compliance with statutory and regulatory requirements"],
            ["Protection of rights"],
          ],
        },
      ],
    },
    {
      id: "legal-basis-for-processing-and-disclosure-of-your-personal-data",
      title: "Legal Basis for Processing and Disclosure of Your Personal Data",
      number: 7,
      titleCase: true,
      blocks: [
        {
          kind: "subheading",
          text: "Lawful basis for processing your personal data",
        },
        {
          kind: "paragraph",
          content: [
            "We will only use your personal data when the law allows us to. Most commonly we will use your personal data in the following circumstances:",
          ],
        },
        {
          kind: "list",
          tight: true,
          items: [
            ["Where you have asked us to do so, or consented to us doing so;"],
            [
              "Where it is necessary for the performance of a Service or in order to take steps at your request prior to providing the Services;",
            ],
            [
              "Where it is necessary for our legitimate interests (or those of a third party) and your fundamental rights do not override those interests;",
            ],
            ["Where we need to comply with a legal or regulatory obligation."],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "You will receive marketing messages from us by email if you have given us your consent to do so. To unsubscribe from marketing emails at any time and without cost, please click on the unsubscribe link at the bottom of any marketing email. You may also contact us to inform us if you do not wish to receive any marketing materials from us.",
          ],
        },
        { kind: "subheading", text: "Sharing your personal information" },
        {
          kind: "paragraph",
          content: [
            "If we collect personal data in the future, we may share it in the following ways:",
          ],
        },
        {
          kind: "list",
          tight: true,
          items: [
            [
              "with any member of our group, which means our subsidiaries, our ultimate holding company and its subsidiaries;",
            ],
            [
              'with selected third parties including business partners, suppliers and sub-contractors for the performance of any contract we enter into with them (see "Service Providers" below); or',
            ],
            [
              "with analytics that assist us in the improvement and optimisation of the Services.",
            ],
          ],
        },
        {
          kind: "paragraph",
          content: [
            "We may also disclose your personal data to third parties in the following events: if we were to sell or buy any business or assets, in which case we might disclose your personal data to the prospective seller or buyer of such business or assets; if Vultisig or substantially all of its assets are acquired by a third party, in which case personal data held by us about our users will be one of the transferred assets; or if we are under a duty to disclose or share your personal data in order to comply with any legal obligation, or to protect the rights, property, or safety of our company, our customers, or others. This includes exchanging personal data with other companies and organisations for the purposes of fraud protection and credit risk reduction.",
          ],
        },
        { kind: "subheading", text: "Service Providers" },
        {
          kind: "paragraph",
          content: [
            "Our service providers provide us with a variety of administrative, statistical, and technical services. We will only provide service providers with the minimum amount of personal data they need to fulfil the services we request, and we stipulate that they protect this information and do not use it for any other purpose. We take these relationships seriously and oblige all of our data processors to sign contracts with us that clearly set out their commitment to respecting individual rights, and their commitments to assisting us to help you exercise your rights as a data subject.",
          ],
        },
        { kind: "subheading", text: "Other Disclosures" },
        {
          kind: "paragraph",
          content: [
            "During your use of the App, your app store provider and mobile network operator may also collect personal data about you regarding your use of the App such as your identity, your usage and location. These third parties shall act as separate and independent controllers of that personal data and shall process it in accordance with their own privacy policy.",
          ],
        },
        { kind: "subheading", text: "Links to third party sites" },
        {
          kind: "paragraph",
          content: [
            "The Website and App may, from time to time, contain links to and from the websites of our partner networks, advertisers and affiliates. We may also provide links to third party websites that are not affiliated with the Website and App. All third-party websites are out of our control and are not covered by this Privacy Policy. If you access third party sites using the links provided, the operators of these sites may collect personal data from you that could be used by them, in accordance with their own privacy policies. Please check these policies before you submit any personal data to those websites.",
          ],
        },
        { kind: "subheading", text: "How long we keep your personal data" },
        {
          kind: "paragraph",
          content: [
            'We will hold your personal data on our systems only for as long as required for the purposes of processing and compatible purposes, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you. In some circumstances you can ask us to delete your personal data: see "Your Rights" below for further information. In some circumstances we may anonymise your personal data (so that it can no longer be associated with you) for research or statistical purposes in which case we may use this information indefinitely without further notice to you.',
          ],
        },
      ],
    },
    {
      id: "security",
      title: "Security",
      number: 8,
      titleCase: true,
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Vultisig takes the protection of your personal data very seriously. We have put in place appropriate technical, organizational, physical, electronic and managerial security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed, including use of secure servers, passwords and industry standard encryption for data both in transit and at rest.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            "Where we have given you a password or PIN code that enables you to access certain parts of our App, you are responsible for keeping this password or PIN code confidential. We ask you not to share a password or PIN code with anyone.",
          ],
        },
        {
          kind: "subheading",
          text: "Private key responsibility",
          accent: true,
        },
        {
          kind: "paragraph",
          content: [
            "When first launching the App, it creates an individual encrypted digital wallet, i.e. a private key, for every user to store his/her crypto assets. Vultisig does not have, at any point in time, access to the user's private keys and funds. You are responsible for keeping your private key confidential. We ask you not to share your private key with anyone. If you lose or give away your private key, you lose or give away your crypto assets.",
          ],
          tight: true,
        },
        {
          kind: "paragraph",
          content: [
            "We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality and other contractual obligations. We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.",
          ],
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights",
      number: 9,
      titleCase: true,
      blocks: [
        {
          kind: "definitions",
          columns: [
            [
              {
                term: "Access",
                description:
                  "You have the right to request access to your personal data that we hold about you, and to receive information about how we process it.",
              },
              {
                term: "Erasure",
                description:
                  "You have the right to request that we delete your personal data in certain circumstances.",
              },
              {
                term: "Portability",
                description:
                  "You have the right to request that we provide your personal data to you in a structured, commonly used and machine-readable format, or to transmit it to another controller.",
              },
              {
                term: "Withdraw Consent",
                description:
                  "Where we rely on your consent to process your personal data, you have the right to withdraw that consent at any time.",
              },
            ],
            [
              {
                term: "Rectification",
                description:
                  "You have the right to request correction of any inaccurate or incomplete personal data we hold about you.",
              },
              {
                term: "Restrict Processing",
                description:
                  "You have the right to request that we restrict the processing of your personal data in certain circumstances.",
              },
              {
                term: "Object",
                description:
                  "You have the right to object to our processing of your personal data in certain circumstances.",
              },
            ],
          ],
        },
      ],
    },
    {
      id: "online-tracking-and-use-of-cookies",
      title: "Online Tracking and Use of Cookies",
      number: 10,
      titleCase: true,
      blocks: [
        {
          kind: "paragraph",
          content: [
            "We use various techniques on our Website that allow us and third parties engaged by us to recognize you during your use of our Website and possibly to track you across several visits. In essence, we wish to distinguish access by you (through your system) from access by other users, so that we can ensure the functionality of the website and carry out analysis and personalization. We do not intend to determine your identity, even if that is possible where we or third parties engaged by us can identify you by combination with other data.",
          ],
        },
        {
          kind: "paragraph",
          content: [
            'However, even without registration data, the technologies we use are designed in such a way that you are recognized as an individual visitor each time you access the website, for example by our server (or third-party servers) that assign a specific identification number to you or your browser (so-called "cookie"). Cookies are individual codes (for example a serial number) that our server or a server of our service providers or advertising partners transmits to your system when you connect to our website, and that your system (browser, cell phone) accepts and stores until the set expiration time. Your system transmits these codes to our server or the third-party server with each additional access. That way, you are recognized even if your identity is unknown.',
          ],
        },
        {
          kind: "paragraph",
          content: [
            'Whenever you access a server (for example when you use the Website, or because an e-mail includes a visible or invisible image), your visits can therefore be "tracked". If we integrate offers from an advertising partner or a provider of an analysis tool on our Website they may track you in the same way, even if you cannot be identified in a particular case. We use these technologies on our Website and may allow certain third parties to do so as well. However, depending on the purpose of these technologies, we may ask for consent before they are used.',
          ],
        },
        {
          kind: "paragraph",
          content: [
            'You can access and change your current settings here. You can also set your browser to block or deceive certain types of cookies or alternative technologies, or to delete existing cookies. You can also add software to your browser that blocks certain third-party tracking. You can find more information on the help pages of your browser (usually with the keyword "Privacy") or on the websites of the third parties set out below.',
          ],
        },
        { kind: "subheading", text: "Cookies we currently use", accent: true },
        { kind: "subheading", text: "Analytical Cookies" },
        {
          kind: "paragraph",
          content: [
            "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
          ],
          tight: true,
        },
        {
          kind: "subheading",
          text: "Service providers and advertising partners",
          accent: true,
        },
        { kind: "subheading", text: "Google Analytics" },
        {
          kind: "paragraph",
          content: [
            'Google LLC is the provider of the service "Google Analytics". For the purposes of the GDPR and the Australian Data Protection Act (DPA), Google Ireland Ltd. is the controller (both "Google"). Google tracks the behavior of visitors to our Website (duration, page views, geographic region of access etc.) through performance cookies (see above) and on this basis creates reports for us about the use of our Website. We have configured the service so that the IP addresses of visitors are truncated by Google in Europe before forwarding them to the United States and then cannot be traced back.',
          ],
          tight: true,
        },
        {
          kind: "paragraph",
          content: [
            "Google provides us with reports and may therefore be considered our processor, but it also processes data for its own purposes. Google may be able to draw conclusions about the identity of visitors based on the data collected, create personal profiles and link this data with the Google accounts of these individuals. You should assume that this processing takes place if you consent to the use of performance cookies. Information about data protection with Google Analytics can be found on Google's website and if you have a Google account, you can find more details about Google's processing there.",
          ],
        },
      ],
    },
    {
      id: "how-can-you-contact-us",
      title: "How Can You Contact Us?",
      number: 11,
      titleCase: true,
      blocks: [
        {
          kind: "paragraph",
          content: [
            "If you have any questions or concerns relating to this Privacy Policy or the processing of your personal data, please contact us as follows: ",
          ],
        },
        { kind: "subheading", text: "Contact", accent: true },
        {
          kind: "paragraph",
          content: [
            "info@vultisig.com, \nVulti Holdings Limited, Intershore Chambers, Road Town, Tortola, British Virgin Islands.",
          ],
          tight: true,
        },
      ],
    },
    {
      id: "how-we-may-change-this-privacy-policy",
      title: "How We May Change This Privacy Policy",
      number: 12,
      titleCase: true,
      blocks: [
        {
          kind: "paragraph",
          content: [
            "Vultisig, in its sole discretion, may modify or update this policy at any time, especially if we change our data processing activities or if new legal provisions become applicable, so you should review this page periodically. The version published on the website is the current version.",
          ],
        },
      ],
    },
  ],
}
