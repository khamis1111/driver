import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomeLoader from "./components/PageLoader/HomeLoader/HomeLoader";

const AddCustomers = lazy(() => import("./pages/Customers/AddCustomers"))

const App = () => {
  return (
    <div className="p-3">
      <BrowserRouter>
        <div className="pages">
          <Suspense fallback={<div className='page-loader'>
            <HomeLoader />
          </div>}>
            <Routes>
              <Route path="/" element={<AddCustomers />} />
            </Routes>
          </Suspense>
        </div>
        <ToastContainer
          position="bottom-right"
          theme="colored"
        />
      </BrowserRouter>
    </div>
  )
}

export default App