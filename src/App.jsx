import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, User, ArrowRight, LogOut, X, Zap, Bell, ShieldCheck, Package, MapPin, Settings } from 'lucide-react';

// ⚙️ Replace with your Google Cloud Console OAuth 2.0 Client ID
// Get one at: https://console.cloud.google.com/apis/credentials
const GOOGLE_CLIENT_ID = '354379903674-cbb6lnkf046ms21jqb69tghflsufefh0.apps.googleusercontent.com';

const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return [domRef, isVisible];
};

const NAV_MENUS = {
  't-shirts': [
    { title: 'Tees & Tops', links: [{ id: 'oversized', label: 'Oversized T-Shirts' }, { id: 'graphic', label: 'Graphic Tees' }, { id: 'minimal', label: 'Minimal Tees' }] }
  ],
  'jackets': [
    { title: 'Outerwear', links: [{ id: 'denim-jackets', label: 'Denim Jackets' }, { id: 'printed-jackets', label: 'Printed & Varsity' }] }
  ],
  'collections': [
    { title: 'Curated', links: [{ id: 'streetwear-drops', label: 'Streetwear Drops' }] }
  ],
  'new drop': [
    { title: 'Latest', links: [{ id: 'trending', label: 'Trending Now' }] }
  ]
};

const ALL_PRODUCTS = [
  // T-SHIRTS - Oversized (5 products)
  { id: 1,  category: 't-shirts', subcat: 'oversized', name: "Cream Drop-Shoulder Heavyweight",  price: "$45", image: "/oversized_tee_hero.png", tag: "Best Seller" },
  { id: 2,  category: 't-shirts', subcat: 'oversized', name: "Washed Sage Oversized Tee",       price: "$50", image: "/tshirts/tshirt_oversized_sage.png", tag: "" },
  { id: 3,  category: 't-shirts', subcat: 'oversized', name: "Acid Wash Boxy Fit",               price: "$48", image: "/tshirts/tshirt_06_grunge.png", tag: "Trending" },
  { id: 30, category: 't-shirts', subcat: 'oversized', name: "Lavender Cloud Oversized",         price: "$42", image: "/tshirts/tshirt_05_cartoon.png", tag: "New Drop" },
  { id: 31, category: 't-shirts', subcat: 'oversized', name: "Minimal Cream Essential Tee",      price: "$40", image: "/tshirts/tshirt_02_minimal.png", tag: "" },

  // T-SHIRTS - Graphic (5 products)
  { id: 4,  category: 't-shirts', subcat: 'graphic',   name: "Glitch Cyberpunk Tee",             price: "$55", image: "/tshirts/tshirt_01_glitch.png", tag: "Hot" },
  { id: 5,  category: 't-shirts', subcat: 'graphic',   name: "Anime Panel Street Tee",           price: "$52", image: "/tshirts/tshirt_03_anime.png", tag: "New Drop" },
  { id: 6,  category: 't-shirts', subcat: 'graphic',   name: "Y2K Flame Retro Tee",              price: "$50", image: "/tshirts/tshirt_04_y2k.png", tag: "" },
  { id: 7,  category: 't-shirts', subcat: 'graphic',   name: "Members Punk Club Graphic",         price: "$48", image: "/graphic_tee_hero.jpg", tag: "Trending" },
  { id: 32, category: 't-shirts', subcat: 'graphic',   name: "Dark Grunge Statement Tee",        price: "$50", image: "/tshirts/tshirt_06_grunge.png", tag: "" },

  // T-SHIRTS - Minimal (5 products)
  { id: 8,  category: 't-shirts', subcat: 'minimal',   name: "404 Error Tech Tee",               price: "$45", image: "/tshirts/tshirt_07_tech.png", tag: "Essential" },
  { id: 9,  category: 't-shirts', subcat: 'minimal',   name: "Heavyweight Blank White",          price: "$35", image: "/tops-gemini/top-11.png", tag: "" },
  { id: 10, category: 't-shirts', subcat: 'minimal',   name: "Relaxed Fit Basic Black",          price: "$30", image: "/tops-gemini/top-8.png", tag: "" },
  { id: 33, category: 't-shirts', subcat: 'minimal',   name: "Monochrome Minimalist Tee",        price: "$38", image: "/tops-gemini/top-9.png", tag: "" },
  { id: 34, category: 't-shirts', subcat: 'minimal',   name: "Clean Sage Premium Tee",           price: "$42", image: "/tops-gemini/top-14.png", tag: "Essential" },

  // JACKETS - Denim
  { id: 11, category: 'jackets', subcat: 'denim-jackets',   name: "Stay Positive Denim Trucker",     price: "$120", image: "/denim_jacket_hero.jpg", tag: "Hot" },
  { id: 12, category: 'jackets', subcat: 'denim-jackets',   name: "Minimal Raw Denim Trucker",       price: "$110", image: "/shirts/denim_trucker.png", tag: "" },
  { id: 13, category: 'jackets', subcat: 'denim-jackets',   name: "Archive Vintage Denim Jacket",    price: "$140", image: "/denim_jacket_2.jpg", tag: "Best Seller" },
  // JACKETS - Printed/Other
  { id: 14, category: 'jackets', subcat: 'printed-jackets', name: "Oversized Bomber Jacket",         price: "$120", image: "/shirts/bomber_jacket.png", tag: "" },
  { id: 15, category: 'jackets', subcat: 'printed-jackets', name: "Cropped Puffer Shell",             price: "$155", image: "/shirts/puffer_jacket.png", tag: "New Drop" },
  { id: 16, category: 'jackets', subcat: 'printed-jackets', name: "Satin Varsity Jacket",             price: "$165", image: "/shirts/varsity.png", tag: "" },
  { id: 17, category: 'jackets', subcat: 'printed-jackets', name: "Mountain Fleece Zip-Up",           price: "$130", image: "/shirts/fleece_jacket.png", tag: "Hot" },
  { id: 18, category: 'jackets', subcat: 'printed-jackets', name: "Utility Field Jacket",             price: "$140", image: "/shirts/utility_field.png", tag: "Trending" },

  // COLLECTIONS (Streetwear Drops)
  { id: 19, category: 'collections', subcat: 'streetwear-drops', name: "Drop-Shoulder Flannel Shacket",  price: "$90",  image: "/shirts/flannel_shacket.png", tag: "Limited" },
  { id: 20, category: 'collections', subcat: 'streetwear-drops', name: "Glitch System Override Tee",     price: "$55",  image: "/tshirts/tshirt_01_glitch.png", tag: "Exclusive" },
  { id: 21, category: 'collections', subcat: 'streetwear-drops', name: "Y2K Flame Drop Tee",             price: "$50",  image: "/tshirts/tshirt_04_y2k.png", tag: "" },
  
  // NEW DROP (Trending)
  { id: 22, category: 'new drop', subcat: 'trending', name: "Dark Grunge Chaos Tee",       price: "$50",  image: "/tshirts/tshirt_06_grunge.png", tag: "Just Dropped" },
  { id: 23, category: 'new drop', subcat: 'trending', name: "Anime Warrior Panel Tee",     price: "$52",  image: "/tshirts/tshirt_03_anime.png", tag: "New Drop" },
  { id: 24, category: 'new drop', subcat: 'trending', name: "Oversized Bomber Jacket",     price: "$120", image: "/shirts/bomber_jacket.png", tag: "Hot" }
];

const CollectionRow = ({ title, description, image, index, onAction }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`collection-row ${isVisible ? 'visible' : ''}`}>
      <div className="collection-image">
        <img src={image} alt={title} />
      </div>
      <div className="collection-info">
        <h3 className="collection-title">{title}</h3>
        <p className="collection-desc">{description}</p>
        <button className="btn-secondary" onClick={onAction}>
          EXPLORE DROP <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const MegaMenu = ({ category, onNav, isOpen }) => {
  const columns = NAV_MENUS[category] || [];
  return (
    <div className={`mega-menu ${isOpen ? 'mega-menu-open' : ''}`}>
      {columns.map((col, idx) => (
        <div className="mega-column" key={idx}>
          <h4>{col.title}</h4>
          <ul>
            {col.links.map(link => (
              <li key={link.id}>
                <a onClick={() => onNav(category, link.id)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const ProductCard = ({ product, onClick, onAddToBag }) => (
  <div className="product-card" onClick={() => onClick(product)}>
    <div className="product-image-container">
      <img src={product.image} alt={product.name} />
      {product.tag && <div className="product-badge">{product.tag}</div>}
      <div className="unisex-label">UNISEX FIT</div>
      <button className="product-add-btn" onClick={(e) => { e.stopPropagation(); onAddToBag(product); }}>
        Quick Add
      </button>
    </div>
    <div className="product-info">
      <div>
        <div className="product-name">{product.name}</div>
        <div className="product-style-with">Oversized & Layer-Ready</div>
      </div>
      <div className="product-price">{product.price}</div>
    </div>
  </div>
);

const CategoryPage = ({ currentView, onProductClick, onAddToBag }) => {
  const products = ALL_PRODUCTS.filter(p => {
    if (p.category !== currentView.page) return false;
    if (currentView.subcat && p.subcat !== currentView.subcat) return false;
    return true;
  });

  const categoryTitles = {
    't-shirts': "T-Shirts",
    'jackets': "Jackets",
    'new drop': "New Drop",
    'collections': "Collections"
  };

  let title = categoryTitles[currentView.page];
  if (currentView.subcat) {
    const menus = NAV_MENUS[currentView.page] || [];
    for (const group of menus) {
      const match = group.links.find(l => l.id === currentView.subcat);
      if (match) title = match.label;
    }
  }

  return (
    <div className="category-page fade-in">
      <div className="category-header">
        <h1 className="category-title">{title}</h1>
        {currentView.subcat && (
          <p className="category-subtitle">
            Curated Tops & Outerwear
          </p>
        )}
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '100px 0', fontSize: '20px', fontWeight: 'bold' }}>
          SOLD OUT / RESTOCKING SOON
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product, idx) => (
            <div style={{ animationDelay: `${idx * 0.1}s` }} key={product.id}>
              <ProductCard product={product} onClick={onProductClick} onAddToBag={onAddToBag} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductDetailPage = ({ product, onBack, products, onAddToBag }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  // Suggest random tops/jackets for styling
  const suggestions = products.filter(p => p.id !== product.id).sort(() => 0.5 - Math.random()).slice(0, 2);

  return (
    <div className="product-detail-page fade-in">
      <button className="back-btn" onClick={onBack}>← Back to collections</button>
      
      <div className="product-detail-grid">
        <div className="product-detail-image-wrapper">
          <img src={product.image} alt={product.name} className="product-detail-img" />
          {product.tag && <div className="product-badge large-badge">{product.tag}</div>}
        </div>
        
        <div className="product-detail-info">
          <div className="detail-header">
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-price">{product.price}</p>
          </div>
          
          <div className="detail-unisex-banner">ALL GENDERS / UNISEX FIT</div>
          
          <div className="detail-description">
            Heavyweight construction. Drop shoulders. Designed for a perfectly oversized drape. 
            Layer this iconic piece to complete your streetwear uniform.
          </div>

          <div className="size-selector">
            <div className="size-header">
              <span>Select Size</span>
              <span className="size-guide">Size Guide (Oversized Fits)</span>
            </div>
            <div className="size-options">
              {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                <button key={s} className="size-btn">{s}</button>
              ))}
            </div>
          </div>
          
          <button className="btn-primary add-to-cart-large" onClick={() => onAddToBag(product)}>ADD TO BAG</button>
          
          <div className="style-it-with">
            <h3>Style it with</h3>
            <p>Layer this piece with these essentials for maximum streetwear appeal.</p>
            <div className="suggestions-grid">
               {suggestions.map(s => (
                 <div className="suggestion-card" key={s.id} onClick={() => alert('Navigate to ' + s.name)}>
                   <img src={s.image} alt={s.name} />
                   <div className="suggestion-info">
                     <div className="suggestion-name">{s.name}</div>
                     <div className="suggestion-price">{s.price}</div>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const googleBtnRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && window.google && GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID') {
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response) => {
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            onSuccess({
              name: payload.name,
              email: payload.email,
              picture: payload.picture,
            });
          },
        });
        if (googleBtnRef.current) {
          googleBtnRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'filled_black',
            size: 'large',
            width: 320,
            text: 'continue_with',
            shape: 'pill',
          });
        }
      } catch (e) {
        console.error('Google Sign-In error:', e);
      }
    }
  }, [isOpen, onSuccess]);

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onSuccess({
        name: 'Streetwear Fan',
        email: 'fan@arcopus.xyz',
        picture: 'https://ui-avatars.com/api/?name=SF&background=e53e3e&color=fff&size=128&bold=true&font-size=0.5',
      });
      setIsLoading(false);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal-v3" onClick={e => e.stopPropagation()}>
        <button className="auth-close-v3" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
        
        <div className="auth-split-container">
          <div className="auth-image-side">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000" 
              alt="High Fashion Streetwear"
              className="auth-hero-img"
            />
            <div className="auth-image-overlay">
              <div className="auth-quote">"THE STREETS ARE YOUR RUNWAY."</div>
            </div>
          </div>
          
          <div className="auth-content-side">
            <div className="auth-brand-v3">ARC OPUS</div>
            <h2 className="auth-title-v3">JOIN THE<br/>NETWORK</h2>
            <p className="auth-desc-v3">
              Unlock exclusive streetwear drops, track your orders, and sync your shopping bag across all devices.
            </p>

            <div className="auth-button-group-v3">
              {GOOGLE_CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID' ? (
                <div ref={googleBtnRef} className="google-btn-wrap-v3"></div>
              ) : (
                <button className="google-btn-v3" onClick={handleDemoLogin} disabled={isLoading}>
                  {isLoading ? (
                    <div className="google-btn-spinner-v3">AUTHORIZING...</div>
                  ) : (
                    <>
                      <svg className="google-icon-v3" viewBox="0 0 24 24" width="20" height="20">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      CONTINUE WITH GOOGLE
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="auth-perks-v3">
              <div className="auth-perk-v3">
                <Zap size={16} /> <span>Priority access to limited drops.</span>
              </div>
              <div className="auth-perk-v3">
                <ShoppingBag size={16} /> <span>Persistent shopping bag.</span>
              </div>
            </div>

            <div className="auth-footer-v3">
              BY CONTINUING, YOU AGREE TO OUR <a href="#">TERMS OF USE</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, onRemove }) => {
  const total = cart.reduce((sum, item) => sum + parseInt(item.price.replace('$', '')), 0);

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'cart-overlay-open' : ''}`} onClick={onClose}></div>
      <div className={`cart-drawer ${isOpen ? 'cart-drawer-open' : ''}`}>
        <div className="cart-header">
          <h2>YOUR BAG ({cart.length})</h2>
          <button className="cart-close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">YOUR BAG IS EMPTY</div>
          ) : (
            cart.map((item, idx) => (
              <div className="cart-item" key={`${item.id}-${idx}`}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">{item.price} / SIZE: M</div>
                  <button className="cart-remove-btn" onClick={() => onRemove(idx)}>REMOVE</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total-row">
              <span>SUBTOTAL</span>
              <span>${total}</span>
            </div>
            <button className="btn-primary checkout-btn">CHECKOUT NOW</button>
            <p className="cart-shipping-info">Shipping and taxes calculated at checkout.</p>
          </div>
        )}
      </div>
    </>
  );
};

const UserDrawer = ({ isOpen, onClose, user, onLogout }) => {
  if (!user) return null;

  const mockOrders = [
    { id: '#8842', date: 'Oct 12, 2026', status: 'In Transit', total: '$145.00' },
    { id: '#8711', date: 'Sep 28, 2026', status: 'Delivered', total: '$40.00' }
  ];

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'cart-overlay-open' : ''}`} onClick={onClose}></div>
      <div className={`cart-drawer user-drawer ${isOpen ? 'cart-drawer-open' : ''}`}>
        <div className="cart-header">
          <h2>ACCOUNT PROFILE</h2>
          <button className="cart-close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="user-drawer-content">
          <div className="user-profile-header">
            <img src={user.picture} alt={user.name} className="user-profile-img" />
            <div className="user-profile-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <div className="user-status-tag">ARC MEMBER</div>
            </div>
          </div>

          <div className="user-section">
            <div className="user-section-title"><MapPin size={16} /> SHIPPING ADDRESS</div>
            <div className="user-address-card">
              <strong>OFFICE / PRIMARY</strong>
              <p>720 West 27th Street<br/>New York, NY 10001<br/>United States</p>
              <button className="user-edit-btn">EDIT ADDRESS</button>
            </div>
          </div>

          <div className="user-section">
            <div className="user-section-title"><Package size={16} /> RECENT ORDERS</div>
            <div className="user-orders">
              {mockOrders.map(order => (
                <div className="user-order-item" key={order.id}>
                  <div className="order-main">
                    <span className="order-id">ORDER {order.id}</span>
                    <span className="order-status">{order.status}</span>
                  </div>
                  <div className="order-sub">
                    <span>{order.date}</span>
                    <span>{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="user-view-all">VIEW ALL ORDERS</button>
          </div>
        </div>

        <div className="user-drawer-footer">
          <button className="user-settings-btn"><Settings size={18} /> ACCOUNT SETTINGS</button>
          <button className="user-logout-btn" onClick={onLogout}>
            <LogOut size={18} /> SIGN OUT OF ARC OPUS
          </button>
        </div>
      </div>
    </>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState({ page: 'home', subcat: null, productId: null });
  const [activeMenu, setActiveMenu] = useState(null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingCartItem, setPendingCartItem] = useState(null);
  const [cartNotification, setCartNotification] = useState(null);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showUserDrawer, setShowUserDrawer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleAddToBag = (product) => {
    if (!user) {
      setPendingCartItem(product);
      setShowAuthModal(true);
      return;
    }
    setCart(prev => [...prev, product]);
    setShowCartDrawer(true);
    // Removed toast in favor of opening the drawer
  };

  const handleGoogleSuccess = (userData) => {
    setUser(userData);
    setShowAuthModal(false);
    if (pendingCartItem) {
      setCart(prev => [...prev, pendingCartItem]);
      setPendingCartItem(null);
    }
    // Automatically show the bag after logging in
    setTimeout(() => setShowCartDrawer(true), 500);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  const handleNavClick = (page, subcat = null, e = null) => {
    if (e) e.preventDefault();
    setCurrentView({ page, subcat, productId: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedProduct = currentView.productId ? ALL_PRODUCTS.find(p => p.id === currentView.productId) : null;

  return (
    <div className="app-container">
      <div className="announcement-bar">
        FREE WORLDWIDE SHIPPING ON ALL STREETWEAR DROPS
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-brand-group">
          <div className="nav-brand" style={{ cursor: 'pointer' }} onClick={() => handleNavClick('home')}>
            <img src="/arc_opus_logo.jpeg" alt="ARC OPUS" className="nav-brand-logo" />
            ARC OPUS
          </div>
          <a
            href="#home"
            onClick={(e) => handleNavClick('home', null, e)}
            className={`nav-link home-link ${currentView.page === 'home' ? 'active' : ''}`}
          >
            home
          </a>
        </div>

        <div className="nav-links">
          {['t-shirts', 'jackets', 'collections', 'new drop'].map(cat => (
            <div className="nav-item" key={cat}
              onMouseEnter={() => setActiveMenu(cat)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <a
                href={`#${cat}`}
                onClick={(e) => { handleNavClick(cat, null, e); setActiveMenu(null); }}
                className={`nav-link ${currentView.page === cat && !currentView.productId ? 'active' : ''}`}
              >
                {cat.replace('-', ' ')}
              </a>
              <MegaMenu category={cat} onNav={(c, s) => { handleNavClick(c, s); setActiveMenu(null); }} isOpen={activeMenu === cat} />
            </div>
          ))}
        </div>

        <div className="nav-icons">
          <button className="nav-icon"><Search size={22} strokeWidth={2.5} /></button>
          <button className="nav-icon"><Heart size={22} strokeWidth={2.5} /></button>
          <button className="nav-icon cart-icon-wrapper" onClick={() => setShowCartDrawer(true)}>
            <ShoppingBag size={22} strokeWidth={2.5} />
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </button>
          {user ? (
            <div className="user-logged-in" onClick={() => setShowUserDrawer(true)} title={`Signed in as ${user.name}`}>
              <img src={user.picture} alt={user.name} className="user-avatar" />
            </div>
          ) : (
            <button className="nav-icon" onClick={() => setShowAuthModal(true)}><User size={22} strokeWidth={2.5} /></button>
          )}
        </div>
      </nav>

      {selectedProduct ? (
        <ProductDetailPage 
          product={selectedProduct} 
          products={ALL_PRODUCTS}
          onBack={() => setCurrentView({ ...currentView, productId: null })}
          onAddToBag={handleAddToBag}
        />
      ) : currentView.page === 'home' ? (
        <>
          <section className="hero">
            <img
              src="https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Streetwear Culture"
              className="hero-bg fade-in"
            />
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="hero-badge fade-in delay-1">NEW DROP LIVE</div>
              <h1 className="hero-title fade-in delay-2">WEAR<br/>YOUR VIBE</h1>
              <p className="hero-tagline fade-in delay-3">STREET MODE ON. THE ULTIMATE UNISEX TOPS & JACKETS.</p>
              <div className="fade-in delay-3" style={{ marginTop: '30px' }}>
                <button className="btn-primary" onClick={() => handleNavClick('new drop')}>DISCOVER THE COLLECTION</button>
              </div>
            </div>
          </section>

          <div className="scrolling-banner">
            <div className="banner-text">
              JUST DROPPED • STREETWEAR CLASSICS • LIMITED EDITION • OVERSIZED EVERYTHING • WEAR YOUR VIBE • JUST DROPPED • STREETWEAR CLASSICS • LIMITED EDITION • OVERSIZED EVERYTHING • WEAR YOUR VIBE • JUST DROPPED 
            </div>
          </div>

          <section className="collections-section" id="collections">
            <div className="collection-grid">

              {/* Row 1: Oversized T-Shirts — user provided image */}
              <CollectionRow
                title="OVERSIZED FITS"
                description="Drop shoulders, boxy cuts, heavy cotton. These aren't your average tees — they're statements. Built for the streets, worn by anyone who walks like they own them."
                image="/oversized_tee_hero.png"
                index={0}
                onAction={() => handleNavClick('t-shirts', 'oversized')}
              />

              {/* Row 2: Bomber Jacket — confirmed local: bomber_jacket.png */}
              <CollectionRow
                title="THE BOMBER DROP"
                description="The bomber jacket is back — louder, puffier, and more oversized than ever. From satin finishes to utility shells, this is outerwear for people who don't follow seasons."
                image="/shirts/bomber_jacket.png"
                index={1}
                onAction={() => handleNavClick('jackets', 'printed-jackets')}
              />

              {/* Row 3: Graphic Tee — user provided image */}
              <CollectionRow
                title="GRAPHIC TEES"
                description="Your tee is your billboard. Bold prints, washed-out imagery, and back graphics that turn heads on every corner. Zero effort, maximum drip."
                image="/graphic_tee_hero.jpg"
                index={2}
                onAction={() => handleNavClick('t-shirts', 'graphic')}
              />

              {/* Row 4: Denim Jacket — user provided image */}
              <CollectionRow
                title="DENIM JACKETS"
                description="Distressed, raw-hem, or clean — a denim trucker is the one piece that goes with literally everything. Throw it on unbuttoned over any fit. Done."
                image="/denim_jacket_hero.jpg"
                index={3}
                onAction={() => handleNavClick('jackets', 'denim-jackets')}
              />

              {/* Row 5: Minimal Tee — confirmed local: top-11.png */}
              <CollectionRow
                title="MINIMAL CORE"
                description="Sometimes less is more. Clean blank tees in muted tones — white, grey, black. The foundation of every clean, effortless outfit. Stack 'em. Layer 'em. Own 'em."
                image="/tops-gemini/top-11.png"
                index={4}
                onAction={() => handleNavClick('t-shirts', 'minimal')}
              />

              {/* Row 6: Varsity / Limited Drop — confirmed local: varsity.png */}
              <CollectionRow
                title="THE LIMITED DROP"
                description="Only a few pieces. Only this season. Exclusive streetwear drops that disappear as fast as they appear. Cop before it's gone — because it will be."
                image="/shirts/varsity.png"
                index={5}
                onAction={() => handleNavClick('collections', 'streetwear-drops')}
              />

            </div>
          </section>
        </>
      ) : (
        <CategoryPage 
          currentView={currentView} 
          onProductClick={(p) => setCurrentView({ ...currentView, productId: p.id })}
          onAddToBag={handleAddToBag}
        />
      )}

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Shop</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => handleNavClick('t-shirts', null, e)}>All T-Shirts</a></li>
              <li><a href="#" onClick={(e) => handleNavClick('jackets', null, e)}>All Jackets</a></li>
              <li><a href="#" onClick={(e) => handleNavClick('collections', null, e)}>Limited Drops</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Oversized Size Guide</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li><a href="#">collab@arcopus.xyz</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Join The Drop</h4>
            <div className="footer-links" style={{ marginBottom: '15px', color: '#888' }}>
              Sign up for exclusive access to limited streetwear drops.
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="ENTER EMAIL" className="newsletter-input" required />
              <button type="submit" className="newsletter-btn">SUBMIT</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div style={{ fontWeight: 'bold' }}>&copy; {new Date().getFullYear()} ARC OPUS INC.</div>
          <div className="social-icons">
            <a href="#">INSTAGRAM</a>
            <a href="#">TIKTOK</a>
            <a href="#">X</a>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => { setShowAuthModal(false); setPendingCartItem(null); }}
        onSuccess={handleGoogleSuccess}
      />

      <CartDrawer
        isOpen={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
        cart={cart}
        onRemove={(idx) => setCart(prev => prev.filter((_, i) => i !== idx))}
      />

      <UserDrawer
        isOpen={showUserDrawer}
        onClose={() => setShowUserDrawer(false)}
        user={user}
        onLogout={() => { handleLogout(); setShowUserDrawer(false); }}
      />

      {cartNotification && (
        <div className="cart-toast" key={cartNotification._nid}>
          <div className="cart-toast-inner">
            <img src={cartNotification.image} alt="" className="cart-toast-img" />
            <div>
              <div className="cart-toast-check">✓ ADDED TO BAG</div>
              <div className="cart-toast-name">{cartNotification.name}</div>
              <div className="cart-toast-price">{cartNotification.price}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
