import { useState, useEffect, useCallback } from "react";
import axios from "api/axios";
import { useAuth } from "hooks/use-auth"
import { useDispatch } from "react-redux";
import { removeUser } from "store/slices/userSlice";

const ORDER_URL = "orders/create-or-get/"
const FOODLIST_URL = "/core/foodlist/";
const BEVLIST_URL = "/core/bevlist/";

export const useGetFoodList = () => {
    const [foodList, setFoodList] = useState([]);
    useEffect(() => {
        try {
            axios.get(
                FOODLIST_URL,
                {
                    headers: { "Content-Type": "application/json" }
                }
            ).then(({ data }) => {
                setFoodList(data)
            }).catch(({ response }) => {

            });
        } catch (err) {
            console.log(err)
        }
    }, []);
    return foodList;
}

export const useGetBevList = () => {
    const [bevList, setBevList] = useState([]);
    useEffect(() => {
        try {
            axios.get(
                BEVLIST_URL,
                {
                    headers: { "Content-Type": "application/json" }
                }
            ).then(({ data }) => {
                setBevList(data)
            }).catch(({ response }) => {
                // setErrorMessage(response.data.message) 
            });
        } catch (err) {
            console.log(err)
        }
    }, []);
    return bevList;
}

export const useGetCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => { setCategories([]) }, []);
    return categories;
}

export function useCart() {
    const { token } = useAuth();
    const [order, setOrder] = useState(null);

    const dispatch = useDispatch();

    useEffect(
        () => {
            axios.post(
                ORDER_URL,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            ).then(({ data }) => {
                console.log(data)
                axios.get(`orders/${data.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }).then(({ data }) => {
                    console.log(data)
                    setOrder(data)
                }
                )
            }).catch(err => {
                console.log(err)
                dispatch(removeUser())
            })
        }, [token, dispatch]);

    const handleRefreshOrder = useCallback(() => {
        axios.get(`orders/${order.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(({ data }) => {
            console.log(data)
            setOrder(data)
        }
        )
    }, [order, token]);

    const handleAddItem = useCallback(
        (food_id) => {
            axios.post(
                ORDER_URL,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            ).then(({ data }) => {
                axios.post(`orders/${data.id}/add_item/`,
                    { "id": food_id },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }).then(({ data }) => {
                        console.log(data)
                        alert("Your Item Added")
                    }
                    )
            }).catch(err => {
                console.log(err)
                dispatch(removeUser())
            })
        }
        , [token, dispatch]);

    const handleRemoveItem = useCallback((itemId) => {
        axios.post(`orders/${order.id}/remove_item/`,
            { "id": itemId },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(({ data }) => {
                console.log(data)
                alert("Your Item Has Been Removed")
                handleRefreshOrder();
            }
            )
    }, [order, token, handleRefreshOrder]);

    return { order, handleAddItem, handleRemoveItem }
}
