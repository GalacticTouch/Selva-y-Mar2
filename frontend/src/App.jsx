import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import DetalleExcursion from "./pages/DetalleExcursion";
import Reserva from "./pages/Reserva";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";
import AdminExcursiones from "./pages/AdminExcursiones";
import AdminReservas from "./pages/AdminReservas";
import AdminFotos from "./pages/AdminFotos";



function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Home />} />

                <Route
                    path="/excursion/:id"
                    element={<DetalleExcursion />}
                />

                <Route
                    path="/reserva/:id"
                    element={<Reserva />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
    path="/admin/fotos"
    element={
        <ProtectedRoute>
            <AdminFotos />
        </ProtectedRoute>
    }
/>
                <Route
    path="/admin"
    element={
        <ProtectedRoute>
            <AdminPage />
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/excursiones"
    element={
        <ProtectedRoute>
            <AdminExcursiones />
        </ProtectedRoute>
    }
/>

<Route
    path="/admin/reservas"
    element={
        <ProtectedRoute>
            <AdminReservas />
        </ProtectedRoute>
    }
/>

            </Routes>

        </BrowserRouter>

    );
}

export default App;