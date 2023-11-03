import { useState } from "react";
import '../css/Form.css';
const Form = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    
    return (
        <form>
            <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="app password"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            {/* select frequency */}
            <select>
                <option value="none">Select frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;