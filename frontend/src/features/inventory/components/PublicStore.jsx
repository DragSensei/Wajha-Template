import { useCart } from '../../../lib/CartContext';
import { Link } from 'react-router-dom';

export default function PublicStore() {
  const { addToCart, toggleDrawer, cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleBuyX1 = () => {
    addToCart({
      id: 'lumina-x1',
      name: 'LUMINA X1',
      price: 399.00,
      category: 'headphones',
      image_filename: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAstlW9umd_IM-opgV056xQD3p1pb2CNB5_hoT62E1whBggV22k3M8k0lOhoYVZfgq1SEaZnvsq6DdUkaDfolLVFenzX9Ic00Bq-BdbEBD9EnzXJWKiHxd6nN6aHRrzqKGAoNCqct6nwx-uvqHJx0gtXpkFi_ANJkdx-rfTB9fU79sMl2rRcXHhmImHpIVvPlrVHJejIzifxeSFBtnwULOb94EOc-mhjP-dGX42ZAG_hOftQm00qFWn8EL8eDq9Z_OFsPCJ1PB_uj22'
    });
  };

  return (
    <>
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-black/5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
        <div className="flex justify-between items-center px-margin-desktop h-16 w-full max-w-container-max mx-auto">
          <Link to="/" className="font-headline-md text-headline-md tracking-tighter text-on-surface">LUMINA</Link>
          
          <div className="hidden md:flex gap-8 items-center">
            <div className="relative group">
              <a className="text-on-surface/70 font-label-md hover:text-primary transition-colors duration-300 flex items-center gap-1" href="#">Store<span className="material-symbols-outlined text-[14px]">expand_more</span></a>
            </div>
            <div className="relative group">
              <a className="text-on-surface/70 font-label-md hover:text-primary transition-colors duration-300 flex items-center gap-1" href="#">TV<span className="material-symbols-outlined text-[14px]">expand_more</span></a>
            </div>
            <div className="relative group">
              <a className="text-on-surface/70 font-label-md hover:text-primary transition-colors duration-300 flex items-center gap-1" href="#">HP<span className="material-symbols-outlined text-[14px]">expand_more</span></a>
            </div>
            <div className="relative group">
              <a className="text-on-surface/70 font-label-md hover:text-primary transition-colors duration-300 flex items-center gap-1" href="#">PHONES<span className="material-symbols-outlined text-[14px]">expand_more</span></a>
            </div>
            <div className="relative group">
              <a className="text-on-surface/70 font-label-md hover:text-primary transition-colors duration-300 flex items-center gap-1" href="#">IPADS<span className="material-symbols-outlined text-[14px]">expand_more</span></a>
            </div>
            <div className="relative group">
              <a className="text-on-surface/70 font-label-md hover:text-primary transition-colors duration-300 flex items-center gap-1" href="#">ACCESSORIES<span className="material-symbols-outlined text-[14px]">expand_more</span></a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-on-surface hover:text-primary premium-transition">
              <span className="material-symbols-outlined" data-icon="search">search</span>
            </button>
            <button onClick={toggleDrawer} className="relative text-on-surface hover:text-primary premium-transition">
              <span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
            <Link to="/login" className="text-on-surface hover:text-primary premium-transition ml-2">
              <span className="material-symbols-outlined" data-icon="person">person</span>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-white">
          <div className="max-w-container-max mx-auto px-margin-desktop w-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-5 z-10 flex flex-col items-start gap-6">
              <span className="font-label-sm text-label-sm text-primary tracking-[0.2em] uppercase">New Arrival</span>
              <h1 className="font-headline-xl text-headline-xl text-on-surface">LUMINA X1</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                Experience sound in its purest form. Engineered with precision aerospace materials for unparalleled acoustic clarity and silence.
              </p>
              <div className="flex flex-wrap gap-6 mt-4 items-center">
                <button onClick={handleBuyX1} className="buy-button font-label-md text-label-md hover:scale-105 premium-transition cursor-pointer">
                  Buy
                </button>
                <a className="text-primary font-label-md text-label-md flex items-center gap-1 group hover:underline premium-transition" href="#">
                  Learn more
                  <span className="material-symbols-outlined text-[18px]" data-icon="arrow_forward">arrow_forward</span>
                </a>
              </div>
            </div>
            <div className="md:col-span-7 relative h-[600px] md:h-[800px] flex items-center justify-center">
              <img 
                alt="Lumina X1 Headphones" 
                className="w-full h-full object-contain object-right drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAstlW9umd_IM-opgV056xQD3p1pb2CNB5_hoT62E1whBggV22k3M8k0lOhoYVZfgq1SEaZnvsq6DdUkaDfolLVFenzX9Ic00Bq-BdbEBD9EnzXJWKiHxd6nN6aHRrzqKGAoNCqct6nwx-uvqHJx0gtXpkFi_ANJkdx-rfTB9fU79sMl2rRcXHhmImHpIVvPlrVHJejIzifxeSFBtnwULOb94EOc-mhjP-dGX42ZAG_hOftQm00qFWn8EL8eDq9Z_OFsPCJ1PB_uj22"
              />
            </div>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section className="py-section-gap bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
              {/* Large Card */}
              <div className="md:col-span-2 md:row-span-2 glass-card rounded-3xl overflow-hidden relative group">
                <div className="absolute inset-0 z-0">
                  <img 
                    alt="Acoustic Engineering" 
                    className="w-full h-full object-cover group-hover:scale-105 premium-transition" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwX_nN4vYMkJDHNWCsbX5MUB557IQwPYBaJ0fytuHx2Ju8876vmPuBT5wWcoPmFIv4cx14i9oln1slN5rxgQDeTj3mGvjcENqA3544KdHhaHYS62qcDZJRSaTHUPeI2vzMResZt_vaVdpk0bctlMKQa5jOI8GXcnvsKwsQV65ZukNW2ni_jg-AUUh0TukRmXoc7vqD_hpegA0Bghu5nhTjPJ2wrGrOPm3gzrW54E-ySkuOwtXN0zmHG9NPEqWgeL_FZlBf2IOkYuwR"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
                </div>
                <div className="absolute bottom-10 left-10 z-10">
                  <h3 className="font-headline-lg text-headline-lg text-white mb-2 drop-shadow-md">Acoustic Architecture</h3>
                  <p className="font-body-md text-body-md text-white/90 max-w-sm drop-shadow-sm">
                    A bespoke 40mm driver designed to eliminate distortion and deliver every note with breathtaking accuracy.
                  </p>
                </div>
              </div>
              
              {/* Tech Card 1 */}
              <div className="glass-card rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg premium-transition">
                <span className="material-symbols-outlined text-primary text-4xl" data-icon="bolt">bolt</span>
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface mb-2">40h Battery</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Fast charging gives you 3 hours of play in just 5 minutes.</p>
                </div>
              </div>
              
              {/* Tech Card 2 */}
              <div className="glass-card rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg premium-transition">
                <span className="material-symbols-outlined text-primary text-4xl" data-icon="spatial_audio">spatial_audio</span>
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface mb-2">Spatial Audio</h4>
                  <p className="font-body-md text-body-md text-on-surface-variant">Immersive theater-like sound that surrounds you completely.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase Section */}
        <section className="py-section-gap bg-white">
          <div className="max-w-container-max mx-auto px-margin-desktop text-center flex flex-col items-center">
            <h2 className="font-headline-xl text-headline-xl text-on-surface mb-8">Elegance in Every Detail</h2>
            <div className="w-full h-[600px] rounded-3xl overflow-hidden relative mb-12 shadow-2xl">
              <img 
                alt="Craftsmanship" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkL2x82q7WUcjEfrL2fnRfqupqmGYRwJzOIwdjXkvWHWMiwUWZ8sFwFomqDSE3SNwdRVaRyxe459I-LoU8tDdHV9y5pJ1TY_Uk3oFEzA8lsre7Lua0r12v2N6j5B0Z3BypX-INv6PrZzp8caaV5iX-1MDnsU_KFvBkJSCvpuN-6WkUcYDtD4GdMMl-u2rTSppuhSeoFbEU0GiQIun7YIWDX7SNL3sLietb85AU0nOcUlheRjTvlLXoUvVxrwTkt51uox-bI8kdXYVX"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left w-full">
              <div>
                <h5 className="font-label-sm text-label-sm text-primary mb-4 uppercase tracking-widest">Sustainability</h5>
                <p className="font-body-md text-body-md text-on-surface-variant">Constructed using 100% recycled aluminum and sustainably sourced vegan leather.</p>
              </div>
              <div>
                <h5 className="font-label-sm text-label-sm text-primary mb-4 uppercase tracking-widest">Connectivity</h5>
                <p className="font-body-md text-body-md text-on-surface-variant">Seamlessly switch between devices with ultra-stable Bluetooth 5.3 technology.</p>
              </div>
              <div>
                <h5 className="font-label-sm text-label-sm text-primary mb-4 uppercase tracking-widest">Comfort</h5>
                <p className="font-body-md text-body-md text-on-surface-variant">Pressure-relieving cushions and an adjustable headband for all-day listening.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-surface-container-lowest border-t border-black/5">
        <div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-headline-md text-headline-md text-on-surface">LUMINA</div>
          <div className="flex flex-wrap justify-center gap-8">
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Terms of Service</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Sales Policy</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" href="#">Legal</a>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant opacity-60">
            © 2024 Lumina Electronics. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}