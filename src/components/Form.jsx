import { useState } from "react";
import '../css/Form.css';
const Form = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmittingForm, setIsSubmittingForm] = useState(true);
    const [repeat, setRepeat] = useState(false);

    const handleCheckBoxChange = () =>{
        setRepeat(!repeat);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        setIsSubmittingForm(false);
    }
    
    return (
       <div className="form-container">
            {isSubmittingForm ? 
                <form className="" onSubmit={handleSubmit} >
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div> 
                    <div className="category">
                        <input 
                            className="repeat-checkbox"
                            type="checkbox"
                            value={repeat}
                            onChange={handleCheckBoxChange}
                        />
                        <label>Repeat</label>
                        {
                            repeat && 
                            <select>
                                <option value="">Select frequence</option>
                                <option value="Daily">Dayly</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        }
                    </div>

                    <button type="submit" >Submit</button>
                </form>
            :
                <div className="success-message">
                    <p>Form submitted successfully!</p>
                </div>
        }
       </div>
    );
}

export default Form;