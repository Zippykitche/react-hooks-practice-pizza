import React, {useState, useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {

  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then(response => response.json())
      .then(data => setPizzas(data));
  }, []);

  function handleEditClick(pizza) {
    setSelectedPizza(pizza);
  }

  function handleFormSubmit(updatedPizza) {
    console.log(updatedPizza);  // Check the contents of updatedPizza
  
    if (updatedPizza.id) {
      // If updating an existing pizza (has an id)
      fetch(`http://localhost:3001/pizzas/${updatedPizza.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPizza),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedPizzas = pizzas.map((pizza) =>
            pizza.id === data.id ? data : pizza
          );
          setPizzas(updatedPizzas);
          setSelectedPizza(null); // Reset form after update
        });
    } else {
      // If no id (new pizza), create a new one
      fetch("http://localhost:3001/pizzas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPizza),
      })
        .then((response) => response.json())
        .then((newPizza) => {
          setPizzas([...pizzas, newPizza]); // Add new pizza to state
        });
    }
  }
  

  return (
    <>
      <Header />
      <PizzaForm pizza={selectedPizza} onSubmit={handleFormSubmit} />
      <PizzaList pizzas={pizzas} onEditClick={handleEditClick}/>
    </>
  );
}

export default App;
