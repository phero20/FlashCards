import React, { useState } from "react";
import { X } from "lucide-react";
export default function CardsCreate(props) {
  const [formData, setFormData] = useState({
    title: "",
    question: "",
    answer: "",
    images: [],
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    await props.addCard(formData);
    props.onClose();
    formData.title = "";
    formData.question = "";
    formData.answer = "";
    formData.images = [];
  };

  // Function to auto-resize the textarea based on its content
  const autoResize = (e) => {
    e.target.style.height = "auto"; // Reset height to auto
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on content
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-50 hide-scrollbar dark:text-white text-black">
      {/* Main Container */}
      <div className="w-[95%] max-h-[95vh] overflow-y-auto sm:w-3/4 lg:w-2/3 xl:w-1/2 max-w-4xl dark:bg-black bg-white rounded-lg shadow-2xl px-6 pb-6 hide-scrollbar">
        {/* Close Button */}
        <div className="sticky top-0 flex justify-between items-center z-10 dark:bg-black bg-white py-6">
          {/* Centered Title */}
          <h2 className="text-center text-3xl font-bold flex-grow text-black dark:text-white">
            Create Card
          </h2>
          {/* Spacer to occupy left side */}
         {/* Approx width of X icon */}
          {/* X Button on Right */}
          <button
            type="button"
            onClick={() => {
              formData.title = "";
              formData.question = "";
              formData.answer = "";
              formData.images = [];
              props.onClose();
            }}
            className="hover:text-gray-700 transition p-2"
          >
            <X size={30} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="font-semibold">Title</label>
            <textarea
              name="title"
              value={formData.title}
              onChange={(e) => {
                handleInputChange(e);
                autoResize(e);
              }}
              placeholder="Enter a title"
              className="w-full mt-2 p-3 bg-transparent border-b-2 dark:border-white border-black focus:outline-none focus:border-teal-500 resize-none hide-scrollbar"
              rows="1"
              required
            />
          </div>

          {/* Question Field */}
          <div>
            <label className="font-semibold">Question</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={(e) => {
                handleInputChange(e);
                autoResize(e);
              }}
              placeholder="Enter the question (can be long)"
              className="w-full mt-2 p-3  bg-transparent border-b-2 dark:border-white border-black focus:outline-none focus:border-teal-500 resize-none hide-scrollbar"
              rows="1"
              required
            />
          </div>

          {/* Answer Field */}
          <div>
            <label className="font-semibold">Answer</label>
            <textarea
              name="answer"
              value={formData.answer}
              onChange={(e) => {
                handleInputChange(e);
                autoResize(e);
              }}
              placeholder="Enter the answer (can be long)"
              className="w-full mt-2 p-3 bg-transparent border-b-2 dark:border-white border-black focus:outline-none focus:border-teal-500 resize-none hide-scrollbar"
              rows="1"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="">
            <label className="font-medium text-gray-400">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-none file:text-white file:bg-sky-500 hover:file:bg-sky-600 cursor-pointer"
            />
          </div>

          {/* Image Previews */}
          {formData.images.length > 0 && (
            <div className="mt-4">
              <p className="text-lg text-gray-400 mb-2">Image Previews:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="h-32 w-full bg-transparent rounded-lg overfl-bow-hidden border dark:border-white border-black"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-teal-500 py-3 rounded-lg text-lg font-bold hover:bg-teal-600 transition"
            >
              Create Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
