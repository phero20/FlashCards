import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import folderIcon from "../assets/logo.png";
import FolderInsideCard from "./FolderInsideCard";
import { ChevronLeft } from "lucide-react";
import CardsCreate from "./CardsCreate";
import Loading from "./Loading";

export default function FolderOpen(props) {
  const colors = [
    { bg: "bg-teal-500", fill: "#128174" },
    { bg: "bg-sky-400", fill: "#2C73AE" },
    { bg: "bg-orange-300", fill: "#DFA45E" },
    { bg: "bg-violet-500", fill: "#7565C3" },
  ];

  const [cards, setCards] = useState([]);
  const [addCardOpen, setAddCardOpen] = useState(false);


  const handleAddCard = () => {
    setAddCardOpen(true);
  };


  const onClose = () => {
    setAddCardOpen(false);
  };

 
  const addCardHandler = async (formData) => {
    try {
      const newCard = await props.addCard(formData); 
      setCards((prevCards) => [...prevCards, newCard]); 
      setAddCardOpen(false); 
    
    } catch (error) {
      alert("Error adding card:", error.message);
    }
  };

 
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await props.cards(); 
        if (Array.isArray(response)) {
          setCards(response); 
        } else {
          alert("Error: Response is not an array", response);
        }
      } catch (error) {
        alert("Error fetching cards:", error);
      }
    };
    
    fetchCards();
  }, [props.cards]); 

  return (
    <div className="h-screen w-screen flex flex-col">
      <Nav />
    
      <div className="flex justify-center">
        <div className="max-w-screen-xl w-full flex items-center justify-between p-4 pl-1 dark:text-white text-xl font-bold">
          <div className="flex items-center gap-2 cursor-pointer">
            <ChevronLeft size={30} onClick={props.handleBack} />
            <img src={folderIcon} alt="Folder" className="h-9" />
            <p className="flex flex-col">
              <span className="text-base font-semibold">{props.name}</span>
              <span className="text-xs font-thin text-gray-500 dark:text-gray-200">
                {cards.length < 2
                  ? `${cards.length} Card`
                  : `${cards.length} Cards`}
              </span>
            </p>
          </div>
          <div className="flex text-base items-center font-bold gap-2">
            <div
              className="relative group cursor-pointer transition-transform hover:scale-105 w-8"
              onClick={handleAddCard}
            >
              <img src={folderIcon} alt="Add Folder" className="h-8"/>
              <div className="absolute -bottom-1 -right-1 bg-red-400 text-base font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                +
              </div>
            </div>
            <p>Add Card</p>
          </div>
        </div>
      </div>

    
      <div className={`flex-1 overflow-y-auto flex justify-center`}>
        <div className="max-w-screen-xl w-full p-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 place-items-center pb-3">
            {cards.map((card, index) => {
              const randomColor = colors[index % colors.length];
              return (
                <FolderInsideCard
                  key={index}
                  color={randomColor}
                  title={card.title}
                  images={card.images}
                  handleCardEdit={props.handleCardEdit}
                  question={card.question}
                  answer={card.answer}
                  index={index}
                  handleOpenCard={props.handleOpenCard}
                />
              );
            })}
          </div>
        </div>
      </div>

    
      <div
        className={`${
          addCardOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } flex justify-center items-center fixed inset-0 bg-gray-700 bg-opacity-65 z-20 transition-opacity duration-500 ease-in-out`}
      >
        <div
          className={`${
            addCardOpen
              ? "scale-100 translate-y-0 translate-x-0"
              : "scale-50 -translate-x-full"
          } w-full transition-transform duration-500 ease-in-out flex justify-center items-center absolute`}
        >
          {props.loading1 ? (
            <Loading />
          ) : (
            <CardsCreate onClose={onClose} addCard={addCardHandler} />
          )}
        </div>
      </div>
    </div>
  );
}
