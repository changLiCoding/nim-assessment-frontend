import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import OrderConfirmation from "./OrderConfirmation";
import styles from "./styles/ConfirmationPage.module.css";

export default function ConfirmationPage() {
  const { id } = useParams();

  const [orderData, setOrderData] = useState({
    id: 0,
    status: "",
    items: [],
    name: "",
    address: ""
  });

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrderData(data);
      });
  }, [id]);

  return (
    <div className={styles.orderContainer}>
      <h1>Confirmation Page</h1>
      <OrderConfirmation order={orderData} />
    </div>
  );
}
