import { type NextPageWithLayout } from "@/pages/_app";
import { useState } from "react";

export type iProps = {
  isOpen: boolean;
  onClose: () => void;

}
const ChatModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 ${isOpen ? 'flex' : 'hidden'} items-center justify-center`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="bg-white p-4 rounded shadow-lg z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Chat Modal</h2>
          <button onClick={onClose} className="text-gray-600">
            Close
          </button>
        </div>

        <div>
          {/* Chat content goes here */}
          <p className="text-sm">This is your chat content.</p>
        </div>
      </div>
    </div>
  );
};

const BubbleChat: NextPageWithLayout = () => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  return (
    <div className="bg-gray-200 p-8">
      <h1 className="text-2xl font-bold mb-4">Your App Content</h1>

      <button
        onClick={() => setIsChatModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Open Chat
      </button>

      <ChatModal isOpen={isChatModalOpen} onClose={() => setIsChatModalOpen(false)} />
    </div>
  );
}

export default BubbleChat;