import { AuthProvider } from "./authContext";
import { FirebaseProvider } from "./firebaseContext";
import { ProfileProvider } from "./profileContext";

const ExportsContexts = ({ children }: any) => {
  return (
    <AuthProvider>
      <FirebaseProvider>
        <ProfileProvider>{children}</ProfileProvider>
      </FirebaseProvider>
    </AuthProvider>
  );
};

export { ExportsContexts };
