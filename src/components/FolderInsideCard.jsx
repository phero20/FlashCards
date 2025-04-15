import React from 'react';
import { MoreVertical } from "lucide-react";
import { TrashIcon, EditIcon } from "lucide-react";

export default function FolderInsideCard(props) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div>
      <div
        className={`${props.color.bg} text-white p-4 py-5 rounded-2xl shadow-lg w-80 relative overflow-hidden cursor-pointer`}
        onClick={()=>props.handleOpenCard( props.title,
          props.question,
          props.answer,
          props.images,
          props.index
        )}
      >
      
        <div className="absolute top-5 right-2 z-10 menu">
          <button
            onClick={(e) => {
              e.stopPropagation(); 
              setMenuOpen(!menuOpen);
            }}
          >
            <MoreVertical size={18} className="text-white" />
          </button>
          {menuOpen && (
            <div
              className="absolute right-5 -top-3 w-28 text-white rounded shadow-md menu"
              style={{ backgroundColor: props.color.fill }}
            >
             <button
              className={`w-full px-4 py-2 text-sm flex justify-evenly`}
              onClick={(e) => {
                e.stopPropagation(); 
                props.handleCardEdit(
                  props.index,
                  "edit",
                  props.title,
                  props.question,
                  props.answer,
                  props.images
                );
              }}
            >
                <EditIcon size={18} /> Edit
              </button>
              <button
              className={`flex w-full px-3 py-2 text-sm justify-evenly`}
              onClick={(e) => {
                e.stopPropagation(); 
                props.handleCardEdit(props.index, "delete");
              }}
            >
                <TrashIcon size={18} /> Delete
              </button>
            </div>
          )}
        </div>

      
        <div className="absolute inset-0">
          <svg
            viewBox="0 0 400 200"
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 90 Q 100 80, 250 130 T 450 110 L 400 200 L 0 200 Z"
              fill={props.color.fill}
            />
          </svg>
        </div>

        <h2 className="text-xl font-semibold relative">{props.title}</h2>

       
        <div
          className="mt-4 flex flex-wrap gap-2  overflow-y-auto relative hide-scrollbar"
        >
          {props.images
            .map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`User Avatar ${index + 1}`}
                className="w-12 h-12 rounded-lg object-contain" 
              />
            ))}
        </div>
      </div>
    </div>
  );
}
