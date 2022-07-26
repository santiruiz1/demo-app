import { useSelector } from "react-redux";
import { Button, Card, InputGroup } from "react-daisyui";
import ManagmentItem from "./ManagmentItem";
import { Field, Form } from "react-final-form";
import { useState } from "react";
import { Form as DaisyForm } from "react-daisyui";
import { APIUrl } from "../../App";
const Managment = (props) => {
  const [error, setError] = useState(null);

  const meals = useSelector((state) => state.meals.meals);
  const loading = useSelector((state) => state.meals.isLoading);

  const createNewMeal = async (meal) => {
    const response = await fetch(
      `${APIUrl}/api/v1/providers?name=${meal.name}&email=${meal.description}&tax_id=${meal.price}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application.json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyMzJhNzE5LThiOTUtNGY0NC04MGVmLTczNWFhYmIzNTg0YiIsInR5cGUiOlsicmVndWxhciJdLCJlbWFpbCI6ImFqYXRpYkBnbWFpbC5jb20iLCJpYXQiOjE2NTgyMzQ5MTQsImV4cCI6MTY2ODIzNDkxM30.m_FnPZ38puegcDynDErqS7ks0uZMZ0xx7nObjfxwi_w",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    await props.onRefresh();
  };

  const onSubmit = async (values) => {
    await createNewMeal({
      name: values.name,
      description: values.description,
      price: +values.price,
    }).catch((err) => {
      setError(err.message);
    });
  };

  const required = (value) => (value ? undefined : "Required");
  const between = (value) => {
    if (+value > 0 && +value < 100) {
      return undefined;
    } else {
      return "Invalid price";
    }
  };

  const mealsList = meals.map((item) => (
    <ManagmentItem
      onRefresh={props.onRefresh}
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      description={item.description}
    />
  ));

  let content;

  if (meals.length > 0) {
    content = mealsList;
  }
  if (meals.length === 0) {
    content = <p>No items available. Add one!</p>;
  }

  if (loading) {
    content = <p>Loading...</p>;
  }

  if (typeof meals === "string") {
    content = <p>{meals}</p>;
  }

  return (
    <main className="h-screen">
      <Card className="bg-primary relative m-auto mt-[-10rem] p-6 max-w-screen-lg w-[95%] border-none">
        <div>
          <h2 className="inline-block font-bold px-1 border-2 border-b-0 border-secondary rounded-tl rounded-tr">
            Available Meals
          </h2>
          <ul className="list-none p-0 border-2 border-secondary rounded-tr rounded-bl rounded-br">
            {content}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">New Meal</h3>
          <Form
            onSubmit={onSubmit}
            render={({
              handleSubmit,
              submitting,
              form,
              pristine,
              submitSucceeded,
              invalid,
            }) => (
              <DaisyForm>
                <form onSubmit={handleSubmit}>
                  <Field name="name" validate={required}>
                    {({ input, meta }) => (
                      <div className="my-1">
                        <InputGroup>
                          <span className="w-32">Meal Name</span>
                          <input
                            {...input}
                            type="text"
                            className="border w-60 pl-2"
                          />
                          {meta.error && meta.touched && (
                            <span className="bg-error text-black font-semibold">
                              {meta.error}
                            </span>
                          )}
                        </InputGroup>
                      </div>
                    )}
                  </Field>
                  <Field name="description" validate={required}>
                    {({ input, meta }) => (
                      <div className="my-1">
                        <InputGroup>
                          <span className="w-32">Description</span>
                          <textarea
                            {...input}
                            type="text"
                            className="border w-60 pl-2 resize-none overscroll-y-auto"
                          />
                          {meta.error && meta.touched && (
                            <span className="bg-error text-black font-semibold">
                              {meta.error}
                            </span>
                          )}
                        </InputGroup>
                      </div>
                    )}
                  </Field>
                  <Field name="price" validate={between}>
                    {({ input, meta }) => (
                      <div className="my-1">
                        <InputGroup>
                          <span className="w-32">Price</span>
                          <input
                            {...input}
                            type="number"
                            min="1"
                            max="100"
                            className="border w-14 pl-2"
                          />
                          {meta.error && meta.touched && (
                            <span className="bg-error text-black font-semibold">
                              {meta.error}
                            </span>
                          )}
                        </InputGroup>
                      </div>
                    )}
                  </Field>
                  {!submitting && (
                    <div className="mt-2">
                      <Button
                        className="mr-2"
                        type="submit"
                        disabled={pristine || invalid}
                      >
                        Add
                      </Button>
                      <Button
                        className="mr-2"
                        type="button"
                        onClick={form.restart}
                        disabled={pristine}
                      >
                        Reset
                      </Button>
                    </div>
                  )}
                  {submitting && <p>Uploading...</p>}
                  {!submitting && submitSucceeded && form.restart()}
                </form>
              </DaisyForm>
            )}
          />
          {error && <b>{error}</b>}
        </div>
      </Card>
    </main>
  );
};

export default Managment;
