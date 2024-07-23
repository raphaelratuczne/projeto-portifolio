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
  image: string;
}

interface IProjectsContext {
  saveProject: (project: any, image: File) => Promise<void>;
  updateProject: (id: string, project: any, image: File) => Promise<void>;
  getListProjects: () => Promise<void>;
  projects: IProject[];
  getFullPathImage: (imagePath: string) => string;
}

const initialValue: IProjectsContext = {
  saveProject: () => Promise.resolve(),
  updateProject: () => Promise.resolve(),
  getListProjects: () => Promise.resolve(),
  projects: [],
  getFullPathImage: () => "",
};

const ProjectsContext = createContext(initialValue);

const ProjectsProvider = ({ children }: any) => {
  const { db, storage } = useFirebaseContext();
  const [projects, setProjects] = useState<IProject[]>([]);

  const saveProject = async (project: IProject, image: File) => {
    console.log("project", project);
    const docRef = await addDoc(collection(db!, "projects"), project);
    console.log("Document written with ID: ", docRef.id);
    if (image) {
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
    }
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
        image: doc.data().image,
      });
      setProjects(listProjects);
    });
  };

  const getFullPathImage = (imagePath: string) => {
    if (imagePath) {
      const _imagePath = imagePath.replace("/", "%2F");
      return `https://firebasestorage.googleapis.com/v0/b/projeto-portifolio-b3cc3.appspot.com/o/${_imagePath}?alt=media`;
    }
    return imagePath;
  };

  return (
    <ProjectsContext.Provider
      value={{
        saveProject,
        updateProject,
        getListProjects,
        projects,
        getFullPathImage,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

const useProjectsContext = () => {
  return useContext(ProjectsContext);
};

export { ProjectsProvider, useProjectsContext };
