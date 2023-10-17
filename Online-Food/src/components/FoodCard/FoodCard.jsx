import React, { useState, useEffect } from "react";
import "./FoodCard.css"; // Import the corresponding CSS file 
import { useLocation} from "react-router-dom";
import { InputNumber, Checkbox } from 'antd';
import { useGetBevList } from "hooks/api_hooks";

function FoodCard() {

  const { state } = useLocation()
  const food = state.foodInfo

  const [price, setPrice] = useState(food.price);
  const [flag, setFlag] = useState(true)


  const foodlist = useGetBevList();



  return (
    <div className="food">
      <div className="c1">
        <div className="description">
          <h3>{food.name}</h3>
          <img src={food.photo} alt={food.name} />
          <h3>{food.description}</h3>
          
          </div>
        <div>
      {foodlist.map((food)=>(
        <div className="options">
        <Checkbox onChange={() => {
            const change = flag ? food.price : -food.price;
            setPrice(price + change);
            setFlag(!flag)
        }}>
          {food.name}
        </Checkbox>
        </div>
      ))}
        </div> 
      </div>
        <hr/>
      <div className="Price"> 
        <div>  
          <p>Quantity: <InputNumber min={1} defaultValue={1} 
          onChange={(value) => { 
          // setCurrentValue(value) ;
          setPrice(food.price* value)
          }} /> &nbsp; &nbsp; Price: {price} Tg</p>
        </div>
        <div className="button">
          <button>Add to Cart</button>
        </div>
      </div>
       
    </div>
  );
}

export default FoodCard;