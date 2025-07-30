import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto mt-16 xs:mt-20 sm:mt-24 mb-8 xs:mb-10 sm:mb-12 px-0 xs:px-2">
      {/* Support Section */}
      <section className="mb-16 xs:mb-20 sm:mb-24">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4 xs:mb-6">
          SUPPORT
        </h2>
        <p className="text-white text-center text-base xs:text-lg mb-8 xs:mb-12 max-w-3xl mx-auto">
          Need Help? We're Here for You. If you're experiencing issues, have questions, or need help with your multi-sig wallet, our team is ready to assist.
        </p>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Contact support */}
          <Card className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl px-4 xs:px-5 py-4 xs:py-5 flex flex-col items-start h-full">
            <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
              <img src="/images/faq-1.svg" className="w-5 h-5 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg xs:text-xl mb-2">Contact support</h3>
              <p className="text-gray-400 text-xs mb-3">Please contact us for any inquiries or questions regarding Vultisig.</p>
            </div>
            <a href="mailto:support@vultisig.com" className="text-blue-500 hover:text-blue-400 text-sm mt-auto">support@vultisig.com</a>
          </Card>

          {/* Card 2: User Support */}
          <Card className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl px-4 xs:px-5 py-4 xs:py-5 flex flex-col items-start h-full">
            <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
              <img src="/images/faq-2.svg" className="w-5 h-5 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg xs:text-xl mb-2">User Support</h3>
              <p className="text-gray-400 text-xs mb-3">Join our Discord and chat with the team to get direct help.</p>
            </div>
            <a href="https://discord.com/invite/54wEtGYxuv" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 text-sm mt-auto">Join Discord</a>
          </Card>

          {/* Card 3: Read the docs */}
          <Card className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl px-4 xs:px-5 py-4 xs:py-5 flex flex-col items-start h-full">
            <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
              <img src="/images/faq-3.svg" className="w-5 h-5 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg xs:text-xl mb-2">Read the docs</h3>
              <p className="text-gray-400 text-xs mb-3">Get educated and enjoy safer asset management.</p>
            </div>
            <a href="/docs" className="text-blue-500 hover:text-blue-400 text-sm mt-auto">Go to Docs</a>
          </Card>

          {/* Card 4: Vulti Holdings Limited */}
          <Card className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl px-4 xs:px-5 py-4 xs:py-5 flex flex-col items-start h-full">
            <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
              <img src="/images/faq-4.svg" className="w-5 h-5 object-contain" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg xs:text-xl mb-2">Vulti Holdings Limited</h3>
              <p className="text-gray-400 text-xs mb-3">Intershore Chambers, Road Town, Tortola, British Virgin Islands</p>
            </div>
            <a href="mailto:contact@vultisig.com" className="text-blue-500 hover:text-blue-400 text-sm mt-auto">contact@vultisig.com</a>
          </Card>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto gap-4 mb-6 xs:mb-7 sm:mb-8 w-full px-1 -mx-1 snap-x snap-mandatory carousel-scrollbar">
            {/* Card 1: Contact support */}
            <Card className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl px-4 xs:px-5 py-4 xs:py-5 flex flex-col items-start min-w-[80vw] max-w-xs w-full snap-center h-full">
              <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
                <img src="/images/faq-1.svg" className="w-5 h-5 object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg xs:text-xl mb-2">Contact support</h3>
                <p className="text-gray-400 text-xs mb-3">Please contact us for any inquiries or questions regarding Vultisig.</p>
              </div>
              <a href="mailto:support@vultisig.com" className="text-blue-500 hover:text-blue-400 text-sm mt-auto">support@vultisig.com</a>
            </Card>

            {/* Card 2: User Support */}
            <Card className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl px-4 xs:px-5 py-4 xs:py-5 flex flex-col items-start min-w-[80vw] max-w-xs w-full snap-center h-full">
              <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
                <img src="/images/faq-2.svg" className="w-5 h-5 object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg xs:text-xl mb-2">User Support</h3>
                <p className="text-gray-400 text-xs mb-3">Join our Discord and chat with the team to get direct help.</p>
              </div>
              <a href="https://discord.com/invite/54wEtGYxuv" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 text-sm mt-auto">Join Discord</a>
            </Card>

            {/* Card 3: Read the docs */}
            <Card className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl px-4 xs:px-5 py-4 xs:py-5 flex flex-col items-start min-w-[80vw] max-w-xs w-full snap-center h-full">
              <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
                <img src="/images/faq-3.svg" className="w-5 h-5 object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg xs:text-xl mb-2">Read the docs</h3>
                <p className="text-gray-400 text-xs mb-3">Get educated and enjoy safer asset management.</p>
              </div>
              <a href="/docs" className="text-blue-500 hover:text-blue-400 text-sm mt-auto">Go to Docs</a>
            </Card>

            {/* Card 4: Vulti Holdings Limited */}
            <Card className="bg-[#0B1B3B] border border-[var(--border-light)] rounded-xl px-4 xs:px-5 py-4 xs:py-5 flex flex-col items-start min-w-[80vw] max-w-xs w-full snap-center h-full">
              <div className="w-8 h-8 bg-[#193B7A] rounded-lg flex items-center justify-center mb-3 xs:mb-4">
                <img src="/images/faq-4.svg" className="w-5 h-5 object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg xs:text-xl mb-2">Vulti Holdings Limited</h3>
                <p className="text-gray-400 text-xs mb-3">Intershore Chambers, Road Town, Tortola, British Virgin Islands</p>
              </div>
              <a href="mailto:contact@vultisig.com" className="text-blue-500 hover:text-blue-400 text-sm mt-auto">contact@vultisig.com</a>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-8 xs:mb-10 sm:mb-12">
          FAQ
        </h2>
      <div className="w-full flex justify-center items-center">
        <div className="w-full">
          <Accordion type="single" collapsible className="space-y-3 xs:space-y-4">
            <AccordionItem value="faq-1" className="bg-[var(--background-secondary)] rounded-xl border-none">
              <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                What is Vultisig?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                It is a secure, multi-authentication wallet based on MPC technology that is used to manage digital assets. Transactions require approval from multiple devices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2" className="bg-[var(--background-secondary)] rounded-xl border-none">
              <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                What are the benefits of using Vultisig?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                Vultisig offers enhanced security with multi-device authentication, support for many blockchains, easy recovery options, and no seed phrases or user tracking.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3" className="bg-[var(--background-secondary)] rounded-xl border-none">
              <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                Can I recover my assets if I lose a device?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                Yes, as long as you saved and have access to your backups when creating the vault. You can import these backups on a new device to regain access to your assets.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4" className="bg-[var(--background-secondary)] rounded-xl border-none">
              <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                How is Vultisig used?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                Vultisig securely stores and manages digital assets. All actions, such as sending or swapping, require the threshold of devices to sign transactions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-5" className="bg-[var(--background-secondary)] rounded-xl border-none">
              <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                What are the fees and costs?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                Vultisig is free to use. Only standard network fees apply to sending. And for swaps and bridges, there's a 0.5% (50 bps) fee.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-6" className="bg-[var(--background-secondary)] rounded-xl border-none">
              <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                What cryptocurrencies are supported by Vultisig?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                Vultisig supports major cryptocurrencies and tokens, with over 30 chains and their tokens, currently available.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-7" className="bg-[var(--background-secondary)] rounded-xl border-none">
              <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                Is Vultisig open source and audited?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                Yes, Vultisig is open source and has undergone security audits. Both the audit reports and the source code are accessible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-8" className="bg-[var(--background-secondary)] rounded-xl border-none">
              <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                How does Vultisig handle privacy and data protection?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                Vultisig does not store any user information from its mobile apps.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-9" className="bg-[var(--background-secondary)] rounded-xl border-none">
              <AccordionTrigger className="text-base xs:text-lg font-bold px-4 xs:px-6 py-3 xs:py-4 text-white [&>svg]:text-white hover:bg-transparent hover:no-underline focus:bg-transparent">
                How does Vultisig compare to other multisig wallets?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 px-4 xs:px-6 pb-4 xs:pb-6 pt-0 font-normal text-sm xs:text-base">
                It is built on MPC technology, which eliminates the need for seed phrases and supports multiple blockchains, making Vultisig flexible and chain-agnostic.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      </section>

      {/* Discord section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center mt-8">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white text-center">JOIN THE DISCORD TO REQUEST NEW FEATURES!</h3>
              <a href="https://discord.com/invite/54wEtGYxuv" target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full md:w-auto">
                  DISCORD
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 