import { Form as DaisyForm, Button, Input, InputGroup } from "react-daisyui";
import { Form as FinalForm, Field } from "react-final-form";

const MealItemForm = (props) => {
  const onSubmit = (values) => {
    props.onAddToCart(+values.amount);
  };

  const required = (value) => {
    if (value) {
      if (+value > 0 && +value < 6) {
        return undefined;
      } else return "Must be between 1-5";
    } else return "Required";
  };

  return (
    <div>
      <FinalForm
        onSubmit={onSubmit}
        initialValues={{ amount: 1 }}
        render={({ handleSubmit, valid }) => (
          <DaisyForm>
            <form className="text-left sm:text-right" onSubmit={handleSubmit}>
              <Field name="amount" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <InputGroup className="text-right text-primary min-h-[2.5rem] h-10 sm:justify-end">
                      <span className="text-[1rem] px-2">Amount</span>
                      <Input
                        {...input}
                        type="number"
                        step="1"
                        className="w-16 p-0 pl-2 h-10 text-[1.1rem] font-extrabold"
                      />
                    </InputGroup>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Button
                className="min-h-[2rem] h-8 text-white text-[.7rem] font-bold w-[fit-content] py-1 px-4 mt-1"
                color="secondary"
                type="submit"
                disabled={!valid}
              >
                Add to cart
              </Button>
            </form>
          </DaisyForm>
        )}
      />
    </div>
  );
};

export default MealItemForm;
