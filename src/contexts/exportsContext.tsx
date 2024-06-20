import { AuthProvider } from "./authContext";
import { FirebaseProvider } from "./firebaseContext";
import { ProfileProvider } from "./profileContext";
import { ProjectsProvider } from "./projectsContext";

const ExportsContexts = ({ children }: any) => {
  return (
    <AuthProvider>
      <FirebaseProvider>
        <ProfileProvider>
          <ProjectsProvider>{children}</ProjectsProvider>
        </ProfileProvider>
      </FirebaseProvider>
    </AuthProvider>
  );
};

export { ExportsContexts };
