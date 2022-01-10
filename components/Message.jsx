import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { TrashIcon } from '@heroicons/react/solid';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { channelState } from '../atoms/channelAtom';

export default function Message({
  id,
  name,
  email,
  photoUrl,
  message,
  timestamp,
}) {
  const [user] = useAuthState(auth);
  const [channelInfo] = useRecoilState(channelState);
  return (
    <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-[#32353b] group">
      <img
        src={photoUrl}
        alt=""
        className=" h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl"
      />
      <div className="flex flex-col">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className=" hover:underline text-white text-sm cursor-pointer">
            {name}
          </span>
          <span className=" text-[#72767d] text-xs">
            {moment(timestamp?.toDate().getTime()).format('lll')}
          </span>
        </h4>
        <p className=" text-sm text-[#dcddde]">{message}</p>
      </div>
      {user?.email === email && (
        <div
          onClick={() => {
            deleteDoc(
              doc(db, 'channels', channelInfo.channelId, 'messages', id)
            );
          }}
          className=" hover:bg-[#ed4245] p-1 ml-auto rounded-sm text-[#ed4245] hover:text-white cursor-pointer flex"
        >
          <TrashIcon className=" h-5 hidden group-hover:inline" />
        </div>
      )}
    </div>
  );
}
