import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, provider } from '../firebase';
import ServerIcon from './ServerIcon';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/outline';
import { MicrophoneIcon, PhoneIcon, CogIcon } from '@heroicons/react/outline';
import { collection, addDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Channel from './Channel';
import { signOut } from 'firebase/auth';
import Chat from './Chat';

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [channels] = useCollection(collection(db, 'channels'));

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  });

  const handleAddChannel = () => {
    const channelName = prompt('Enter A New Channel Name');

    if (channelName) {
      const docRef = addDoc(collection(db, 'channels'), {
        channelName: channelName,
      });
    }
  };

  return (
    <>
      <div className="flex h-screen">
        {/* 1st Sidebar */}
        <div className="flex flex-col space-y-3 bg-[#202225] p-3 min-w-max">
          <div className="server-default hover:bg-discord_purple">
            <img
              src="https://www.freepnglogos.com/uploads/discord-logo-png/discord-logo-logodownload-download-logotipos-1.png"
              alt=""
              className=" h-5"
            />
          </div>
          <hr className="border-gray-700 border w-8 mx-auto" />
          <ServerIcon image="https://pbs.twimg.com/profile_images/1206625339419615238/K9tXC96U_400x400.jpg" />
          <ServerIcon image="https://pbs.twimg.com/profile_images/1408409915857723396/LO_QWNMe_400x400.jpg" />
          <ServerIcon image="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg" />
          <ServerIcon image="https://pbs.twimg.com/profile_images/1140596536205877248/2UYQ4X8a_400x400.jpg" />
          <div className="server-default hover:bg-discord_green group">
            <PlusIcon className="text-discord_green h-7 group-hover:text-white" />
          </div>
        </div>
        {/* 2nd sidebar */}
        <div className=" bg-[#2f3136] flex flex-col min-w-max">
          {/* Heading */}
          <h2 className="flex text-white font-bold text-sm items-center cursor-pointer justify-between border-b border-gray-800 p-4 hover:bg-[#34373c]">
            Official SushiTrash Server...{' '}
            <ChevronDownIcon className=" h-5 ml-2" />
          </h2>
          {/* 1st Section */}
          <div className="text-[#7c7c81] flex-grow overflow-y-scroll scrollbar-hide">
            <div className="flex items-center p-2 mb-2">
              <ChevronDownIcon className=" h-3 mr-2" />
              <h4 className=" font-semibold">Channels</h4>
              <PlusIcon
                onClick={handleAddChannel}
                className=" h-6 ml-auto cursor-pointer hover:text-white"
              />
            </div>
            <div className=" flex flex-col space-y-2 px-2 mb-4">
              {channels?.docs.map((doc) => (
                <Channel
                  key={doc.id}
                  id={doc.id}
                  channelName={doc.data().channelName}
                />
              ))}
            </div>
          </div>
          {/* 2nd Section */}
          <div className="bg-[#292b2f] p-2 flex justify-between items-center space-x-8">
            <div className="flex items-center space-x-1">
              <img
                src={user?.photoURL}
                alt=""
                className=" h-10 rounded-full cursor-pointer"
                onClick={() => {
                  signOut(auth);
                }}
              />
              <h4 className=" text-white text-xs font-medium">
                {user?.displayName}
                <span className=" text-[#b9bbbe] block">
                  #{user?.uid.substring(0, 4)}
                </span>
              </h4>
            </div>
            <div className=" text-gray-400 flex items-center space-x-2">
              <div className="hover:bg-[#3a3c43] p-2 rounded-md">
                <MicrophoneIcon className=" h-5 icon" />
              </div>
              <div className="hover:bg-[#3a3c43] p-2 rounded-md">
                <PhoneIcon className=" h-5 icon" />
              </div>
              <div className="hover:bg-[#3a3c43] p-2 rounded-md">
                <CogIcon className=" h-5 icon" />
              </div>
            </div>
          </div>
        </div>
        {/* 3rd Sidebar */}
        <div className="bg-[#36393f] flex-grow">
          <Chat />
        </div>
      </div>
    </>
  );
}
