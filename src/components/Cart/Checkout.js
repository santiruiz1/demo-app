import { Field, Form } from "react-final-form";
import { Button } from "react-daisyui";

const Checkout = (props) => {
  const onSubmit = (values) => {
    props.onOrder({
      name: values.name,
      address: values.address,
      city: values.city,
      postal: values.postal,
    });
  };

  const required = (value) => (value ? undefined : "Required");
  const between = (value) => {
    if (value) {
      if (+value > 4000 && +value < 5000) {
        return undefined;
      } else {
        return "Invalid code";
      }
    } else {
      return "Required";
    }
  };

  const field = "mb-2 flex flex-col sm:flex-row items-left";

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine, invalid }) => (
        <form className="mt-4" onSubmit={handleSubmit}>
          <Field name="name" validate={required}>
            {({ input, meta }) => (
              <div className={field}>
                <label className='w-28 text-secondary font-semibold mr-2'>Name</label>
                <input
                  className={`rounded border text-secondary ${
                    meta.error && meta.touched ? "bg-error bg-opacity-60" : ""
                  }`}
                  {...input}
                  type="text"
                />
                {meta.error && meta.touched && <span className='text-error'>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="address" validate={required}>
            {({ input, meta }) => (
              <div className={field}>
                <label className='w-28 text-secondary font-semibold mr-2'>Address</label>
                <input
                  className={`rounded border text-secondary ${
                    meta.error && meta.touched ? "bg-error bg-opacity-60" : ""
                  }`}
                  {...input}
                  type="text"
                />
                {meta.error && meta.touched && <span className='text-error'>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="city" validate={required}>
            {({ input, meta }) => (
              <div className={field}>
                <label className='w-28 text-secondary font-semibold mr-2'>City</label>
                <input
                  className={`rounded border text-secondary ${
                    meta.error && meta.touched ? "bg-error bg-opacity-60" : ""
                  }`}
                  {...input}
                  type="text"
                />
                {meta.error && meta.touched && <span className='text-error'>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="postal" validate={between}>
            {({ input, meta }) => (
              <div className={field}>
                <label className='w-28 text-secondary font-semibold mr-2'>Postal Code</label>
                <input
                  className={`rounded border text-secondary ${
                    meta.error && meta.touched ? "bg-error bg-opacity-60" : ""
                  }`}
                  {...input}
                  type="text"
                />
                {meta.error && meta.touched && <span className='text-error'>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="flex justify-between gap-4 mt-4">
            <Button color="ghost" onClick={props.onCancel}>Cancel</Button>
            <div>
              <Button type="button" onClick={props.onClose}>
                Close
              </Button>{" "}
              <Button
              className="ml-2"
                color="success"
                type="submit"
                disabled={submitting || pristine || invalid}
              >
                Confirm
              </Button>
            </div>
          </div>
        </form>
      )}
    />
  );
};

export default Checkout;
