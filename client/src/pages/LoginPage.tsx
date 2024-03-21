import React, { useState } from 'react';
import InputField from '../partial components/InputField';
import Button from '../partial components/Button';
import { useDispatch } from '../hooks/hook';
import { loginUser } from '../slices/loginSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface FormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });

    const loading = useSelector((state: RootState) => state.auth.loading);
    const error = useSelector((state: RootState) => state.auth.error);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleLogin = (): void => {
        dispatch(loginUser(formData));

    };

    return (
        <div className="w-1/3 bg-cyan-200">
            <h2>Login</h2>
            <InputField
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
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
                onClick={handleLogin}
                label="Login"
                className=""
            />
        </div>
    );
};

export default LoginPage;
