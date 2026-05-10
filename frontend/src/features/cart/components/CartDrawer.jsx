import { useCart } from '../../../lib/CartContext';
import apiClient from '../../../lib/apiClient';
import { useState } from 'react';

export default function CartDrawer() {
  const { cart, updateQuantity, removeFromCart, isDrawerOpen, setIsDrawerOpen, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '' });

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.phone) {
      alert("Name and Phone required");
      return;
    }

    const itemsText = cart.map(i => `${i.quantity}x ${i.name}`).join(', ');
    
    try {
      await apiClient.post('/orders/', {
        name: customer.name,
        email: customer.email,
        items: itemsText,
        total: cartTotal
      });
    } catch (err) {
      console.error("Order sync failed", err);
    }

    let waText = `*New Order*\nName: ${customer.name}\nPhone: ${customer.phone}\n\n*Items:*\n`;
    cart.forEach(i => { waText += `• ${i.quantity}x ${i.name} - $${i.price}\n`; });
    waText += `\n*Total: $${cartTotal.toFixed(2)}*`;

    const waUrl = `https://wa.me/201508222682?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

    clearCart();
    setIsDrawerOpen(false);
    setIsCheckingOut(false);
  };

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsDrawerOpen(false)} />
      <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={() => setIsDrawerOpen(false)} className="text-xl">&times;</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? <p>Cart is empty</p> : 
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm">${item.price}</p>
                  <div className="flex gap-2 items-center mt-1">
                    <button onClick={() => updateQuantity(item.id, -1)} className="px-2 bg-gray-200 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="px-2 bg-gray-200 rounded">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm">Remove</button>
              </div>
            ))
          }
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <p className="text-lg font-bold mb-4">Total: ${cartTotal.toFixed(2)}</p>
            
            {isCheckingOut ? (
              <form onSubmit={handleCheckout} className="space-y-3">
                <input required type="text" placeholder="Name" className="w-full border p-2" onChange={e => setCustomer({...customer, name: e.target.value})} />
                <input required type="tel" placeholder="Phone" className="w-full border p-2" onChange={e => setCustomer({...customer, phone: e.target.value})} />
                <input type="email" placeholder="Email (optional)" className="w-full border p-2" onChange={e => setCustomer({...customer, email: e.target.value})} />
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-bold">Send to WhatsApp</button>
                <button type="button" onClick={() => setIsCheckingOut(false)} className="w-full text-gray-500 text-sm">Cancel</button>
              </form>
            ) : (
              <button onClick={() => setIsCheckingOut(true)} className="w-full bg-black text-white py-3 rounded font-bold">
                Checkout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}