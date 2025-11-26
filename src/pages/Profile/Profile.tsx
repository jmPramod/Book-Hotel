import  { useRef, useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { Pencil, Save, X, Camera } from "lucide-react"; 

const Profile = () => {
const { user, darkMode, setUser,updateUser } = useUserStore();

const [isEditing, setIsEditing] = useState(false);
const fileInputRef = useRef<any>(null);

const [formData, setFormData] = useState({
firstName: user?.data?.firstName || "",
lastName: user?.data?.lastName || "",
phone: user?.data?.phone || "",
address: user?.data?.address || "",
state: user?.data?.state || "",
country: user?.data?.country || "",
pinCode: user?.data?.pinCode || "",
email: user?.data?.email || "",
profileImage: user?.data?.profileImage?.imageUrl || "",
profileFile: null as File | null, // store the actual file
});

// Handle text input
const handleChange = (e: any) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

// Handle Image Upload
const handleImageChange = (e: any) => {
const file = e.target.files[0];
if (!file) return;

const previewUrl = URL.createObjectURL(file);

setFormData({
  ...formData,
  profileImage: previewUrl,
  profileFile: file,
});


};

// Handle Save
const handleSave = async () => {
const form = new FormData();


form.append("firstName", formData.firstName);
form.append("lastName", formData.lastName);
form.append("phone", formData.phone);
form.append("address", formData.address);
form.append("state", formData.state);
form.append("country", formData.country);
form.append("pinCode", formData.pinCode.toString());

console.log("formData.profileFile",formData.profileFile);

if (formData.profileFile) {
  form.append("profileImage", formData.profileFile);
}

try {if(user){
const response = await updateUser(form,user.data._id)

 
  const data = response.data
  setUser(data); // Update user in store
  setIsEditing(false);
}
  
} catch (err: any) {
  console.error(err.message);
  alert("Failed to update profile");
}


};

// Handle Cancel
const handleCancel = () => {
setIsEditing(false);
setFormData({
...formData,
firstName: user?.data?.firstName || "",
lastName: user?.data?.lastName || "",
phone: user?.data?.phone || "",
address: user?.data?.address || "",
state: user?.data?.state || "",
country: user?.data?.country || "",
pinCode: user?.data?.pinCode || "",
profileImage: user?.data?.profileImage?.imageUrl || "",
profileFile: null,
});
};

return (
<div
className={`w-full mx-auto p-8 mt-4 rounded-xl shadow-lg transition ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
>
{/* Profile Header */} <div className="flex flex-col items-center gap-4">
{/* Profile Image Container */} <div className="relative cursor-pointer">
<img
src={formData.profileImage}
alt="Profile"
onClick={() => isEditing && fileInputRef.current.click()}
className="w-28 h-28 rounded-full border object-cover"
/>


      {isEditing && (
        <div
          onClick={() => fileInputRef.current.click()}
          className="absolute bottom-1 right-1 bg-black/60 p-2 rounded-full cursor-pointer"
        >
          <Camera size={18} color="white" />
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>

    <h2 className="text-2xl font-semibold tracking-wide">
      {user?.data?.firstName} {user?.data?.lastName}
    </h2>

    {!isEditing && (
      <button
        onClick={() => setIsEditing(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        <Pencil size={18} /> Edit Profile
      </button>
    )}
  </div>

  {/* FORM */}
  <div className="mt-10 space-y-10">
    {/* Row 1 – First + Last Name */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="font-medium">First Name</label>
        <input
          type="text"
          name="firstName"
          disabled={!isEditing}
          value={formData.firstName}
          onChange={handleChange}
          className={`w-full p-3 mt-1 rounded-lg border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        />
      </div>

      <div>
        <label className="font-medium">Last Name</label>
        <input
          type="text"
          name="lastName"
          disabled={!isEditing}
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full p-3 mt-1 rounded-lg border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        />
      </div>
    </div>

    {/* Row 2 – Email + Phone */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="font-medium">Email</label>
        <input
          type="email"
          name="email"
          disabled
          value={formData.email}
          className={`w-full p-3 mt-1 rounded-lg border outline-none cursor-not-allowed ${
            darkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-gray-200 border-gray-300"
          }`}
        />
        <p className="text-sm opacity-60">(Email cannot be changed)</p>
      </div>

      <div>
        <label className="font-medium">Phone Number</label>
        <input
          type="text"
          name="phone"
          disabled={!isEditing}
          value={formData.phone}
          onChange={handleChange}
          className={`w-full p-3 mt-1 rounded-lg border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        />
      </div>
    </div>

    {/* Row 3 – Address + State */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="font-medium">Address</label>
        <input
          type="text"
          name="address"
          disabled={!isEditing}
          value={formData.address}
          onChange={handleChange}
          className={`w-full p-3 mt-1 rounded-lg border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        />
      </div>

      <div>
        <label className="font-medium">State</label>
        <input
          type="text"
          name="state"
          disabled={!isEditing}
          value={formData.state}
          onChange={handleChange}
          className={`w-full p-3 mt-1 rounded-lg border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        />
      </div>
    </div>

    {/* Row 4 – Country + Pin Code */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="font-medium">Country</label>
        <input
          type="text"
          name="country"
          disabled={!isEditing}
          value={formData.country}
          onChange={handleChange}
          className={`w-full p-3 mt-1 rounded-lg border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        />
      </div>

      <div>
        <label className="font-medium">Pin Code</label>
        <input
          type="number"
          name="pinCode"
          disabled={!isEditing}
          value={formData.pinCode}
          onChange={handleChange}
          className={`w-full p-3 mt-1 rounded-lg border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-gray-100 border-gray-300"
          }`}
        />
      </div>
    </div>
  </div>

  {/* Save | Cancel Buttons */}
  {isEditing && (
    <div className="flex gap-4 mt-10">
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
      >
        <Save size={18} /> Save
      </button>

      <button
        onClick={handleCancel}
        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
      >
        <X size={18} /> Cancel
      </button>
    </div>
  )}
</div>
);
};

export default Profile;
