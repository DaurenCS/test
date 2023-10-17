import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FoodList.css"; // Import the corresponding CSS file
import { useAuth } from "hooks/use-auth"
import { useCart } from "hooks/api_hooks";
function FoodList({ foodData }) {
  const { isAuth} = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const {handleAddItem} = useCart();

  const navigate = useNavigate()

  const filteredFoodData = foodData.filter((foodItem) => {
    return selectedCategory === "all" || foodItem.special_food_id.name === selectedCategory;
  });

  const categories = [...new Set(foodData.map((foodItem) => foodItem.special_food_id.name))];

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleAddToCart = (food_id) => {
    if (isAuth) {
      handleAddItem(food_id);
    }
    else {
      navigate("/login")
    }
  }

  return (
    <div className="food-list">
      <div className="category-filter">
        <label htmlFor="category">Choose a category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="food-items">
        {filteredFoodData.map((foodItem) => (
          <div className="food-card" key={foodItem.id}>
            <div onClick={() => {
              navigate("/foodlist/" + foodItem.id, {
                state: {
                  foodInfo: foodItem
                }
              })
            }}>
              <img
                src={foodItem.photo}
                alt={foodItem.name}
                className="food-image"
              />
              <div className="food-details">
                <h2 className="food-name">{foodItem.name}</h2>
                <p className="food-description">{foodItem.description}</p>
                <p className="food-price">{foodItem.price.toFixed(2)}₸</p>
              </div>
            </div>
            <button onClick={() => { handleAddToCart(foodItem.id) }}>add to cart</button>
          </div>


        ))}
      </div>
    </div>
  );
}

export default FoodList;
