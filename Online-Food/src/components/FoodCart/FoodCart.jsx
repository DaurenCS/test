import React from "react";
import { useAuth } from "hooks/use-auth"
import { Navigate } from "react-router-dom";
import './FoodCart.css'; // Import your CSS file
import { useCart } from "hooks/api_hooks";

function FoodCart() {
    const { isAuth} = useAuth();

    const {order, handleRemoveItem} = useCart();

    return isAuth ? (
        (!order || order.order_items.length === 0) ?
            (<div className="cart-list empty-cart-message">Your cart is empty</div>)
            :
            (
                <div className="cart-list">
                    <h2>Your Cart</h2>
                    <ul>
                        {order.order_items.map((item, index) => (
                            <li key={index} className="cart-item">
                                <img src={item.photo} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                                    <button
                                        className="remove-button"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <p>Total Price: ${order.counted_price.toFixed(2)}</p>
                    </div>
                </div>

            )) :
        (
            <Navigate to="/login" />
        )
}

export default FoodCart