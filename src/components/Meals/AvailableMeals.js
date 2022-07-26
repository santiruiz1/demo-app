import { useSelector } from "react-redux";

import { Card } from "react-daisyui";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const meals = useSelector((state) => state.meals.meals);
  const loading = useSelector((state) => state.meals.isLoading);
  let content;

  if (Array.isArray(meals)) {
    const mealsList = meals.map((meal) => (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));

    content = <ul className="list-none m-0 p-0">{mealsList}</ul>;

    if (mealsList.length === 0) {
      content = "No meals available.";
    }
  }

  if (loading) {
    content = <b>Loading...</b>;
  }

  if (typeof meals === "string") {
    content = <p>{meals}</p>;
  }

  return (
    <Card className="bg-primary p-4 w-[90%] max-w-[60rem] my-8 mx-auto animate-appear ease-out">
      {content}
    </Card>
  );
};

export default AvailableMeals;
