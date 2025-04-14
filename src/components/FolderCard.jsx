import React, { useState } from "react";
import logo from "../assets/logo.png";
import { MoreVertical } from "lucide-react";
import { TrashIcon, EditIcon } from "lucide-react";

const FolderCard = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  

  return (
    <div
      className={`${props.color.bg} text-white p-4 rounded-2xl shadow-lg w-40 relative overflow-hidden cursor-pointer`}
      onClick={()=>props.handleOpenFolder(props.cards,props.folderName,props.index)}
    >
      {/* 3-Dots Menu */}
      <div className="absolute top-5 right-2 z-10 menu">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent folder opening
            setMenuOpen(!menuOpen);
          }}
        >
          <MoreVertical size={18} className="text-white" />
        </button>
        {menuOpen && (
          <div
            className="absolute right-0 top-4 mt-2 w-28 text-white rounded shadow-md menu"
            style={{ backgroundColor: props.color.fill }}
          >
            <button
              className={`w-full px-4 py-2 text-sm flex justify-evenly`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent folder opening
                props.handleFolderEdit(
                  props.index,
                  "edit",
                  props.imageUrl,
                  props.folderName
                );
              }}
            >
              <EditIcon size={18} /> Edit
            </button>
            <button
              className={`flex w-full px-3 py-2 text-sm justify-evenly`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent folder opening
                props.handleFolderEdit(props.index, "delete");
              }}
            >
              <TrashIcon size={18} /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Background Design */}
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

      <h2 className="text-xl font-semibold relative">{props.folderName}</h2>
      <p className="mt-1 text-sm relative">{props.cards.length || 0} cards</p>
      <div className="mt-4 flex justify-end relative">
        <img
          src={props.imageUrl || logo}
          alt="User Avatar"
          className="w-20 h-20"
        />
      </div>
    </div>
  );
};

export default FolderCard;