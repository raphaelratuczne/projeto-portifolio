// import { getDoc addDoc, collection,} from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useContext } from "react";
import { useFirebaseContext } from "./firebaseContext";

interface IProjectsContext {
  saveProject: (project: any) => Promise<void>;
}

const initialValue: IProjectsContext = {
  saveProject: () => Promise.resolve(),
};

const ProjectsContext = createContext(initialValue);

const ProjectsProvider = ({ children }: any) => {
  const { db } = useFirebaseContext();

  const saveProject = async (project: any) => {
    await setDoc(doc(db!, "portifolio", "projects", "123456teste"), project);
    // const docRef = await addDoc(collection(db!, "portifolio", "projects"), {
    //   ...project,
    // });
    // console.log("Document written with ID: ", docRef.id);
  };
  return (
    <ProjectsContext.Provider value={{ saveProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};

const useProjectsContext = () => {
  return useContext(ProjectsContext);
};

export { ProjectsProvider, useProjectsContext };
