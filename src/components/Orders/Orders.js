import { Card } from "react-daisyui";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";

const Orders = (props) => {
  const orders = (useSelector((state) => state.meals.orders));
  const loading = useSelector((state) => state.meals.isLoading);

  return (
    <main className="h-screen">
      <Card className="border-none bg-primary text-secondary w-[90%] m-auto mt-[-10rem] relative p-4 shadow-[0_0_5px_5px_rgba(0,0,0,0.4)]">
        <h2 className="text-2xl font-bold text-center mb-4">Orders</h2>
        <div>
            <ul>
                {loading && <li className="font-bold text-center">Loading...</li>}
                {!loading && orders.map((e)=> <OrderItem item={e} onRefresh={props.onRefresh} />)}
            </ul>
        </div>
      </Card>
    </main>
  );
};

export default Orders;
