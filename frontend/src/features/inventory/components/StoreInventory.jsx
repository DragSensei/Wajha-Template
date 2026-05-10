import { useState, useEffect } from 'react';
import apiClient from '../../../lib/apiClient';
import { useCart } from '../../../lib/CartContext';
import { Link } from 'react-router-dom';

export default function StoreInventory() {
  const [products, setProducts] = useState([]);
  const { addToCart, toggleDrawer, cart } = useCart();

  useEffect(() => {
    apiClient.get('/inventory/products')
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]));
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Use mock products if API fails or returns empty so we can see the UI
  const displayProducts = products.length > 0 ? products : [
    { id: 1, name: 'LUMINA OLED 8K', category: 'TV', price: 3499.00, image_filename: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJOYpxDwCM2BVspbQfFCed0oSxBHC1UBqTTGJsN6U3YH2JoWYM9uK_0wSlQDljML9shdMyrH6Lcn2h8CNGpw2yTyJVp1-pS0qcuu308k9uPSQn-ng3MdNIcIUQp1hHSaUX9EiPrHNlQEwZ7HSDA2dkO3tWg46GtutaQCZbHx3nyqXJmJJq0cy8bVo9YgREB-pos_WATX84M-ol3e9-tqZcLAC4AHvsW7ln_QLJ6T5wYbGz31Qk1AmNIlzRR_bl6ld25Q4Ac7rg0W2q' },
    { id: 2, name: 'Sonic Pro Wireless', category: 'HP', price: 449.00, image_filename: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY4UZzRcjBiMpbflOuX1V77zRuE60VVT1My9sJZ2A6Y2xz6UekTuZbUalHmK5pwo8Q3DQZ_zxA7g3fKssWRfECvv4o4ONxwtb6jWlKHbNaUnYyZr_qAP4gYH5CHiV794bnPN3cchSPzm98S3_aDSkgKOLcUHujPc2C3t45ftWKN9IE3F97LtqKBkjfoFEzTuUqPg4yWAfrFVek2YPEsx5F34h8gdLuQv-UUol9gHnC7NZjcEIUSqN1nWajMpOtvgkmRivDWbuVpmf9' },
    { id: 3, name: 'LUMINA Prime X', category: 'PHONES', price: 1199.00, image_filename: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_ZyTDQATP0AolG_aG4WBTtDYGDw3KL9TjpLhSvTD1buj97fPdaR8U8zWUSPA5lFacyNbpy0RFzwSLOmBuwWP8-9c8Q9l460kKkwJ8Uq_pZ9jHK5CuEHK2xZ39Dira3pDU0jRtqZoqr9fM90NX4Mau5zE2vRTWgQDJX62OYrKMFDDWaCNQRbd_Kv5ZmKwUc0hNzHrIZUU9QBOprCaIGBfQit1OVRWLwSDDM4T9rtbxPh0RnevAqUOC87Ey3YeHYJnm4Me91jEVh8IX' },
    { id: 4, name: 'Studio Tab 12', category: 'IPADS', price: 899.00, image_filename: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxRi8Jj1v0wb9fM7PAKpNRF59O8jtBdTDTyqT00TxaTQb6ybu62d2SjtWtyebsYMYtk9qQSvr2uVENWFzQU1EBg0FphKqmXkpaFhbukXzKaDzLqEDuchMEof9NGADWdBro0mLPBmcTXlR3iJoBFM8Tw_l8qdiPsbNAUgaOCCKW5nyhuwL6wrIkXPuLuuQq7ie1OjnKtn98qC8RDP2C4K6x7DXTSc2_gs2g8wFYucVNTxUZUUMW9tC3pBaII9Eky_9POITTtDPk7Old' }
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-container-max mx-auto px-gutter flex items-center justify-between h-16">
          <div className="flex items-center gap-lg">
            <Link to="/" className="font-display text-h3 font-bold tracking-tighter text-on-surface">LUMINA</Link>
            <nav className="hidden md:flex items-center gap-md">
              <Link to="/store" className="text-primary border-b-2 border-primary pb-1 font-body-md text-body-md">Store</Link>
              <Link to="/store" className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary transition-colors duration-200">TVs</Link>
              <Link to="/store" className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary transition-colors duration-200">Audio</Link>
              <Link to="/store" className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary transition-colors duration-200">Mobile</Link>
              <Link to="/store" className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary transition-colors duration-200">Computing</Link>
            </nav>
          </div>
          <div className="flex items-center gap-md">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="pl-10 pr-4 py-2 bg-surface-container border border-outline-variant/50 rounded-full text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all" placeholder="Search products" type="text"/>
            </div>
            <div className="flex items-center gap-sm">
              <button onClick={toggleDrawer} className="p-2 text-on-surface-variant hover:text-primary transition-colors relative">
                <span className="material-symbols-outlined">shopping_cart</span>
                {totalItems > 0 && (
                  <span className="absolute 0 right-0 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
              <Link to="/login" className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">person</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-xl bg-background min-h-screen">
        <section className="max-w-container-max mx-auto px-gutter mb-xl">
          <h1 className="font-display text-display text-on-surface mb-xs">Store.</h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl">Discover precision-engineered electronics designed to elevate your digital lifestyle. Experience the LUMINA difference.</p>
        </section>

        <section className="max-w-container-max mx-auto px-gutter mb-lg">
          <div className="flex flex-wrap gap-sm">
            <button className="px-md py-xs rounded-full bg-on-surface text-surface font-label-md text-label-md">All Products</button>
            <button className="px-md py-xs rounded-full bg-surface-container-low border border-outline-variant/30 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors">TV</button>
            <button className="px-md py-xs rounded-full bg-surface-container-low border border-outline-variant/30 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors">HP</button>
            <button className="px-md py-xs rounded-full bg-surface-container-low border border-outline-variant/30 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors">PHONES</button>
            <button className="px-md py-xs rounded-full bg-surface-container-low border border-outline-variant/30 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors">IPADS</button>
            <button className="px-md py-xs rounded-full bg-surface-container-low border border-outline-variant/30 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors">ACCESSORIES</button>
          </div>
        </section>

        <section className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-md">
            {displayProducts.map((p) => (
              <div key={p.id} className="premium-hover group bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden transition-all duration-300">
                <div className="aspect-square relative overflow-hidden bg-[#F5F5F7]">
                  {p.image_filename ? (
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={p.image_filename} alt={p.name} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-secondary">No Image</div>
                  )}
                </div>
                <div className="p-md">
                  <span className="font-caption text-caption text-secondary uppercase tracking-wider mb-unit block">{p.category}</span>
                  <h3 className="font-h3 text-h3 text-on-surface mb-xs">{p.name}</h3>
                  <p className="font-body-md text-body-md text-secondary mb-md">${p.price.toFixed(2)}</p>
                  <button onClick={() => addToCart(p)} className="w-full py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full py-xl mt-xl bg-surface-container-low border-t border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex flex-col gap-xs items-center md:items-start">
            <span className="font-display text-h3 font-bold text-on-surface">LUMINA</span>
            <p className="font-caption text-caption text-on-surface-variant text-center md:text-left">© 2024 LUMINA Electronics. Precision Engineering.</p>
          </div>
          <div className="flex gap-lg">
            <a className="font-caption text-caption text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all duration-300" href="#">Privacy</a>
            <a className="font-caption text-caption text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all duration-300" href="#">Terms</a>
            <a className="font-caption text-caption text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all duration-300" href="#">Support</a>
            <a className="font-caption text-caption text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all duration-300" href="#">Locations</a>
          </div>
        </div>
      </footer>
    </>
  );
}