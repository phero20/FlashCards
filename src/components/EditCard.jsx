import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function EditCard(props) {
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

  useEffect(() => {
    setFormData({
      title: props.title || "",
      question: props.question || "",
      answer: props.answer || "",
      images: props.images || [],
    });
  }, [props.title, props.question, props.answer, props.images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   await props.editCard(formData);
    props.onClose();

    setFormData({ title: "", question: "", answer: "", images: [] });
  };

  const autoResize = (e) => {
    e.target.style.height = "auto"; 
    e.target.style.height = `${e.target.scrollHeight}px`; 
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 hide-scrollbar dark:text-white text-black">
    
      <div className="w-[95%] max-h-[95vh] overflow-y-auto dark:bg-black bg-white rounded-lg shadow-2xl px-6 pb-6 hide-scrollbar">
    
        <div className="sticky top-0 flex justify-between items-center z-10 dark:bg-black bg-white py-6">
    
          <h2 className="text-center text-3xl font-bold flex-grow text-black dark:text-white">
            Edit Card
          </h2>

       
          <button
            type="button"
            onClick={() => {
              setFormData({
                title: props.title || "",
                question: props.question || "",
                answer: props.answer || "",
                images: props.images || [],
              });
              props.onClose();
              
            }}
            className="text-black dark:text-white transition"
          >
            <X size={30} />
          </button>
        </div>

       
        <form onSubmit={handleSubmit} className="space-y-6">
    
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
              className="w-full mt-2 p-3 bg-transparent border-b-2 dark:border-white border-black focus:outline-none focus:border-teal-500 resize-none hide-scrollbar"
              rows="1"
              required
            />
          </div>

        
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
              className="w-full mt-2 p-3  bg-transparent  border-b-2 dark:border-white border-black focus:outline-none focus:border-teal-500 resize-none hide-scrollbar"
              rows="1"
              required
            />
          </div>

         
          <div className="">
            <label className="text-gray-400 font-medium">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-none file:text-white file:bg-sky-500 hover:file:bg-sky-600 cursor-pointer"
            />
          </div>
 
          {formData.images.length > 0 && (
            <div className="mt-4">
              <p className="text-lg text-gray-400 mb-2">Image Previews:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="h-32 w-full bg-transparent rounded-lg overflow-hidden border dark:border-white border-black"
                  >
                    <img
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : image 
                      }
                      alt={`Preview ${index}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

      
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-teal-500  py-3 rounded-lg text-lg font-bold hover:bg-teal-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
