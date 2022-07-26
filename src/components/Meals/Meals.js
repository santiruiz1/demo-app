import AvailableMeals from "./AvailableMeals";
import React from "react";
import { Card } from "react-daisyui";

const Meals = () => {
  return (
    <main className='h-screen'>
      <Card className="border-none text-center max-w-[45rem] w-[90%] bg-secondary m-auto mt-[-10rem] relative p-4 shadow">
        <Card.Title tag='h2' className="mt-0 text-[1.3rem] sm:text-[2rem] pb-2 m-auto">Delicious Food, Delivered To You</Card.Title>
        <p>
          Choose your favourite meal from our broad selection of available meals
          and enjoy a delicious lunch or dinner at home.
        </p>
        <p>
          All our meals are cooked with high-quality ingredients, just-in-time
          and of course by experienced chefs!
        </p>
      </Card>
      <AvailableMeals />
    </main>
  );
};

export default Meals;
