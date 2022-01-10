import { HashtagIcon, SearchIcon } from '@heroicons/react/outline';
import {
  BellIcon,
  ChatIcon,
  UsersIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  PlusCircleIcon,
  GiftIcon,
  EmojiHappyIcon,
} from '@heroicons/react/solid';
import { useRecoilState } from 'recoil';
import { channelState } from '../atoms/channelAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { useRef } from 'react';
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Message from './Message';

export default function Chat() {
  const [channelInfo] = useRecoilState(channelState);
  const [user] = useAuthState(auth);
  const inputRef = useRef('');
  const chatRef = useRef(null);
  const [messages, loading] = useCollection(
    channelInfo.channelId &&
      query(
        collection(db, 'channels', channelInfo.channelId, 'messages'),
        orderBy('timestamp', 'asc')
      )
  );

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputRef.current.value !== '') {
      addDoc(collection(db, 'channels', channelInfo.channelId, 'messages'), {
        timestamp: serverTimestamp(),
        message: inputRef.current.value,
        name: user?.displayName,
        photoUrl: user?.photoURL,
        email: user?.email,
      });
      inputRef.current.value = '';
      scrollToBottom();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className=" flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashtagIcon className=" h-6 text-[#72767d]" />
          <h4 className=" text-white font-semibold">
            {channelInfo.channelName}
          </h4>
        </div>
        <div className="flex space-x-3">
          <BellIcon className="icon" />
          <ChatIcon className="icon" />
          <UsersIcon className="icon" />
          <div className="flex bg-[#202225] text-xs p-1 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className=" bg-transparent focus:outline-none text-white pl-1 placeholder-[#7276d]"
            />
            <SearchIcon className=" h-4 text-[#72767d] mr-1" />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
      </header>
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <h1 className=" text-white font-bold text-2xl animate-ping">
              Loading..
            </h1>
          </div>
        )}
        {/* Messages */}
        {messages?.docs.map((doc) => {
          const { email, message, name, photoUrl, timestamp } = doc.data();
          return (
            <Message
              key={doc.id}
              id={doc.id}
              message={message}
              timestamp={timestamp}
              name={name}
              email={email}
              photoUrl={photoUrl}
            />
          );
        })}
        <div ref={chatRef} className=" pb-16" />
      </main>
      <div className=" flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg">
        <PlusCircleIcon className="icon mr-4" />
        <form className="flex-grow">
          <input
            type="text"
            disabled={channelInfo.channelId === null}
            placeholder={
              channelInfo.channelId
                ? `Message #${channelInfo.channelName}`
                : 'Select A Channel'
            }
            className=" bg-transparent focus:outline-none text-[#dcddde] w-full placeholder-[#72767d] text-sm"
            ref={inputRef}
          />
          <button hidden type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <GiftIcon className="icon mr-2" />
        <EmojiHappyIcon className="icon" />
      </div>
    </div>
  );
}
