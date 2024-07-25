import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import { useAppStore } from "@/store";
import { useSocket } from "@/context/SocketContext";
import { toast } from "sonner";
import uploadImage from "@/lib/cloudinary/uploadImage";
const MessageBar = () => {
  const fileInputRef = useRef(null);
  const emojiRef = useRef();
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
  const { selectedChatType, selectedChatData, userInfo, setLoading } =
    useAppStore();
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };
  const handleOnChangeMessage = (event) => {
    setMessage(event.target.value);
  };


 const handleSendMessage = async () => {
  const tempFileIdentifier =
    fileInputRef.current.files.length > 0 ? "uploading" : undefined;

 

  if (
    selectedChatType === "contact" &&
    (message || tempFileIdentifier === "uploading")
  ) {
    const newMessage = {
      sender: userInfo.id,
      content: message || " ",
      recipient: selectedChatData.id,
      messageType: "text",
      fileUrl: tempFileIdentifier,
    };

    setMessage("");

    if (tempFileIdentifier) {
      
      handleOnUploadAttachment(newMessage, "sendMessage");
    } else {
      
      await socket.emit("sendMessage", newMessage);
    }
  } else if (
    selectedChatType === "channel" &&
    (message || tempFileIdentifier === "uploading")
  ) {
    const newMessage = {
      sender: userInfo.id,
      content: message || " ",
      messageType: "text",
      fileUrl: tempFileIdentifier,
      channelId: selectedChatData.id,
    };

    setMessage("");

    if (tempFileIdentifier) {
     
      handleOnUploadAttachment(newMessage, "send-channel-message");
    } else {
      
      await socket.emit("send-channel-message", newMessage);
    }
  }

  setMessage("");
};


  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleOnSelectAttachment = () => {
    setFileSelected(fileInputRef.current.files.length > 0);
  };

  const handleOnUploadAttachment = async (newMessage, type) => {
    const attachment = fileInputRef.current.files[0];
    
    if (attachment) {
      const catagory = "user-upload";
      const cloudinaryFolder = `chatApp/${catagory}/`;
  
      try {
        setLoading(true);
        const uploadImageCloudinary = await uploadImage(
          attachment,
          cloudinaryFolder
        );
        
        let fileUrl = "";
        if (uploadImageCloudinary.data.secure_url) {
          fileUrl = uploadImageCloudinary.data.secure_url;
        }
        if (fileUrl) {
          const UpdatedMessage = {
            ...newMessage,
            fileUrl: fileUrl,
          };
         
          await socket.emit(type, UpdatedMessage);
         
          fileInputRef.current.value = "";
          setFileSelected("");
          setLoading(false);
        }
      } catch (error) {
      
        toast.error("Failed to upload attachment.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33]  rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={handleOnChangeMessage}
        />
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleOnSelectAttachment}
          name="attachment"
        />
        <button
          className="text-neutral-500  focus:border-none focus:outline-none focus:text-white duration-300 transition-all active:scale-95"
          onClick={handleFileInputClick}
        >
          <GrAttachment
            className={`text-2xl ${fileSelected ? "text-red-600" : ""}`}
          />
        </button>
        <div className="relative">
          <button
            className="text-neutral-500  focus:border-none focus:outline-none focus:text-white duration-300 transition-all active:scale-95"
            onClick={() => setEmojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all "
        onClick={handleSendMessage}
      >
        <IoMdSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
