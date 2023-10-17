import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {useNavigate } from "react-router-dom";
import { setUser, removeUser } from "store/slices/userSlice";
import { useDispatch } from "react-redux";
import axios from "api/axios";

const LOGIN_URL = "/token/";
const USER_INFO_URL = "/userinfo/";
const REGISTER_URL = "/register/"

export function useAuth() {
    const { name, surname, token, refresh, id } = useSelector(state => state.user);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = useCallback(
        (username, password) => {
            axios.post(
                LOGIN_URL,
                JSON.stringify({
                    "username": username,
                    "password": password
                }),
                {
                    headers: { "Content-Type": "application/json" }
                }
            ).then(({ data }) => {
                axios.get(USER_INFO_URL,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${data.access}`
                        }
                    }).then(({ data }) => {
                        dispatch(setUser({
                            token: data.tokens.access,
                            refresh: data.tokens.refresh,
                            name: data.first_name,
                            surname: data.last_name,
                            id: data.user_id,
                        }));
                    });
                navigate("/");
            }).catch(({ response }) => {
                setErrorMessage(response.data.message)
            });
        },
        [navigate, dispatch]
    );

    const handleLogout = useCallback(() => {
        dispatch(removeUser());
    }, [dispatch]);

    const handleRegistration = useCallback((formData) => {
        if (formData.password === formData.confirmPassword) {
            try {
                axios.post(
                    REGISTER_URL,
                    JSON.stringify({
                        "username": formData.username,
                        "password": formData.password,
                        "email": formData.email,
                        "first_name": formData.firstName,
                        "last_name": formData.lastName
                    }),
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                ).then(({ data }) => {
                    console.log(data)
                    dispatch(setUser({
                        token: data.tokens.access,
                        refresh: data.tokens.refresh,
                        name: data.first_name,
                        surname: data.last_name,
                    }));
                    navigate("/");
                }).catch((response) => {
                    console.log(response)
                    setErrorMessage(response.message)
                })
            } catch (err) {
                console.log(err)
            }
        } else {
              alert('Passwords do not match. Please try again.');
        }
    },
    [dispatch, navigate]);

    return {
        isAuth: !!token,
        name,
        surname,
        token,
        refresh,
        id,
        handleLogin,
        handleLogout,
        handleRegistration,
        errorMessage
    };
}