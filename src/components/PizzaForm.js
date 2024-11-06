import React, {useState, useEffect} from "react";

function PizzaForm({ pizza, onSubmit }) {
  const [formData, setFormData] = useState({
    topping: "",
    size: "Small",
    vegetarian: true,
  });

  useEffect(() => {
    if (pizza) {
      setFormData({
        topping: pizza.topping,
        size: pizza.size,
        vegetarian: pizza.vegetarian,
      });
    }
  }, [pizza]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (pizza) {
      onSubmit({ ...formData, id: pizza.id });  
    } else {
      onSubmit(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            value={formData.topping}
            onChange={handleChange}
            placeholder="Pizza Topping"
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" value={formData.size} onChange={handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value={true}
              checked={formData.vegetarian === true}
              onChange={() => setFormData({ ...formData, vegetarian: true })}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value={false}
              checked={formData.vegetarian === false}
              onChange={() => setFormData({ ...formData, vegetarian: false })}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
