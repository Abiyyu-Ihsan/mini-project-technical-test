import Link from "next/link";
import React from "react";

interface SocialMedia {
  href: string;
  icon: string;
}

const socialMedia: SocialMedia[] = [
  {
    href: "google.com",
    icon: "/icons/ig-footer.svg",
  },
  {
    href: "google.com",
    icon: "/icons/tiktok-footer.svg",
  },
  {
    href: "google.com",
    icon: "/icons/shopee.footer.svg",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="text-sm bg-black text-black">
      <div>
        <div className="max-w-7xl lg:mx-auto px-8 md:mt-20 mt-10">
          <div className="space-y-10">
            <div className="grid md:grid-cols-4 space-y-10 md:space-y-0 md:space-x-10 border-b border-white min-[320px]:pb-[40px] md:pb-16">
              {/* Logo */}
              <div className="flex justify-center items-center mx-auto md:w-[300px] px-16 max-w-sm">
                <img src="/images/logo.png" alt="Logo Rilex" />
              </div>

              {/* Office Hours */}
              <div className="space-y-3">
                <p className="pb-3 text-white font-normal text-xl leading-10">
                  Office Hours
                </p>
                <div className="flex items-start space-x-3">
                  <a target="_blank" href="/i" rel="noreferrer">
                    <p className="font-normal text-white text-base leading-7">
                      Senin s/d Jumat 09.00 AM - 16.00 PM
                    </p>
                    <p className="font-normal text-white text-base leading-7">
                      Sabtu 09.00 AM - 11.00 PM
                    </p>
                  </a>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-3">
                <p className="pb-3 text-white font-normal text-xl leading-10">
                  Contact
                </p>
                <div className="flex items-start space-x-3">
                  <img src="/icons/whatsapp copy.svg" alt="WA" />
                  <Link
                    href="https://api.whatsapp.com/send?phone=+628159028880&text=Hello Admin, I would like to inquire about villa reservations. Could you please provide the information? Thank you."
                    target="_blank"
                  >
                    <p className="font-normal text-white text-base leading-7">
                      0815-9028-880
                    </p>
                  </Link>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-3">
                <p className="pb-3 text-white font-normal text-xl leading-10">
                  Follow Us at
                </p>
                <div className="space-x-3 flex items-center">
                  {socialMedia.map((item, index) => (
                    <a
                      key={index}
                      target="_blank"
                      href={item.href}
                      rel="noreferrer"
                    >
                      <img src={item.icon} alt="social-icon" className="w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <p className="font-normal text-center text-base text-white pt-6">
            © {new Date().getFullYear()} by K-Stylehub. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
