import React, { useState } from 'react';
import InputField from '../partial components/InputField';
import Button from '../partial components/Button';
import { useDispatch } from '../hooks/hook';
import { signupUser } from '../slices/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: string;
}

const SignupPage: React.FC = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<FormData>({ firstName: '', lastName: '', email: '', password: '', mobileNumber: '' });

    const loading = useSelector((state: RootState) => state.auth.loading);
    const error = useSelector((state: RootState) => state.auth.error);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSignup = (): void => {
        dispatch(signupUser(formData));

    };

    return (
        <div className="w-1/3 bg-cyan-200">
            <h2>Signup</h2>
            <InputField
                type="text"
                name="firstName"
                placeholder="Enter your First Name"
                value={formData.firstName}
                onChange={handleChange}
                className=""
            />
            <InputField
                type="lastName"
                name="text"
                placeholder="Enter your last Name"
                value={formData.lastName}
                onChange={handleChange}
                className=""
            />
            <InputField
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className=""
            />
            <InputField
                type="number"
                name="mobileNumber"
                placeholder="Enter your mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}
                className=""
            />
            <InputField
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className=""
            />
            <Button
                onClick={handleSignup}
                label="Signup"
                className=""
            />
        </div>
    );
};

export default SignupPage;
