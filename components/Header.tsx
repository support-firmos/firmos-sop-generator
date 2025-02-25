// components/Header.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-vampireBlack text-cultured p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10">
            <Image 
              src="/logo.svg" 
              alt="FirmOS Logo" 
              fill 
              className="object-contain"
            />
          </div>
          <span className="font-inter font-bold text-xl">FirmOS</span>
        </Link>
        <div className="text-sm">
          <span className="font-medium">SOP Generator</span>
        </div>
      </div>
    </header>
  );
}