import React, { useState, useEffect } from 'react';
import { Table, Button, Card} from 'reactstrap';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StripeCheckout from 'react-stripe-checkout';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('https://ac-swethasa.vercel.app/cart', {
        headers: { 'x-auth-token': token },
      });
      const data = await response.json();
      setCartItems(data);
    };
    fetchCartItems();
  }, []);

  const clearCart = async () => {
    const token = localStorage.getItem('token');
    await fetch('https://ac-swethasa.vercel.app/cart/clear-cart', {
      method: 'DELETE',
      headers: { 'x-auth-token': token },
    });
    setCartItems([]);
    toast.success("Cart Cleared!!");
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (let item of cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice.toFixed(2);
  };

  const handleQuantityChange = async (itemId, quantity) => {
    const token = localStorage.getItem('token');
    await fetch(`https://ac-swethasa.vercel.app/cart/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({ quantity }),
    });
    setCartItems(
      cartItems.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  
  const onToken = async (token) => {
    try {
      const response = await fetch('https://ac-swethasa.vercel.app/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          token,
          amount: calculateTotalPrice() * 100, // Stripe accepts amount in cents
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCartItems([]);
        toast.success("Payment successful!!");
      }
    } catch (error) {
      toast.success("Payment successful!!");
    }
  };

  return (
    <>
      <h1 style={{backgroundColor: "white", marginBottom: "0", marginTop: "1cm", marginLeft: "1cm", marginRight: "1cm", textAlign: "center", padding: "1cm"}}>Basket</h1>
      {cartItems.length > 0 ? (
        <>
          <Table striped>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={e => handleQuantityChange(item.id, e.target.value)}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" style={{ textAlign: 'right' }}>
                  Grand Total:
                </td>
                <td>${calculateTotalPrice()}</td>
              </tr>
            </tfoot>
          </Table>
           
          <Button color="danger" onClick={clearCart}>
            Clear Cart
          </Button>
          <div>
<StripeCheckout
stripeKey="pk_test_51MmC4TSBtToua9svBCXU2Z4ZyPdd8Df1GLbO5ErtCVWEm7Lxz7qglPNuazaNxQBlob5arGTMr5z10e39V5iCLaWF00Ht0qJmne"
token={onToken}
amount={calculateTotalPrice() * 100}
name="Checkout"
billingAddress
shippingAddress
>
<Button style={{top: "10px"}} color="warning">Checkout</Button>
</StripeCheckout>
</div>
        </>
      ) : (
        <Card style={{height: "2cm", width: "15cm", textAlign: "center", fontSize: "1cm", marginLeft: "11cm", marginTop: "8cm" }} >Your cart is empty</Card>
      )}
    </>
  );
};

export default Cart;
