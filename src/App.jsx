import { useState, useEffect, createContext } from "react";
import "./App.css";
import Login from "./components/Login";
import { motion, AnimatePresence } from "framer-motion";
import {ChevronRight, ChevronLeft } from "lucide-react";
import Logo from "./components/Logo";
import Folders from "./components/Folders";
import EditDeck from "./components/EditDeck";
import FolderOpen from "./components/FolderOpen";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import axios from "axios";
import EditCard from "./components/EditCard";
import FlipCard from "./components/FlipCard";
import Loading from "./components/Loading";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// Firebase Initialization
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const BoxInfo = createContext({
  userName: "",
  userEmail: "",
  handleLogout: () => {},
});

function App() {
  const [authSuccess, setAuthSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [folders, setFolders] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editImage, setEditImage] = useState(null);
  const [EditfolderName, setEditfolderName] = useState("");
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [images, setImages] = useState([]);
  const [folderIndex, setFolderIndex] = useState("");
  const [folderName, setFolderName] = useState("");
  const [cardEditOpen, setCardEditOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState("");
  const [loading1, setloading1] = useState(false);
  const [cards, setCards] = useState([]);


  
  const handleAuth = async (username, email, password, isLoginMode) => {
    try {
      let user, userDocRef;

      if (isLoginMode) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        user = userCredential.user;
        setLoading(true);
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        user = userCredential.user;
        setLoading(true);
       
        userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          username,
          email,
          folders: [
            {
              name: "Demo Deck",
              cards: [],
            },
          ],
          createdAt: new Date().toISOString(),
        });
        setUserName(username);
        setUserEmail(email);
      }
      userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserName(userData.username || "");
        setUserEmail(userData.email || "");
        setFolders(userData.folders || []);
      }
      setTimeout(() => {
        setAuthSuccess(true);
        setLoading(false);
      }, 2600);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };


  const handleLogout = async () => {
    try {
      setAuthSuccess(false);
      setFolders([]);
      await signOut(auth);
      setUserName("");
      setUserEmail("");
    } catch (error) {
      alert("An error occurred while logging out. Please try again.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.username || "");
          setUserEmail(userData.email || "");
          setFolders(userData.folders || []);
        }
        setTimeout(() => {
          setAuthSuccess(true);
          setLoading(false);
        }, 2000);
      } else {
        setUserName("");
        setUserEmail("");
        setFolders([]);
        setAuthSuccess(false);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    });
    return () => unsubscribe(); 
  }, []);

  const addDeck = async (folderName, coverImage) => {
    const user = auth.currentUser;

    if (!user) {
      alert("No user is logged in.");
      return;
    }

    try {
      setloading1(true);
      let imageUrl = null;

      if (coverImage) {
        const formData = new FormData();
        formData.append("file", coverImage);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        const cloudinaryResponse = await axios.post(CLOUDINARY_URL, formData);
        imageUrl = cloudinaryResponse.data.secure_url;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      const userData = userDoc.data();
      const updatedFolders = [
        ...(userData.folders || []),
        {
          name: folderName,
          coverImage: imageUrl,
          cards: [],
          createdAt: new Date().toISOString(),
        },
      ];

      setFolders(updatedFolders); 
      await updateDoc(userDocRef, { folders: updatedFolders }); 
      setloading1(false);
    } catch (error) {
      alert("Error adding folder:", error.message);
    }
  };


  const handleFolderEdit = async (index, action, imageUrl, folderName) => {
    const user = auth.currentUser;

    if (!user) {
      alert("No user is logged in.");
      return;
    }

    try {
      setEditImage(imageUrl);
      setEditfolderName(folderName);

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      const userData = userDoc.data();
      const updatedFolders = [...(userData.folders || [])];

      if (action === "delete") {
        updatedFolders.splice(index, 1);
      } else if (action === "edit") {
        setEditOpen(true);
        return; 
      }

      setFolders(updatedFolders); 
      await updateDoc(userDocRef, { folders: updatedFolders }); 
    } catch (error) {
      alert("Error updating folder:", error.message);
    }
  };


  const editDeck = async (folderName, coverImage) => {
    const user = auth.currentUser;

    if (!user) {
      alert("No user is logged in.");
      return;
    }

    try {
      setloading1(true);
      let imageUrl = editImage;

      if (coverImage) {
        const formData = new FormData();
        formData.append("file", coverImage);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        const cloudinaryResponse = await axios.post(CLOUDINARY_URL, formData);
        imageUrl = cloudinaryResponse.data.secure_url;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      const updatedFolders = [...(userDoc.data().folders || [])];
      const index = updatedFolders.findIndex(
        (folder) => folder.name === EditfolderName
      );
      if (index !== -1) {
        updatedFolders[index] = {
          ...updatedFolders[index],
          name: folderName,
          coverImage: imageUrl,
        };
      }

      setFolders(updatedFolders); 
      await updateDoc(userDocRef, { folders: updatedFolders }); 
      setEditOpen(false);
      setloading1(false);
    } catch (error) {
      alert("Error updating folder:", error.message);
    }
  };



 

  const addCard = async (formData) => {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    try {
      setloading1(true);
      const { title, question, answer, images } = formData;

     
      if (!title || !question || !answer) {
        throw new Error("Title, question, and answer are required.");
      }

      let imageUrls = [];
      if (images.length > 0) {
       
        const imageUploadPromises = images.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

          const response = await axios.post(CLOUDINARY_URL, formData);
          return response.data.secure_url; 
        });

        imageUrls = await Promise.all(imageUploadPromises); 
      }

     
      const newCard = {
        title,
        question,
        answer,
        images: imageUrls,
        createdAt: new Date().toISOString(),
      };

      
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist in Firestore.");
      }

      const userData = userDoc.data();
      const updatedFolders = [...(userData.folders || [])];

    
      if (folderIndex < 0 || folderIndex >= updatedFolders.length) {
        throw new Error("Invalid folder index.");
      }


      const folder = updatedFolders[folderIndex];
      folder.cards = [...(folder.cards || []), newCard];
      updatedFolders[folderIndex] = folder;

     
      await updateDoc(userDocRef, { folders: updatedFolders });
      setFolders(updatedFolders);
      setCards(folder.cards);
      setloading1(false);
      return newCard;
    } catch (error) {
      alert("Error adding card:", error.message);
      setloading1(false);
      throw error;
    }
  };

  const handleCardEdit = async (
    cardIndex,
    action,
    title,
    question,
    answer,
    images
  ) => {
    try {
      const user = auth.currentUser;

      if (!user) {
        alert("No user is logged in.");
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

    
      const userData = userDoc.data();
      if (!userData?.folders || !Array.isArray(userData.folders)) {
        alert("No folders found for the user.");
        return;
      }

     
      const updatedFolders = [...userData.folders];

     
      const folder = updatedFolders[folderIndex];
      if (!folder || !Array.isArray(folder.cards)) {
        alert("Invalid folder or no cards found.");
        return;
      }

    
      if (action === "delete") {
        setCardIndex(cardIndex);
        folder.cards.splice(cardIndex, 1);

        setFolders(updatedFolders);
        setCards(folder.cards);
      } else if (action === "edit") {
        setCardIndex(cardIndex);
        setCardEditOpen(true);
        setTitle(title);
        setQuestion(question);
        setAnswer(answer);
        setImages(images);
        return;
      }
      await updateDoc(userDocRef, { folders: updatedFolders });
    } catch (error) {
      alert("Error updating card:", error.message);
    }
  };
  const editCard = async (updatedCardData) => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    try {
      setloading1(true);
      const { title, question, answer, images } = updatedCardData; // Destructure updated data

    
      if (!title || !question || !answer) {
        alert("Title, question, and answer are required.");
        return;
      }

      let imageUrls = []; 

    
      if (images && images.length > 0) {
        const imageUploadPromises = images.map(async (image) => {
          if (image instanceof File) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

            const response = await axios.post(CLOUDINARY_URL, formData);
            return response.data.secure_url; 
          } else {
            return image; 
          }
        });

        imageUrls = await Promise.all(imageUploadPromises); 
      }
 
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        throw new Error("User document does not exist in Firestore.");
      }

      const userData = userDoc.data();
      const updatedFolders = [...(userData.folders || [])];

     
      if (folderIndex < 0 || folderIndex >= updatedFolders.length) {
        throw new Error("Invalid folder index.");
      }

      
      const folder = updatedFolders[folderIndex];
      if (
        !folder ||
        !folder.cards ||
        cardIndex < 0 ||
        cardIndex >= folder.cards.length
      ) {
        throw new Error("Invalid card index.");
      }

     
      const updatedCard = {
        ...folder.cards[cardIndex],
        title,
        question,
        answer,
        images: imageUrls, 
        updatedAt: new Date().toISOString(), 
      };

      folder.cards[cardIndex] = updatedCard; 

     
      await updateDoc(userDocRef, { folders: updatedFolders });

     
      setFolders(updatedFolders); 
      setCards(folder.cards); 
      setloading1(false);
    } catch (error) {
      alert("Error updating card:", error.message);
    }
  };

  const contextValue = {
    userName,
    userEmail,
    handleLogout,
  };
  const [isCardOpen, setCardOpen] = useState(false);

  const handleOpenCard = (title, question, answer, images,index) => {
    setTitle(title), setQuestion(question);
    setAnswer(answer);
    setImages(images);
    setCardOpen(true);
    setCurrentIndex(index);
  };

  const navigate = useNavigate();

  const openFolder = (cards, folderName, index) => {
    setCards(cards);
    setFolderName(folderName);
    setFolderIndex(index);
    setFolderOpen(true);
    navigate("/folder");
  };

  const goBackToFolders = () => {
    handleBack();
    navigate("/");
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const onClose = () => {
    setEditOpen(false);
    setCardEditOpen(false);
    setCardOpen(false);
  };
  return (
    <BoxInfo.Provider value={contextValue}>
      <div className="relative overflow-hidden h-screen w-screen">
        {loading && (
          <div className="absolute h-screen w-screen flex items-center justify-center">
            <Logo />
          </div>
        )}

        {!loading && !authSuccess && (
          <div className="absolute h-screen w-screen flex flex-col items-center justify-evenly bg-transparent">
            <Login handleAuth={handleAuth} />
          </div>
        )}

        {!loading && authSuccess && (
          <Routes>
            <Route
              path="/"
              element={
                <div className="absolute h-screen w-screen flex flex-col justify-evenly">
                  <Folders
                    addDeck={addDeck}
                    folders={() => folders}
                    handleFolderEdit={handleFolderEdit}
                    handleOpenFolder={openFolder}
                    loading1={loading1}
                  />
                </div>
              }
            />
            <Route
              path="/folder"
              element={
                <div className="absolute h-screen w-screen flex flex-col justify-evenly">
                  <FolderOpen
                    cards={() => cards}
                    handleBack={goBackToFolders}
                    addCard={addCard}
                    editCard={editCard}
                    handleCardEdit={handleCardEdit}
                    handleOpenCard={handleOpenCard}
                    name={folderName}
                    loading1={loading1}
                  />
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
        <div
          className={`${
            editOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } flex justify-center items-center fixed inset-0 bg-gray-700 bg-opacity-65 z-50 transition-opacity duration-500 ease-in-out`}
        >
          <div
            className={`${
              editOpen
                ? "scale-100 translate-y-0 translate-x-0"
                : "scale-50 -translate-x-full"
            } w-full max-w-md transition-transform duration-700 ease-in-out flex justify-center items-center absolute`}
          >
            {loading1 ? (
              <Loading />
            ) : (
              <EditDeck
                onClose={onClose}
                EditfolderName={EditfolderName}
                editImage={editImage}
                editDeck={editDeck}
              />
            )}
          </div>
        </div>
        <div
          className={`${
            cardEditOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } flex justify-center items-center fixed inset-0 bg-gray-700 bg-opacity-65 z-50 transition-opacity duration-500 ease-in-out`}
        >
          <div
            className={`${
              cardEditOpen
                ? "scale-100 translate-y-0 translate-x-0"
                : "scale-50 -translate-x-full"
            } w-full max-w-md transition-transform duration-700 ease-in-out flex justify-center items-center absolute`}
          >
            {loading1 ? (
              <Loading />
            ) : (
              <EditCard
                onClose={onClose}
                title={title}
                question={question}
                answer={answer}
                images={images}
                editCard={editCard}
              />
            )}
          </div>
        </div>
        <div
          className={`${
            isCardOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } flex justify-center items-center fixed inset-0 bg-gray-700 bg-opacity-65 z-50 transition-opacity duration-500 ease-in-out`}
        >
          <div
            className={`${
              isCardOpen
                ? "scale-100 translate-y-0 translate-x-0"
                : "scale-50 -translate-x-full"
            } w-full max-w-2xl transition-transform duration-700 ease-in-out flex justify-center items-center relative`}
          >
          
            <button
              className="absolute left-0 px-2 py-2 dark:bg-gray-700 bg-opacity-90 bg-gray-400 dark:text-white text-black rounded-full z-10 disabled:opacity-0"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>

          
            <AnimatePresence mode="wait">
              {cards.length > 0 && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.3 }}
                >
                  <FlipCard
                    onClose={onClose}
                    question={cards[currentIndex].question}
                    answer={cards[currentIndex].answer}
                    images={cards[currentIndex].images}
                  />
                </motion.div>
              )}
            </AnimatePresence>

           
            <button
              className="absolute right-0 px-2 py-2 dark:bg-gray-700 bg-opacity-90 bg-gray-400 dark:text-white text-black rounded-full z-10 disabled:opacity-0"
              onClick={handleNext}
              disabled={currentIndex === cards.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </BoxInfo.Provider>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
