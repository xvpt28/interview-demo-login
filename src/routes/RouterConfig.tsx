import { Navigate, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import("../pages/Login"));
const NotesPage = lazy(() => import("../pages/NotesPage"));

const RouterConfig = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Navigate to="/notes" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;
