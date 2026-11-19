/* ============================================================
   LOVA — بيانات المنتجات التجريبية
   كل منتج: id, name (عربي), price (بالدولار), category, img, desc, badge
   الفئات: bags | gifts | fragrance | beauty | accessories | wallets | toys | new
   بدّل هالبيانات بمنتجاتك الفعلية. الأسعار بالدولار الأميركي ($).
   ============================================================ */
window.LOVA_CATEGORIES = [
  { id: "all",         name: "الكل",            icon: "assets/logos/LOVA_Symbol_Burgundy.svg" },
  { id: "bags",        name: "شنط",            icon: "assets/icons/icon-bags.svg" },
  { id: "gifts",       name: "هدايا",          icon: "assets/icons/icon-gifts.svg" },
  { id: "fragrance",   name: "عطور",           icon: "assets/icons/icon-fragrance.svg" },
  { id: "beauty",      name: "مكياج وجمال",    icon: "assets/icons/icon-beauty.svg" },
  { id: "accessories", name: "إكسسوارات",      icon: "assets/icons/icon-accessories.svg" },
  { id: "wallets",     name: "جزادين",         icon: "assets/icons/icon-wallets.svg" },
  { id: "toys",        name: "ألعاب",          icon: "assets/icons/icon-toys.svg" },
];

window.LOVA_PRODUCTS = [
  { id: "LV-101", name: "شنطة ميني نبيذي",      price: 38, category: "bags",        img: "assets/img/products/bag-mini-burgundy.svg", desc: "شنطة صغيرة أنيقة بلون النبيذي، مناسبة للسهرات والخرجات.", badge: "الأكثر طلباً" },
  { id: "LV-102", name: "شنطة توت بيج",          price: 45, category: "bags",        img: "assets/img/products/bag-tote-sand.svg",     desc: "شنطة واسعة بلون البيج الهادئ، عملية ليومك كامل." },
  { id: "LV-103", name: "شنطة كتف وردي",         price: 42, category: "bags",        img: "assets/img/products/bag-shoulder-rose.svg", desc: "شنطة كتف ناعمة بلمسة وردية، خفيفة وأنيقة." },
  { id: "LV-201", name: "علبة هدية بمحبة",       price: 25, category: "gifts",       img: "assets/img/products/gift-box-love.svg",     desc: "علبة هدية جاهزة مع تغليف LOVA وبطاقة شكر.", badge: "جاهزة للإهداء" },
  { id: "LV-202", name: "طقم هدية إلها",         price: 55, category: "gifts",       img: "assets/img/products/gift-set-her.svg",      desc: "طقم مختار بعناية: إكسسوار + عطر صغير + لمسة حلوة." },
  { id: "LV-301", name: "عطر روز",               price: 32, category: "fragrance",   img: "assets/img/products/perfume-rose.svg",      desc: "عطر زهري ناعم يدوم طويلاً، مناسب للنهار." },
  { id: "LV-302", name: "عطر فيلفيت",            price: 36, category: "fragrance",   img: "assets/img/products/perfume-velvet.svg",    desc: "عطر دافئ غني بلمسة فخمة للمساء." },
  { id: "LV-401", name: "طقم أحمر شفاه",         price: 22, category: "beauty",      img: "assets/img/products/lip-set.svg",           desc: "مجموعة ألوان أحمر شفاه بتركيبة مطفية ناعمة." },
  { id: "LV-402", name: "لمسة إشراق للبشرة",     price: 28, category: "beauty",      img: "assets/img/products/beauty-glow.svg",       desc: "منتج إشراق خفيف يعطي البشرة لمعة طبيعية." },
  { id: "LV-501", name: "حلق لؤلؤ",              price: 18, category: "accessories", img: "assets/img/products/earrings-pearl.svg",    desc: "حلق لؤلؤ كلاسيكي يناسب كل الإطلالات." },
  { id: "LV-502", name: "قلادة قلب",             price: 20, category: "accessories", img: "assets/img/products/necklace-heart.svg",    desc: "قلادة قلب رقيقة، هدية رمزية حلوة.", badge: "هدية محبوبة" },
  { id: "LV-503", name: "طقم ربطات شعر",         price: 12, category: "accessories", img: "assets/img/products/scrunchie-set.svg",     desc: "طقم ربطات شعر ناعمة بألوان LOVA." },
  { id: "LV-601", name: "جزدان كلاسيك",          price: 30, category: "wallets",     img: "assets/img/products/wallet-classic.svg",    desc: "جزدان أنيق بمساحة واسعة للبطاقات والنقود." },
  { id: "LV-602", name: "حامل بطاقات",           price: 16, category: "wallets",     img: "assets/img/products/wallet-card.svg",       desc: "حامل بطاقات صغير وعملي يدخل بأي شنطة." },
  { id: "LV-701", name: "دبدوب ناعم",            price: 24, category: "toys",        img: "assets/img/products/teddy-soft.svg",        desc: "دبدوب ناعم للعناق، هدية تفرّح الكبار والصغار." },
  { id: "LV-702", name: "دمية بير",              price: 26, category: "toys",        img: "assets/img/products/plush-bear.svg",        desc: "دمية بير بتصميم لطيف ولون هادئ." },
  { id: "LV-801", name: "وصل جديد — إكسسوار",    price: 21, category: "accessories", img: "assets/img/products/new-arrival-01.svg",    desc: "قطعة جديدة وصلت لتوّها لتشكيلة LOVA.", badge: "جديد" },
  { id: "LV-802", name: "وصل جديد — هدية",       price: 34, category: "gifts",       img: "assets/img/products/new-arrival-02.svg",    desc: "طقم هدية جديد بتغليف مميز.", badge: "جديد" },
];
