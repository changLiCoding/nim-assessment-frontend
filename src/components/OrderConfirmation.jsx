import styles from "./styles/ConfirmationPage.module.css";

export default function OrderConfirmation({ order }) {
  const { id, status, items, name, address } = order;

  return (
    <div className={styles.orderInfo}>
      <h3>Thank you for your order</h3>
      <div>
        <h4>Order #{id}</h4>
        <p>Status: {status}</p>
        <p>Name: {name}</p>
        <p>Address: {address}</p>
        <p>Items:</p>
        <ul>
          {items.map((item) => (
            <li key={item.item.id}>
              {item.item.name} x {item.quantity}
            </li>
          ))}
        </ul>
        <div className={styles.subTotal}>
          <span>Order Total: </span>
          <span>
            $
            {items.reduce(
              (acc, item) => acc + item.item.price * item.quantity,
              0
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
