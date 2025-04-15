import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import logo from "../assets/logo.png"; 

const AddDeck = (props) => {
  const [folderName, setFolderName] = useState(props.EditfolderName || "");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(props.editImage || logo); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   

 
    setFolderName("");
    setCoverImage(null);
    setPreview(logo); 
    await props.editDeck(folderName, coverImage); 
    props.onClose(); 
  };

  useEffect(() => {
    setFolderName(props.EditfolderName || "");
    setPreview(props.editImage || logo); 
  }, [props.EditfolderName, props.editImage]);

  return (
    <form
      onSubmit={handleSubmit}
      className="relative dark:bg-black bg-white p-6 rounded-lg shadow-xl w-5/6 max-w-md mx-auto dark:text-white text-black"
    >
     
      <button
        type="button"
        onClick={() => {
          props.onClose();
          setFolderName(props.EditfolderName);
          setCoverImage(props.editImage);
          setPreview(logo); 
        }}
        className="absolute top-3 right-3  hover:text-gray-700"
      >
        <X size={24} />
      </button>

   
      <h2 className="text-2xl font-semibold text-black dark:text-white text-center pb-8 pt-3">
        {props.EditfolderName ? "Edit Deck" : "Create New Deck"}
      </h2>

   
      <div>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Enter Folder Name"
          className="w-full border-b-2 dark:border-white border-black focus:border-teal-500 bg-transparent px-4 py-2  text-sm focus:outline-none"
          required
        />
      </div>

    
      <div>
        <label className="block text-sm text-gray-400 mt-5">Upload Cover Image</label>
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
        {props.EditfolderName ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default AddDeck;
