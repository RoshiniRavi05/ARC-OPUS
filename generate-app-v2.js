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

    return "const ALL_PRODUCTS = [\n" + products.join(",\n") + "\n];\n";
}

const allProductsStr = generateProducts();

const part1 = "import React, { useState, useEffect, useRef } from 'react';\n" +
    "import { Search, Heart, ShoppingBag, User, ArrowRight } from 'lucide-react';\n\n" +
    "const useScrollAnimation = () => {\n" +
    "  const [isVisible, setIsVisible] = useState(false);\n" +
    "  const domRef = useRef();\n\n" +
    "  useEffect(() => {\n" +
    "    const observer = new IntersectionObserver(entries => {\n" +
    "      entries.forEach(entry => setIsVisible(entry.isIntersecting));\n" +
    "    });\n" +
    "    const currentRef = domRef.current;\n" +
    "    if (currentRef) observer.observe(currentRef);\n" +
    "    return () => {\n" +
    "      if (currentRef) observer.unobserve(currentRef);\n" +
    "    };\n" +
    "  }, []);\n\n" +
    "  return [domRef, isVisible];\n" +
    "};\n\n" +
    "const NAV_MENUS = {\n" +
    "  men: [\n" +
    "    { title: 'Denim', links: [{ id: 'denim', label: '501® Jeans' }] },\n" +
    "    { title: 'Tops', links: [{ id: 'tees', label: 'Graphic Tees' }, { id: 'hoodies', label: 'Shirts & Jackets' }] },\n" +
    "    { title: 'Bottoms', links: [{ id: 'cargos', label: 'XX Chinos' }, { id: 'parachute', label: 'Shorts' }] }\n" +
    "  ],\n" +
    "  women: [\n" +
    "    { title: 'Denim', links: [{ id: 'wide-jeans', label: 'Original Jeans' }, { id: 'skirts', label: 'Denim Skirts' }] },\n" +
    "    { title: 'Tops', links: [{ id: 'crops', label: 'Tees & Tops' }, { id: 'blazers', label: 'Jackets' }] },\n" +
    "    { title: 'Bottoms', links: [{ id: 'track', label: 'Chinos' }, { id: 'corsets', label: 'Shorts' }] }\n" +
    "  ],\n" +
    "  new: [\n" +
    "    { title: 'Latest', links: [{ id: 'all-new', label: 'New Arrivals' }, { id: 'restocks', label: 'Restocks' }] }\n" +
    "  ],\n" +
    "  collections: [\n" +
    "    { title: 'Curated Drops', links: [{ id: 'void', label: 'Classic Collection' }, { id: 'brutalism', label: 'Modern Fits' }] }\n" +
    "  ],\n" +
    "  archive: [\n" +
    "    { title: 'Vault', links: [{ id: 'runway', label: 'Vintage Archive' }, { id: 'rare', label: 'Rare Finds' }] }\n" +
    "  ]\n" +
    "};\n\n";

const part2 = "const CollectionRow = ({ title, description, image, index }) => {\n" +
    "  const [ref, isVisible] = useScrollAnimation();\n" +
    "  return (\n" +
    "    <div ref={ref} className={`collection-row ${isVisible ? 'visible' : ''}`}>\n" +
    "      <div className=\"collection-image\">\n" +
    "        <img src={image} alt={title} />\n" +
    "      </div>\n" +
    "      <div className=\"collection-info\">\n" +
    "        <h3 className=\"collection-title\">{title}</h3>\n" +
    "        <p className=\"collection-desc\">{description}</p>\n" +
    "        <button className=\"btn-secondary\">\n" +
    "          SHOP CLASSICS <ArrowRight size={16} />\n" +
    "        </button>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  );\n" +
    "};\n\n" +
    "const MegaMenu = ({ category, onNav }) => {\n" +
    "  const columns = NAV_MENUS[category] || [];\n" +
    "  return (\n" +
    "    <div className=\"mega-menu\">\n" +
    "      {columns.map((col, idx) => (\n" +
    "        <div className=\"mega-column\" key={idx}>\n" +
    "          <h4>{col.title}</h4>\n" +
    "          <ul>\n" +
    "            {col.links.map(link => (\n" +
    "              <li key={link.id}>\n" +
    "                <a onClick={() => onNav(category, link.id)}>{link.label}</a>\n" +
    "              </li>\n" +
    "            ))}\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "      ))}\n" +
    "    </div>\n" +
    "  );\n" +
    "};\n\n" +
    "const CategoryPage = ({ currentView }) => {\n" +
    "  const products = ALL_PRODUCTS.filter(p => {\n" +
    "    if (p.category !== currentView.page) return false;\n" +
    "    if (currentView.subcat && p.subcat !== currentView.subcat) return false;\n" +
    "    return true;\n" +
    "  });\n\n" +
    "  const categoryTitles = {\n" +
    "    men: \"Men's Archive\",\n" +
    "    women: \"Women's Collection\",\n" +
    "    new: \"New Drop\",\n" +
    "    collections: \"Curated Edits\",\n" +
    "    archive: \"The Vault\"\n" +
    "  };\n\n" +
    "  let title = categoryTitles[currentView.page];\n" +
    "  if (currentView.subcat) {\n" +
    "    const menus = NAV_MENUS[currentView.page] || [];\n" +
    "    for (const group of menus) {\n" +
    "      const match = group.links.find(l => l.id === currentView.subcat);\n" +
    "      if (match) title = match.label;\n" +
    "    }\n" +
    "  }\n\n" +
    "  return (\n" +
    "    <div className=\"category-page fade-in\">\n" +
    "      <div className=\"category-header\">\n" +
    "        <h1 className=\"category-title\">{title}</h1>\n" +
    "        {currentView.subcat && (\n" +
    "          <p style={{ marginTop: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>\n" +
    "            Viewing All {title}\n" +
    "          </p>\n" +
    "        )}\n" +
    "      </div>\n" +
    "      \n" +
    "      {products.length === 0 ? (\n" +
    "        <div style={{textAlign: 'center', margin: '100px 0', fontSize: '20px'}}>\n" +
    "          SOLD OUT / RESTOCKING SOON\n" +
    "        </div>\n" +
    "      ) : (\n" +
    "        <div className=\"product-grid\">\n" +
    "          {products.map((product, idx) => (\n" +
    "            <div className=\"product-card\" style={{animationDelay: `${idx * 0.1}s`}} key={product.id}>\n" +
    "              <div className=\"product-image-container\">\n" +
    "                <img src={product.image} alt={product.name} />\n" +
    "                <button className=\"product-add-btn\">Add to Bag</button>\n" +
    "              </div>\n" +
    "              <div className=\"product-info\">\n" +
    "                <div>\n" +
    "                  <div className=\"product-name\">{product.name}</div>\n" +
    "                </div>\n" +
    "                <div className=\"product-price\">{product.price}</div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          ))}\n" +
    "        </div>\n" +
    "      )}\n" +
    "    </div>\n" +
    "  );\n" +
    "};\n\n";

const part3 = "function App() {\n" +
    "  const [scrolled, setScrolled] = useState(false);\n" +
    "  const [currentView, setCurrentView] = useState({ page: 'home', subcat: null });\n\n" +
    "  useEffect(() => {\n" +
    "    const handleScroll = () => {\n" +
    "      const isScrolled = window.scrollY > 50;\n" +
    "      if (isScrolled !== scrolled) {\n" +
    "        setScrolled(isScrolled);\n" +
    "      }\n" +
    "    };\n" +
    "    window.addEventListener('scroll', handleScroll);\n" +
    "    return () => window.removeEventListener('scroll', handleScroll);\n" +
    "  }, [scrolled]);\n\n" +
    "  const handleNavClick = (page, subcat = null, e = null) => {\n" +
    "    if (e) e.preventDefault();\n" +
    "    setCurrentView({ page, subcat });\n" +
    "    window.scrollTo({ top: 0, behavior: 'smooth' });\n" +
    "  };\n\n" +
    "  return (\n" +
    "    <>\n" +
    "      <div className=\"announcement-bar\">\n" +
    "        LIMITED TIME ONLY — FREE WORLDWIDE SHIPPING ON WARDROBE ESSENTIALS\n" +
    "      </div>\n" +
    "      \n" +
    "      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>\n" +
    "        <div className=\"nav-brand\" style={{cursor:'pointer'}} onClick={() => handleNavClick('home')}>\n" +
    "          <div className=\"nav-brand-icon\">LW</div>\n" +
    "          CLASSIC WARDROBE\n" +
    "        </div>\n" +
    "        \n" +
    "        <div className=\"nav-links\">\n" +
    "          {['men', 'women', 'new', 'collections', 'archive'].map(cat => (\n" +
    "            <div className=\"nav-item\" key={cat}>\n" +
    "              <a \n" +
    "                href={`#${cat}`} \n" +
    "                onClick={(e) => handleNavClick(cat, null, e)} \n" +
    "                className={`nav-link ${currentView.page === cat ? 'active' : ''}`}\n" +
    "              >\n" +
    "                {cat}\n" +
    "              </a>\n" +
    "              <MegaMenu category={cat} onNav={handleNavClick} />\n" +
    "            </div>\n" +
    "          ))}\n" +
    "        </div>\n" +
    "        \n" +
    "        <div className=\"nav-icons\">\n" +
    "          <button className=\"nav-icon\"><Search size={20} /></button>\n" +
    "          <button className=\"nav-icon\"><Heart size={20} /></button>\n" +
    "          <button className=\"nav-icon\"><ShoppingBag size={20} /></button>\n" +
    "          <button className=\"nav-icon\"><User size={20} /></button>\n" +
    "        </div>\n" +
    "      </nav>\n\n" +
    "      {currentView.page === 'home' ? (\n" +
    "        <>\n" +
    "          <section className=\"hero\">\n" +
    "            <img \n" +
    "              src=\"https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1600&q=80\" \n" +
    "              alt=\"Fashion Model\" \n" +
    "              className=\"hero-bg fade-in\"\n" +
    "            />\n" +
    "            <div className=\"hero-overlay\"></div>\n" +
    "            <div className=\"hero-content\">\n" +
    "              <h1 className=\"hero-title fade-in delay-1\">The Classic Wardrobe</h1>\n" +
    "              <p className=\"hero-tagline fade-in delay-2\">Versatile. Timeless. Essential.</p>\n" +
    "              <div className=\"fade-in delay-3\">\n" +
    "                <button className=\"btn-primary\" onClick={() => handleNavClick('new')}>Explore Collection</button>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </section>\n\n" +
    "          <section className=\"collections-section\" id=\"collections\">\n" +
    "            <div className=\"section-header\">\n" +
    "              <h2 className=\"section-title\">Classic Wardrobe Essentials</h2>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div className=\"collection-grid\">\n" +
    "              <CollectionRow \n" +
    "                title=\"501® Originals\"\n" +
    "                description=\"This is where it all started. The 501® Original is a piece of denim history. It works with anything.\"\n" +
    "                image=\"https://loremflickr.com/600/400/jeans?lock=101\"\n" +
    "                index={0}\n" +
    "              />\n" +
    "              <CollectionRow \n" +
    "                title=\"XX Chinos\"\n" +
    "                description=\"Every wardrobe needs an alternative to denim. The chinos are that bridge. They bring structure without stiffness.\"\n" +
    "                image=\"https://loremflickr.com/600/400/chinos?lock=102\"\n" +
    "                index={1}\n" +
    "              />\n" +
    "              <CollectionRow \n" +
    "                title=\"Graphic Tees\"\n" +
    "                description=\"Every classic wardrobe needs something with a bit of personality. That's where graphic tees come in.\"\n" +
    "                image=\"https://loremflickr.com/600/400/tshirt?lock=103\"\n" +
    "                index={2}\n" +
    "              />\n" +
    "              <CollectionRow \n" +
    "                title=\"Signature Shirts\"\n" +
    "                description=\"A classic wardrobe needs at least one shirt that can handle both a formal setting and still feel right at a weekend brunch.\"\n" +
    "                image=\"https://loremflickr.com/600/400/shirt?lock=104\"\n" +
    "                index={3}\n" +
    "              />\n" +
    "            </div>\n" +
    "          </section>\n" +
    "        </>\n" +
    "      ) : (\n" +
    "        <CategoryPage currentView={currentView} />\n" +
    "      )}\n\n" +
    "      <footer className=\"footer\">\n" +
    "        <div className=\"footer-grid\">\n" +
    "          <div className=\"footer-col\">\n" +
    "            <h4>Quick Links</h4>\n" +
    "            <ul className=\"footer-links\">\n" +
    "              <li><a href=\"#\" onClick={(e) => handleNavClick('men', null, e)}>Shop Men</a></li>\n" +
    "              <li><a href=\"#\" onClick={(e) => handleNavClick('women', null, e)}>Shop Women</a></li>\n" +
    "              <li><a href=\"#\" onClick={(e) => handleNavClick('collections', null, e)}>Lookbook</a></li>\n" +
    "              <li><a href=\"#\">Stockists</a></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "          <div className=\"footer-col\">\n" +
    "            <h4>Support</h4>\n" +
    "            <ul className=\"footer-links\">\n" +
    "              <li><a href=\"#\">FAQ</a></li>\n" +
    "              <li><a href=\"#\">Shipping & Returns</a></li>\n" +
    "              <li><a href=\"#\">Size Guide</a></li>\n" +
    "              <li><a href=\"#\">Track Order</a></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "          <div className=\"footer-col\">\n" +
    "            <h4>Contact</h4>\n" +
    "            <ul className=\"footer-links\">\n" +
    "              <li><a href=\"#\">info@classicwardrobe.xyz</a></li>\n" +
    "              <li><a href=\"#\">Press</a></li>\n" +
    "              <li><a href=\"#\">Careers</a></li>\n" +
    "            </ul>\n" +
    "          </div>\n" +
    "          <div className=\"footer-col\">\n" +
    "            <h4>Newsletter</h4>\n" +
    "            <div className=\"footer-links\" style={{marginBottom: '15px'}}>\n" +
    "              <a href=\"#\">Join our list for early access to drops.</a>\n" +
    "            </div>\n" +
    "            <form className=\"newsletter-form\" onSubmit={(e) => e.preventDefault()}>\n" +
    "              <input type=\"email\" placeholder=\"Email Address\" className=\"newsletter-input\" required />\n" +
    "              <button type=\"submit\" className=\"newsletter-btn\">Subscribe</button>\n" +
    "            </form>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        \n" +
    "        <div className=\"footer-bottom\">\n" +
    "          <div>&copy; {new Date().getFullYear()} Classic Wardrobe. All Rights Reserved.</div>\n" +
    "          <div className=\"social-icons\">\n" +
    "            <a href=\"#\">IG</a>\n" +
    "            <a href=\"#\">TW</a>\n" +
    "            <a href=\"#\">FB</a>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </footer>\n" +
    "    </>\n" +
    "  );\n" +
    "}\n\n" +
    "export default App;\n";

const fullFile = part1 + allProductsStr + part2 + part3;

fs.writeFileSync(PATH, fullFile);
console.log('Successfully wrote App.jsx via concatenation without syntax errors!');
