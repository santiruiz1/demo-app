import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { APIUrl } from "../../App";
import { useState } from "react";

const OrderItem = (props) => {
  const procecedInfo = JSON.parse(props.item.data);
  const { orderedItems, user } = procecedInfo;
  const [deleting, setDeleting] = useState(false);

  const userKeys = Object.keys(user);

  const deleteOrder = async () => {
    setDeleting(true);
    try {
      const response = await fetch(
        `${APIUrl}/api/v1/providers/${props.item.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYyMzJhNzE5LThiOTUtNGY0NC04MGVmLTczNWFhYmIzNTg0YiIsInR5cGUiOlsicmVndWxhciJdLCJlbWFpbCI6ImFqYXRpYkBnbWFpbC5jb20iLCJpYXQiOjE2NTgyMzQ5MTQsImV4cCI6MTY2ODIzNDkxM30.m_FnPZ38puegcDynDErqS7ks0uZMZ0xx7nObjfxwi_w",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      props.onRefresh();
      setDeleting(false);
    } catch (error) {
      setDeleting(false);
      console.log(error);
    }
  };

  return (
    <li className="flex border-b-[1px] pb-2 my-2 border-b-gray-300">
      {deleting && <p className="font-bold">Deleting Order...</p>}
      {!deleting && (
        <>
          <div className="w-[45%] flex flex-col items-start">
            <h2 className="font-bold mb-2">Order</h2>
            {orderedItems.map((e) => (
              <div className="flex justify-start ml-2">
                <span>{e.name}</span>
                <span className="mx-4">${e.price}</span>
                <span>x{e.amount}</span>
              </div>
            ))}
          </div>
          <div className="w-[45%]">
            <h2 className="font-bold mb-2">User Info</h2>
            <div className="flex flex-col items-start">
              {userKeys.map((key) => (
                <span className="capitalize">
                  {key}: {user[key]}
                </span>
              ))}
            </div>
          </div>
          <div className="w-[10%] flex items-center justify-center">
            <FontAwesomeIcon icon={faTrashCan} className='cursor-pointer p-2 rounded-lg hover:bg-error' onClick={deleteOrder} />
          </div>
        </>
      )}
    </li>
  );
};

export default OrderItem;
