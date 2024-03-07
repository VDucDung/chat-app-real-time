import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";

    const createdAt = new Date(message.createdAt);
    const gio = createdAt.getHours().toString().padStart(2, '0');
    const phut = createdAt.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${gio}:${phut}`;

    const shakeClass = message.shouldShake ? "shake" : "";
    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img src={profilePic} alt="avatar" />
                </div>
            </div>

            <div className={`chat-bubble text-white ${bubbleBgColor} pb-2 ${shakeClass}`}>
                {message.message}
            </div>
            <div className={`chat-footer opacity-40 text-xs flex gap-1 items-center text-white`}>
                {formattedTime}
            </div>
        </div>
    )
}

export default Message