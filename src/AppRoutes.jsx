import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import ConfirmationPage from "./components/ConfirmationPage";

function AppRoutes() {
  const [orderModal, setOrderModal] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={<Main orderModal={orderModal} setOrderModal={setOrderModal} />}
      />
      <Route path="/order-confirmation/:id" element={<ConfirmationPage />} />
    </Routes>
  );
}

export default AppRoutes;
