import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import apiClient from "@/lib/api-client";
import { getColors } from "@/lib/utils";
import { useAppStore } from "@/store";
import { GET_CHANNEL_MESSAGES_ROUTES, GET_MESSAGES_ROUTES } from "@/utils/constants";
import moment from "moment";

import { useEffect, useRef } from "react";
import { MdDownload } from "react-icons/md";

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
    setSelectedChatMessages,
    loading,
    userInfo,
  } = useAppStore();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_MESSAGES_ROUTES,
          { id: selectedChatData.id },
          { withCredentials: true }
        );
        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getChannelMessages = async () => {
      try {
        const response = await apiClient.get(
          `${GET_CHANNEL_MESSAGES_ROUTES}/${selectedChatData.id}`,
          { withCredentials: true }
        );
        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedChatData.id) {
      if (selectedChatType === "contact") {
        getMessages();
      } else if(selectedChatType === "channel") {
        getChannelMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const downloadAttachment = (fileUrl) => {
    console.log("message.fileUrl", fileUrl);
    const link = document.createElement("a");
    link.href = fileUrl;
    const filename = fileUrl.split("/").pop().split("?")[0];
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    console.log("link", link);
    document.body.removeChild(link);
  };

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessage(message)}
          {selectedChatType === "channel" && renderChannelMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessage = (message) => (
    <div
      className={`${
        message.sender === selectedChatData.id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData.id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
          {message.fileUrl && (
            <div className="mt-2 relative select-none">
              {renderFileContent(message.fileUrl)}
              <span
                className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl text-white/80 hover:text-gray-800/50 cursor-pointer opacity-30 hover:opacity-100 transition-all active:scale-90 ease-in-out"
                onDoubleClick={(event) => downloadAttachment(message.fileUrl)}
              >
                <MdDownload />
              </span>
            </div>
          )}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  const renderChannelMessages = (message) => {
    return (
      <div
        className={`mt-5 ${
          message.sender._id !== userInfo.id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <>
          <div
            className={`${
              message.sender._id === userInfo.id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words ml-9`}
          >
            {message.content}
            {message.fileUrl && (
              <div className="mt-2 relative select-none">
                {renderFileContent(message.fileUrl)}
                <span
                  className="absolute inset-0 flex items-center justify-center text-3xl md:text-5xl text-white/80 hover:text-gray-800/50 cursor-pointer opacity-30 hover:opacity-100 transition-all active:scale-90 ease-in-out"
                  onDoubleClick={(event) => downloadAttachment(message.fileUrl)}
                >
                  <MdDownload />
                </span>
              </div>
            )}
            
          </div>
          {message.sender._id !== userInfo.id ? (
            <div className="flex items-center justify-start gap-3 mt-2">
              <Avatar className="h-8 w-8  rounded-full overflow-hidden select-none">
                {message.sender.image && (
                  <AvatarImage
                    src={message.sender.image}
                    alt="profile"
                    className="object-contain h-full w-full"
                  />
                )}
                <AvatarFallback
                  className={`
                    
                    uppercase select-none h-8 w-8  text-xl border-[2px] flex items-center justify-center rounded-full ${getColors(message.sender.color)} `}
                >
                  {message.sender.firstName
                    ? message.sender.firstName.split("").shift()
                    : message.sender.email.split("").shift()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-white/60">{`${message.sender.firstName} ${message.sender.lastName}`}</span>
              <span className="text-xs text-white/60">
                  {moment(message.timestamp).format("LT")}
              </span>
            </div>
          ) : (
            <div className="text-xs text-white/60 mt-1">
              {moment(message.timestamp).format("LT")}
            </div>
          )}
          </>
        )}
      </div>
    );
  };
  return (
    <div className="flex-1 overflow-y-auto scroolbar-none p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;

const renderFileContent = (fileUrl) => {
  const fileExtension = fileUrl.split(".").pop().toLowerCase();
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
  const videoExtensions = ["mp4", "webm", "ogg"];

  if (imageExtensions.includes(fileExtension)) {
    return (
      <img
        src={fileUrl}
        alt="uploaded"
        className="max-w-full max-h-64 rounded"
      />
    );
  } else if (videoExtensions.includes(fileExtension)) {
    return (
      <video controls className="max-w-full max-h-64 rounded">
        <source src={fileUrl} type={`video/${fileExtension}`} />
        Your browser does not support the video tag.
      </video>
    );
  } else {
    return (
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        {fileUrl}
      </a>
    );
  }
};
