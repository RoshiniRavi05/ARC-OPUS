import fs from 'fs';

const PATH = './src/App.jsx';

const MEN = [
    "501® Original Jeans", "XX Chino Standard Fit", "Classic Logo Graphic Tee", "Signature Button-Down Shirt", "Original Trucker Jacket",
    "511™ Slim Fit Jeans", "Carrier Cargo Shorts", "Relaxed Fit Vintage Tee", "Western Denim Shirt", "Sherpa Lined Trucker"
];

const WOMEN = [
    "501® Original Women's Jeans", "Ribbed Tank Top", "Vintage Graphic Tee", "Classic Denim Skirt", "Utility Field Jacket",
    "721 High Rise Skinny", "Pleated Chino Trousers", "Oversized Denim Shirt", "High Rise Denim Shorts", "Boxy Cropped Tee"
];

const NEW = [
    "Modern 501® '90s Jeans", "Workwear Carpenter Pants", "Archive Logo Graphic Tee", "Canvas Over-Shirt", "Fleece Lined Denim Jacket",
    "High-Rise Bootcut Jeans", "Relaxed Fit Chinos", "Retro Graphic Tee", "Relaxed Flannel Shirt", "Utility Chore Coat"
];

const COLLECTIONS = [
    "501® '93 Vintage Collection", "Premium Khaki Chinos", "Artist Capsule Graphic Tee", "Deconstructed Denim Vest", "501® '54 Archival Fit",
    "Tailored Premium Chino", "Limited Edition Print Tee", "Chambray Western Shirt", "Rigid Selvedge Denim Jacket", "Camp Collar Resort Shirt"
];

const ARCHIVE = [
    "1955 501® Original", "1930s Sateen Chino", "Red Tab Logo Tee", "1960s Plaid Flannel", "Type II Archival Trucker",
    "1944 501® WWII Edition", "Distressed Wash Vintage Tee", "1970s Denim Western Shirt", "Archival Sherpa Collar Jacket", "Tab Twill Trousers"
];

function generateProducts() {
    let products = [];
    let id = 1;

    const addCategory = (catName, subcats, items, keyword) => {
        items.forEach((item, index) => {
            let subcat = subcats[index % subcats.length];
            products.push(`  { id: ${id}, category: '${catName}', subcat: '${subcat}', name: "${item}", price: "$${Math.floor(Math.random() * 40) + 60}", image: "https://loremflickr.com/400/500/${keyword}?lock=${id}" }`);
            id++;
        });
    };

    addCategory('men', ['tees', 'hoodies', 'parachute', 'cargos', 'denim'], MEN, "menswear,denim");
    addCategory('women', ['crops', 'blazers', 'corsets', 'skirts', 'wide-jeans'], WOMEN, "womenswear,jeans");
    addCategory('new', ['all-new', 'restocks'], NEW, "fashion,clothing");
    addCategory('collections', ['void', 'brutalism'], COLLECTIONS, "denim,jacket");
    addCategory('archive', ['runway', 'rare'], ARCHIVE, "vintage,jeans");

    return "const ALL_PRODUCTS = [\n" + products.join(",\n") + "\n];";
}

const allProductsStr = generateProducts();

const appJsxContent = \`import React, { useState, useEffect, useRef } from 'react';
import { Search, Heart, ShoppingBag, User, ArrowRight } from 'lucide-react';

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
  men: [
    { title: 'Denim', links: [{ id: 'denim', label: '501® Jeans' }] },
    { title: 'Tops', links: [{ id: 'tees', label: 'Graphic Tees' }, { id: 'hoodies', label: 'Shirts & Jackets' }] },
    { title: 'Bottoms', links: [{ id: 'cargos', label: 'XX Chinos' }, { id: 'parachute', label: 'Shorts' }] }
  ],
  women: [
    { title: 'Denim', links: [{ id: 'wide-jeans', label: 'Original Jeans' }, { id: 'skirts', label: 'Denim Skirts' }] },
    { title: 'Tops', links: [{ id: 'crops', label: 'Tees & Tops' }, { id: 'blazers', label: 'Jackets' }] },
    { title: 'Bottoms', links: [{ id: 'track', label: 'Chinos' }, { id: 'corsets', label: 'Shorts' }] }
  ],
  new: [
    { title: 'Latest', links: [{ id: 'all-new', label: 'New Arrivals' }, { id: 'restocks', label: 'Restocks' }] }
  ],
  collections: [
    { title: 'Curated Drops', links: [{ id: 'void', label: 'Classic Collection' }, { id: 'brutalism', label: 'Modern Fits' }] }
  ],
  archive: [
    { title: 'Vault', links: [{ id: 'runway', label: 'Vintage Archive' }, { id: 'rare', label: 'Rare Finds' }] }
  ]
};

\${allProductsStr}

const CollectionRow = ({ title, description, image, index }) => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={\`collection-row \${isVisible ? 'visible' : ''}\`}>
      <div className="collection-image">
        <img src={image} alt={title} />
      </div>
      <div className="collection-info">
        <h3 className="collection-title">{title}</h3>
        <p className="collection-desc">{description}</p>
        <button className="btn-secondary">
          SHOP CLASSICS <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const MegaMenu = ({ category, onNav }) => {
  const columns = NAV_MENUS[category] || [];
  return (
    <div className="mega-menu">
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

const CategoryPage = ({ currentView }) => {
  const products = ALL_PRODUCTS.filter(p => {
    if (p.category !== currentView.page) return false;
    if (currentView.subcat && p.subcat !== currentView.subcat) return false;
    return true;
  });

  const categoryTitles = {
    men: "Men's Archive",
    women: "Women's Collection",
    new: "New Drop",
    collections: "Curated Edits",
    archive: "The Vault"
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
          <p style={{ marginTop: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Viewing All {title}
          </p>
        )}
      </div>
      
      {products.length === 0 ? (
        <div style={{textAlign: 'center', margin: '100px 0', fontSize: '20px'}}>
          SOLD OUT / RESTOCKING SOON
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product, idx) => (
            <div className="product-card" style={{animationDelay: \`\${idx * 0.1}s\`}} key={product.id}>
              <div className="product-image-container">
                <img src={product.image} alt={product.name} />
                <button className="product-add-btn">Add to Bag</button>
              </div>
              <div className="product-info">
                <div>
                  <div className="product-name">{product.name}</div>
                </div>
                <div className="product-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState({ page: 'home', subcat: null });

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

  const handleNavClick = (page, subcat = null, e = null) => {
    if (e) e.preventDefault();
    setCurrentView({ page, subcat });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="announcement-bar">
        LIMITED DROP LIVE NOW — FREE WORLDWIDE SHIPPING ON ORDERS OVER $200
      </div>
      
      <nav className={\`navbar \${scrolled ? 'scrolled' : ''}\`}>
        <div className="nav-brand" style={{cursor:'pointer'}} onClick={() => handleNavClick('home')}>
          <div className="nav-brand-icon">L</div>
          LEVI'S WARDROBE
        </div>
        
        <div className="nav-links">
          {['men', 'women', 'new', 'collections', 'archive'].map(cat => (
            <div className="nav-item" key={cat}>
              <a 
                href={\`#\${cat}\`} 
                onClick={(e) => handleNavClick(cat, null, e)} 
                className={\`nav-link \${currentView.page === cat ? 'active' : ''}\`}
              >
                {cat}
              </a>
              <MegaMenu category={cat} onNav={handleNavClick} />
            </div>
          ))}
        </div>
        
        <div className="nav-icons">
          <button className="nav-icon"><Search size={20} /></button>
          <button className="nav-icon"><Heart size={20} /></button>
          <button className="nav-icon"><ShoppingBag size={20} /></button>
          <button className="nav-icon"><User size={20} /></button>
        </div>
      </nav>

      {currentView.page === 'home' ? (
        <>
          <section className="hero">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80" 
              alt="Fashion Model" 
              className="hero-bg fade-in"
            />
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1 className="hero-title fade-in delay-1">The Classic Wardrobe</h1>
              <p className="hero-tagline fade-in delay-2">Versatile. Timeless. Essential.</p>
              <div className="fade-in delay-3">
                <button className="btn-primary" onClick={() => handleNavClick('new')}>Explore Collection</button>
              </div>
            </div>
          </section>

          <section className="collections-section" id="collections">
            <div className="section-header">
              <h2 className="section-title">Classic Wardrobe Essentials</h2>
            </div>
            
            <div className="collection-grid">
              <CollectionRow 
                title="501® Originals"
                description="This is where it all started. The 501® Original is a piece of denim history. It works with anything."
                image="https://loremflickr.com/600/400/jeans?lock=101"
                index={0}
              />
              <CollectionRow 
                title="XX Chinos"
                description="Every wardrobe needs an alternative to denim. The chinos are that bridge. They bring structure without stiffness."
                image="https://loremflickr.com/600/400/chinos?lock=102"
                index={1}
              />
              <CollectionRow 
                title="Graphic Tees"
                description="Every classic wardrobe needs something with a bit of personality. That's where graphic tees come in."
                image="https://loremflickr.com/600/400/tshirt?lock=103"
                index={2}
              />
              <CollectionRow 
                title="Signature Shirts"
                description="A classic wardrobe needs at least one shirt that can handle both a formal setting and still feel right at a weekend brunch."
                image="https://loremflickr.com/600/400/shirt?lock=104"
                index={3}
              />
            </div>
          </section>
        </>
      ) : (
        <CategoryPage currentView={currentView} />
      )}

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => handleNavClick('men', null, e)}>Shop Men</a></li>
              <li><a href="#" onClick={(e) => handleNavClick('women', null, e)}>Shop Women</a></li>
              <li><a href="#" onClick={(e) => handleNavClick('collections', null, e)}>Lookbook</a></li>
              <li><a href="#">Stockists</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Size Guide</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul className="footer-links">
              <li><a href="#">info@classicwardrobe.xyz</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Newsletter</h4>
            <div className="footer-links" style={{marginBottom: '15px'}}>
              <a href="#">Join our list for early access to drops.</a>
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email Address" className="newsletter-input" required />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} Classic Wardrobe. All Rights Reserved.</div>
          <div className="social-icons">
            <a href="#">IG</a>
            <a href="#">TW</a>
            <a href="#">FB</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
\`;

fs.writeFileSync(PATH, appJsxContent);
console.log('App.jsx has been completely regenerated safely with exactly 50 items and images.');
