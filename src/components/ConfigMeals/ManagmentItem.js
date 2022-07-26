import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { Field, Form } from "react-final-form";
import { useMediaQuery } from "react-responsive";
import { APIUrl } from "../../App";

const ManagmentItem = (props) => {
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const lg = useMediaQuery({ query: "(min-width: 1024px)" });
  const sm = useMediaQuery({ query: "(min-width: 640px)" });

  const deleteHandler = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${APIUrl}/api/v1/providers/${props.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyMzJhNzE5LThiOTUtNGY0NC04MGVmLTczNWFhYmIzNTg0YiIsInR5cGUiOlsicmVndWxhciJdLCJlbWFpbCI6ImFqYXRpYkBnbWFpbC5jb20iLCJpYXQiOjE2NTgyMzQ5MTQsImV4cCI6MTY2ODIzNDkxM30.m_FnPZ38puegcDynDErqS7ks0uZMZ0xx7nObjfxwi_w",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong, try again later!");
      }
      await props.onRefresh();
      setIsDeleting(false);
    } catch (err) {
      setError(err.message);
      setIsDeleting(false);
    }
  };

  const onSubmit = async (values) => {
    try {
      const response = await fetch(
        `${APIUrl}/api/v1/providers/${props.id}?name=${values.name}&email=${values.description}&tax_id=${values.price}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application.json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyMzJhNzE5LThiOTUtNGY0NC04MGVmLTczNWFhYmIzNTg0YiIsInR5cGUiOlsicmVndWxhciJdLCJlbWFpbCI6ImFqYXRpYkBnbWFpbC5jb20iLCJpYXQiOjE2NTgyMzQ5MTQsImV4cCI6MTY2ODIzNDkxM30.m_FnPZ38puegcDynDErqS7ks0uZMZ0xx7nObjfxwi_w",
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong, try again later!");
      }
      props.onRefresh();
    } catch (err) {
      setError(err.message);
    }
  };

  const invalid = "bg-[#f449] border-1 border-red shadow-[#f33]";

  const required = (value) => (value ? undefined : invalid);
  const between = (value) => {
    if (+value > 0 && +value < 100) {
      return undefined;
    } else {
      return invalid;
    }
  };

  return (
    <li
      key={props.id}
      id={props.id}
      className="flex justify-between items-center p-1 border-b-[1px] border-b-black"
    >
      {!isDeleting && (
        <Form
          onSubmit={onSubmit}
          initialValues={{
            name: props.name,
            description: props.description,
            price: props.price,
          }}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit} className="flex items-center">
              <div className="flex flex-col lg:flex-row">
                <Field name="name" validate={required}>
                  {({ input, meta }) => (
                    <div className="flex flex-col sm:flex-row">
                      <label className="pr-1 ml-4 w-24 lg:w-16 content-center">
                        Name
                      </label>
                      <Input
                        color="secondary"
                        {...input}
                        type="text"
                        className={`h-fit ml-4 sm:ml-0 w-24 bg-transparent text-[1rem] px-2  ${
                          meta.error && meta.touched ? `${meta.error}` : ""
                        }`}
                      />
                    </div>
                  )}
                </Field>
                <Field name="description" validate={required}>
                  {({ input, meta }) => (
                    <div className="flex flex-col sm:flex-row">
                      <label className="pr-1 ml-4 w-24 content-center">
                        Description
                      </label>
                      <Input
                        color="secondary"
                        {...input}
                        type="text"
                        className={`h-fit ml-4 sm:ml-0 w-40 sm:w-60 bg-transparent text-[1rem] px-2 ${
                          meta.error && meta.touched ? `${meta.error}` : ""
                        }`}
                      />
                    </div>
                  )}
                </Field>
                <Field name="price" validate={between}>
                  {({ input, meta }) => (
                    <div className="flex flex-col sm:flex-row">
                      <label className="pr-1 ml-4 lg:ml-2 w-24 lg:w-12 content-center">
                        Price
                      </label>
                      <Input
                        color="secondary"
                        {...input}
                        type="number"
                        className={`h-fit ml-4 sm:ml-0 w-14 bg-transparent text-[1rem] px-2  ${
                          meta.error && meta.touched ? `${meta.error}` : ""
                        }`}
                      />
                    </div>
                  )}
                </Field>
              </div>
              <div className="px-4">
                {!submitting && (
                  <Button
                    className="font-bold"
                    color="success"
                    type="submit"
                    disabled={submitting || pristine}
                  >
                    {!lg && "✓"}
                    {lg && "update"}
                  </Button>
                )}
                {submitting && <b>Upadting...</b>}
              </div>
            </form>
          )}
        />
      )}
      {isDeleting && <span>Deleting food item...</span>}
      <Button
        className="mr-4 font-bold lg:mr-0"
        color="error"
        onClick={deleteHandler}
        disabled={isDeleting}
      >
        {!sm && "X"}
        {sm && "Delete"}
      </Button>
      {error && <span>{error}</span>}
    </li>
  );
};

export default ManagmentItem;
