import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { useFirebaseContext } from "./firebaseContext";

interface IExportsContext {
  greetings: string;
  iAm: string;
  name: string;
  jobs: string;
  saving: boolean;
  loadValues: () => Promise<void>;
  saveValues: (data: IDataPortifolio) => Promise<void>;
}

interface IDataPortifolio {
  greetings: string;
  iAm: string;
  name: string;
  jobs: string;
}

const initialValue: IExportsContext = {
  greetings: "",
  iAm: "",
  name: "",
  jobs: "",
  saving: false,
  loadValues: () => Promise.resolve(),
  saveValues: () => Promise.resolve(),
};

const ProfileContext = createContext(initialValue);

const ProfileProvider = ({ children }: any) => {
  const { db } = useFirebaseContext();
  const [greetings, setGreetings] = useState("");
  const [iAm, setIAm] = useState("");
  const [name, setName] = useState("");
  const [jobs, setJobs] = useState("");
  const [saving, setSaving] = useState(false);

  const loadValues = async () => {
    if (db) {
      const docRef = doc(db!, "portifolio", "home");
      const docSnap = await getDoc(docRef);
      // console.log("docSnap", docSnap.data());
      setGreetings(docSnap.data()!.greetings);
      setIAm(docSnap.data()!["i-am"]);
      setName(docSnap.data()!.name);
      const textJobs = (docSnap.data()!.jobs as Array<string>).join("\n");
      setJobs(textJobs);
    }
  };

  const saveValues = async (data: IDataPortifolio) => {
    if (!saving) {
      setSaving(true);
      await setDoc(doc(db!, "portifolio", "home"), {
        greetings: data.greetings,
        "i-am": data.iAm,
        name: data.name,
        jobs: data.jobs.split("\n"),
      });
      setSaving(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ greetings, iAm, name, jobs, loadValues, saveValues, saving }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  return useContext(ProfileContext);
};

export { ProfileContext, ProfileProvider, useProfileContext };
