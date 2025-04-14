import React, { useEffect } from "react";
import Nav from "./Nav";
import folderIcon from "../assets/folder.png";
import FolderCard from "./FolderCard";
import AddDeck from "./AddDeck";
import Loading from "./Loading";

// Define sequential colors
const colors = [
  { bg: "bg-teal-500", fill: "#128174" },
  { bg: "bg-sky-400", fill: "#2C73AE" },
  { bg: "bg-orange-300", fill: "#DFA45E" },
  { bg: "bg-violet-500", fill: "#7565C3" },
];

export default function Folders({ folders, addDeck, handleFolderEdit, handleOpenFolder,loading1 }) {
  const [addDeckOpen, setAddDeckOpen] = React.useState(false);
  const [folderArray, setFolderArray] = React.useState([]);

  // Fetch folders when the component mounts
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await folders(); // Fetch folders passed as props
        setFolderArray(response);
      } catch (error) {
        setFolderArray([]);
        alert("Error fetching folders:", error);
      }
    };
    fetchFolders();
  }, [folders]);

  const handleAddDeck = () => {
    setAddDeckOpen(!addDeckOpen);
  };

  const onClose = () => {
    setAddDeckOpen(false);
  };

  const handleAddNewFolder = (newFolder) => {
    setFolderArray((prevFolders) => [...prevFolders, newFolder]); // Locally update folder array
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Nav />

      {/* Header Section */}
      <div className="flex justify-center">
        <div className="max-w-screen-xl w-full flex items-center justify-between p-4 dark:text-white text-xl font-bold">
          {/* Title Section */}
          <div className="flex items-center gap-3">
            <img src={folderIcon} alt="Folder" className="w-8 h-8" />
            <p>
              <span className="">{folderArray.length < 2 ? `${folderArray.length} Deck`  : `${folderArray.length} Decks`}</span> 
            </p>
          </div>
          <div className="flex text-base items-center font-bold gap-2">
            <div
              className="relative group cursor-pointer transition-transform hover:scale-105 w-8"
              onClick={handleAddDeck}
            >
              <img src={folderIcon} alt="Add Folder" className="w-8 h-8" />
              <div className="absolute -bottom-1 -right-1 bg-red-400 text-base font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                +
              </div>
            </div>
            <p>Add Deck</p>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto flex justify-center">
        <div className="max-w-screen-xl w-full p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10 place-items-center pb-3">
            {folderArray.map((folder, index) => {
              // Assign color linearly using modulo
              const linearColor = colors[index % colors.length];
              return (
                <FolderCard
                  key={index}
                  color={linearColor}
                  folderName={folder.name}
                  imageUrl={folder.coverImage}
                  index={index}
                  handleFolderEdit={handleFolderEdit}
                  handleOpenFolder={handleOpenFolder}
                  cards={folder.cards || 0}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Deck Modal */}
      <div
        className={`${
          addDeckOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } flex justify-center items-center fixed inset-0 bg-gray-700 bg-opacity-65 z-50 transition-opacity duration-500 ease-in-out`}
      >
        <div
          className={`${
            addDeckOpen ? "scale-100 translate-y-0 translate-x-0" : "scale-50 -translate-x-full"
          } w-full max-w-md transition-transform duration-500 ease-in-out flex justify-center items-center absolute`}
        >
           {loading1 ? <Loading /> :
          <AddDeck
            onClose={onClose}
            addDeck={addDeck}
            addNewFolder={handleAddNewFolder} // Add new folder locally
          />}
        </div>
      </div>
    </div>
  );
}