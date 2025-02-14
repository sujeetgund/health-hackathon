import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/">
          <Image
            src="/hh-short-logo.jpg"
            alt="logo"
            width={50}
            height={50}
          />
        </Link>

        <p>Made With 💖 for Health Hackathon</p>
      </div>
    </footer>
  );
};

export default Footer;
