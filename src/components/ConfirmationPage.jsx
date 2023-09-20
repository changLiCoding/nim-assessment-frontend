import { useEffect, useState } from "react";
import axios from "axios";
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
    axios.get(`http://localhost:3001/api/orders/${id}`).then((response) => {
      console.log(response);
      setOrderData(response.data);
    });
  }, [id]);

  console.log(id);

  return (
    <div className={styles.orderContainer}>
      <h1>Confirmation Page</h1>
      <OrderConfirmation order={orderData} />
    </div>
  );
}
