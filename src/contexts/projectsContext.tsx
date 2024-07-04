import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { createContext, useContext, useState } from "react";
import { useFirebaseContext } from "./firebaseContext";

export interface IProject {
  id?: string;
  demo: string;
  description: string;
  github: string;
  title: string;
}

interface IProjectsContext {
  saveProject: (project: any, image: File) => Promise<void>;
  updateProject: (id: string, project: any, image: File) => Promise<void>;
  getListProjects: () => Promise<void>;
  projects: IProject[];
}

const initialValue: IProjectsContext = {
  saveProject: () => Promise.resolve(),
  updateProject: () => Promise.resolve(),
  getListProjects: () => Promise.resolve(),
  projects: [],
};

const ProjectsContext = createContext(initialValue);

const ProjectsProvider = ({ children }: any) => {
  const { db, storage } = useFirebaseContext();
  const [projects, setProjects] = useState<IProject[]>([]);

  const saveProject = async (project: IProject, image: File) => {
    const docRef = await addDoc(collection(db!, "projects"), project);
    console.log("Document written with ID: ", docRef.id);
    const ext = image.name.split(".").pop();
    const imgName = `projects/${docRef.id}.${ext}`;
    const imageRef = ref(storage!, imgName);
    await uploadBytes(imageRef, image);
    // atualiza o doc com o nome da imagem que subiu
    await setDoc(
      doc(db!, "projects", docRef.id),
      { image: imgName },
      { merge: true }
    );
  };

  const updateProject = async (id: string, project: IProject, image: File) => {
    await setDoc(doc(db!, "projects", id), project, { merge: true });
    if (image) {
      const docRef = await getDoc(doc(db!, "projects", id));
      if (docRef.data()!.image) {
        const oldImage = ref(storage!, docRef.data()!.image);
        await deleteObject(oldImage);
      }
      const ext = image.name.split(".").pop();
      const imgName = `projects/${docRef.id}.${ext}`;
      const imageRef = ref(storage!, imgName);
      await uploadBytes(imageRef, image);
      await setDoc(
        doc(db!, "projects", docRef.id),
        { image: imgName },
        { merge: true }
      );
    }
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
      value={{ saveProject, updateProject, getListProjects, projects }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

const useProjectsContext = () => {
  return useContext(ProjectsContext);
};

export { ProjectsProvider, useProjectsContext };
