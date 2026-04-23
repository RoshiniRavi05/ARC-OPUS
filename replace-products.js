import fs from 'fs';

const PATH = './src/App.jsx';
let content = fs.readFileSync(PATH, 'utf-8');

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
            products.push(`  { id: ${id}, category: '${catName}', subcat: '${subcat}', name: "${item}", price: "$${Math.floor(Math.random() * 100) + 60}", image: "https://loremflickr.com/400/500/${keyword}?lock=${id}" }`);
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

const newProductsStr = generateProducts();

// Regex to replace ALL_PRODUCTS array
const regex = /const ALL_PRODUCTS = \[([\s\S]*?)];/;
content = content.replace(regex, newProductsStr);

// Let's also update the "Signature Cuts" section to fit the new Levi's theme!
const collectionsSectionRegex = /<section className="collections-section" id="collections">([\s\S]*?)<\/section>/;
const newCollectionsSection = `<section className="collections-section" id="collections">
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
          </section>`;
content = content.replace(collectionsSectionRegex, newCollectionsSection);

// Update nav menus to have appropriate subcategories for the Classic Wardrobe
const navMenuRegex = /const NAV_MENUS = \{([\s\S]*?)\};\n/;
const newNavMenu = `const NAV_MENUS = {
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
`;

content = content.replace(navMenuRegex, newNavMenu);

fs.writeFileSync(PATH, content);
console.log("App.jsx updated with Levis Classic Wardrobe items and 50 unique images.");
