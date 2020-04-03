import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';


const HomePage = () => (
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
                </div>
            </div>
        </section>
        <Footer />
    </div>
);

export default HomePage;
