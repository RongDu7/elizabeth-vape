import { useState, useEffect } from "react";

const T = {
  teal: "#00b4b4", tealDark: "#007a8a", orange: "#e07a20", gold: "#f5a623",
  bg: "#f0f4f5", white: "#ffffff", text: "#1a2a2a", textLight: "#667",
  green: "#00a040", red: "#e53935",
  shadow: "0 2px 14px rgba(0,180,180,0.10)",
  shadowHover: "0 6px 24px rgba(0,180,180,0.18)",
};
const gradTeal = `linear-gradient(135deg, ${T.teal}, ${T.tealDark})`;
const gradOrange = `linear-gradient(135deg, #e07a20, #f5a623)`;

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mobile;
}

// ── Shared UI ──────────────────────────────────────────────────────────────
function PromoBar({ text, color = "teal" }) {
  return (
    <div style={{
      background: color === "orange" ? gradOrange : gradTeal,
      color: "#fff", textAlign: "center", padding: "14px 20px",
      fontWeight: 700, fontSize: 14, letterSpacing: 0.5, lineHeight: 1.6,
      borderRadius: 12, marginBottom: 20,
    }}>{text}</div>
  );
}

function PriceTag({ cash, card }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 5, flexWrap: "wrap" }}>
      {cash && <span style={{ color: "#00c853", fontWeight: 800, fontSize: 14 }}>CASH {cash}</span>}
      {card && <span style={{ color: "#ff1744", fontWeight: 800, fontSize: 14 }}>CARD {card}</span>}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{
      background: gradTeal, color: "#fff", fontWeight: 800, fontSize: 15,
      letterSpacing: 1.5, padding: "13px 18px", borderRadius: 10, marginBottom: 14, marginTop: 8,
    }}>{children}</div>
  );
}

function StockInfo({ available, outOfStock }) {
  return (
    <p style={{ fontSize: 13, color: T.textLight, marginBottom: 12, marginTop: -4 }}>
      <span style={{ color: T.teal, fontWeight: 700 }}>{available} flavors available</span>
      {outOfStock && <span style={{ color: "#bbb" }}> · {outOfStock} out of stock</span>}
    </p>
  );
}

function FlavorChip({ name, outOfStock }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 9,
      background: outOfStock ? "#f5f5f5" : T.white,
      border: `1px solid ${outOfStock ? "#ddd" : "#d0eeee"}`,
      borderRadius: 10, padding: "11px 14px",
    }}>
      <span style={{
        width: 20, height: 20, borderRadius: "50%",
        background: outOfStock ? "#ccc" : T.teal,
        color: "#fff", fontSize: 11,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>{outOfStock ? "○" : "✓"}</span>
      <span style={{
        fontSize: 13, fontWeight: 500,
        color: outOfStock ? "#bbb" : T.text,
        textDecoration: outOfStock ? "line-through" : "none",
      }}>{name}</span>
    </div>
  );
}

function FlavorGrid({ flavors, outOfStock = [] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8, marginBottom: 16 }}>
      {flavors.map((f, i) => <FlavorChip key={i} name={f} />)}
      {outOfStock.map((f, i) => <FlavorChip key={i} name={f} outOfStock />)}
    </div>
  );
}

// Product hero image with gradient fallback
function ProductHero({ gradient, emoji, label }) {
  return (
    <div style={{
      background: gradient || gradTeal,
      borderRadius: 16, height: 200,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      marginBottom: 20, position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
      <div style={{ fontSize: 64, marginBottom: 8 }}>{emoji}</div>
      <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, letterSpacing: 1, opacity: 0.85 }}>{label}</div>
    </div>
  );
}

// Detail page header banner
function DetailHeader({ name, cash, card, promo, note, tag }) {
  return (
    <div style={{ background: gradTeal, borderRadius: 12, padding: "18px 20px", marginBottom: 16, color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: 0.5, flex: 1 }}>{name}</div>
        {tag && <span style={{ background: "#e53935", color: "#fff", fontSize: 11, fontWeight: 800, borderRadius: 6, padding: "3px 9px", marginLeft: 8, alignSelf: "flex-start" }}>{tag}</span>}
      </div>
      <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
        {cash && <div><div style={{ fontSize: 11, opacity: 0.7 }}>CASH</div><div style={{ color: T.gold, fontWeight: 800, fontSize: 22 }}>{cash}</div></div>}
        {card && <div style={{ borderLeft: "1px solid rgba(255,255,255,0.3)", paddingLeft: 24 }}><div style={{ fontSize: 11, opacity: 0.7 }}>CARD</div><div style={{ color: "#ff9999", fontWeight: 800, fontSize: 22 }}>{card}</div></div>}
      </div>
      {note && <div style={{ fontSize: 12, opacity: 0.8, marginTop: 6 }}>{note}</div>}
    </div>
  );
}

// Clickable vape product card
function VapeCard({ name, cash, card, tag, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: T.white, borderRadius: 12, padding: "16px 18px",
      boxShadow: T.shadow, cursor: "pointer", transition: "all 0.15s",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = T.shadowHover; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = T.shadow; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
          {tag && (
            <span style={{
              background: tag === "NEW" ? T.teal : "#e53935",
              color: "#fff", fontSize: 10, fontWeight: 800, borderRadius: 5, padding: "2px 7px",
            }}>{tag}</span>
          )}
          <span style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{name}</span>
        </div>
        {(cash || card) && <PriceTag cash={cash} card={card} />}
      </div>
      <span style={{ color: T.teal, fontSize: 20, fontWeight: 700 }}>›</span>
    </div>
  );
}

function ProductCard({ name, cash, card, tag }) {
  return (
    <div style={{
      background: T.white, borderRadius: 12, padding: "16px 18px",
      boxShadow: T.shadow, display: "flex", alignItems: "center",
      justifyContent: "space-between", gap: 10, transition: "box-shadow 0.15s",
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = T.shadowHover}
      onMouseLeave={e => e.currentTarget.style.boxShadow = T.shadow}
    >
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
          {tag && <span style={{ background: tag === "NEW" ? T.teal : "#e53935", color: "#fff", fontSize: 10, fontWeight: 800, borderRadius: 5, padding: "2px 7px" }}>{tag}</span>}
          <span style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{name}</span>
        </div>
        {(cash || card) && <PriceTag cash={cash} card={card} />}
      </div>
    </div>
  );
}

function BrandHeader({ name, price }) {
  return (
    <div style={{ background: gradTeal, borderRadius: 12, padding: "18px 20px", marginBottom: 20, color: "#fff" }}>
      <div style={{ fontWeight: 900, fontSize: 26 }}>{name}</div>
      <div style={{ color: T.gold, fontWeight: 700, fontSize: 18 }}>{price}</div>
      <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>BUY 3 GET ONE FREE</div>
    </div>
  );
}

// ── VAPE DETAIL PAGES ──────────────────────────────────────────────────────

function ClearancePage() {
  const sections = [
    {
      name: "IGET HOT", price: "$15", tag: "SALE",
      items: ["IGET HOT - Lemon Lime $15", "IGET HOT - Green Plum Ice $15"],
    },
    {
      name: "HQD MIRACLE", price: "$20", tag: "SALE",
      items: ["HQD MIRACLE - Cherry Pomegranate $20", "HQD MIRACLE - Strawberry Raspberry $20"],
    },
    {
      name: "MAX INSTA BAR", price: "$20", tag: "SALE",
      items: ["MAX INSTA BAR - Apple Peach Ice $20","MAX INSTA BAR - Lemon Mint $20","MAX INSTA BAR - Mexican Mango $20","MAX INSTA BAR - Watermelon Ice $20","MAX INSTA BAR - Watermelon Bubblegum $20"],
    },
    {
      name: "TIK", price: "$20", tag: "SALE",
      items: ["TIK - Kit $20","TIK - Blackberry Ice $20","TIK - Blueberry Raspberry Ice $20","TIK - Grape Ice $20","TIK - Triple Mango $20","TIK - Strawberry Ice $20","TIK - Strawberry Watermelon Ice $20"],
    },
    {
      name: "IGET BAR PLUS 6000", price: "$20", tag: "SALE",
      items: ["Blueberry Raspberry Bubble Gum $20","Double Apple $20","Cherry Pomegranate $20","Melon Ice $20","Orange Grapefruit Lemon $20","Watermelon Ice $20","Passion Fruit Kiwi Guava $20","Watermelon Mint Ice $20","Banana $20","Kiwi Pineapple Ice $20","Orange Lemon $20","Pineapple Banana $20","Grape Peach Ice $20","Apple Grape Ice $20","Raspberry Berry $20","Lychee Watermelon $20"],
    },
    {
      name: "IGET BAR 3500", price: "$15", tag: "SALE",
      items: ["Double Apple $15","Strawberry Kiwi Ice $15","Blackberry Raspberry Lemon $15","Melon Ice $15","Cherry Blueberry $15","Pineapple Ice $15","Strawberry Lemon $15","Banana Pomegranate Cherry Ice $15","Kiwi Pineapple Ice $15","Watermelon Mint Ice $15","Passion Fruit Kiwi Guava $15","Quadruple Berry $15","Blackberry Pomegranate Watermelon Rind $15","Citrus Blackberry Apple $15"],
    },
  ];
  return (
    <div>
      <ProductHero gradient="linear-gradient(135deg, #e53935, #ff7043)" emoji="🏷️" label="BIG SALE" />
      {sections.map((s, si) => (
        <div key={si} style={{ marginBottom: 24 }}>
          <div style={{ background: gradTeal, borderRadius: 10, padding: "14px 18px", marginBottom: 10, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16 }}>{s.name}</div>
              <div style={{ color: T.gold, fontWeight: 700, fontSize: 15, marginTop: 2 }}>{s.price}</div>
            </div>
            {s.tag && <span style={{ background: "#e53935", color: "#fff", fontSize: 11, fontWeight: 800, borderRadius: 6, padding: "3px 9px" }}>{s.tag}</span>}
          </div>
          <div style={{ fontSize: 13, color: T.textLight, marginBottom: 8, paddingLeft: 4 }}>{s.items.length} flavors available</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 7 }}>
            {s.items.map((item, i) => (
              <div key={i} style={{ background: T.white, border: "1px solid #d0eeee", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", background: T.teal, color: "#fff", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function IngotPage() {
  const flavors = ["Banana Buzz","Blackberry Ice","Blackberry Pomegranate Cherry","Blueberry Blast","Blueberry Mint","California Sunset","Cherry Pomegranate","Chupppa Chupps Strawberry","Cool Mint","Double Apple","F.T.P.","Flavour Roulette","WTF","Grape Ice","Kiwi Pineapple","Mango Magic","Miami Mint","Passion Fruit Mango Lime","Peach Ice","Pink Lemon","Quadruple Berry","Ribena","Skittles","Strawnana","Strawberry Coconut Watermelon","Strawberry Kiwi","Strawberry Lychee","Strawberry Watermelon","Watermelon Ice","Yellow Starburst"];
  const oos = ["Black Forest"];
  return (
    <div>
      <ProductHero gradient="linear-gradient(135deg, #b8860b, #daa520, #f5a623)" emoji="🟡" label="INGOT 9000" />
      <PromoBar text="BUY 2 GET $5 OFF  ·  BUY 3 GET $10 OFF  ·  CASH $5 OFF" color="orange" />
      <DetailHeader name="ALI BARBAR – INGOT 9000" cash="$43" card="$48" />
      <StockInfo available={30} outOfStock={1} />
      <FlavorGrid flavors={flavors} outOfStock={oos} />
    </div>
  );
}

function IceAdjustPage() {
  const flavors = ["Black Dragon","Blackberry","Blueberry Blast","Blueberry Watermelon","Chupppa Chupps Strawberry","Grapefruit Guava Lemon","Hubba Bubba Grape","Lady Killer","Lemon Lime","Mango Magic","Passion Fruit Mango Lime","Pineapple Coconut","Skittles","Strawberry Kiwi","Watermelon"];
  return (
    <div>
      <ProductHero gradient="linear-gradient(135deg, #1a237e, #283593, #00b4b4)" emoji="🌊" label="ICE ADJUST 12000" />
      <PromoBar text="BUY 2 GET $5 OFF  ·  BUY 3 GET $10 OFF  ·  CASH $5 OFF" color="orange" />
      <DetailHeader name="ALI BARBAR – ICE ADJUST 12000" cash="$45" card="$50" />
      <StockInfo available={15} />
      <FlavorGrid flavors={flavors} />
    </div>
  );
}

function IgetBarProPage() {
  const flavors = ["Blackberry Ice","Blackberry Kiwi Ice","Blackberry Pomegranate Cherry","Blackberry Yogurt Ice Berry","Blueberry Ice","Blueberry Raspberry","Blueberry Raspberry Bubble Gum","Cherry Pomegranate","Chupa Chups Grape","Chupa Chups Strawberry","Dynamic Mint","Fruity Skittles","Grape Ice","Grapefruit Guava Lemon Ice","Kiwi Pineapple","Mango Ice","Orange Fanta Soda","Passion Fruit Peach Iced Tea","Raspberry Cherry Blackberry","Raspberry Grape","Raspberry Pomegranate Ice Blast","Strawberry Cranberry Bliss","Strawberry Kiwi Ice","Strawberry Passion Fruit Mango","Strawberry Raspberry","Strawberry Watermelon Ice","Strawberry White Peach Ice Mist"];
  return (
    <div>
      <ProductHero gradient="linear-gradient(135deg, #4a148c, #7b1fa2, #e91e63)" emoji="🚀" label="IGET BAR PRO" />
      <PromoBar text="BUY 2 GET $5 OFF  ·  BUY 3 GET $10 OFF  ·  CASH $5 OFF" color="orange" />
      <DetailHeader name="IGET BAR PRO – 10000 PUFFS" cash="$43" card="$48" />
      <StockInfo available={27} />
      <FlavorGrid flavors={flavors} />
    </div>
  );
}

function IgetOnePage() {
  const flavors = ["Black Forest","Blackberry Cherry Pomegranate","Blackberry Ice","Blue Monster","Blueberry Ice","Blueberry Raspberry","Cherry Monster","Cherry Pomegranate","Chupa Chups Grape","Chupa Chups Strawberry","Chuppa Chupps Blackberry","Grape Ice","Kiwi Pineapple","Mixed Berries Ice","Mountain Spring Mint Ice","Raspberry Grape Ice","Strawberry","Chuppa Chupps Cherry","Strawberry Kiwi Ice","Strawberry Pomegranate Ice","Strawberry Raspberry","Strawberry Watermelon Ice","Tropical Orange Monster"];
  return (
    <div>
      <ProductHero gradient="linear-gradient(135deg, #006064, #00838f, #26c6da)" emoji="💎" label="IGET ONE 12000" />
      <PromoBar text="BUY 2 GET $5 OFF  ·  BUY 3 GET $10 OFF  ·  CASH $5 OFF" color="orange" />
      <DetailHeader name="IGET ONE – 12000 PUFFS" cash="$45" card="$50" />
      <StockInfo available={23} />
      <FlavorGrid flavors={flavors} />
    </div>
  );
}

function IgetBarPlusPage() {
  const podFlavors = ["Banana Ice","Black Forest","Blackberry Ice","Blackberry Pineapple Orange","Blackberry Pomegranate Cherry","Blueberry Mint","Blueberry Raspberry Bubble Gum","Cherry Pomegranate","Chupppa Chupps Grape","Chupppa Chupps Strawberry","Cola Ice","Double Apple","Dynamic Mint","Grape Ice","Lemonade Monster","Mango Ice","Mango Monster","Passion Fruit Blueberry Raspberry","Passion Fruit Kiwi Guava","Peach Ice","Peach Lychee Lime Ice","Raspberry Grape Mango","Strawberry Kiwi Ice","Strawberry Pomegranate","Strawberry Raspberry","Strawberry Watermelon Ice"];
  const kitFlavors = ["Blackberry Ice","Blackberry Pineapple Orange","Cherry Pomegranate","Double Apple","Grape Ice","Lemonade Monster","Mango Monster","Passion Fruit Blueberry Raspberry","Peach Lychee Lime Ice","Raspberry Grape Mango","Strawberry Kiwi Ice","Strawberry Raspberry","Strawberry Watermelon Ice"];
  return (
    <div>
      <ProductHero gradient="linear-gradient(135deg, #880e4f, #c2185b, #f06292)" emoji="🌸" label="IGET BAR PLUS S3 10K" />
      <PromoBar text="BUY 2 GET $5 OFF  ·  BUY 3 GET $10 OFF  ·  CASH $5 OFF" color="orange" />
      <DetailHeader name="IGET BAR PLUS S3 10k POD" cash="$35" card="$40" note="Compatible with IGET BAR PLUS S3 10k kit" />
      <StockInfo available={26} />
      <FlavorGrid flavors={podFlavors} />
      <DetailHeader name="IGET BAR PLUS S3 10k KIT" cash="$35–$45" card="$40–$50" />
      <StockInfo available={13} />
      <FlavorGrid flavors={kitFlavors} />
    </div>
  );
}

function HqdPage() {
  const flavors = ["Banana Ice","Banana Pomegranate Cherry","Black Dragon","Blackberry Cherry Pomegranate","Blackberry Raspberry Lemon","Blueberry Lemonade","Blueberry Raspberry","Cherry Pomegranate","Grapey","Ice Mint","Kiwi Lemon","Lemon Mint","Lemon Passion Fruit","Lush Ice","Mango Honeydew Ice","Peach Berry","Raspberry Grape","Strawberry Kiwi","Strawberry Watermelon","Tobacco"];
  const oos = ["Black Ice","Cola","Guava Ice","Kiwi Pineapple"];
  return (
    <div>
      <ProductHero gradient="linear-gradient(135deg, #37474f, #546e7a, #78909c)" emoji="⚡" label="HQD CUVIE SLICK" />
      <PromoBar text="BUY 2 GET $5 OFF  ·  BUY 3 GET $10 OFF  ·  CASH $5 OFF" color="orange" />
      <DetailHeader name="HQD CUVIE SLICK – 6000 PUFFS" cash="$30" card="$35" />
      <StockInfo available={20} outOfStock={4} />
      <FlavorGrid flavors={flavors} outOfStock={oos} />
    </div>
  );
}

function SnowplusPage() {
  const flavors = ["Black Dragon Ice 黑龙冰","Coconut Water 椰子水","Cola Ice 可乐冰","Corn Gelato 玉米冰淇淋","Crisp Green Apple 青苹果","Da Hong Pao Mochi 大红袍麻薯","Green Grape 青提","Hibiscus Ice Tea 洛神花冰茶","Honey Yuzu Tea 蜂蜜柚子茶","Honeycrisp Apple 脆苹果","Kiwi Ice 奇异果冰","Lemon Ice Tea 柠檬冰茶","Lemon Lime Ice 柠檬青柠冰","Lemon Pineapple 柠檬菠萝","Ludou Ice 绿豆冰","Lush Ice 冰爽西瓜","Lychee Ice 荔枝冰","Matcha Smoothie 抹茶冰沙","Menthol Plus 纯薄荷","Mineral Water 矿泉水","Passion Grapefruit 西柚百香果","Peach Ice 水蜜桃冰","Pink Guava 粉红番石榴","Red Wine Ice 红酒冰","Sparkling Iced Lemon Tea 气泡柠檬冰茶","Sweet Honeydew 蜜瓜","Tangy Grape 紫晶葡萄","Taro Ice 香芋冰","Tea Guan Yin King 铁观音","White Freeze 白雾冰"];
  const oos = ["Jasmine Longjing Tea 茉莉龙井"];
  return (
    <div>
      <ProductHero gradient="linear-gradient(135deg, #1b5e20, #2e7d32, #66bb6a)" emoji="❄️" label="SNOWPLUS DASH" />
      <PromoBar text="BUY 2 GET $5 OFF  ·  BUY 3 GET $10 OFF  ·  CASH $5 OFF" color="orange" />
      <DetailHeader name="SNOWPLUS DASH" cash="$30" card="$35" />
      <StockInfo available={30} outOfStock={1} />
      <FlavorGrid flavors={flavors} outOfStock={oos} />
    </div>
  );
}

function RelxCreatorPage() {
  const [activePod, setActivePod] = useState("mpod");
  const deviceColors = ["Black 黑色", "Grey & Yellow 灰黄色"];
  const mPodFlavors = ["Blueberry Cranberry Cherry","Dark Sparkle","Fresh Mint","Icy Coconut Water","Lychee Burst","Passion Fruit","Peach","Pink Guava","Sea Salt Lemon","Strawberry Burst","Strawberry Watermelon","Tangy Grape","Triple Mango","Watermelon Chill"];
  const boostFlavors = ["Blackberry Ice","Blackberry Pomegranate Cherry","Fisherman's Spearmint","Lemon Lime Bitters","Rainbow Candy","Strawberry Lollipop","Tangy Grape"];
  const podInfo = {
    mpod: { name: "M-POD", price: "$25–$30", flavors: mPodFlavors, count: 14 },
    boost: { name: "BOOST POD 24k", price: "$35–$40", flavors: boostFlavors, count: 7 },
  };
  const active = podInfo[activePod];
  return (
    <div>
      <ProductHero gradient="linear-gradient(135deg, #1565c0, #1976d2, #fdd835)" emoji="🔷" label="RELX CREATOR" />
      <div style={{ background: "linear-gradient(135deg, #7b1fa2, #9c27b0)", borderRadius: 12, padding: "14px 18px", marginBottom: 16, color: "#fff", textAlign: "center", fontWeight: 700, fontSize: 14 }}>
        🎁 BUY 4 POD GET 1 FREE DEVICE
      </div>
      <DetailHeader name="RELX CREATOR DEVICE" cash="$25" card="$30" />
      <div style={{ fontSize: 13, color: T.textLight, marginBottom: 8 }}>2 colors available</div>
      <FlavorGrid flavors={deviceColors} />

      <div style={{ marginTop: 20, marginBottom: 8 }}>
        <div style={{ fontWeight: 800, fontSize: 16, color: T.text, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
          🔌 Compatible Pods
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {[
            { id: "mpod", label: "M-POD", price: "$25–$30" },
            { id: "boost", label: "BOOST POD 24k", price: "$35–$40" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActivePod(tab.id)} style={{
              padding: "10px 18px", borderRadius: 30, border: "none", cursor: "pointer",
              background: activePod === tab.id ? "linear-gradient(135deg, #7b1fa2, #9c27b0)" : "#e8e8e8",
              color: activePod === tab.id ? "#fff" : T.textLight,
              fontWeight: 700, fontSize: 13, fontFamily: "'Montserrat', sans-serif",
              transition: "all 0.15s",
            }}>
              {tab.label} <span style={{ opacity: 0.8, fontSize: 11 }}>{tab.price}</span>
            </button>
          ))}
        </div>
        <div style={{ background: "linear-gradient(135deg, #7b1fa2, #9c27b0)", borderRadius: 10, padding: "14px 18px", marginBottom: 12, color: "#fff" }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{active.name}</div>
          <div style={{ color: T.gold, fontWeight: 700, fontSize: 15, marginTop: 2 }}>{active.price}</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>{active.count} flavors · Compatible with RELX CREATOR DEVICE</div>
        </div>
        <FlavorGrid flavors={active.flavors} />
      </div>
    </div>
  );
}

function RelxSpartaPage() {
  const flavors = ["Blackberry 黑莓","Blackberry Pomegranate Cherry 黑莓石榴樱桃","Blueberry Splash 蓝莓汽水","Cherry Pomegranate 樱桃石榴","Double Apple 双苹果","Fresh Mint 清新薄荷","Iced Cola 冰可乐","Lemon Lime Bitters 柠檬青柠苦酒","Milk Strawberry Lollipop 牛奶草莓棒棒糖","Peach Strawberry 蜜桃草莓","Pineapple 菠萝","Rainbow Candy 彩虹糖","Smooth Mango 顺滑芒果","Strawberry Kiwi 草莓奇异果","Strawberry Lollipop 草莓棒棒糖","Strawberry Raspberry 草莓树莓","Strawberry Watermelon 草莓西瓜","Triple Berry 三重莓果","Watermelon Chill 清凉西瓜","Watermelon Kiwi 西瓜奇异果"];
  return (
    <div>
      <ProductHero gradient="linear-gradient(135deg, #b71c1c, #c62828, #e53935)" emoji="⚔️" label="SPARTA 18000" />
      <PromoBar text="BUY 2 GET $5 OFF  ·  BUY 3 GET $10 OFF  ·  CASH $5 OFF" color="orange" />
      <DetailHeader name="RELX SPARTA 18000" cash="$45" card="$50" />
      <StockInfo available={20} />
      <FlavorGrid flavors={flavors} />
    </div>
  );
}

function AlfakherPage() {
  const flavors = ["Black Currant","Blue Razz Blast","Blueberry Mint","Blueberry Sour Raspberry","Cherry Ice","Grape","Grape Mint","Gum Mint","Ice Blue","Lemon Mint","Menthol","Mint","Orange Mint","Peach Ice","Strawberry Cherry","Two Apple","Watermelon Lime"];
  return (
    <div>
      <ProductHero gradient="linear-gradient(135deg, #e65100, #f57c00, #ffa726)" emoji="👑" label="ALFAKHER" />
      <PromoBar text="BUY 2 GET $5 OFF  ·  BUY 3 GET $10 OFF  ·  CASH $5 OFF" color="orange" />
      <DetailHeader name="ALFAKHER" cash="$45" card="$50" tag="NEW" />
      <StockInfo available={17} />
      <FlavorGrid flavors={flavors} />
    </div>
  );
}

// ── Main Pages ─────────────────────────────────────────────────────────────

function HomePage({ navigate }) {
  return (
    <div>
      <div style={{
        background: gradTeal, borderRadius: 18, padding: "48px 40px", marginBottom: 32,
        position: "relative", overflow: "hidden", textAlign: "center",
      }}>
        <div style={{ position: "absolute", top: -50, right: -50, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ fontSize: 52, marginBottom: 10 }}>🌿</div>
        <div style={{ fontWeight: 900, fontSize: 36, color: "#fff", letterSpacing: 3 }}>ELIZABETH VAPE</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, marginTop: 8, letterSpacing: 2 }}>YOUR PREMIUM STORE · MELBOURNE</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {[
          { icon: "☁️", label: "VAPE", desc: "Disposables, Kits & Pods", id: "vape" },
          { icon: "🚬", label: "CIGARETTE", desc: "International & Chinese brands", id: "cigarette" },
          { icon: "🌿", label: "TOBACCO", desc: "Rolling tobacco pouches", id: "tobacco" },
          { icon: "📦", label: "NICOTINE POUCHES", desc: "ZYN, VELO, Pablo", id: "pouches" },
        ].map(c => (
          <div key={c.label} onClick={() => navigate(c.id)} style={{
            background: gradTeal, borderRadius: 14, padding: "24px 20px", color: "#fff",
            boxShadow: T.shadow, cursor: "pointer", transition: "transform 0.14s, box-shadow 0.14s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = T.shadowHover; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.shadow; }}
          >
            <div style={{ fontSize: 32, marginBottom: 10 }}>{c.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: 1 }}>{c.label}</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 5 }}>{c.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 48, color: "#aaa", fontSize: 12 }}>© 2025 Elizabeth Vape. All rights reserved.</div>
    </div>
  );
}

function VapePage({ navigate }) {
  const products = [
    { id: "clearance", name: "CLEARANCE", cash: "$15–$20", tag: "SALE" },
    { id: "ingot", name: "ALI BARBAR – INGOT 9000", cash: "$43", card: "$48" },
    { id: "iceadjust", name: "ALI BARBAR – ICE ADJUST 12000", cash: "$45", card: "$50" },
    { id: "igetbarpro", name: "IGET BAR PRO", cash: "$43", card: "$48" },
    { id: "igetone", name: "IGET ONE", cash: "$45", card: "$50" },
    { id: "igetbarplus", name: "IGET BAR PLUS S3 10K KIT/POD", cash: "$35–45", card: "$40–50" },
    { id: "hqd", name: "HQD CUVIE SLICK", cash: "$30", card: "$35" },
    { id: "snowplus", name: "SNOWPLUS DASH", cash: "$30", card: "$35" },
    { id: "relxcreator", name: "RELX CREATOR DEVICE/POD", cash: "$25/$30", card: "$25/$30" },
    { id: "relxsparta", name: "RELX SPARTA 18000", cash: "$45", card: "$50" },
    { id: "alfakher", name: "ALFAKHER", cash: "$45", card: "$50", tag: "NEW" },
  ];
  return (
    <div>
      <PromoBar text="BUY 2 GET $5 OFF  ·  BUY 3 GET $10 OFF  ·  CASH $5 OFF" color="orange" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {products.map((p) => (
          <VapeCard key={p.id} {...p} onClick={() => navigate(p.id)} />
        ))}
      </div>
    </div>
  );
}

function CigarettePage() {
  const intl = [
    { name: "555 Original", cash: "$16", card: "$18" },
    { name: "Benson & Hedges Blue Gold", cash: "$15", card: "$17" },
    { name: "Benson & Hedges Special", cash: "$15", card: "$17" },
    { name: "Double Happiness", cash: "$13", card: "$15" },
    { name: "Double Happiness Shanghai", cash: "$12", card: "$14" },
    { name: "Davidoff Classic", cash: "$18", card: "$20" },
    { name: "Davidoff Gold", cash: "$18", card: "$20" },
    { name: "Dunhill Blue", cash: "$14", card: "$16" },
    { name: "Dunhill Blue Flow Filter PKT", cash: "$15", card: "$17" },
    { name: "Dunhill Blue TAIWAN", cash: "$23", card: "$25" },
    { name: "Dunhill Red", cash: "$15", card: "$17" },
    { name: "Dunhill Dark Red", cash: "$21", card: "$23" },
    { name: "Esse Change Double Wine / Orange", cash: "$10", card: "$12" },
    { name: "Esse Change", cash: "$16", card: "$18" },
    { name: "Esse Light", cash: "$15", card: "$17" },
    { name: "Esse Menthol", cash: "$15", card: "$17" },
    { name: "KENT", cash: "$14", card: "$16" },
    { name: "Mac", cash: "$14", card: "$16" },
    { name: "Manchester Blue Crush", cash: "$18", card: "$20" },
    { name: "Manchester Green Crush", cash: "$18", card: "$20" },
    { name: "Manchester Double Drive", cash: "$18", card: "$20" },
    { name: "Manchester Double Drive Tropical Mint", cash: "$18", card: "$20" },
    { name: "Manchester Light", cash: "$16", card: "$18" },
    { name: "Manchester Red", cash: "$16", card: "$18" },
    { name: "Manchester Reserve", cash: "$16", card: "$18" },
    { name: "Manchester Royal Red", cash: "$16", card: "$18" },
    { name: "Manchester Sapphire Blue", cash: "$16", card: "$18" },
    { name: "Manchester Special Blue", cash: "$16", card: "$18" },
    { name: "Manchester Queen Gold", cash: "$16", card: "$18" },
    { name: "Marlboro Double Burst Menthol Green JPN", cash: "$25", card: "$27" },
    { name: "Marlboro Double Burst Tropical Fruit JPN", cash: "$25", card: "$27" },
    { name: "Marlboro Ice Blast JPN", cash: "$23", card: "$25" },
    { name: "Marlboro Ice Blast USA", cash: "$16", card: "$18" },
    { name: "Marlboro Double Burst USA", cash: "$18", card: "$20" },
    { name: "Marlboro Gold SWIT", cash: "$14", card: "$16" },
    { name: "Marlboro Gold USA", cash: "$14", card: "$16" },
    { name: "Marlboro Red SWIT", cash: "$14", card: "$16" },
    { name: "Marlboro Red USA", cash: "$14", card: "$16" },
    { name: "Mevius Premium Blueberry 8 JPN", cash: "$24", card: "$26" },
    { name: "Seven Stars JPN", cash: "$22", card: "$24" },
    { name: "Captain Black Dark Crema", cash: "$47", card: "$49" },
    { name: "Marlboro Purple Burst USA", cash: "$18" },
    { name: "OSCAR Super Slim", cash: "$13" },
  ];
  const chinese = [
    { name: "中南海 SOUTHERN SEA 8mg", cash: "$15", card: "$17" },
    { name: "中南海蓝莓爆 Blueberry Menthol", cash: "$25", card: "$27" },
    { name: "红塔山 RED TOWER", cash: "$15", card: "$17" },
    { name: "小熊猫 LITTLE PANDA", cash: "$20", card: "$22" },
    { name: "贵烟陈皮 Orange Peel Burst", cash: "$20", card: "$22" },
    { name: "利群 LI QUN", cash: "$20", card: "$22" },
    { name: "苏烟 SU YAN", cash: "$20", card: "$22" },
    { name: "玉溪 YUXI", cash: "$20", card: "$22" },
    { name: "芙蓉王 FURONG KING", cash: "$20", card: "$22" },
    { name: "黄鹤楼 YELLOW CRANE TOWER", cash: "$20", card: "$22" },
    { name: "煊赫门 XUAN HE MEN", cash: "$20", card: "$22" },
    { name: "荷花 LOTUS", cash: "$30", card: "$32" },
    { name: "中华 CHINA", cash: "$30", card: "$32" },
    { name: "中华双中支 Zhonghua Double Medium", cash: "$25", card: "$27" },
  ];
  return (
    <div>
      <PromoBar text="BUY 5 GET $5 OFF  ·  BUY 10 GET 1 PACK FREE  ·  CASH $2 OFF" color="orange" />
      <SectionTitle>INTERNATIONAL CIGARETTE</SectionTitle>
      <StockInfo available={41} outOfStock={2} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10, marginBottom: 28 }}>
        {intl.map((p, i) => <ProductCard key={i} {...p} />)}
      </div>
      <SectionTitle>CHINESE CIG 国烟</SectionTitle>
      <StockInfo available={14} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
        {chinese.map((p, i) => <ProductCard key={i} {...p} />)}
      </div>
    </div>
  );
}

function TobaccoPage() {
  const items = [
    { name: "Amber Leaf Blonde–JPN 25G", cash: "$40", card: "$45" },
    { name: "Amber Leaf Finest Virginia–JPN 25G", cash: "$40", card: "$45" },
    { name: "Amber Leaf Organic Blend–JPN 25G", cash: "$40", card: "$45" },
    { name: "Golden Virginia Original–JPN 50G", cash: "$70", card: "$75" },
    { name: "Violin 40G", cash: "$35", card: "$40" },
    { name: "Golden Leaf 50G", cash: "$35", card: "$40" },
    { name: "Chop Chop 50G", cash: "$25", card: "$30" },
  ];
  return (
    <div>
      <PromoBar text="BUY 5 GET 1 FREE  ·  CASH $5 OFF" color="orange" />
      <SectionTitle>TOBACCO POUCH 烟草袋</SectionTitle>
      <StockInfo available={7} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
        {items.map((p, i) => <ProductCard key={i} {...p} />)}
      </div>
    </div>
  );
}

function PouchesPage({ navigate }) {
  const brands = [
    { id: "zyn", label: "ZYN", desc: "22 flavors available", price: "$20/pack" },
    { id: "velo", label: "VELO", desc: "25 flavors available", price: "$20/pack" },
    { id: "pablo", label: "Pablo", desc: "9 flavors available", price: "$20/pack" },
  ];
  return (
    <div>
      <PromoBar text="BUY 3 GET ONE FREE" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
        {brands.map(b => (
          <div key={b.id} onClick={() => navigate(b.id)} style={{
            background: gradTeal, borderRadius: 14, padding: "28px 22px",
            color: "#fff", cursor: "pointer", boxShadow: T.shadow, transition: "transform 0.14s, box-shadow 0.14s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = T.shadowHover; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = T.shadow; }}
          >
            <div style={{ fontWeight: 900, fontSize: 24, letterSpacing: 1 }}>{b.label}</div>
            <div style={{ color: T.gold, fontWeight: 700, fontSize: 18, margin: "6px 0" }}>{b.price}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{b.desc}</div>
            <div style={{ marginTop: 16, fontSize: 20, opacity: 0.6 }}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ZynPage() {
  const flavors = ["Apple Mint 11mg","Banana Milkshake 9mg","Black Cherry 6mg","Citrus 9mg","Citrus 11mg","Cola Ice 11mg","Cool Mint 11mg","Cool Mint 16.6mg","Cool Tropical 11mg","Cool Watermelon 9mg","Cool Watermelon 11mg","Dark Frost 11mg","Deep Freeze 11mg","Fresh Mint 6.5mg","Fresh Mint 9mg","Ice Mint 12.5mg","Lemon Spritz 6.5mg","Pineapple Coconut 11mg","Red Fruits 9mg","Sour Ruby 11mg","Spearmint 6mg","Spearmint 9mg"];
  const oos = ["Black Cherry 11mg","Cool Mint 9mg","Sour Ruby 9mg"];
  return <div><BrandHeader name="ZYN" price="$20/pack" /><StockInfo available={22} outOfStock={3} /><FlavorGrid flavors={flavors} outOfStock={oos} /></div>;
}

function VeloPage() {
  const flavors = ["Breezy Mango 11mg","Cool Storm 10.9mg","Freeze 10.9mg","Frosty Grapefruit 10mg","Groovy Grape 12mg","Ice Berries 10mg","Ice Cool 10mg","Icy Cherry 12mg","Lime Flame 10mg","Mango Flame 10mg","Mango Flame 17mg","Max Freeze 17mg","Mighty Peppermint 17mg","Orange Spark 10.9mg","Orange Spark 14mg","Peppermint Storm 10.9mg","Peppermint Storm 17mg","Polar Mint 11mg","Polar Mint 14mg","Royal Purple 10mg","Ruby Berry 14mg","Tangled Berry 10mg","Tropic Breeze 6mg","X-Freeze 20mg","Zest Flame 17mg"];
  return <div><BrandHeader name="VELO" price="$20/pack" /><StockInfo available={25} /><FlavorGrid flavors={flavors} /></div>;
}

function PabloPage() {
  const flavors = ["Banana Ice 30mg","Bubblegum 30mg","Frosted Ice 30mg","Grape 30mg","Ice Cold 24mg","Kiwi 30mg","Mocca 30mg","Red 24mg","Strawberry Cheesecake 30mg"];
  return <div><BrandHeader name="Pablo" price="$20/pack" /><StockInfo available={9} /><FlavorGrid flavors={flavors} /></div>;
}

// ── Nav config ─────────────────────────────────────────────────────────────
const NAV = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "vape", label: "VAPE", icon: "☁️" },
  { id: "cigarette", label: "CIGARETTE", icon: "🚬" },
  { id: "tobacco", label: "TOBACCO", icon: "🌿" },
  { id: "pouches", label: "NICOTINE POUCHES", icon: "📦" },
  { id: "zyn", label: "ZYN", icon: "·", parent: "pouches" },
  { id: "velo", label: "VELO", icon: "·", parent: "pouches" },
  { id: "pablo", label: "Pablo", icon: "·", parent: "pouches" },
  { id: "clearance", label: "Clearance", icon: "·", parent: "vape" },
  { id: "ingot", label: "Ingot 9000", icon: "·", parent: "vape" },
  { id: "iceadjust", label: "Ice Adjust 12000", icon: "·", parent: "vape" },
  { id: "igetbarpro", label: "IGET Bar Pro", icon: "·", parent: "vape" },
  { id: "igetone", label: "IGET One", icon: "·", parent: "vape" },
  { id: "igetbarplus", label: "IGET Bar Plus S3", icon: "·", parent: "vape" },
  { id: "hqd", label: "HQD Cuvie Slick", icon: "·", parent: "vape" },
  { id: "snowplus", label: "Snowplus Dash", icon: "·", parent: "vape" },
  { id: "relxcreator", label: "RELX Creator", icon: "·", parent: "vape" },
  { id: "relxsparta", label: "RELX Sparta 18000", icon: "·", parent: "vape" },
  { id: "alfakher", label: "Alfakher", icon: "·", parent: "vape" },
];

const PAGE_TITLES = {
  home: "Welcome", vape: "VAPE", cigarette: "CIGARETTE",
  tobacco: "TOBACCO POUCH 烟草袋", pouches: "NICOTINE POUCHES",
  zyn: "ZYN", velo: "VELO", pablo: "Pablo",
  clearance: "Clearance Sale", ingot: "Ali Barbar – Ingot 9000",
  iceadjust: "Ali Barbar – Ice Adjust 12000", igetbarpro: "IGET Bar Pro",
  igetone: "IGET One", igetbarplus: "IGET Bar Plus S3 10K",
  hqd: "HQD Cuvie Slick", snowplus: "Snowplus Dash",
  relxcreator: "RELX Creator", relxsparta: "RELX Sparta 18000",
  alfakher: "Alfakher",
};

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navigate = (p) => { setPage(p); setMobileMenuOpen(false); window.scrollTo(0, 0); };

  const goBack = () => {
    const item = NAV.find(n => n.id === page);
    if (item?.parent) navigate(item.parent);
    else if (page !== "home") navigate("home");
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage navigate={navigate} />;
      case "vape": return <VapePage navigate={navigate} />;
      case "cigarette": return <CigarettePage />;
      case "tobacco": return <TobaccoPage />;
      case "pouches": return <PouchesPage navigate={navigate} />;
      case "zyn": return <ZynPage />;
      case "velo": return <VeloPage />;
      case "pablo": return <PabloPage />;
      case "clearance": return <ClearancePage />;
      case "ingot": return <IngotPage />;
      case "iceadjust": return <IceAdjustPage />;
      case "igetbarpro": return <IgetBarProPage />;
      case "igetone": return <IgetOnePage />;
      case "igetbarplus": return <IgetBarPlusPage />;
      case "hqd": return <HqdPage />;
      case "snowplus": return <SnowplusPage />;
      case "relxcreator": return <RelxCreatorPage />;
      case "relxsparta": return <RelxSpartaPage />;
      case "alfakher": return <AlfakherPage />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  const vapeSubPages = ["clearance","ingot","iceadjust","igetbarpro","igetone","igetbarplus","hqd","snowplus","relxcreator","relxsparta","alfakher"];
  const pouchSubPages = ["zyn","velo","pablo"];

  const SidebarBtn = ({ item }) => {
    const isSub = item.parent != null;
    const isActive = page === item.id;
    return (
      <button onClick={() => navigate(item.id)} style={{
        display: "flex", alignItems: "center", gap: 12,
        width: "100%", padding: isSub ? "9px 20px 9px 36px" : "13px 20px",
        background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
        border: "none", borderLeft: isActive ? `3px solid ${T.gold}` : "3px solid transparent",
        color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
        fontWeight: isActive ? 800 : 500, fontSize: isSub ? 12 : 13,
        letterSpacing: 0.5, cursor: "pointer", textAlign: "left",
        transition: "all 0.15s", fontFamily: "'Montserrat', sans-serif",
      }}>
        <span style={{ fontSize: isSub ? 8 : 16, opacity: isSub ? 0.4 : 1 }}>●</span>
        {item.label}
      </button>
    );
  };

  if (!isMobile) {
    const showVapeSubnav = ["vape", ...vapeSubPages].includes(page);
    const showPouchSubnav = ["pouches", ...pouchSubPages].includes(page);
    return (
      <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: "'Montserrat', sans-serif", width: "100%" }}>
        <div style={{
          width: 240, background: `linear-gradient(180deg, ${T.tealDark} 0%, #005a6a 100%)`,
          position: "fixed", top: 0, left: 0, bottom: 0,
          display: "flex", flexDirection: "column",
          boxShadow: "4px 0 20px rgba(0,0,0,0.15)", zIndex: 100, overflowY: "auto",
        }}>
          <div style={{ padding: "30px 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>🌿</div>
            <div style={{ color: "#fff", fontWeight: 900, fontSize: 16, letterSpacing: 2 }}>ELIZABETH</div>
            <div style={{ color: T.gold, fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>VAPE</div>
          </div>
          <nav style={{ padding: "16px 0", flex: 1 }}>
            {NAV.filter(n => !n.parent).map(item => (
              <SidebarBtn key={item.id} item={item} />
            ))}
            {showVapeSubnav && NAV.filter(n => n.parent === "vape").map(item => (
              <SidebarBtn key={item.id} item={item} />
            ))}
            {showPouchSubnav && NAV.filter(n => n.parent === "pouches").map(item => (
              <SidebarBtn key={item.id} item={item} />
            ))}
          </nav>
          <div style={{ padding: "16px 20px", fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
            © 2025 Elizabeth Vape
          </div>
        </div>
        <div style={{ marginLeft: 240, flex: 1, padding: "32px 40px", maxWidth: "calc(100% - 240px)" }}>
          <div style={{ marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
            {page !== "home" && (
              <button onClick={goBack} style={{
                background: T.white, border: "none", borderRadius: 8,
                padding: "6px 14px", cursor: "pointer", color: T.teal,
                fontWeight: 700, fontSize: 14, boxShadow: T.shadow, fontFamily: "'Montserrat', sans-serif",
              }}>‹ Back</button>
            )}
            <h1 style={{ margin: 0, fontWeight: 900, fontSize: 26, color: T.text, letterSpacing: 1 }}>
              {PAGE_TITLES[page]}
            </h1>
          </div>
          {renderPage()}
        </div>
      </div>
    );
  }

  // Mobile
  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'Montserrat', sans-serif" }}>
      <div style={{
        background: gradTeal, padding: "14px 16px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 200, boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {page !== "home" && (
            <button onClick={goBack} style={{
              background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8,
              color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer", padding: "4px 12px",
            }}>‹</button>
          )}
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 17, letterSpacing: 1 }}>
            {page === "home" ? "ELIZABETH VAPE" : PAGE_TITLES[page]}
          </span>
        </div>
        <button onClick={() => setMobileMenuOpen(o => !o)} style={{
          background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8,
          color: "#fff", fontSize: 18, cursor: "pointer", padding: "4px 10px",
        }}>☰</button>
      </div>
      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.45)" }} onClick={() => setMobileMenuOpen(false)}>
          <div style={{
            width: 260, height: "100%",
            background: `linear-gradient(180deg, ${T.tealDark}, #005a6a)`,
            padding: "24px 0", overflowY: "auto",
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: "0 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ color: "#fff", fontWeight: 900, fontSize: 16 }}>🌿 ELIZABETH VAPE</div>
            </div>
            {NAV.filter(n => !n.parent).map(item => (
              <button key={item.id} onClick={() => navigate(item.id)} style={{
                display: "flex", alignItems: "center", gap: 12,
                width: "100%", padding: "13px 20px",
                background: page === item.id ? "rgba(255,255,255,0.15)" : "transparent",
                border: "none", borderLeft: page === item.id ? `3px solid ${T.gold}` : "3px solid transparent",
                color: page === item.id ? "#fff" : "rgba(255,255,255,0.7)",
                fontWeight: page === item.id ? 800 : 500, fontSize: 14,
                cursor: "pointer", textAlign: "left", fontFamily: "'Montserrat', sans-serif",
              }}>
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ padding: "16px 14px 40px" }}>{renderPage()}</div>
    </div>
  );
}
