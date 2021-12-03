import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const RedirectToLogin = () => {
  const IVAOTOKEN = new URLSearchParams(window.location.search).get(
    "IVAOTOKEN"
  );

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!IVAOTOKEN) {
      const ivaoLoginUrl = "https://login.ivao.aero/index.php?url={url}";
      const baseUrl = window.location.href;
      window.location.href = ivaoLoginUrl.replace(
        "{url}",
        `${baseUrl}?redirect=${window.location.pathname}`
      );
      return;
    }

    const redirect = new URLSearchParams(window.location.search).get(
      "redirect"
    );

    signIn(IVAOTOKEN).then(() => {
      navigate(redirect || "");
    });
  }, [IVAOTOKEN, signIn, navigate]);

  return <></>;
};

export const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<RedirectToLogin />} />
      </Routes>
    </BrowserRouter>
  );
};