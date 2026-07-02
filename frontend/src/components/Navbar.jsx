import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/"
                >
                    TurismoRD
                </Link>

                <div className="navbar-nav ms-auto">

                    <a
                        className="nav-link"
                        href="#excursiones"
                    >
                        Excursiones
                    </a>

                    <a
                        className="nav-link"
                        href="#contacto"
                    >
                        Contacto
                    </a>

                    <Link
                        className="nav-link"
                        to="/login"
                    >
                        Login Admin
                    </Link>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;