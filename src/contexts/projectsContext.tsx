// import { getDoc,setDoc} from "firebase/firestore";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { useFirebaseContext } from "./firebaseContext";

interface IProject {
  id: string;
  demo: string;
  description: string;
  github: string;
  title: string;
}

interface IProjectsContext {
  saveProject: (project: any) => Promise<void>;
  getListProjects: () => Promise<void>;
  projects: IProject[];
}

const initialValue: IProjectsContext = {
  saveProject: () => Promise.resolve(),
  getListProjects: () => Promise.resolve(),
  projects: [],
};

const ProjectsContext = createContext(initialValue);

const ProjectsProvider = ({ children }: any) => {
  const { db } = useFirebaseContext();
  const [projects, setProjects] = useState<IProject[]>([]);

  const saveProject = async (project: any) => {
    const docRef = await addDoc(collection(db!, "projects"), project);
    console.log("Document written with ID: ", docRef.id);
  };

  const getListProjects = async () => {
    const querySnapshot = await getDocs(collection(db!, "projects"));
    const listProjects: IProject[] = [];
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      listProjects.push({
        id: doc.id,
        demo: doc.data().demo,
        description: doc.data().description,
        github: doc.data().github,
        title: doc.data().title,
      });
      setProjects(listProjects);
    });
  };

  return (
    <ProjectsContext.Provider
      value={{ saveProject, getListProjects, projects }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

const useProjectsContext = () => {
  return useContext(ProjectsContext);
};

export { ProjectsProvider, useProjectsContext };
