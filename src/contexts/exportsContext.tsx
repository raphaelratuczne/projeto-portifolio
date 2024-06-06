import { FirebaseProvider } from "./firebaseContext";
import { ProfileProvider } from "./profileContext";

const ExportsContexts = ({ children }: any) => {
  return (
    <FirebaseProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </FirebaseProvider>
  );
};

export { ExportsContexts };
