import "./Card.css";

function Card(props) {
  return (
    <div className="card">
      <img src={props.image} alt={props.title} />
      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <h3>{props.price}</h3>
      <button>Buy Now</button>
    </div>
  );
}

export default Card;