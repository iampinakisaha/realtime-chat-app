import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getColors } from "@/lib/utils";
import { useAppStore } from "@/store";
import { Avatar } from "@radix-ui/react-avatar";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between py-10 px-10">
      <div className="flex gap-5 items-center w-full justify-between">
        <div className="flex gap-3  items-center justify-center">
          <div className="h-12 w-12 relative">
            {selectedChatType === "contact" ? (
              <Avatar className="h-12 w-12  rounded-full overflow-hidden select-none">
                {selectedChatData.image ? (
                  <AvatarImage
                    src={selectedChatData.image}
                    alt="profile"
                    className="object-contain h-full w-full"
                  />
                ) : (
                  <div
                    className={`uppercase select-none h-12 w-12  text-xl border-[2px] flex items-center justify-center rounded-full text-white ${getColors(
                      selectedChatData.color
                    )}`}
                  >
                    {selectedChatData.firstName
                      ? selectedChatData.firstName.split("").shift()
                      : selectedChatData.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            ) : (
              <div className="bg-[#ffffff22] h-10 w-10 flex justify-center items-center rounded-full">
                #
              </div>
            )}
          </div>
          <div>
            {selectedChatType === "channel" && selectedChatData.name}
            {selectedChatType === "contact" && selectedChatData.firstName
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : selectedChatData.email}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500  focus:border-none focus:outline-none focus:text-white duration-300 transition-all active:scale-95"
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
