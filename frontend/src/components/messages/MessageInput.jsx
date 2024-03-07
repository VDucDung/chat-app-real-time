import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";

const MessageInput = () => {

    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    };

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white outline-none'
                    placeholder='Send a message' onChange={(e) => setMessage(e.target.value)} value={message}
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3' >
                    {loading ? <span className='loading loading-spinner'></span> : <BsSend className="w-5 h-5 text-white opacity-50 " />}
                </button>
            </div>
        </form>
    );
};
export default MessageInput;