import React from "react";
import "./CategoryCard.css";

function CategoryCard() {
  const categories = [
    {
      id: 1,
      name: "Dresses",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Tops",
      image:
        "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Kurtis",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Jeans",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      name: "Bags",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      name: "Footwear",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="categories-container">
      {categories.map((category) => (
        <div className="category-card" key={category.id}>

          {/* Category Image */}
          <img
            src={category.image}
            alt={category.name}
          />

          {/* Category Content */}
          <div className="category-overlay">
            <h3>{category.name}</h3>

            <button>
              Shop Now
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

export default CategoryCard;