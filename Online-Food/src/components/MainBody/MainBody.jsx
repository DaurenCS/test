import React from "react";
import FoodList from "components/FoodList/FoodList";
import {useGetFoodList} from "hooks/api_hooks"

const Body = () => {
    const foodList = useGetFoodList();

    return(
        <FoodList foodData={foodList}/>
    );
};

export default Body;