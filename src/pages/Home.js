import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { removeUser, logout, userIsSigned } from "../helpers/auth";

const HomePage = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRemoveUser = async () => {
      try {
          const user = userIsSigned();
          await removeUser();
          setSuccess(`User ${user.email} is removed from database!`)
      }
      catch (e) {
          await logout();
          setError(e.message);
      }
    };

    return (
        <div className="home">
            <Header />
            <section>
                <div className="jumbotron jumbotron-fluid py-5">
                    <div className="container text-center py-5">
                        <h1 className="display-4">Chat</h1>
                        <p className="lead">Application for test</p>
                        <div className="mt-4">
                            <Link className="btn btn-primary px-5 mr-3" to="/signup">Create New Account</Link>
                            <Link className="btn px-5" to="/login">Login to Your Account</Link>
                        </div>
                        <div>
                            <button type="button" className="btn btn-danger px-4 mt-3" onClick={handleRemoveUser}>Remove user</button>
                        </div>
                        {error && <p className="text-danger px-4 mt-3">{error}</p>}
                        {success && <p className="text-success px-4 mt-3">{success}</p>}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
};

export default HomePage;
