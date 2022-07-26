import { Button } from 'react-daisyui';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className='flex justify-between items-center border-b-2 border-black pb-2 sm:pb-4'>
      <div>
        <h2 className='font-bold text-secondary text-[1.1rem]'>{props.name}</h2>
        <div className='w-40 flex justify-between items-center'>
          <span className='font-semibold'>{price}</span>
          <span className='font-bold border text-secondary py-1 px-3 rounded'>x {props.amount}</span>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row'>
        <Button className='font-bold text-[1.25rem] border-secondary w-12 text-center bg-transparent m-1 ml-4' onClick={props.onRemove}>−</Button>
        <Button className='font-bold text-[1.25rem] border-secondary w-12 text-center bg-transparent m-1 ml-4' onClick={props.onAdd}>+</Button>
      </div>
    </li>
  );
};

export default CartItem;
