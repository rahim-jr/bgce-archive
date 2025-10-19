import Link from "next/link";
import { SocialLinkButton } from "./SocialLinkButton";

export default function Footer() {
  return (
    <footer className="bg-background border-t bg-gradient-to-br from-gray-950 via-gray-950 to-blue-950">
      <div className="container mx-auto  py-12">
        {/* Newsletter Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-xl sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-white px-4">
            Stay up to date with BGCE Archive releases and important updates
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto px-4">
            <input
              type="email"
              placeholder="Email@example.com"
              className="flex-1 px-4 py-2.5 sm:py-2 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent border-gray-600 bg-gray-800 text-white"
            />
            <button className="px-6 py-2.5 sm:py-2 bg-white rounded-md  text-sm sm:text-base font-medium text-black">
              Subscribe
            </button>
          </div>
        </div>

        <hr className="mb-6 sm:mb-8 border-gray-700" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              BGCE Archive
            </h3>
            <div className="flex flex-col gap-4 sm:gap-6 mt-6">
              <SocialLinkButton
                href="https://discord.gg/wHq4SjKrNY"
                icon="discord"
                title="Discord"
                subtitle="Real-time discussions and support"
                color="indigo"
              />
              {/* <SocialLinkButton
                href="https://www.youtube.com/@gowithhabib"
                icon="youtube"
                title="Go With Habib"
                subtitle="Deep dives, and community videos"
                color="red"
              /> */}
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-white text-base sm:text-lg">
              Products
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li>
                <Link href="/open-source" className="inline-block">
                  Open Source
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="inline-block">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link href="/ai-gateway" className="inline-block">
                  AI Gateway
                </Link>
              </li>
              <li>
                <Link href="/features" className="inline-block">
                  Feature Matrix
                </Link>
              </li>
              <li>
                <Link href="/benchmarks" className="inline-block">
                  Benchmarks
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="inline-block">
                  Downloads
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn Column */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-white text-base sm:text-lg">
              Learn
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li>
                <Link href="/blog" className="inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/partners" className="inline-block">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="inline-block">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" className="inline-block">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-white text-base sm:text-lg">
              Support
            </h4>
            <ul className="space-y-2 text-sm sm:text-base text-gray-300">
              <li>
                <Link href="/support" className="inline-block">
                  Support Channels
                </Link>
              </li>
              <li>
                <Link href="/training" className="inline-block">
                  Training & Certification
                </Link>
              </li>
              <li>
                <Link href="/docs" className="inline-block">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/report-issue" className="inline-block">
                  Report Issue / Vulnerability
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 ">
            <div className="text-xs sm:text-sm  text-center md:text-left text-white">
              Copyright © BGCE Archive {new Date().getFullYear()}
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-white">
              <Link href="/terms" className="whitespace-nowrap">
                Terms & Conditions
              </Link>
              <Link href="/cookies" className="whitespace-nowrap">
                Cookies Policy
              </Link>
              <Link href="/privacy" className="whitespace-nowrap">
                Privacy Policy
              </Link>
              <Link href="/security" className="whitespace-nowrap">
                Security Policy
              </Link>
              <Link href="/trust" className="whitespace-nowrap">
                Trust Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
