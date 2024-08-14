import Image from "next/image";

export default function HomePage() {
    return (
      <div className="relative w-full h-[400px]">
        <Image
          src={'/motero.jpg'}
          alt="biker"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#E83560] to-[rgba(239,146,93,0.3)]"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/50 p-4 rounded-md">
          <h1 className="text-4xl font-bold">Plan your next two-wheeled adventure with ease.</h1>
          <h4 className="mt-2 text-lg">The all-in-one app for bikers.</h4>
          <a
            href="/login"
            className="mt-4 inline-block bg-white text-black py-2 px-4 rounded-full hover:bg-pink-500"
          >
            Get Started
          </a>
        </div>
      </div>
    );
  }