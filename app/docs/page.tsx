import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function DocsPage() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen py-16 px-4">
        <section className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-8 md:gap-12 mt-16 md:mt-0 min-h-[400px] md:min-h-[500px]">
            <div className="flex-1 text-left relative z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">READ THE DOCS</h1>
            <p className="text-base sm:text-lg text-gray-300/90 mb-6">Vultisig is different. Get educated and enjoy safer asset management.</p>
            <a href="https://docs.vultisig.com" target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 sm:px-20 rounded-lg transition">DOCS</button>
            </a>
            </div>
            <div className="absolute sm:right-0 right-1/2 sm:top-1/2 top-1/2 transform -translate-y-1/2 sm:translate-x-0 translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] opacity-20 lg:opacity-100">
                <Image src="/images/docs-1.png" alt="Docs Placeholder" fill className="object-contain rounded-xl" />
            </div>
        </section>

        <section className="relative flex flex-col md:flex-row-reverse items-center justify-between w-full max-w-7xl md:gap-12 min-h-[400px] md:min-h-[500px]">
            <div className="flex-1 text-left md:text-right relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">INTEGRATE VULTISIG</h2>
            <p className="text-base sm:text-lg text-gray-300/90 mb-6 ml-0 md:ml-[30vw]">Any DeFi app, chrome extension or wallet can integrate the Vultisig SDK - safely let your users generate/upload vault shares and co-sign transactions.</p>
            <a href="https://docs.vultisig.com/developer-docs/vultisig-extension-integration-guide" target="_blank" rel="noopener noreferrer">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 sm:px-20 rounded-lg transition">LEARN MORE</button>
            </a>
            </div>
            <div className="absolute sm:left-0 left-1/2 sm:top-1/2 top-1/2 transform -translate-y-1/2 sm:translate-x-0 -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] opacity-20 lg:opacity-100">
                <Image src="/images/docs-2.png" alt="Integrate Placeholder" fill className="object-contain rounded-xl" />
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
    </main>
  );
} 