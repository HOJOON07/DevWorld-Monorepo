import { useNavigate } from "react-router-dom";

const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();

  return <>{children}</>;
};
