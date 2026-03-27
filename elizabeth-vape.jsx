import { useState } from "react";

const theme = {
  teal: "#00b4b4",
  tealDark: "#007a8a",
  tealLight: "#00d4c4",
  orange: "#e07a20",
  gold: "#f5a623",
  bg: "#f4f6f8",
  white: "#ffffff",
  text: "#1a2a2a",
  textLight: "#555",
  green: "#00b050",
  red: "#e53935",
  cardBg: "#ffffff",
  shadow: "0 2px 12px rgba(0,0,0,0.09)",
};

const gradientTeal = `linear-gradient(135deg, ${theme.teal}, ${theme.tealDark})`;
const gradientOrange = `linear-gradient(135deg, #e07a20, #f5a623)`;

// ── Shared UI ──────────────────────────────────────────────────────────────

function TopBar({ title, onBack, subtitle }) {
  return (
    <div style={{
      background: gradientTeal,
      color: "#fff",
      padding: "16px 20px 14px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.18)",
          border: "none",
          borderRadius: 8,
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
          cursor: "pointer",
          padding: "4px 12px",
          lineHeight: 1.4,
        }}>‹</button>
      )}
      <div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 20, letterSpacing: 1 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, opacity: 0.82, marginTop: 1 }}>{subtitle}</div>}
      </div>
    </div>
  );
}

function PromoBar({ text, style }) {
  return (
    <div style={{
      background: style === "orange" ? gradientOrange : gradientTeal,
      color: "#fff",
      textAlign: "center",
      padding: "13px 16px",
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: 0.5,
      lineHeight: 1.5,
      borderRadius: 10,
      margin: "14px 14px 0",
    }}>{text}</div>
  );
}

function CategoryCard({ label, icon, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: gradientTeal,
      color: "#fff",
      border: "none",
      borderRadius: 14,
      padding: "20px 22px",
      margin: "10px 14px 0",
      width: "calc(100% - 28px)",
      cursor: "pointer",
      boxShadow: theme.shadow,
      transition: "transform 0.12s, box-shadow 0.12s",
      fontFamily: "'Montserrat', sans-serif",
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 22 }}>{icon}</span>
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: 1.5 }}>{label}</span>
      </div>
      <span style={{ fontSize: 20, opacity: 0.8 }}>›</span>
    </button>
  );
}

function SubCategoryCard({ label, price, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: gradientTeal,
      color: "#fff",
      border: "none",
      borderRadius: 14,
      padding: "18px 20px",
      margin: "10px 14px 0",
      width: "calc(100% - 28px)",
      cursor: "pointer",
      boxShadow: theme.shadow,
      fontFamily: "'Montserrat', sans-serif",
      transition: "transform 0.12s",
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      <div>
        <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: 1 }}>{label}</div>
        <div style={{ color: theme.gold, fontWeight: 700, fontSize: 14, marginTop: 3 }}>{price}</div>
      </div>
      <span style={{ fontSize: 20, opacity: 0.8 }}>›</span>
    </button>
  );
}

function PriceRow({ cash, card }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
      <span style={{ color: theme.green, fontWeight: 700, fontSize: 13 }}>CASH {cash}</span>
      <span style={{ color: theme.red, fontWeight: 700, fontSize: 13 }}>CARD {card}</span>
    </div>
  );
}

function ProductCard({ name, cashPrice, cardPrice, tag }) {
  return (
    <div style={{
      background: theme.cardBg,
      borderRadius: 12,
      padding: "14px 16px",
      margin: "8px 14px 0",
      boxShadow: theme.shadow,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          {tag && <span style={{
            background: tag === "NEW" ? theme.teal : "#e53935",
            color: "#fff", fontSize: 10, fontWeight: 800,
            borderRadius: 5, padding: "2px 6px", letterSpacing: 0.5,
          }}>{tag}</span>}
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 14, color: theme.text }}>{name}</span>
        </div>
        {cashPrice && <PriceRow cash={cashPrice} card={cardPrice} />}
      </div>
    </div>
  );
}

function FlavorItem({ name, outOfStock }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: outOfStock ? "#f5f5f5" : theme.white,
      border: `1px solid ${outOfStock ? "#ddd" : "#e0f4f4"}`,
      borderRadius: 10,
      padding: "13px 14px",
      margin: "7px 14px 0",
    }}>
      <span style={{
        width: 22, height: 22, borderRadius: "50%",
        background: outOfStock ? "#ccc" : theme.teal,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13, color: "#fff", flexShrink: 0,
      }}>{outOfStock ? "○" : "✓"}</span>
      <span style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 14, fontWeight: 500,
        color: outOfStock ? "#bbb" : theme.text,
        textDecoration: outOfStock ? "line-through" : "none",
      }}>{name}</span>
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div style={{
      background: gradientTeal,
      color: "#fff",
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 800,
      fontSize: 16,
      letterSpacing: 1.5,
      padding: "14px 18px",
      margin: "14px 14px 0",
      borderRadius: 10,
    }}>{title}</div>
  );
}

function StockBadge({ available, outOfStock }) {
  return (
    <div style={{
      padding: "6px 14px",
      margin: "10px 14px 0",
      fontSize: 13,
      color: theme.textLight,
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <span style={{ fontWeight: 600, color: theme.teal }}>{available} flavors available</span>
      {outOfStock && <span style={{ color: "#bbb" }}> · {outOfStock} out of stock</span>}
    </div>
  );
}

// ── Page 01: Home ──────────────────────────────────────────────────────────

function HomePage({ navigate }) {
  return (
    <div style={{ minHeight: "100vh", background: theme.bg, fontFamily: "'Montserrat', sans-serif" }}>
      {/* Hero */}
      <div style={{
        background: gradientTeal,
        padding: "60px 24px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 200, height: 200, borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
        }} />
        <div style={{
          position: "absolute", bottom: -30, left: -30,
          width: 140, height: 140, borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }} />
        <div style={{ fontSize: 44, marginBottom: 8 }}>🌿</div>
        <div style={{
          fontWeight: 900, fontSize: 32, color: "#fff",
          letterSpacing: 3, textTransform: "uppercase",
        }}>Elizabeth Vape</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 6, letterSpacing: 2 }}>
          YOUR PREMIUM STORE
        </div>
      </div>

      {/* Menu */}
      <div style={{ paddingBottom: 30 }}>
        <div style={{ padding: "18px 14px 4px", fontWeight: 700, color: theme.textLight, fontSize: 12, letterSpacing: 1.5 }}>
          SHOP BY CATEGORY
        </div>
        <CategoryCard label="VAPE" icon="☁️" onClick={() => navigate("vape")} />
        <CategoryCard label="CIGARETTE" icon="🚬" onClick={() => navigate("cigarette")} />
        <CategoryCard label="TOBACCO" icon="🌿" onClick={() => navigate("tobacco")} />
        <CategoryCard label="NICOTINE POUCHES" icon="📦" onClick={() => navigate("pouches")} />
      </div>

      <div style={{
        textAlign: "center", padding: "20px 0 30px",
        fontSize: 12, color: "#aaa", letterSpacing: 0.5,
      }}>© 2025 Elizabeth Vape. All rights reserved.</div>
    </div>
  );
}

// ── Page 02: Vape ──────────────────────────────────────────────────────────

function VapePage({ onBack }) {
  const products = [
    { name: "CLEARANCE", cashPrice: "$15–$20", cardPrice: null, tag: "SALE", note: true },
    { name: "ALI BARBAR – INGOT 9000", cashPrice: "$43", cardPrice: "$48" },
    { name: "ALI BARBAR – ICE ADJUST 12000", cashPrice: "$45", cardPrice: "$50" },
    { name: "IGET BAR PRO", cashPrice: "$43", cardPrice: "$48" },
    { name: "IGET ONE", cashPrice: "$45", cardPrice: "$50" },
    { name: "IGET BAR PLUS S3 10K KIT/POD", cashPrice: "$35–45", cardPrice: "$40–50" },
    { name: "HQD CUVIE SLICK", cashPrice: "$30", cardPrice: "$35" },
    { name: "SNOWPLUS DASH", cashPrice: "$30", cardPrice: "$35" },
    { name: "RELX CREATOR DEVICE/POD", cashPrice: "$25/$30", cardPrice: "$25/$30" },
    { name: "RELX SPARTA 18000", cashPrice: "$45", cardPrice: "$50" },
    { name: "ALFAKHER", cashPrice: "$45", cardPrice: "$50", tag: "NEW" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: theme.bg }}>
      <TopBar title="VAPE" onBack={onBack} />
      <PromoBar text={"BUY 2 GET $5 OFF  |  BUY 3 GET $10 OFF  |  CASH $5 OFF"} style="orange" />
      <div style={{ paddingBottom: 30, marginTop: 4 }}>
        {products.map((p, i) => (
          <div key={i} style={{
            background: theme.cardBg,
            borderRadius: 12,
            padding: "14px 16px",
            margin: "8px 14px 0",
            boxShadow: theme.shadow,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
                  {p.tag && (
                    <span style={{
                      background: p.tag === "NEW" ? theme.teal : "#e53935",
                      color: "#fff", fontSize: 10, fontWeight: 800,
                      borderRadius: 5, padding: "2px 7px",
                    }}>{p.tag}</span>
                  )}
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text }}>
                    {p.name}
                  </span>
                </div>
                {p.cardPrice && <PriceRow cash={p.cashPrice} card={p.cardPrice} />}
                {p.note && (
                  <div style={{ color: theme.green, fontWeight: 700, fontSize: 15, marginTop: 4 }}>{p.cashPrice}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page 03: Tobacco ───────────────────────────────────────────────────────

function TobaccoPage({ onBack }) {
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
    <div style={{ minHeight: "100vh", background: theme.bg }}>
      <TopBar title="TOBACCO POUCH 烟草袋" onBack={onBack} />
      <PromoBar text={"BUY 5 GET 1 FREE  |  CASH $5 OFF"} style="orange" />
      <SectionHeader title="TOBACCO POUCH 烟草袋" />
      <StockBadge available={7} />
      <div style={{ paddingBottom: 30 }}>
        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: theme.white,
            border: "1px solid #e0f4f4",
            borderRadius: 10,
            padding: "13px 14px",
            margin: "7px 14px 0",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%",
                background: theme.teal,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, color: "#fff", flexShrink: 0,
              }}>✓</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 14, fontWeight: 500, color: theme.text }}>
                {item.name}
              </span>
            </div>
            <PriceRow cash={item.cash} card={item.card} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page 04: Nicotine Pouches ──────────────────────────────────────────────

function PouchesPage({ onBack, navigate }) {
  return (
    <div style={{ minHeight: "100vh", background: theme.bg }}>
      <TopBar title="NICOTINE POUCHES" onBack={onBack} />
      <PromoBar text="BUY 3 GET ONE FREE" style="teal" />
      <div style={{ paddingBottom: 30 }}>
        <SubCategoryCard label="ZYN" price="$20/pack" onClick={() => navigate("zyn")} />
        <SubCategoryCard label="VELO" price="$20/pack" onClick={() => navigate("velo")} />
        <SubCategoryCard label="Pablo" price="$20/pack" onClick={() => navigate("pablo")} />
      </div>
    </div>
  );
}

// ── Page 05: ZYN ──────────────────────────────────────────────────────────

function ZynPage({ onBack }) {
  const available = [
    "Apple Mint 11mg", "Banana Milkshake 9mg", "Black Cherry 6mg",
    "Citrus 9mg", "Citrus 11mg", "Cola Ice 11mg",
    "Cool Mint 11mg", "Cool Mint 16.6mg", "Cool Tropical 11mg",
    "Cool Watermelon 9mg", "Cool Watermelon 11mg", "Dark Frost 11mg",
    "Deep Freeze 11mg", "Fresh Mint 6.5mg", "Fresh Mint 9mg",
    "Ice Mint 12.5mg", "Lemon Spritz 6.5mg", "Pineapple Coconut 11mg",
    "Red Fruits 9mg", "Sour Ruby 11mg", "Spearmint 6mg", "Spearmint 9mg",
  ];
  const outOfStock = ["Black Cherry 11mg", "Cool Mint 9mg", "Sour Ruby 9mg"];

  return (
    <div style={{ minHeight: "100vh", background: theme.bg }}>
      <TopBar title="ZYN" onBack={onBack} subtitle="$20/pack · BUY 3 GET ONE FREE" />
      <div style={{
        background: gradientTeal, color: "#fff", borderRadius: 12,
        margin: "14px 14px 0", padding: "16px 18px",
      }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 22 }}>ZYN</div>
        <div style={{ color: theme.gold, fontWeight: 700, fontSize: 18 }}>$20/pack</div>
        <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4, opacity: 0.9 }}>BUY 3 GET ONE FREE</div>
      </div>
      <StockBadge available={22} outOfStock={3} />
      <div style={{ paddingBottom: 30 }}>
        {available.map((f, i) => <FlavorItem key={i} name={f} />)}
        {outOfStock.map((f, i) => <FlavorItem key={i} name={f} outOfStock />)}
      </div>
    </div>
  );
}

// ── Page 06: VELO ─────────────────────────────────────────────────────────

function VeloPage({ onBack }) {
  const flavors = [
    "Breezy Mango 11mg", "Cool Storm 10.9mg", "Freeze 10.9mg",
    "Frosty Grapefruit 10mg", "Groovy Grape 12mg", "Ice Berries 10mg",
    "Ice Cool 10mg", "Icy Cherry 12mg", "Lime Flame 10mg",
    "Mango Flame 10mg", "Mango Flame 17mg", "Max Freeze 17mg",
    "Mighty Peppermint 17mg", "Orange Spark 10.9mg", "Orange Spark 14mg",
    "Peppermint Storm 10.9mg", "Peppermint Storm 17mg", "Polar Mint 11mg",
    "Polar Mint 14mg", "Royal Purple 10mg", "Ruby Berry 14mg",
    "Tangled Berry 10mg", "Tropic Breeze 6mg", "X-Freeze 20mg", "Zest Flame 17mg",
  ];
  return (
    <div style={{ minHeight: "100vh", background: theme.bg }}>
      <TopBar title="VELO" onBack={onBack} subtitle="$20/pack · BUY 3 GET ONE FREE" />
      <div style={{
        background: gradientTeal, color: "#fff", borderRadius: 12,
        margin: "14px 14px 0", padding: "16px 18px",
      }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 22 }}>VELO</div>
        <div style={{ color: theme.gold, fontWeight: 700, fontSize: 18 }}>$20/pack</div>
        <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4, opacity: 0.9 }}>BUY 3 GET ONE FREE</div>
      </div>
      <StockBadge available={25} />
      <div style={{ paddingBottom: 30 }}>
        {flavors.map((f, i) => <FlavorItem key={i} name={f} />)}
      </div>
    </div>
  );
}

// ── Page 07: Pablo ────────────────────────────────────────────────────────

function PabloPage({ onBack }) {
  const flavors = [
    "Banana Ice 30mg", "Bubblegum 30mg", "Frosted Ice 30mg",
    "Grape 30mg", "Ice Cold 24mg", "Kiwi 30mg",
    "Mocca 30mg", "Red 24mg", "Strawberry Cheesecake 30mg",
  ];
  return (
    <div style={{ minHeight: "100vh", background: theme.bg }}>
      <TopBar title="Pablo" onBack={onBack} subtitle="$20/pack · BUY 3 GET ONE FREE" />
      <div style={{
        background: gradientTeal, color: "#fff", borderRadius: 12,
        margin: "14px 14px 0", padding: "16px 18px",
      }}>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 22 }}>Pablo</div>
        <div style={{ color: theme.gold, fontWeight: 700, fontSize: 18 }}>$20/pack</div>
        <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4, opacity: 0.9 }}>BUY 3 GET ONE FREE</div>
      </div>
      <StockBadge available={9} />
      <div style={{ paddingBottom: 30 }}>
        {flavors.map((f, i) => <FlavorItem key={i} name={f} />)}
      </div>
    </div>
  );
}

// ── Page 08: Cigarette ────────────────────────────────────────────────────

function CigarettePage({ onBack }) {
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
  ];
  const chinese = [
    { name: "中南海 SOUTHERN SEA 8mg", cash: "$15", card: "$17" },
    { name: "中南海蓝莓爆 SOUTHERN SEA Blueberry Menthol", cash: "$25", card: "$27" },
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
  const extras = [
    { name: "Marlboro Purple Burst USA", cash: "$18", card: null },
    { name: "OSCAR Super Slim", cash: "$13", card: null },
  ];

  const CigItem = ({ name, cash, card }) => (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: theme.white,
      border: "1px solid #e0f4f4",
      borderRadius: 10,
      padding: "11px 14px",
      margin: "7px 14px 0",
      gap: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
        <span style={{
          width: 20, height: 20, borderRadius: "50%",
          background: theme.teal,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, color: "#fff", flexShrink: 0,
        }}>✓</span>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 500, color: theme.text }}>
          {name}
        </span>
      </div>
      {card ? (
        <PriceRow cash={cash} card={card} />
      ) : (
        <span style={{ color: theme.green, fontWeight: 700, fontSize: 13 }}>{cash}</span>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: theme.bg }}>
      <TopBar title="CIGARETTE" onBack={onBack} />
      <PromoBar text={"BUY 5 GET $5 OFF  |  BUY 10 GET 1 PACK FREE  |  CASH $2 OFF"} style="orange" />

      <SectionHeader title="INTERNATIONAL CIGARETTE" />
      <StockBadge available={41} outOfStock={2} />
      {intl.map((c, i) => <CigItem key={i} {...c} />)}
      {extras.map((c, i) => <CigItem key={i} {...c} />)}

      <SectionHeader title="CHINESE CIG 国烟" />
      <StockBadge available={14} />
      {chinese.map((c, i) => <CigItem key={i} {...c} />)}

      <div style={{ height: 30 }} />
    </div>
  );
}

// ── Router / App ───────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (p) => setPage(p);
  const goBack = () => {
    if (["vape", "cigarette", "tobacco", "pouches"].includes(page)) setPage("home");
    else if (["zyn", "velo", "pablo"].includes(page)) setPage("pouches");
  };

  return (
    <div style={{
      maxWidth: 480,
      margin: "0 auto",
      minHeight: "100vh",
      background: theme.bg,
      boxShadow: "0 0 40px rgba(0,0,0,0.12)",
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "vape" && <VapePage onBack={goBack} />}
      {page === "cigarette" && <CigarettePage onBack={goBack} />}
      {page === "tobacco" && <TobaccoPage onBack={goBack} />}
      {page === "pouches" && <PouchesPage onBack={goBack} navigate={navigate} />}
      {page === "zyn" && <ZynPage onBack={goBack} />}
      {page === "velo" && <VeloPage onBack={goBack} />}
      {page === "pablo" && <PabloPage onBack={goBack} />}
    </div>
  );
}
