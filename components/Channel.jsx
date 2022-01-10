import { HashtagIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { channelState } from '../atoms/channelAtom';

export default function Channel({ id, channelName }) {
  const router = useRouter();
  const [channelInfo, setChannelInfo] = useRecoilState(channelState);
  const setChannel = () => {
    setChannelInfo({
      channelId: id,
      channelName: channelName,
    });
    router.push(`/channels/${id}`);
  };

  return (
    <div
      onClick={setChannel}
      className="flex font-medium items-center cursor-pointer hover:bg-[#3a3c43] p-1 rounded-md hover:text-white"
    >
      <HashtagIcon className=" h-5 mr-2" /> {channelName}
    </div>
  );
}
