import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log("Seeding database...");

  // ============================================
  // 1. ADMIN USER
  // ============================================
  console.log("Creating admin user...");
  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.adminUser.upsert({
    where: { email: "admin@metalcraftpanels.com" },
    update: {},
    create: {
      email: "admin@metalcraftpanels.com",
      name: "Admin",
      passwordHash: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  // ============================================
  // 2. PRODUCT CATEGORIES
  // ============================================
  console.log("Creating product categories...");
  const categoryData = [
    {
      name: "Architectural Metal Screens",
      slug: "architectural-metal-screens",
      description:
        "Custom laser-cut and perforated metal screens for interior and exterior architectural applications. Available in a wide range of patterns, materials, and finishes.",
      sortOrder: 1,
    },
    {
      name: "Perforated Metal Sunshades",
      slug: "perforated-metal-sunshades",
      description:
        "Engineered sunshade systems featuring perforated metal panels that reduce solar heat gain while maintaining natural light and exterior views.",
      sortOrder: 2,
    },
    {
      name: "Laser-Cut Railing Systems",
      slug: "laser-cut-railing-systems",
      description:
        "Decorative railing infill panels with intricate laser-cut designs for balconies, staircases, and deck railings.",
      sortOrder: 3,
    },
    {
      name: "Laser-Cut Metal Gates",
      slug: "laser-cut-metal-gates",
      description:
        "Custom metal gates featuring artistic laser-cut patterns for residential and commercial properties.",
      sortOrder: 4,
    },
    {
      name: "Perforated Metal Enclosures",
      slug: "perforated-metal-enclosures",
      description:
        "Functional and decorative enclosures for mechanical equipment, trash areas, and utility screening using perforated metal panels.",
      sortOrder: 5,
    },
  ];

  const categories = [];
  for (const cat of categoryData) {
    const category = await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description, sortOrder: cat.sortOrder },
      create: cat,
    });
    categories.push(category);
  }

  // ============================================
  // 3. PRODUCTS
  // ============================================
  console.log("Creating products...");
  const productData = [
    {
      name: "Decorative Privacy Screen Panel",
      slug: "decorative-privacy-screen-panel",
      description:
        "A versatile decorative metal screen panel ideal for creating privacy barriers, room dividers, and architectural accents. Features precision laser-cut geometric patterns in durable aluminum.",
      features:
        "Precision laser-cut patterns\nAvailable in aluminum and Cor-Ten steel\nMultiple powder coat finishes\nCustom sizing available\nInterior and exterior rated",
      categorySlug: "architectural-metal-screens",
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "Geometric Facade Panel",
      slug: "geometric-facade-panel",
      description:
        "Large-scale architectural facade panels with bold geometric cutout designs. Engineered for building exteriors with integrated mounting systems.",
      features:
        "Engineered for exterior use\nIntegrated mounting system\nCorrosion-resistant materials\nUp to 96\" x 48\" panels\nArchitectural-grade finish",
      categorySlug: "architectural-metal-screens",
      isFeatured: true,
      sortOrder: 2,
    },
    {
      name: "Horizontal Louver Sunshade",
      slug: "horizontal-louver-sunshade",
      description:
        "Perforated horizontal louver sunshade system designed to reduce solar heat gain by up to 60% while maintaining views and natural daylight.",
      features:
        "Reduces solar heat gain up to 60%\nMaintains natural daylight\nMultiple perforation patterns\nAnodized or powder coat finishes\nCustom blade angles",
      categorySlug: "perforated-metal-sunshades",
      isFeatured: false,
      sortOrder: 1,
    },
    {
      name: "Vertical Fin Sunshade",
      slug: "vertical-fin-sunshade",
      description:
        "Vertical fin sunshade panels that provide effective sun control for east and west-facing facades with a modern architectural aesthetic.",
      features:
        "Ideal for east/west facades\nAdjustable blade angles\nPerforated or solid options\nAluminum construction\nEngineered attachment system",
      categorySlug: "perforated-metal-sunshades",
      isFeatured: false,
      sortOrder: 2,
    },
    {
      name: "Organic Pattern Railing Panel",
      slug: "organic-pattern-railing-panel",
      description:
        "Decorative railing infill panels featuring flowing organic patterns. Perfect for balconies, mezzanines, and stairways.",
      features:
        "Code-compliant infill design\nAvailable in standard railing heights\nMultiple organic patterns\nDurable powder coat finish\nEasy bolt-on installation",
      categorySlug: "laser-cut-railing-systems",
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "Custom Entry Gate",
      slug: "custom-entry-gate",
      description:
        "Make a statement with a custom laser-cut entry gate. Each gate is designed and fabricated to your specifications with artistic patterns.",
      features:
        "Fully custom designs\nSingle or double gate configurations\nManual or automated options\nWeather-resistant finishes\nProfessional installation available",
      categorySlug: "laser-cut-metal-gates",
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "Driveway Gate System",
      slug: "driveway-gate-system",
      description:
        "Automated driveway gate systems with decorative laser-cut metal panel inserts. Combines security with architectural beauty.",
      features:
        "Automated or manual operation\nHeavy-duty steel frame\nDecorative panel inserts\nSecurity features available\nCustom widths up to 24 feet",
      categorySlug: "laser-cut-metal-gates",
      isFeatured: false,
      sortOrder: 2,
    },
    {
      name: "Mechanical Equipment Enclosure",
      slug: "mechanical-equipment-enclosure",
      description:
        "Perforated metal enclosures that screen mechanical equipment while allowing necessary airflow. Meets ventilation requirements with aesthetic appeal.",
      features:
        "Meets ventilation code requirements\nCustom perforation patterns\nCorrosion-resistant materials\nSecure access panels\nArchitect-friendly appearance",
      categorySlug: "perforated-metal-enclosures",
      isFeatured: false,
      sortOrder: 1,
    },
  ];

  for (const prod of productData) {
    const category = categories.find(
      (c) => c.slug === prod.categorySlug
    );
    if (!category) continue;

    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        description: prod.description,
        features: prod.features,
        categoryId: category.id,
        isFeatured: prod.isFeatured,
        sortOrder: prod.sortOrder,
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        features: prod.features,
        categoryId: category.id,
        isFeatured: prod.isFeatured,
        sortOrder: prod.sortOrder,
      },
    });
  }

  // ============================================
  // 4. PATTERNS
  // ============================================
  console.log("Creating patterns...");
  const patternData = [
    {
      name: "Diamond Lattice",
      slug: "diamond-lattice",
      code: "RP001",
      description:
        "Classic diamond lattice pattern with clean geometric lines. Provides partial privacy while allowing light and airflow.",
      sizes: ["24x36", "48x96", "96x48"],
      materials: ["Aluminum", "Cor-Ten Steel"],
      colors: ["Matte Black", "Silver", "Bronze"],
      sortOrder: 1,
    },
    {
      name: "Honeycomb",
      slug: "honeycomb",
      code: "RP002",
      description:
        "Hexagonal honeycomb pattern inspired by nature. Popular for modern commercial and residential applications.",
      sizes: ["24x36", "48x96"],
      materials: ["Aluminum"],
      colors: ["Hi-Reflective White", "Matte Black", "Silver", "Gold"],
      sortOrder: 2,
    },
    {
      name: "Moroccan Star",
      slug: "moroccan-star",
      code: "RP003",
      description:
        "Intricate Moroccan-inspired star pattern with repeating geometric motifs. Creates beautiful shadow play with natural light.",
      sizes: ["24x36", "48x96", "96x48"],
      materials: ["Aluminum", "Cor-Ten Steel"],
      colors: ["Matte Black", "Bronze", "Copper", "Dark Gray"],
      sortOrder: 3,
    },
    {
      name: "Organic Leaves",
      slug: "organic-leaves",
      code: "RP004",
      description:
        "Flowing organic leaf pattern with naturalistic forms. Ideal for landscape and garden applications.",
      sizes: ["24x36", "48x96"],
      materials: ["Aluminum"],
      colors: ["Forest Green", "Matte Black", "Bronze", "Rust"],
      sortOrder: 4,
    },
    {
      name: "Wave Flow",
      slug: "wave-flow",
      code: "RP005",
      description:
        "Smooth undulating wave pattern that creates a sense of movement. Excellent for coastal and contemporary projects.",
      sizes: ["48x96", "96x48"],
      materials: ["Aluminum", "Cor-Ten Steel"],
      colors: ["Silver", "Cardinal Blue", "Dark Gray", "Charcoal"],
      sortOrder: 5,
    },
    {
      name: "Circles & Dots",
      slug: "circles-and-dots",
      code: "RP006",
      description:
        "Modern perforated pattern with varying circle sizes creating gradient effects. Provides excellent light modulation.",
      sizes: ["24x36", "48x96", "96x48"],
      materials: ["Aluminum"],
      colors: ["Hi-Reflective White", "Matte Black", "Silver"],
      sortOrder: 6,
    },
    {
      name: "Art Deco Fan",
      slug: "art-deco-fan",
      code: "RP007",
      description:
        "Elegant Art Deco-inspired fan pattern with scalloped arches. Brings timeless sophistication to any project.",
      sizes: ["24x36", "48x96"],
      materials: ["Aluminum", "Cor-Ten Steel"],
      colors: ["Gold", "Bronze", "Matte Black", "Copper"],
      sortOrder: 7,
    },
    {
      name: "Abstract Branches",
      slug: "abstract-branches",
      code: "RP008",
      description:
        "Artistic abstract tree branch pattern that creates an organic, natural screen effect. Popular for outdoor garden features.",
      sizes: ["24x36", "48x96", "96x48"],
      materials: ["Aluminum", "Cor-Ten Steel"],
      colors: ["Rust", "Matte Black", "Forest Green", "Charcoal"],
      sortOrder: 8,
    },
    {
      name: "Triangular Mesh",
      slug: "triangular-mesh",
      code: "RP009",
      description:
        "Contemporary triangular mesh pattern with sharp geometric angles. Ideal for modern architectural facades.",
      sizes: ["48x96", "96x48"],
      materials: ["Aluminum"],
      colors: ["Silver", "Matte Black", "Dark Gray", "Hi-Reflective White"],
      sortOrder: 9,
    },
    {
      name: "Bamboo Grove",
      slug: "bamboo-grove",
      code: "RP010",
      description:
        "Stylized bamboo stalk pattern that provides privacy screening with an Asian-inspired aesthetic. Available in multiple finishes.",
      sizes: ["24x36", "48x96"],
      materials: ["Aluminum", "Cor-Ten Steel"],
      colors: ["Forest Green", "Matte Black", "Bronze", "Gold"],
      sortOrder: 10,
    },
  ];

  for (const pat of patternData) {
    await prisma.pattern.upsert({
      where: { slug: pat.slug },
      update: {
        name: pat.name,
        code: pat.code,
        description: pat.description,
        sizes: pat.sizes,
        materials: pat.materials,
        colors: pat.colors,
        sortOrder: pat.sortOrder,
      },
      create: pat,
    });
  }

  // ============================================
  // 5. FAQ CATEGORIES & FAQS
  // ============================================
  console.log("Creating FAQ categories and FAQs...");
  const faqCategoryData = [
    { name: "General", slug: "general", sortOrder: 1 },
    { name: "Purchasing", slug: "purchasing", sortOrder: 2 },
    { name: "Custom", slug: "custom", sortOrder: 3 },
    { name: "Installation", slug: "installation", sortOrder: 4 },
    { name: "Shipping", slug: "shipping", sortOrder: 5 },
  ];

  const faqCategories = [];
  for (const cat of faqCategoryData) {
    const faqCat = await prisma.fAQCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, sortOrder: cat.sortOrder },
      create: cat,
    });
    faqCategories.push(faqCat);
  }

  const faqData = [
    {
      question: "What materials do you use for your metal panels?",
      answer:
        "We primarily work with aluminum and Cor-Ten steel. Aluminum is lightweight, corrosion-resistant, and available in a wide range of powder coat colors. Cor-Ten steel develops a beautiful natural rust patina over time, making it ideal for rustic and industrial aesthetics. We can also work with stainless steel and mild steel upon request.",
      categorySlug: "general",
      sortOrder: 1,
    },
    {
      question: "What is the lead time for custom metal panels?",
      answer:
        "Standard lead times range from 4 to 8 weeks depending on the complexity of the project, quantity ordered, and current production schedule. Rush orders may be accommodated for an additional fee. We recommend reaching out early in your project timeline to ensure we can meet your installation deadlines.",
      categorySlug: "general",
      sortOrder: 2,
    },
    {
      question: "How do I request a quote for a project?",
      answer:
        "You can request a quote by filling out our online quote request form, calling us at (555) 123-4567, or emailing sales@metalcraftpanels.com. Please include project details such as panel dimensions, quantity, desired pattern, material preference, and any specific finish requirements. The more detail you provide, the more accurate your quote will be.",
      categorySlug: "purchasing",
      sortOrder: 1,
    },
    {
      question: "Do you offer volume pricing?",
      answer:
        "Yes, we offer competitive volume pricing for larger orders. Our pricing tiers typically begin at 10+ panels, 25+ panels, and 50+ panels. Contact our sales team for a detailed volume pricing quote tailored to your specific project requirements.",
      categorySlug: "purchasing",
      sortOrder: 2,
    },
    {
      question: "Can you create custom patterns not shown in your catalog?",
      answer:
        "Absolutely! Custom pattern design is one of our specialties. Our design team can work from your sketches, CAD files, photographs, or concepts to create a unique pattern. We provide digital proofs and physical samples before production begins. Custom pattern development typically adds 1-2 weeks to the standard lead time.",
      categorySlug: "custom",
      sortOrder: 1,
    },
    {
      question: "How are your panels installed?",
      answer:
        "Installation methods vary by application. Our panels can be installed using concealed Z-clip mounting systems, through-bolt attachment, channel framing systems, or custom engineered mounting solutions. We provide detailed installation guides and CAD drawings with every order. Professional installation by a qualified contractor is recommended for structural applications.",
      categorySlug: "installation",
      sortOrder: 1,
    },
  ];

  for (const faq of faqData) {
    const category = faqCategories.find(
      (c) => c.slug === faq.categorySlug
    );
    if (!category) continue;

    // Use a combination approach since FAQ doesn't have a unique slug
    const existing = await prisma.fAQ.findFirst({
      where: { question: faq.question, categoryId: category.id },
    });

    if (!existing) {
      await prisma.fAQ.create({
        data: {
          question: faq.question,
          answer: faq.answer,
          categoryId: category.id,
          sortOrder: faq.sortOrder,
          isActive: true,
        },
      });
    }
  }

  // ============================================
  // 6. ARTICLE CATEGORIES & ARTICLES
  // ============================================
  console.log("Creating article categories and articles...");
  const articleCategoryData = [
    { name: "Design Tips", slug: "design-tips", sortOrder: 1 },
    { name: "Product Spotlight", slug: "product-spotlight", sortOrder: 2 },
    { name: "Industry News", slug: "industry-news", sortOrder: 3 },
    { name: "Case Studies", slug: "case-studies", sortOrder: 4 },
  ];

  const articleCategories = [];
  for (const cat of articleCategoryData) {
    const artCat = await prisma.articleCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, sortOrder: cat.sortOrder },
      create: cat,
    });
    articleCategories.push(artCat);
  }

  const articleData = [
    {
      title: "5 Ways to Use Metal Screens in Modern Architecture",
      slug: "5-ways-to-use-metal-screens-modern-architecture",
      excerpt:
        "Discover how architects are incorporating decorative metal screens into contemporary building designs for both aesthetic appeal and functional performance.",
      content:
        "Metal screens have become one of the most versatile elements in modern architecture. From building facades to interior partitions, these panels serve both functional and decorative purposes.\n\n## 1. Building Facade Systems\n\nArchitectural metal screens are increasingly used as secondary facade elements. They provide solar shading, visual privacy, and a distinctive architectural identity. Perforated and laser-cut patterns can be customized to match any design vision.\n\n## 2. Interior Room Dividers\n\nOpen floor plans benefit from metal screen partitions that define spaces without fully enclosing them. Light passes through the patterns, maintaining an airy feel while creating visual separation.\n\n## 3. Stairway and Balcony Railings\n\nLaser-cut panels transform standard railings into works of art. Code-compliant designs ensure safety while pattern choices allow for creative expression.\n\n## 4. Landscape and Garden Features\n\nOutdoor metal screens create beautiful garden rooms, privacy walls, and decorative fencing. Cor-Ten steel panels develop a natural patina that complements outdoor settings.\n\n## 5. Lighting Features\n\nBacklit metal panels create dramatic lighting effects in lobbies, restaurants, and retail spaces. The interplay of light and shadow through cut patterns produces stunning visual displays.",
      categorySlug: "design-tips",
      isPublished: true,
    },
    {
      title: "Choosing the Right Material for Your Metal Panel Project",
      slug: "choosing-right-material-metal-panel-project",
      excerpt:
        "A comprehensive guide to selecting between aluminum, Cor-Ten steel, and other metals for your decorative panel project.",
      content:
        "Selecting the right material for your metal panel project is crucial for both aesthetics and longevity. Here we compare the most popular options.\n\n## Aluminum\n\nAluminum is the most popular choice for decorative metal panels. It is lightweight, corrosion-resistant, and accepts powder coating well. It is ideal for both interior and exterior applications and comes in a wide range of thicknesses.\n\n## Cor-Ten Steel\n\nCor-Ten (weathering steel) develops a distinctive rust patina that protects the underlying metal. It is perfect for projects that call for a natural, rustic appearance. The patina stabilizes over 1-3 years depending on climate.\n\n## Stainless Steel\n\nFor applications requiring maximum corrosion resistance and a polished look, stainless steel is the premium choice. It is commonly used in coastal environments, food service areas, and high-end architectural installations.\n\n## Factors to Consider\n\n- Environment (interior vs. exterior, coastal vs. inland)\n- Budget constraints\n- Desired aesthetic and finish options\n- Weight limitations of the mounting structure\n- Maintenance requirements",
      categorySlug: "design-tips",
      isPublished: true,
    },
    {
      title: "New Geometric Pattern Collection Now Available",
      slug: "new-geometric-pattern-collection-available",
      excerpt:
        "Introducing our latest collection of geometric patterns designed for modern commercial and residential projects.",
      content:
        "We are excited to announce the release of our newest geometric pattern collection, featuring 10 new designs that push the boundaries of laser-cut metal artistry.\n\n## What is New\n\nThe collection includes patterns inspired by contemporary art, mathematical forms, and organic geometry. Each pattern has been engineered for structural integrity while maximizing visual impact.\n\n## Highlights\n\n- Triangular Mesh (RP009): Sharp angular design perfect for modern facades\n- Diamond Lattice (RP001): A reimagined classic with refined proportions\n- Honeycomb (RP002): Nature-inspired hexagonal pattern in multiple scales\n\n## Availability\n\nAll new patterns are available in our standard sizes (24x36, 48x96, and 96x48) and can be produced in aluminum or Cor-Ten steel. Custom sizes are available upon request.\n\nContact our sales team to request samples or discuss your project requirements.",
      categorySlug: "product-spotlight",
      isPublished: true,
    },
    {
      title: "Sustainable Design with Metal Panels: Reducing Carbon Footprint",
      slug: "sustainable-design-metal-panels-reducing-carbon-footprint",
      excerpt:
        "Learn how metal panels contribute to sustainable building practices through solar control, recyclability, and long-term durability.",
      content:
        "Sustainability is at the forefront of modern architecture, and metal panels play a significant role in creating greener buildings.\n\n## Solar Control\n\nPerforated and laser-cut metal sunshade systems can reduce a building's cooling load by 30-60%. This directly translates to lower energy consumption and reduced carbon emissions over the building's lifetime.\n\n## Material Recyclability\n\nBoth aluminum and steel are among the most recycled materials on earth. Aluminum can be recycled indefinitely without loss of quality, and recycled aluminum requires only 5% of the energy needed to produce primary aluminum.\n\n## Durability and Longevity\n\nMetal panels have an expected lifespan of 30-50+ years with minimal maintenance. This durability reduces the frequency of replacement and the associated environmental impact of manufacturing and installation.\n\n## LEED Credits\n\nMetal panel systems can contribute to multiple LEED credit categories including Energy and Atmosphere, Materials and Resources, and Innovation in Design.\n\nPartner with our team to explore how metal panels can support your sustainability goals.",
      categorySlug: "industry-news",
      isPublished: true,
    },
  ];

  for (const article of articleData) {
    const category = articleCategories.find(
      (c) => c.slug === article.categorySlug
    );
    if (!category) continue;

    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        categoryId: category.id,
        isPublished: article.isPublished,
        publishedAt: article.isPublished ? new Date() : null,
      },
      create: {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        categoryId: category.id,
        isPublished: article.isPublished,
        publishedAt: article.isPublished ? new Date() : null,
      },
    });
  }

  // ============================================
  // 7. RESOURCE CATEGORIES & RESOURCES
  // ============================================
  console.log("Creating resource categories and resources...");
  const resourceCategoryData = [
    { name: "Marketing", slug: "marketing", sortOrder: 1 },
    { name: "Specifications", slug: "specifications", sortOrder: 2 },
    { name: "Technical Info", slug: "technical-info", sortOrder: 3 },
    { name: "White Papers", slug: "white-papers", sortOrder: 4 },
  ];

  const resourceCategories = [];
  for (const cat of resourceCategoryData) {
    const resCat = await prisma.resourceCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, sortOrder: cat.sortOrder },
      create: cat,
    });
    resourceCategories.push(resCat);
  }

  const resourceData = [
    {
      title: "Product Catalog 2025",
      description:
        "Complete product catalog featuring all standard panel patterns, sizes, materials, and finish options.",
      fileUrl: "/resources/metalcraft-catalog-2025.pdf",
      fileType: "PDF",
      fileSize: "12.5 MB",
      categorySlug: "marketing",
      sortOrder: 1,
    },
    {
      title: "Pattern Library Lookbook",
      description:
        "Visual lookbook showcasing all available patterns with installation photography and design inspiration.",
      fileUrl: "/resources/pattern-library-lookbook.pdf",
      fileType: "PDF",
      fileSize: "8.2 MB",
      categorySlug: "marketing",
      sortOrder: 2,
    },
    {
      title: "Architectural Specifications Guide",
      description:
        "Comprehensive specifications document for architects and engineers including material properties, tolerances, and performance data.",
      fileUrl: "/resources/architectural-specifications.pdf",
      fileType: "PDF",
      fileSize: "3.1 MB",
      categorySlug: "specifications",
      sortOrder: 1,
    },
    {
      title: "Installation Manual",
      description:
        "Detailed installation instructions for all mounting systems including Z-clip, through-bolt, and channel framing methods.",
      fileUrl: "/resources/installation-manual.pdf",
      fileType: "PDF",
      fileSize: "5.4 MB",
      categorySlug: "technical-info",
      sortOrder: 1,
    },
    {
      title: "CAD Detail Library",
      description:
        "AutoCAD and Revit detail files for standard panel connections, mounting systems, and framing details.",
      fileUrl: "/resources/cad-detail-library.zip",
      fileType: "ZIP",
      fileSize: "28.7 MB",
      categorySlug: "technical-info",
      sortOrder: 2,
    },
    {
      title: "Sustainable Metal Panels White Paper",
      description:
        "Research paper on the environmental benefits and LEED contributions of architectural metal panel systems.",
      fileUrl: "/resources/sustainability-white-paper.pdf",
      fileType: "PDF",
      fileSize: "1.8 MB",
      categorySlug: "white-papers",
      sortOrder: 1,
    },
  ];

  for (const res of resourceData) {
    const category = resourceCategories.find(
      (c) => c.slug === res.categorySlug
    );
    if (!category) continue;

    const existing = await prisma.resource.findFirst({
      where: { title: res.title, categoryId: category.id },
    });

    if (!existing) {
      await prisma.resource.create({
        data: {
          title: res.title,
          description: res.description,
          fileUrl: res.fileUrl,
          fileType: res.fileType,
          fileSize: res.fileSize,
          categoryId: category.id,
          sortOrder: res.sortOrder,
          isActive: true,
        },
      });
    }
  }

  // ============================================
  // 8. INSPIRATION PROJECTS
  // ============================================
  console.log("Creating inspiration projects...");
  const inspirationData = [
    {
      title: "Downtown Portland Mixed-Use Development",
      slug: "downtown-portland-mixed-use-development",
      description:
        "A striking 12-story mixed-use building featuring custom perforated aluminum sunshade panels across the south and west facades. The Diamond Lattice pattern was adapted at a larger scale to create a cohesive design language.",
      location: "Portland, OR",
      architect: "Studio Architecture PDX",
      material: "Aluminum",
      finish: "Matte Black powder coat",
      projectType: "MIXED_USE" as const,
      isFeatured: true,
      sortOrder: 1,
    },
    {
      title: "Seaside Resort & Spa",
      slug: "seaside-resort-and-spa",
      description:
        "Oceanfront hospitality project utilizing Cor-Ten steel privacy screens with the Wave Flow pattern. The naturally weathering steel complements the coastal environment while providing guest room privacy.",
      location: "Cannon Beach, OR",
      architect: "Coastal Design Group",
      material: "Cor-Ten Steel",
      finish: "Natural patina",
      projectType: "HOSPITALITY" as const,
      isFeatured: true,
      sortOrder: 2,
    },
    {
      title: "Modern Hillside Residence",
      slug: "modern-hillside-residence",
      description:
        "A contemporary residential project featuring laser-cut aluminum railing panels and entry gates with the Abstract Branches pattern. The panels provide safety and privacy while framing views of the surrounding landscape.",
      location: "Lake Oswego, OR",
      architect: "Northwest Modern Architects",
      material: "Aluminum",
      finish: "Bronze powder coat",
      projectType: "RESIDENTIAL" as const,
      isFeatured: true,
      sortOrder: 3,
    },
    {
      title: "Community Health Center",
      slug: "community-health-center",
      description:
        "Healthcare facility featuring perforated metal enclosures for rooftop mechanical equipment and decorative interior partition screens in waiting areas. The Honeycomb pattern was selected for its calming, organic geometry.",
      location: "Beaverton, OR",
      architect: "Health Design Associates",
      material: "Aluminum",
      finish: "Hi-Reflective White powder coat",
      projectType: "HEALTHCARE" as const,
      isFeatured: false,
      sortOrder: 4,
    },
    {
      title: "University Science Building",
      slug: "university-science-building",
      description:
        "An award-winning university science building with a double-skin facade incorporating perforated metal sunshade panels. The Triangular Mesh pattern reflects the building's focus on science and mathematics.",
      location: "Eugene, OR",
      architect: "Academic Design Partners",
      material: "Aluminum",
      finish: "Silver anodized",
      projectType: "EDUCATION" as const,
      isFeatured: false,
      sortOrder: 5,
    },
  ];

  for (const project of inspirationData) {
    await prisma.inspirationProject.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        description: project.description,
        location: project.location,
        architect: project.architect,
        material: project.material,
        finish: project.finish,
        projectType: project.projectType,
        isFeatured: project.isFeatured,
        sortOrder: project.sortOrder,
      },
      create: {
        title: project.title,
        slug: project.slug,
        description: project.description,
        location: project.location,
        architect: project.architect,
        material: project.material,
        finish: project.finish,
        projectType: project.projectType,
        isFeatured: project.isFeatured,
        sortOrder: project.sortOrder,
      },
    });
  }

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
