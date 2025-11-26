import  { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import type { IncomeEntry } from "../../components/Bargraph/IncomeBarChart";
import { Theme } from "emoji-picker-react";
interface Props {
  close: () => void;
  onSubmit: (data: any) => void;
  editData: IncomeEntry | null;
  darkMode: boolean;
}

const IncomeModal = ({ close, onSubmit, editData, darkMode }: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [form, setForm] = useState({
    source  : editData?.source   || "",
    amount: editData?.amount || "",
    icon: editData?.icon || "💰",
    date: editData?.date  ,
  });

  const handleSubmit = () => {
    onSubmit(form);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-xl w-96 relative ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-lg font-bold mb-3">
          {editData ? "Edit Income" : "Add Income"}
        </h2>

        <div className="space-y-3">
             {/* Emoji Picker Input */}
          <div>
            <label className="block mb-1">Icon</label>

            <div className="flex items-center gap-2">
              <input
                className="w-full p-2 border rounded"
                placeholder="Icon (emoji)"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              />

              <button
                className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                😀
              </button>
            </div>

            {/* Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute mt-2 z-50">
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    setForm({ ...form, icon: emoji.emoji });
                    setShowEmojiPicker(false);
                  }}
             theme={darkMode ? Theme.DARK : Theme.LIGHT}

                />
              </div>
            )}
          </div>
          {/* Category Input */}
          <input
            className="w-full p-2 border rounded"
            placeholder="Category"
            value={form.source  }
            onChange={(e) => setForm({ ...form, source  : e.target.value })}
          />

          {/* Amount Input */}
          <input
            className="w-full p-2 border rounded"
            placeholder="Amount"
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
          />

       

          {/* Date Input */}
          <input
            className="w-full p-2 border rounded"
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={close}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSubmit}
          >
            {editData ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeModal;
