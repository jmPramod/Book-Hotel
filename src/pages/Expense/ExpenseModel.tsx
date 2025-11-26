import  { useState, useRef, useEffect } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import type { ExpenseEntry } from "../../components/Linechart/ExpenseChart";
// import type { ExpenseEntry } from "./ExpenseLineChart";

interface Props {
  close: () => void;
  onSubmit: (data: any) => void;
  editData: ExpenseEntry | null;
  darkMode: boolean;
}

const ExpenseModal = ({ close, onSubmit, editData, darkMode }: Props) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = useRef<HTMLDivElement | null>(null);

  const [form, setForm] = useState({
    category: editData?.category || "",
    amount: editData?.amount || "",
    icon: editData?.icon || "💸",
    date: editData?.date || new Date().toISOString(),
  });

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

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
          {editData ? "Edit Expense" : "Add Expense"}
        </h2>

        <div className="space-y-3">
          <input
            className="w-full p-2 border rounded"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Amount"
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
          />

          <div>
            <label className="block mb-1">Icon</label>

            <div className="flex items-center gap-2 relative">
              <input
                className="w-full p-2 border rounded"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              />

              <button
                className="px-3 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                😀
              </button>

              {showEmojiPicker && (
                <div ref={emojiRef} className="absolute top-12 right-0 z-50">
                  <EmojiPicker
                    theme={darkMode ? Theme.DARK : Theme.LIGHT}
                    onEmojiClick={(emoji) => {
                      setForm({ ...form, icon: emoji.emoji });
                      setShowEmojiPicker(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <input
            className="w-full p-2 border rounded"
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={close}>
            Cancel
          </button>

          <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleSubmit}>
            {editData ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;
