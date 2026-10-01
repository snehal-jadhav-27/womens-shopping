import React from "react";
import "./Categories.css";

function Categories() {
  const categories = [
    {
      name: "Dresses",
      description: "Elegant styles for every occasion",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Tops",
      description: "Trendy tops for your everyday look",
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Kurtis",
      description: "Beautiful traditional and modern styles",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Jeans",
      description: "Comfortable and stylish denim",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Bags",
      description: "Complete your look with stylish bags",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    },
    {
      name: "Footwear",
      description: "Step into your perfect style",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <div className="categories-page">

      {/* Page Banner */}
      <section className="categories-banner">
        <div className="categories-banner-content">
          <p>HERSTYLE COLLECTION</p>

          <h1>Shop By Category</h1>

          <span>
            Find the perfect style for every moment.
          </span>
        </div>
      </section>


      {/* Categories Section */}
      <section className="categories-content">

        <div className="categories-heading">
          <p>EXPLORE OUR COLLECTION</p>

          <h2>Find Your Style</h2>

          <span>
            Discover fashion designed to make you feel confident.
          </span>
        </div>


        {/* Category Cards */}
        <div className="categories-grid">

          {categories.map((category) => (
            <div className="category-card" key={category.name}>

              <div className="category-image">

                <img
                  src={category.image}
                  alt={category.name}
                />

              </div>


              <div className="category-info">

                <p className="category-label">
                  COLLECTION
                </p>

                <h3>{category.name}</h3>

                <p className="category-description">
                  {category.description}
                </p>

                <button>
                  SHOP NOW →
                </button>

              </div>

            </div>
          ))}

        </div>

      </section>


      {/* Bottom Banner */}
      <section className="category-offer">

        <div>
          <p>STYLE YOUR WAY</p>

          <h2>Fashion Made For You</h2>

          <span>
            Explore our latest collections and create your own style.
          </span>
        </div>

        <button onClick={() => (window.location.href = "/shop")}>
         EXPLORE SHOP
        </button>

        

      </section>

    </div>
  );
}

export default Categories;