import { DownloadIcon } from '@heroicons/react/outline';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className=" bg-discord_blue pb-8 md:pb-0 overflow-hidden">
      <div className=" p-7 py-9 w-screen h-screen md:h-[83vh] md:flex relative">
        <div className="flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center">
          <h1 className="text-5xl text-white font-bold">Your place to talk</h1>
          <h2 className="text-white text-lg font-light tracking-wide lg:max-w-3xl w-full">
            Whether you’re part of a school club, gaming group, worldwide art
            community, or just a handful of friends that want to spend time
            together, Discord makes it easy to talk every day and hang out more
            often.
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center md:flex-col md:items-start lg:flex-row gap-6">
            <button className=" bg-white w-60 font-medium text-md flex items-center justify-center rounded-full p-4 text-md hover:shadow-2xl hover:text-discord_blurple focus:outline-none transition duration-200 ease-in-out">
              <DownloadIcon className=" w-6 mr-2" />
              Download for Windows
            </button>
            <button className=" bg-gray-900 text-white w-72 font-medium flex items-center justify-center rounded-full p-4 text-md hover:shadow-2xl hover:bg-gray-800 focus:outline-none transition duration-200">
              Open Discord in your browser
            </button>
          </div>
        </div>
        <div className="flex-grow">
          <div className="absolute -left-36 mt-16 sm:-left-44 md:hidden w-[600px] h-[300px]">
            <Image
              layout={'responsive'}
              src={'https://rb.gy/ohwmdy'}
              alt=""
              width={600}
              height={322}
            />
          </div>
          <div className="hidden md:inline absolute w-[700px] h-[700px]">
            <Image
              layout={'responsive'}
              src={'https://rb.gy/gjs8ch'}
              alt=""
              width={800}
              height={870}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
