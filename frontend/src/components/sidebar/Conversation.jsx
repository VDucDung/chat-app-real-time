import { useSoketContext } from "../../context/SoketContext";
import useConversation from "../../zustand/useConversation"

const Conversation = ({ conversation, lastIdx, emoji }) => {

    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === conversation?._id;
    const { onlineUsers } = useSoketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    return (
        <>
            <div className={`flex items-center gap-2 hover:bg-sky-500 p-2 py-1 cursor-pointer
            ${isSelected ? "bg-sky-500" : ""}`} onClick={() => setSelectedConversation(conversation)}>
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src={conversation?.profilePic} alt="user avatar default" />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">{conversation?.fullName}</p>
                        <span className="text-xl">{emoji}</span>
                    </div>
                </div>
            </div>
            {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
        </>
    )
}

export default Conversation