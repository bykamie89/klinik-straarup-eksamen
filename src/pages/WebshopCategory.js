import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useState } from "react";
import { database } from "../firebase";
import "./WebshopCategory.scss";
import HeartIcon from "../assets/icons/HeartIcon";
import ArrowLeftIcon from "../assets/icons/ArrowLeftIcon";
import HeartIconFilled from "../assets/icons/HeartIconFilled";
import { SecondaryButton } from "../components/Buttons";
import CustomFooter from "../components/CustomFooter";
import DiscountBanner from "../components/DiscountBanner";

export default function WebshopCategory() {
  const { category } = useParams();
  console.log(category);

  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    database
      .collection("products")
      .get()
      .then((data) => {
        let productList = [];
        data.docs.forEach((doc) => {
          productList.push({
            id: doc.id,
            ...doc.data(),
            isFavorite: favorites.includes(doc.id),
          });
        });
        setProducts(
          productList.filter(
            (e) => e.category === category.replaceAll("-", " ")
          )
        );
      });
  }, [category, favorites]);

  const toggleFavorite = (productId) => {
    console.log("Clicked on product ID:", productId);
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId)
        : [...prevFavorites, productId]
    );
  };

  // Log favorites state
  useEffect(() => {
    console.log("Favorites:", favorites);
  }, [favorites]);

  return (
    <>
      <Navigation />
      <div className="product-category-content">
        <h1 style={{ textTransform: "capitalize" }}>
          {category.replaceAll("-", " ")}
        </h1>
        <div className="breadcrumb">
          <Link className="webshop-crumb" to="/webshop">
            Webshop <ArrowLeftIcon width="30px" />
          </Link>
          <span
            className="category-crumb"
            style={{ textTransform: "capitalize" }}
          >
            {category.replaceAll("-", " ")}
          </span>
        </div>
        <div className="all-category-products">
          {products?.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="heart-icons">
                {product.isFavorite ? (
                  <HeartIconFilled
                    width="35px"
                    height="35px"
                    onClick={() => toggleFavorite(product.id)}
                    fill="#ff969f"
                  />
                ) : (
                  <HeartIcon
                    width="35px"
                    height="35px"
                    onClick={() => toggleFavorite(product.id)}
                    fill="#161616"
                  />
                )}
              </div>
              <img src={product?.imagePath} alt={product?.productName} />
              <p className="josefin18">{product?.productName}</p>
              <p className=""> {product?.productPrice} DKK</p>
              <div className="btn">
                <SecondaryButton
                  text="Se her"
                  link={`/product/${product.id}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <DiscountBanner />
      <CustomFooter />
    </>
  );
}

//  <Link to={"/product/" + product.id}>Se her</Link>;
