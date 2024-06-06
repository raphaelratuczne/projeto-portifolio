import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { useFirebaseContext } from "./firebaseContext";

interface IExportsContext {
  greetings: string;
  iAm: string;
  name: string;
  loadValues: () => void;
}

const initialValue: IExportsContext = {
  greetings: "",
  iAm: "",
  name: "",
  loadValues: () => {},
};

const ProfileContext = createContext(initialValue);

const ProfileProvider = ({ children }: any) => {
  const { db } = useFirebaseContext();
  const [greetings, setGreetings] = useState("");
  const [iAm, setIAm] = useState("");
  const [name, setName] = useState("");

  const loadValues = async () => {
    if (db) {
      const docRef = doc(db!, "portifolio", "home");
      const docSnap = await getDoc(docRef);
      console.log("docSnap", docSnap.data());
      setGreetings(docSnap.data()!.greetings);
      setIAm(docSnap.data()!["i-am"]);
      setName(docSnap.data()!.name);
    }
  };

  return (
    <ProfileContext.Provider value={{ greetings, iAm, name, loadValues }}>
      {children}
    </ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  return useContext(ProfileContext);
};

export { ProfileContext, ProfileProvider, useProfileContext };
