import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "../ui/avatar";
import { getColors } from "@/lib/utils";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    selectedChatType,
    setSelectedChatMessages,
    setDirectMessagesContacts,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    console.log("In contact-list")
    console.log("selectedChatData",selectedChatData)
    console.log("contact", contact)

    // Create a new object with `id` instead of `_id`
    const contactWithId = { ...contact, id: contact._id };
    delete contactWithId._id;

    setSelectedChatData(contactWithId);

    if (selectedChatData && selectedChatData.id !== contact._id)
      setSelectedChatMessages([]);
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData.id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
          onClick={() => handleClick(contact)}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300 ">
            {!isChannel && (
              <Avatar className="h-12 w-12  rounded-full overflow-hidden select-none">
                {contact.image ? (
                  <AvatarImage
                    src={contact.image}
                    alt="profile"
                    className="object-contain h-full w-full"
                  />
                ) : (
                  <div
                    className={`
                      ${selectedChatData && selectedChatData.id === contact._id ? "bg-[#ffffff22] border-2 border-white/70" : getColors(
                      contact.color
                    )}
                      uppercase select-none h-12 w-12  text-xl border-[2px] flex items-center justify-center rounded-full text-white `}
                  >
                    {contact.firstName
                      ? contact.firstName.split("").shift()
                      : contact.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            )}
            {
              isChannel && <div className="bg-[#ffffff22] h-10 w-10 flex justify-center items-center rounded-full">#</div>
            }
            {
              isChannel ? <span>{contact.name}</span> : <span>{`${contact.firstName} ${contact.lastName}`}</span>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
