import "./Card.css";
import { useState, useEffect } from "react";

function Card(props) {

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(props.price);

  useEffect(() => {
    setTotalPrice(props.price * quantity);
  }, [quantity, props.price]);

  const increaseQuantity = () => {
    if (quantity >= 9) {
      alert("Maximum quantity is 9");
      return;
    }
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      alert("Minimum quantity is 1");
      return;
    }
    setQuantity(quantity - 1);
  };
console.log(props);
  return (
    <div id={props.idone} className="card">

      <img src={props.image} alt={props.title} />

      <h2>{props.title}</h2>

      <p>{props.description}</p>

      <h3>{props.price}</h3>

      <div className="quantity-controls">
        <button onClick={decreaseQuantity}>-</button>

        <span>{quantity}</span>

        <button onClick={increaseQuantity}>+</button>
      </div>

      <h3>Total Price: ₹{totalPrice}</h3>

      <button>Buy Now</button>

    </div>
  );
}

export default Card;