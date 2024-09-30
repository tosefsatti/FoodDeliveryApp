import React from 'react';
import { useCart, useDispatchCard } from '../Components/ContextReducer';
import trash from '../assets/trash.png';

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCard();

  if(data.length === 0){
    return (
      <div className='container mx-auto text-center text-white mt-5 fs-3'>The Cart is Empty!</div>
    )
  }

  const handleCheckout =async () =>{
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderdata", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
      },
      body:JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date:new Date().toDateString()
      })
    }
    );
    // Log the response status and full response for debugging
    console.log("Response Status:", response.status);
    let json = response.json();
    console.log(json);
    if(response.status === 200){
      dispatch({type: "DROP" })
    }
     

  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0 )
  return (
    <div>
      <div className='container mx-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover bg-black'>
          <thead className=' fs-4'>
            <tr className='text-success'>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>

          </thead>
          <tbody>
           {
            data.map((food, index) =>{
              return (
                <tr key={index}>
                  <th scope='row'>{index+1}</th>
                  <td>{food.name}</td>
                  <td>{food.qty}</td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td><button type='button' className='btn p-0'><img src={trash} alt='delete' style={{width: "20px"}}
                  onClick={() => { dispatch({type: "REMOVE", index: index})}}/></button></td>
                </tr>
              )
            })
           }
          </tbody>
        </table>
        <div>
          <h1 className='fs-2 text-white'>Total Price: {totalPrice}</h1>
        </div>
        <div>
          <button type='button' className='btn btn-success mt-5' onClick={handleCheckout}>Check out</button>
        </div>

      </div>
    </div>
  )
}

export default Cart
