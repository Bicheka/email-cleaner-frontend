import { useEffect, useState } from "react";
import axios from "axios";
import '../css/Form.css';

// Loading icon
import Loading from "./Loading";

// success icon
import sucessIcon from "../assets/success.svg";

// error icon
import errorIcon from "../assets/error.svg";

const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmittingForm, setIsSubmittingForm] = useState(true); // Change this to true
    const [formSubmissionStatus, setFormSubmissionStatus] = useState(null); // Added form submission status
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(""); // Added error state


    const handleRegister = async (e) => {

        e.preventDefault();

        setIsSubmittingForm(false); // Set isSubmittingForm to true when the form is submitted

        try {
            const response = await axios.post(`https://email-cleaner.onrender.com/register`, {
                    email: email,
                    password: password,
                });
            console.log(response);
            setResponse(response);
            setMessage(response.data.message);
            setFormSubmissionStatus("success"); // Set form submission status to success
        } catch (error) {

            console.log(error);
            setError(error.response.data.detail);

            setResponse(error);

            setFormSubmissionStatus("error"); // Set form submission status to error

        } finally {
            setIsSubmittingForm(false); // Set isSubmittingForm to false after the response is received
        }
    }

    const handleUnregister = async (e) => {

        e.preventDefault();

        setIsSubmittingForm(false); // Set isSubmittingForm to true when the form is submitted

        try {
            const response = await axios.delete("https://email-cleaner.onrender.com/unregister", {
                data: {
                    email: email,
                    password: password,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
            setResponse(response);
            setMessage(response.data.message);
            setFormSubmissionStatus("success"); // Set form submission status to success
        } catch (error) {

            console.log(error);
            setError(error.response.data.detail);

            setResponse(error);

            setFormSubmissionStatus("error"); // Set form submission status to error

        } finally {
            setIsSubmittingForm(false); // Set isSubmittingForm to false after the response is received
        }
    }

    const handleReset = () => {
        setEmail("");
        setPassword("");
        setIsSubmittingForm(true);
        setFormSubmissionStatus(null);
        setMessage("");
        setError("");
        setResponse(null);
        setLoading(true);
        
    }

    useEffect(() => {
        if (response) {
            setLoading(false);
        }
    }, [response]);

    return (
        <div className="form-container">
            {isSubmittingForm ? (
                <form>
                    <div className="category">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="category">
                        <label>App Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="buttons">
                        <button className="register" onClick={handleRegister}>Register</button>
                        <button className="unregister" onClick={handleUnregister}>Unregister</button>
                    </div>
                    
                </form>
            ) : (
                loading ? (
                    <Loading />
                ) : (
                    <div className="success-message">
                    {formSubmissionStatus === "success" ? (
                        // Render the Loading component within this block
                        <div>
                            <h2>Success!</h2>
                            <img className="success-icon" src={sucessIcon} alt="Success" />
                            <p>{message}</p>
                            
                            <button className="try-again-button" onClick={() => handleReset()}>Register More</button>
                        </div>
            
                    ) : formSubmissionStatus === "error" ? (
                        <div className="error-message">
                            <h2>Error!</h2>
                            <img className="error-icon" src={errorIcon} alt="Error" />
                            <p>{error} Please try again</p>
                            <button className="try-again-button" onClick={() => handleReset()}>Try Again</button>
                        </div>
                    ) : null}
                </div>
                )
            )}
        </div>
    );
}

export default Form;
