import React, { useState } from "react";
import { X } from "lucide-react";

const AddDeck = (props) => {
  const [folderName, setFolderName] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    setFolderName("");
    setCoverImage(null);
    setPreview(null);
    await props.addDeck(folderName, coverImage);
    props.onClose(); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative dark:bg-black bg-white p-6 rounded-lg shadow-xl w-5/6 max-w-md mx-auto space-y-8 dark:text-white text-black`}
    >
    
      <button
        type="button"
        onClick={() => {
          props.onClose();
          setFolderName("");
          setCoverImage(null);
          setPreview(null); 
        }}
        className="absolute top-3 right-3 dark:text-white text-black hover:text-gray-700"
      >
        <X size={24} />
      </button>

    
      <h2 className="text-2xl font-semibold text-center">
        Create New Deck
      </h2>

    
      <div>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Enter Folder Name"
          className="w-full border-b-2 dark:border-white border-black focus:border-teal-500 bg-transparent px-4 py-2 text-sm focus:outline-none"
          required
        />
      </div>

    
      <div>
        <label className="block text-sm text-gray-400">
          Upload Cover Image{" "}
        </label>
        <p className="text-xs text-gray-400 mb-2">*Optional</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-none file:text-white file:bg-sky-500 hover:file:bg-sky-600 cursor-pointer"
        />
        {preview && (
          <div className="mt-4 p-2 flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-1/2 object-cover rounded-lg border dark:border-white border-black"
            />
          </div>
        )}
      </div>

   
      <button
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-600 font-bold py-2 rounded-lg text-sm"
      >
        Create
      </button>
    </form>
  );
};

export default AddDeck;
