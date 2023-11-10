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


    const sendRequest= async (address) => {

        setIsSubmittingForm(false); // Set isSubmittingForm to true when the form is submitted

        try {
            const response = await axios.post(`https://email-cleaner.onrender.com/${address}`, {
                email: email,
                password: password,
            });
            console.log(response);
            setResponse(response);
            setMessage(response.data.message);
            setFormSubmissionStatus("success"); // Set form submission status to success
        } catch (error) {
            
            setResponse(error);

            // Set error message based on the status code
            if (error.response.status === 401) {
                setError("Invalid credentials.");
            }
            else if (error.response.status === 422) {
                setError("Invalid email address.");
            }
            else if (error.response.status === 500) {
                setError("An internal server error occurred.");
            }
            else {
                setError("An error occurred.");
            }
            setFormSubmissionStatus("error"); // Set form submission status to error

        } finally {
            setIsSubmittingForm(false); // Set isSubmittingForm to false after the response is received
        }
    }



    const handleRegister = async (e) => {

        e.preventDefault();

        sendRequest("register");
        
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
                        <button onClick={handleRegister}>Register</button>
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
