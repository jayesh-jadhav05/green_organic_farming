import React, { useState } from "react";
import Data from '../Componets/ProductsAPI';
import MainShopCart from "./MainShopCart";
import FilterSideBar from "./FilterSideBar";

const Products = () => {
  const [productData,filterProductS] = useState(Data.products);
 // Filters All Products
  
  const filterMe = (btnclicked) => {
   
    const a1 = Data.products.filter((item) => item.price <= btnclicked)
    const a2 = Data.products.filter((item) => item.others === btnclicked)
    const a3 = Data.products.filter((item) => item.catagory === btnclicked)
    const a4 = Data.products.filter((item) => item.rating === btnclicked)

    if(btnclicked === "famous" || btnclicked === "popular"||btnclicked === "trending"){
      filterProductS(a2);
    }else if(btnclicked === 1 || btnclicked === 2 || btnclicked === 3 || btnclicked === 4){
      filterProductS(a4)
    }else if(btnclicked === 25 || btnclicked === 50 || btnclicked === 75 || btnclicked === 100){
      filterProductS(a1)
    }else if(btnclicked === "fruit" || btnclicked === "vegitable" || btnclicked === "legume" || btnclicked === "foreign"){
      filterProductS(a3)
    }else{
      filterProductS(Data.products)
    }
  };

  // This function use To Add data in Cart Page (Add To Cart)..
  const addData = (item) => {
    // get all signup users data from localStorage.
    let SignupUserDatas = JSON.parse(localStorage.getItem("WelComeUsers"));

    // get CurrentUser Data and Convert string data into array Format..
    let data = JSON.parse(localStorage.getItem("CurrentUser")); 
    // check which user is matching to current logged user to all signup users..
    const aftersignup = SignupUserDatas.filter((item) => item.email === data.email);
    let myCartArray = data.Mycart;
    let signupUserMyCart = aftersignup[0].Mycart;

    var user = myCartArray.find(function (user) {
      return user.id === item.id;
    });

    // Authentication Part
    if (!user) {
      myCartArray.push(item);
      signupUserMyCart.push(item);
      data.Mycart = myCartArray;
      aftersignup.Mycart = signupUserMyCart;
      localStorage.setItem("CurrentUser", JSON.stringify(data));
      localStorage.setItem("WelComeUsers",JSON.stringify(SignupUserDatas));
      alert("Product is Added 👍");
    } else {
      alert("Product is already Added 🙂");
    } 
  };

  return (
    <React.Fragment>
    <main className="mainShow">
    <FilterSideBar filterMe={filterMe}/>

      <section className="rightBar">
      <div className="searchBar">
        <div className="find">
          <input type="text" placeholder="Buy Your Favorite fruites" />
          <button className="btn">Find</button>
        </div>
      </div>

      <div className="ProductContainer">
        <div className="grid container">
          {
           productData.map((curElem) => {
              return <MainShopCart key={curElem.id} item={curElem} addData={addData} />
            })
          }
        </div>
      </div>
      </section>
      </main>
    </React.Fragment>
  );
};

export default Products;