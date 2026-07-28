import Card from "../components/Card";
import products from "../data/products.json";

function Home() {
  return (
    <div className="container">
      {products.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          description={item.description}
          price={item.price}
          image={item.image}
        />
      ))}
    </div>
  );
}

export default Home;