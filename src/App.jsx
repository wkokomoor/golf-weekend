import { useState, useMemo } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell } from "recharts";

const RAW = [
  {year:2020,day:"Friday",round:1,course:"The Witch",side:"Front",Kevin:10,Wesley:16,Bob:14,Karl:9},
  {year:2020,day:"Friday",round:2,course:"The Witch",side:"Back",Kevin:8,Wesley:12,Bob:9,Karl:9},
  {year:2020,day:"Saturday",round:2,course:"Rivers Edge",side:"Front",Kevin:8,Wesley:11,Bob:16,Karl:11},
  {year:2020,day:"Saturday",round:1,course:"Rivers Edge",side:"Back",Kevin:9,Wesley:7,Bob:12,Karl:14},
  {year:2020,day:"Sunday",round:1,course:"Pearl West",side:"N/A",Kevin:5,Wesley:11,Bob:15,Karl:15},
  {year:2020,day:"Sunday",round:2,course:"Pearl East",side:"N/A",Kevin:11,Wesley:9,Bob:16,Karl:14},
  {year:2021,day:"Friday",round:1,course:"Founders Club",side:"Front",Kevin:14,Wesley:17,Bob:16,Karl:18},
  {year:2021,day:"Friday",round:2,course:"Founders Club",side:"Back",Kevin:14,Wesley:15,Bob:14,Karl:5},
  {year:2021,day:"Friday",round:3,course:"Pawley's Plantation",side:"Back",Kevin:6,Wesley:8,Bob:7,Karl:6},
  {year:2021,day:"Saturday",round:1,course:"Litchfield CC",side:"Front",Kevin:7,Wesley:14,Bob:18,Karl:15},
  {year:2021,day:"Saturday",round:2,course:"Litchfield CC",side:"Back",Kevin:8,Wesley:11,Bob:14,Karl:18},
  {year:2021,day:"Sunday",round:1,course:"Heritage Club",side:"Front",Kevin:11,Wesley:11,Bob:15,Karl:13},
  {year:2021,day:"Sunday",round:2,course:"Heritage Club",side:"Back",Kevin:10,Wesley:15,Bob:19,Karl:14},
  {year:2022,day:"Friday",round:1,course:"Sea Trail Byrd",side:"Front",Kevin:11,Wesley:13,Bob:13,Karl:12},
  {year:2022,day:"Saturday",round:1,course:"Carolina Nat'l Egret",side:"N/A",Kevin:8,Wesley:9,Bob:13,Karl:14},
  {year:2022,day:"Saturday",round:2,course:"Carolina Nat'l Heron",side:"N/A",Kevin:12,Wesley:11,Bob:15,Karl:7},
  {year:2022,day:"Saturday",round:3,course:"Carolina Nat'l Ibis",side:"N/A",Kevin:8,Wesley:7,Bob:11,Karl:15},
  {year:2022,day:"Sunday",round:1,course:"Rivers Edge",side:"Front",Kevin:9,Wesley:12,Bob:13,Karl:12},
  {year:2022,day:"Sunday",round:2,course:"Rivers Edge",side:"Back",Kevin:5,Wesley:12,Bob:16,Karl:17},
  {year:2023,day:"Friday",round:1,course:"MB Nat'l South Creek",side:"Front",Kevin:11,Wesley:3,Bob:15,Karl:12},
  {year:2023,day:"Friday",round:2,course:"MB Nat'l South Creek",side:"Back",Kevin:4,Wesley:11,Bob:15,Karl:15},
  {year:2023,day:"Saturday",round:1,course:"Panther's Run",side:"Front",Kevin:8,Wesley:8,Bob:21,Karl:17},
  {year:2023,day:"Saturday",round:2,course:"Tiger's Eye",side:"Back",Kevin:10,Wesley:18,Bob:12,Karl:15},
  {year:2023,day:"Saturday",round:3,course:"Panther's Run",side:"Back",Kevin:12,Wesley:8,Bob:18,Karl:19},
  {year:2023,day:"Saturday",round:4,course:"Tiger's Eye",side:"Front",Kevin:8,Wesley:7,Bob:11,Karl:15},
  {year:2023,day:"Sunday",round:1,course:"Leopard's Chase",side:"Front",Kevin:11,Wesley:13,Bob:15,Karl:12},
  {year:2023,day:"Sunday",round:2,course:"Leopard's Chase",side:"Back",Kevin:11,Wesley:14,Bob:14,Karl:13},
  {year:2024,day:"Friday",round:1,course:"Azalea Sands",side:"Front",Kevin:14,Wesley:12,Bob:12,Karl:10},
  {year:2024,day:"Friday",round:2,course:"Azalea Sands",side:"Back",Kevin:11,Wesley:6,Bob:13,Karl:11},
  {year:2024,day:"Saturday",round:1,course:"Aberdeen",side:"Front",Kevin:6,Wesley:8,Bob:16,Karl:18},
  {year:2024,day:"Saturday",round:2,course:"Aberdeen",side:"Back",Kevin:8,Wesley:9,Bob:12,Karl:13},
  {year:2024,day:"Sunday",round:1,course:"Long Bay Golf Club",side:"Front",Kevin:7,Wesley:9,Bob:20,Karl:16},
  {year:2024,day:"Sunday",round:2,course:"Long Bay Golf Club",side:"Back",Kevin:11,Wesley:11,Bob:22,Karl:15},
  {year:2025,day:"Friday",round:1,course:"Long Bay Golf Club",side:"Front",Kevin:4,Wesley:13,Bob:18,Karl:19},
  {year:2025,day:"Friday",round:2,course:"Long Bay Golf Club",side:"Back",Kevin:15,Wesley:12,Bob:16,Karl:19},
  {year:2025,day:"Saturday",round:1,course:"Sea Trail Jones",side:"Front",Kevin:11,Wesley:18,Bob:16,Karl:11},
  {year:2025,day:"Saturday",round:2,course:"Sea Trail Jones",side:"Back",Kevin:8,Wesley:8,Bob:13,Karl:10},
  {year:2025,day:"Sunday",round:1,course:"Meadowlands",side:"Front",Kevin:7,Wesley:6,Bob:17,Karl:15},
  {year:2025,day:"Sunday",round:2,course:"Meadowlands",side:"Back",Kevin:4,Wesley:8,Bob:10,Karl:8},
  {year:2026,day:"Friday",round:1,course:"Burning Ridge",side:"Front",Kevin:12,Wesley:7,Bob:21,Karl:9},
  {year:2026,day:"Friday",round:2,course:"Burning Ridge",side:"Back",Kevin:7,Wesley:14,Bob:16,Karl:14},
  {year:2026,day:"Saturday",round:1,course:"Grande Dunes",side:"Front",Kevin:6,Wesley:13,Bob:20,Karl:9},
  {year:2026,day:"Saturday",round:2,course:"Grande Dunes",side:"Back",Kevin:9,Wesley:7,Bob:18,Karl:8},
  {year:2026,day:"Sunday",round:1,course:"Myrtlewood Pinehills",side:"Back",Kevin:4,Wesley:9,Bob:15,Karl:12},
  {year:2026,day:"Sunday",round:2,course:"Myrtlewood Pinehills",side:"Front",Kevin:9,Wesley:12,Bob:9,Karl:9},
];

const PLAYERS = ["Kevin", "Wesley", "Bob", "Karl"];
const COLORS = { Kevin: "#1a7a4c", Wesley: "#2563eb", Bob: "#d97706", Karl: "#dc2626" };
const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
const DAYS = ["Friday", "Saturday", "Sunday"];

const StatCard = ({ label, value, sub, color }) => (
  <div style={{
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: "16px 20px",
    minWidth: 140,
    flex: 1,
  }}>
    <div style={{ fontSize: 11, color: "#8a8a8a", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
    <div style={{ fontSize: 28, fontWeight: 700, color: color || "#e8e8e8", fontFamily: "'Playfair Display', serif" }}>{value}</div>
    {sub && <div style={{ fontSize: 12, color: "#6a6a6a", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>}
  </div>
);

const Badge = ({ children, color }) => (
  <span style={{
    display: "inline-block",
    background: color + "22",
    color,
    borderRadius: 6,
    padding: "3px 10px",
    fontSize: 11,
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: 0.5,
  }}>{children}</span>
);

const SectionTitle = ({ children, emoji }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, marginTop: 36 }}>
    <span style={{ fontSize: 22 }}>{emoji}</span>
    <h2 style={{
      fontSize: 20,
      fontWeight: 700,
      color: "#e8e8e8",
      margin: 0,
      fontFamily: "'Playfair Display', serif",
      letterSpacing: 0.5,
    }}>{children}</h2>
    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)", marginLeft: 12 }} />
  </div>
);

const PlayerDot = ({ name }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginRight: 16, fontSize: 13, color: COLORS[name], fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
    <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS[name], display: "inline-block" }} />
    {name}
  </span>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: "#1a1a1a",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 12,
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ fontWeight: 700, color: "#ccc", marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span>{p.name}</span>
          <span style={{ fontWeight: 700 }}>+{typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function GolfDashboard() {
  const [tab, setTab] = useState("recap");

  const yearlyAvg = useMemo(() => YEARS.map(y => {
    const rows = RAW.filter(r => r.year === y);
    const obj = { year: y };
    PLAYERS.forEach(p => { obj[p] = +(rows.reduce((s, r) => s + r[p], 0) / rows.length).toFixed(1); });
    return obj;
  }), []);

  const dayAvg = useMemo(() => DAYS.map(d => {
    const rows = RAW.filter(r => r.day === d);
    const obj = { day: d };
    PLAYERS.forEach(p => { obj[p] = +(rows.reduce((s, r) => s + r[p], 0) / rows.length).toFixed(1); });
    return obj;
  }), []);

  const h2h = useMemo(() => {
    const m = {};
    PLAYERS.forEach(a => { m[a] = {}; PLAYERS.forEach(b => { if (a !== b) m[a][b] = RAW.filter(r => r[a] < r[b]).length; }); });
    return m;
  }, []);

  const winsByYear = useMemo(() => YEARS.map(y => {
    const rows = RAW.filter(r => r.year === y);
    const obj = { year: y };
    PLAYERS.forEach(p => { obj[p] = rows.filter(r => { const min = Math.min(...PLAYERS.map(q => r[q])); return r[p] === min && PLAYERS.filter(q => r[q] === min).length === 1; }).length; });
    return obj;
  }), []);

  const blowups = useMemo(() => PLAYERS.map(p => ({
    name: p,
    blowups: RAW.filter(r => r[p] >= 15).length,
    pct: +(RAW.filter(r => r[p] >= 15).length / RAW.length * 100).toFixed(0),
  })), []);

  const frontBack = useMemo(() => PLAYERS.map(p => ({
    name: p,
    Front: +(RAW.filter(r => r.side === "Front").reduce((s, r) => s + r[p], 0) / RAW.filter(r => r.side === "Front").length).toFixed(1),
    Back: +(RAW.filter(r => r.side === "Back").reduce((s, r) => s + r[p], 0) / RAW.filter(r => r.side === "Back").length).toFixed(1),
  })), []);

  const consistencyData = useMemo(() => YEARS.map(y => {
    const rows = RAW.filter(r => r.year === y);
    const obj = { year: y };
    PLAYERS.forEach(p => {
      const vals = rows.map(r => r[p]);
      const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
      obj[p] = +(Math.sqrt(vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length)).toFixed(1);
    });
    return obj;
  }), []);

  const weekendMomentum = useMemo(() => {
    return YEARS.map(y => {
      const rows = RAW.filter(r => r.year === y);
      const half = Math.floor(rows.length / 2);
      const first = rows.slice(0, half);
      const second = rows.slice(half);
      const obj = { year: y };
      PLAYERS.forEach(p => {
        const avg1 = first.reduce((s, r) => s + r[p], 0) / first.length;
        const avg2 = second.reduce((s, r) => s + r[p], 0) / second.length;
        obj[p] = +(avg2 - avg1).toFixed(1);
      });
      return obj;
    });
  }, []);

  const overallStats = useMemo(() => PLAYERS.map(p => {
    const scores = RAW.map(r => r[p]);
    return {
      name: p,
      avg: +(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1),
      best: Math.min(...scores),
      worst: Math.max(...scores),
      wins: RAW.filter(r => { const min = Math.min(...PLAYERS.map(q => r[q])); return r[p] === min && PLAYERS.filter(q => r[q] === min).length === 1; }).length,
    };
  }), []);

  // Handicap calculation: avg of previous 2 years' scores (per 9 holes)
  const handicapData = useMemo(() => {
    const result = {};
    YEARS.forEach(y => {
      const lookbackYears = y === 2020 ? [] : y === 2021 ? [2020] : [y - 2, y - 1];
      if (lookbackYears.length === 0) { result[y] = null; return; }
      const lookbackRows = RAW.filter(r => lookbackYears.includes(r.year));
      const handicaps = {};
      PLAYERS.forEach(p => {
        handicaps[p] = +(lookbackRows.reduce((s, r) => s + r[p], 0) / lookbackRows.length).toFixed(1);
      });
      result[y] = handicaps;
    });
    return result;
  }, []);

  // Net scores and yearly winners
  const handicapRace = useMemo(() => {
    return YEARS.filter(y => y >= 2021).map(y => {
      const rows = RAW.filter(r => r.year === y);
      const hcaps = handicapData[y];
      const nRounds = rows.length;
      const entry = { year: y, rounds: nRounds, handicaps: {}, rawTotals: {}, netTotals: {}, perRound: [] };

      PLAYERS.forEach(p => {
        entry.handicaps[p] = hcaps[p];
        entry.rawTotals[p] = rows.reduce((s, r) => s + r[p], 0);
        entry.netTotals[p] = +(rows.reduce((s, r) => s + (r[p] - hcaps[p]), 0)).toFixed(1);
      });

      // Per-round breakdown
      rows.forEach((r, i) => {
        const round = { label: `${r.day} R${r.round}`, course: r.course, side: r.side };
        PLAYERS.forEach(p => {
          round[`${p}_raw`] = r[p];
          round[`${p}_net`] = +(r[p] - hcaps[p]).toFixed(1);
        });
        entry.perRound.push(round);
      });

      // Determine winner (lowest net total)
      const sorted = [...PLAYERS].sort((a, b) => entry.netTotals[a] - entry.netTotals[b]);
      entry.winner = sorted[0];
      entry.standings = sorted;
      return entry;
    });
  }, [handicapData]);

  // Chart data: cumulative net over rounds within each year
  const cumulativeNetByYear = useMemo(() => {
    return YEARS.filter(y => y >= 2021).map(y => {
      const rows = RAW.filter(r => r.year === y);
      const hcaps = handicapData[y];
      let cumulative = {};
      PLAYERS.forEach(p => { cumulative[p] = 0; });
      const points = rows.map((r, i) => {
        const pt = { round: i + 1, label: `${r.day} R${r.round}` };
        PLAYERS.forEach(p => {
          cumulative[p] += (r[p] - hcaps[p]);
          pt[p] = +cumulative[p].toFixed(1);
        });
        return pt;
      });
      return { year: y, points };
    });
  }, [handicapData]);

  // Trophy count
  const trophyCount = useMemo(() => {
    const counts = {};
    PLAYERS.forEach(p => { counts[p] = 0; });
    handicapRace.forEach(yr => { counts[yr.winner]++; });
    return counts;
  }, [handicapRace]);

  const tabs = [
    { id: "recap", label: "2026 Recap" },
    { id: "overview", label: "Overview" },
    { id: "handicap", label: "Handicap Race" },
    { id: "trends", label: "Trends" },
    { id: "h2h", label: "Head to Head" },
    { id: "patterns", label: "Quirky Patterns" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0e0e0e",
      color: "#e8e8e8",
      fontFamily: "'DM Sans', sans-serif",
      padding: "28px 24px 60px",
      maxWidth: 840,
      margin: "0 auto",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "#6a6a6a", textTransform: "uppercase", marginBottom: 8 }}>Myrtle Beach Golf Weekend</div>
        <h1 style={{
          fontSize: 38,
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          margin: 0,
          background: "linear-gradient(135deg, #1a7a4c, #2563eb, #d97706, #dc2626)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.2,
        }}>The Handicap Report</h1>
        <div style={{ fontSize: 14, color: "#6a6a6a", marginTop: 6 }}>7 years · 45 rounds · 4 golfers · countless excuses</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 4 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "10px 0", border: "none", borderRadius: 8, cursor: "pointer",
            background: tab === t.id ? "rgba(255,255,255,0.1)" : "transparent",
            color: tab === t.id ? "#fff" : "#6a6a6a",
            fontWeight: 600, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
            transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* 2026 RECAP TAB */}
      {tab === "recap" && (
        <div>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 14, letterSpacing: 2, color: "#6a6a6a", textTransform: "uppercase" }}>March 6–8, 2026</div>
            <div style={{ fontSize: 32, fontFamily: "'Playfair Display', serif", fontWeight: 900, color: "#e8e8e8", marginTop: 4 }}>Year 7 in the Books</div>
            <div style={{ fontSize: 14, color: "#8a8a8a", marginTop: 6 }}>Burning Ridge · Grande Dunes · Myrtlewood Pinehills</div>
          </div>

          <SectionTitle emoji="🏆">Final Standings</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 16 }}>
            {[
              { name: "Kevin", pts: 32, place: "1st", emoji: "🥇", fri: 12, sat: 9, sun: 10, euchre: 1 },
              { name: "Karl", pts: 30.5, place: "2nd", emoji: "🥈", fri: 8, sat: 12, sun: 9.5, euchre: 1 },
              { name: "Bob", pts: 28.5, place: "3rd", emoji: "🥉", fri: 9, sat: 6, sun: 10.5, euchre: 3 },
              { name: "Wesley", pts: 23, place: "4th", emoji: "4️⃣", fri: 7, sat: 9, sun: 6, euchre: 1 },
            ].map((p, i) => (
              <div key={p.name} style={{
                background: i === 0 ? `${COLORS[p.name]}15` : "rgba(255,255,255,0.03)",
                border: `1px solid ${i === 0 ? COLORS[p.name] + "55" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 14, padding: "16px 12px", textAlign: "center",
              }}>
                <div style={{ fontSize: 24 }}>{p.emoji}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS[p.name], marginTop: 4 }}>{p.name}</div>
                <div style={{ fontSize: 32, fontWeight: 900, fontFamily: "'Playfair Display', serif", color: "#e8e8e8" }}>{p.pts}</div>
                <div style={{ fontSize: 10, color: "#6a6a6a", marginTop: 4 }}>F:{p.fri} · Sa:{p.sat} · Su:{p.sun} · E:{p.euchre}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 14, fontSize: 13, color: "#8a8a8a", lineHeight: 1.7, marginBottom: 8 }}>
            Kevin takes the crown again with <strong style={{ color: COLORS.Kevin }}>32 points</strong> — his 7th consecutive year as the best raw golfer on the trip. But the real story is Dad finishing a strong 2nd at 30.5, fueled by a dominant Saturday where he posted the best adjusted score on both nines. Bob clawed his way to 3rd place largely through a monster Sunday handicap performance (10.5 pts!) and <strong style={{ color: COLORS.Bob }}>euchre domination</strong> (3 of 4 possible points). Wesley, despite firing the best front 9 raw score of Friday (+7), couldn't keep the momentum going across the weekend.
          </div>

          <SectionTitle emoji="🏌️">Round-by-Round Breakdown</SectionTitle>

          {/* Friday */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16, marginBottom: 12, borderLeft: "3px solid #fbbf24" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fbbf24", marginBottom: 4 }}>Friday — Burning Ridge</div>
            <div style={{ fontSize: 12, color: "#6a6a6a", marginBottom: 10 }}>Team Match Play · 6-hole rotations · No handicaps · Split points on ties</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                { name: "Kevin", raw: 91, over: 19, pts: 12, detail: "+12/+7" },
                { name: "Wesley", raw: 93, over: 21, pts: 7, detail: "+7/+14" },
                { name: "Bob", raw: 109, over: 37, pts: 9, detail: "+21/+16" },
                { name: "Karl", raw: 95, over: 23, pts: 8, detail: "+9/+14" },
              ].map(p => (
                <div key={p.name} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: COLORS[p.name], fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#e8e8e8" }}>{p.pts} <span style={{ fontSize: 11, color: "#6a6a6a" }}>pts</span></div>
                  <div style={{ fontSize: 11, color: "#5a5a5a" }}>{p.raw} ({p.detail})</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "#8a8a8a", marginTop: 10, lineHeight: 1.6 }}>
              Kevin dominated the back 9 with 7 pts, winning or tying nearly every hole. Wesley's +7 front 9 was his best 9-hole raw score of 2026 but he cratered on the back with +14 — a 7-stroke collapse that cost him the day.
            </div>
          </div>

          {/* Saturday */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16, marginBottom: 12, borderLeft: "3px solid #818cf8" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#818cf8", marginBottom: 4 }}>Saturday — Grande Dunes</div>
            <div style={{ fontSize: 12, color: "#6a6a6a", marginBottom: 10 }}>9-hole handicap adjusted score · 6-5-4-3 point system per 9</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                { name: "Kevin", raw: 87, over: 15, adj: "33/36", pts: 9 },
                { name: "Wesley", raw: 92, over: 20, adj: "39/33", pts: 9 },
                { name: "Bob", raw: 110, over: 38, adj: "40/38", pts: 6 },
                { name: "Karl", raw: 89, over: 17, adj: "31/30", pts: 12 },
              ].map(p => (
                <div key={p.name} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: COLORS[p.name], fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#e8e8e8" }}>{p.pts} <span style={{ fontSize: 11, color: "#6a6a6a" }}>pts</span></div>
                  <div style={{ fontSize: 11, color: "#5a5a5a" }}>Raw {p.raw} · Adj {p.adj}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "#8a8a8a", marginTop: 10, lineHeight: 1.6 }}>
              <strong style={{ color: COLORS.Karl }}>Karl's day.</strong> Dad posted the lowest adjusted score on both nines (31 front, 30 back) and swept all 12 available points — his single best day in 7 years. His raw 89 was also his best 18-hole round ever in this event. Wesley meanwhile had a tale of two halves: a rough +13 front followed by a sharp +7 back that tied Kevin.
            </div>
          </div>

          {/* Sunday */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16, marginBottom: 12, borderLeft: "3px solid #4ade80" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#4ade80", marginBottom: 4 }}>Sunday — Myrtlewood Pinehills</div>
            <div style={{ fontSize: 12, color: "#6a6a6a", marginBottom: 10 }}>Match Play vs Challenger · 6-hole rotations · Full hole handicaps · Split points</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                { name: "Kevin", raw: 85, over: 13, pts: 10 },
                { name: "Wesley", raw: 93, over: 21, pts: 6 },
                { name: "Bob", raw: 96, over: 24, pts: 10.5 },
                { name: "Karl", raw: 93, over: 21, pts: 9.5 },
              ].map(p => (
                <div key={p.name} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: COLORS[p.name], fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#e8e8e8" }}>{p.pts} <span style={{ fontSize: 11, color: "#6a6a6a" }}>pts</span></div>
                  <div style={{ fontSize: 11, color: "#5a5a5a" }}>Raw {p.raw} (+{p.over})</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "#8a8a8a", marginTop: 10, lineHeight: 1.6 }}>
              This is where handicaps earn their keep. <strong style={{ color: COLORS.Bob }}>Bob led the day</strong> with 10.5 pts despite shooting the highest raw score — his 16-stroke handicap turned a +24 into competitive hole-by-hole play. He dominated the front 9 with 6.5 pts. Kevin's raw +13 was the best score of the weekend (and his best Sunday since 2022), but the adjusted format kept it close. Bob's Sunday proved that with the right handicap, anyone can be king for a day.
            </div>
          </div>

          <SectionTitle emoji="📊">Raw Scores vs. Game Results</SectionTitle>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, marginBottom: 8 }}>
            <div style={{ fontSize: 13, color: "#8a8a8a", lineHeight: 1.7 }}>
              <strong style={{ color: "#e8e8e8" }}>If we'd just played raw stroke play all weekend:</strong> Kevin would have won by a mile — his 263 total strokes crushed the field (Wesley 278, Karl 277, Bob 315). But the game formats changed the story. Karl's 14-stroke handicap turned his Saturday from a distant 3rd in raw to a sweeping 1st place. Bob's 16-stroke handicap on Sunday turned last place in raw into <em>first place</em> for the day. That's the beauty of the system — raw skill still matters (Kevin wins), but the games keep everyone in it.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 12 }}>
              {[
                { name: "Kevin", raw: 263, rawRank: "1st", game: 32, gameRank: "1st" },
                { name: "Wesley", raw: 278, rawRank: "2nd", game: 23, gameRank: "4th" },
                { name: "Bob", raw: 315, rawRank: "4th", game: 28.5, gameRank: "3rd" },
                { name: "Karl", raw: 277, rawRank: "3rd (by 1!)", game: 30.5, gameRank: "2nd" },
              ].map(p => (
                <div key={p.name} style={{ textAlign: "center", padding: 8 }}>
                  <div style={{ fontSize: 11, color: COLORS[p.name], fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "#6a6a6a", marginTop: 4 }}>Raw: {p.raw} ({p.rawRank})</div>
                  <div style={{ fontSize: 11, color: "#6a6a6a" }}>Game: {p.game} ({p.gameRank})</div>
                </div>
              ))}
            </div>
          </div>

          <SectionTitle emoji="📈">2026 vs. Historical Trends</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { title: "Kevin's Best Raw Year", desc: "At +7.8/nine, 2026 is Kevin's best year ever — beating his previous best of +8.2 (2025). His +4 on the Pinehills back 9 ties his all-time personal best.", color: COLORS.Kevin },
              { title: "Karl's Career Year", desc: "Karl averaged +10.2/nine in 2026 — obliterating his previous best of +12.0 (2020). His handicap drops from 14 to 12 for 2027. Dad is getting scary.", color: COLORS.Karl },
              { title: "Wesley's Disappearing Back 9", desc: "Wesley averaged +7.0 on front nines but +10.0 on backs in 2026 — a 3-stroke gap that's the worst split of anyone this year. The stamina issue is real.", color: COLORS.Wesley },
              { title: "Bob Crosses a Threshold", desc: "Bob posted a +9 on Sunday's front 9 — only the second time he's broken double digits in 45 career rounds. The first was his legendary +7 at Pawley's Plantation in 2021.", color: COLORS.Bob },
            ].map((a, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 14, borderLeft: `3px solid ${a.color}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: a.color, marginBottom: 4 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: "#8a8a8a", lineHeight: 1.5 }}>{a.desc}</div>
              </div>
            ))}
          </div>

          <SectionTitle emoji="🔮">2027 Handicaps</SectionTitle>
          <div style={{ fontSize: 13, color: "#8a8a8a", marginBottom: 12 }}>Based on the average of 2025 + 2026 scores (per 9 holes, rounded up).</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {[
              { name: "Kevin", hcp2026: 9, hcp2027: 8, dir: "↓" },
              { name: "Wesley", hcp2026: 10, hcp2027: 11, dir: "↑" },
              { name: "Bob", hcp2026: 16, hcp2027: 16, dir: "→" },
              { name: "Karl", hcp2026: 14, hcp2027: 12, dir: "↓↓" },
            ].map(p => {
              const diff = p.hcp2027 - p.hcp2026;
              const diffColor = diff < 0 ? "#4ade80" : diff > 0 ? "#f87171" : "#fbbf24";
              return (
                <div key={p.name} style={{
                  background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16, textAlign: "center",
                  borderTop: `2px solid ${COLORS[p.name]}`,
                }}>
                  <div style={{ fontSize: 11, color: COLORS[p.name], fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>
                    <span style={{ fontSize: 18, color: "#6a6a6a" }}>{p.hcp2026}</span>
                    <span style={{ fontSize: 16, color: diffColor }}>{p.dir}</span>
                    <span style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Playfair Display', serif", color: "#e8e8e8" }}>{p.hcp2027}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#5a5a5a", marginTop: 4 }}>
                    {diff < 0 ? `${Math.abs(diff)} stroke${Math.abs(diff) > 1 ? 's' : ''} tougher` : diff > 0 ? `${diff} stroke${diff > 1 ? 's' : ''} easier` : "No change"}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 14, fontSize: 13, color: "#8a8a8a", lineHeight: 1.7, marginTop: 12 }}>
            The big movers: <strong style={{ color: COLORS.Karl }}>Karl drops 2 strokes to a 12</strong> — his best handicap ever, and proof that 2026 wasn't a fluke. Kevin tightens to an 8, making his margin over the field even thinner. Wesley ticks up to 11 after an inconsistent year. Bob holds steady at 16. The gap between Kevin and Karl is now just 4 strokes — the closest it's been since 2020. Watch out, Kevin.
          </div>

          <SectionTitle emoji="🃏">Euchre Corner</SectionTitle>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 14, fontSize: 13, color: "#8a8a8a", lineHeight: 1.7 }}>
            Bob (<strong style={{ color: COLORS.Bob }}>3 pts</strong>) dominated the card table this year while everyone else managed just 1 point apiece. In a weekend that came down to 1.5 points separating 2nd from 4th, those euchre points mattered. Without them, Bob would've finished last instead of 3rd. Never underestimate the man at the card table.
          </div>
        </div>
      )}

      {/* OVERVIEW TAB */}
      {tab === "overview" && (
        <div>
          <SectionTitle emoji="🏆">Career Scoreboard</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
            {overallStats.map(s => (
              <div key={s.name} style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${COLORS[s.name]}33`,
                borderRadius: 14,
                padding: "20px 16px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 11, color: COLORS[s.name], textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700 }}>{s.name}</div>
                <div style={{ fontSize: 36, fontWeight: 900, fontFamily: "'Playfair Display', serif", color: COLORS[s.name], marginTop: 6 }}>+{s.avg}</div>
                <div style={{ fontSize: 11, color: "#6a6a6a", marginTop: 2 }}>avg per 9</div>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: 14, fontSize: 11 }}>
                  <div><div style={{ color: "#5a5a5a" }}>Best</div><div style={{ fontWeight: 700, color: "#4ade80" }}>+{s.best}</div></div>
                  <div><div style={{ color: "#5a5a5a" }}>Worst</div><div style={{ fontWeight: 700, color: "#f87171" }}>+{s.worst}</div></div>
                  <div><div style={{ color: "#5a5a5a" }}>Wins</div><div style={{ fontWeight: 700, color: "#fbbf24" }}>{s.wins}</div></div>
                </div>
              </div>
            ))}
          </div>

          <SectionTitle emoji="📊">Yearly Handicap Trend</SectionTitle>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>{PLAYERS.map(p => <PlayerDot key={p} name={p} />)}</div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={yearlyAvg} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="year" tick={{ fill: "#6a6a6a", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6a6a6a", fontSize: 12 }} domain={[7, 17]} label={{ value: "Avg over par / 9", angle: -90, position: "insideLeft", fill: "#5a5a5a", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              {PLAYERS.map(p => <Line key={p} type="monotone" dataKey={p} stroke={COLORS[p]} strokeWidth={2.5} dot={{ r: 4, fill: COLORS[p] }} />)}
            </LineChart>
          </ResponsiveContainer>

          <SectionTitle emoji="🥊">9-Hole Wins by Year</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={winsByYear} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="year" tick={{ fill: "#6a6a6a", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6a6a6a", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              {PLAYERS.map(p => <Bar key={p} dataKey={p} fill={COLORS[p]} radius={[4, 4, 0, 0]} />)}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* HANDICAP RACE TAB */}
      {tab === "handicap" && (
        <div>
          <SectionTitle emoji="🎯">How Handicaps Work</SectionTitle>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, marginBottom: 8, fontSize: 13, color: "#8a8a8a", lineHeight: 1.7 }}>
            Each player's <strong style={{ color: "#e8e8e8" }}>9-hole handicap</strong> is calculated as their average score (over par) from the <strong style={{ color: "#e8e8e8" }}>previous two years</strong>. During the weekend, that handicap is subtracted from each 9-hole score to get a <strong style={{ color: "#e8e8e8" }}>net score</strong>. Lowest total net for the weekend wins. This levels the playing field so everyone competes fairly — in theory.
          </div>

          <SectionTitle emoji="🏆">The Trophy Case</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 8 }}>
            {PLAYERS.map(p => (
              <div key={p} style={{
                background: trophyCount[p] > 0 ? `${COLORS[p]}11` : "rgba(255,255,255,0.02)",
                border: `1px solid ${trophyCount[p] > 0 ? COLORS[p] + "44" : "rgba(255,255,255,0.06)"}`,
                borderRadius: 14,
                padding: "20px 16px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 11, color: COLORS[p], textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700 }}>{p}</div>
                <div style={{ fontSize: 42, marginTop: 6 }}>
                  {trophyCount[p] > 0 ? "🏆".repeat(trophyCount[p]) : <span style={{ opacity: 0.2 }}>—</span>}
                </div>
                <div style={{ fontSize: 13, color: "#8a8a8a", marginTop: 4 }}>{trophyCount[p]} win{trophyCount[p] !== 1 ? "s" : ""}</div>
              </div>
            ))}
          </div>

          {/* Year-by-year breakdown */}
          {handicapRace.map(yr => {
            const chartData = cumulativeNetByYear.find(c => c.year === yr.year)?.points || [];
            return (
              <div key={yr.year} style={{ marginTop: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{
                    fontSize: 28, fontWeight: 900, fontFamily: "'Playfair Display', serif",
                    color: COLORS[yr.winner],
                  }}>{yr.year}</span>
                  <Badge color={COLORS[yr.winner]}>Winner: {yr.winner}</Badge>
                  <span style={{ fontSize: 12, color: "#5a5a5a" }}>{yr.rounds} rounds</span>
                </div>

                {/* Handicaps going in */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
                  {PLAYERS.map(p => (
                    <div key={p} style={{
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: 8,
                      padding: "10px 12px",
                      borderTop: `2px solid ${COLORS[p]}`,
                    }}>
                      <div style={{ fontSize: 10, color: "#6a6a6a", textTransform: "uppercase", letterSpacing: 1 }}>Handicap</div>
                      <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: COLORS[p] }}>
                        {yr.handicaps[p]}
                      </div>
                      <div style={{ fontSize: 10, color: "#5a5a5a", marginTop: 4 }}>
                        Raw: {yr.rawTotals[p]} · Net: <strong style={{ color: p === yr.winner ? "#4ade80" : "#aaa" }}>{yr.netTotals[p] > 0 ? "+" : ""}{yr.netTotals[p]}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Final standings */}
                <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
                  {yr.standings.map((p, i) => (
                    <div key={p} style={{
                      flex: 1,
                      background: i === 0 ? `${COLORS[p]}18` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${i === 0 ? COLORS[p] + "44" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: 8,
                      padding: "8px 10px",
                      textAlign: "center",
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? "#fbbf24" : "#5a5a5a" }}>
                        {i === 0 ? "🥇 1st" : i === 1 ? "🥈 2nd" : i === 2 ? "🥉 3rd" : "4th"}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS[p], marginTop: 2 }}>{p}</div>
                      <div style={{ fontSize: 11, color: "#6a6a6a" }}>Net {yr.netTotals[p] > 0 ? "+" : ""}{yr.netTotals[p]}</div>
                    </div>
                  ))}
                </div>

                {/* Cumulative net chart */}
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>{PLAYERS.map(p => <PlayerDot key={p} name={p} />)}</div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="label" tick={{ fill: "#6a6a6a", fontSize: 10 }} angle={-30} textAnchor="end" height={50} />
                    <YAxis tick={{ fill: "#6a6a6a", fontSize: 11 }} label={{ value: "Cumulative Net", angle: -90, position: "insideLeft", fill: "#5a5a5a", fontSize: 10 }} />
                    <Tooltip content={({ active, payload, label }) => {
                      if (!active || !payload) return null;
                      return (
                        <div style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "10px 14px", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                          <div style={{ fontWeight: 700, color: "#ccc", marginBottom: 6 }}>{label}</div>
                          {payload.map((p, i) => (
                            <div key={i} style={{ color: p.color, display: "flex", justifyContent: "space-between", gap: 16 }}>
                              <span>{p.name}</span>
                              <span style={{ fontWeight: 700 }}>{p.value > 0 ? "+" : ""}{p.value}</span>
                            </div>
                          ))}
                        </div>
                      );
                    }} />
                    {PLAYERS.map(p => <Line key={p} type="monotone" dataKey={p} stroke={COLORS[p]} strokeWidth={2} dot={{ r: 3, fill: COLORS[p] }} />)}
                  </LineChart>
                </ResponsiveContainer>

                {/* Round-by-round table */}
                <div style={{ overflowX: "auto", marginTop: 12 }}>
                  <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 11 }}>
                    <thead>
                      <tr>
                        <th style={{ padding: "6px 8px", textAlign: "left", color: "#5a5a5a", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Round</th>
                        {PLAYERS.map(p => (
                          <th key={p} style={{ padding: "6px 8px", textAlign: "center", color: COLORS[p], fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                            {p}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {yr.perRound.map((r, i) => {
                        const nets = PLAYERS.map(p => ({ name: p, net: r[`${p}_net`] }));
                        const minNet = Math.min(...nets.map(n => n.net));
                        const roundWinners = nets.filter(n => Math.abs(n.net - minNet) < 0.01).map(n => n.name);
                        return (
                          <tr key={i}>
                            <td style={{ padding: "6px 8px", color: "#8a8a8a", borderBottom: "1px solid rgba(255,255,255,0.04)", whiteSpace: "nowrap" }}>
                              {r.label} <span style={{ color: "#444" }}>· {r.course}</span>
                            </td>
                            {PLAYERS.map(p => {
                              const isWinner = roundWinners.includes(p);
                              return (
                                <td key={p} style={{
                                  padding: "6px 8px",
                                  textAlign: "center",
                                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                                  background: isWinner ? "rgba(74,222,128,0.08)" : "transparent",
                                }}>
                                  <span style={{ color: "#8a8a8a" }}>{r[`${p}_raw`]}</span>
                                  <span style={{ color: "#444", margin: "0 3px" }}>→</span>
                                  <span style={{
                                    fontWeight: 700,
                                    color: r[`${p}_net`] < 0 ? "#4ade80" : r[`${p}_net`] > 2 ? "#f87171" : "#e8e8e8",
                                  }}>
                                    {r[`${p}_net`] > 0 ? "+" : ""}{r[`${p}_net`]}
                                  </span>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                      <tr style={{ fontWeight: 700 }}>
                        <td style={{ padding: "8px 8px", color: "#e8e8e8", borderTop: "2px solid rgba(255,255,255,0.15)" }}>TOTAL</td>
                        {PLAYERS.map(p => (
                          <td key={p} style={{
                            padding: "8px 8px",
                            textAlign: "center",
                            borderTop: "2px solid rgba(255,255,255,0.15)",
                            color: p === yr.winner ? "#4ade80" : "#e8e8e8",
                            fontSize: 13,
                          }}>
                            {yr.netTotals[p] > 0 ? "+" : ""}{yr.netTotals[p]}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          <SectionTitle emoji="📊">Handicap History</SectionTitle>
          <p style={{ fontSize: 13, color: "#8a8a8a", margin: "0 0 16px" }}>Each player's 9-hole handicap going into each year. Lower handicap = better player = bigger challenge to win on net.</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={YEARS.filter(y => y >= 2021).map(y => ({ year: y, ...handicapData[y] }))} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="year" tick={{ fill: "#6a6a6a", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6a6a6a", fontSize: 12 }} domain={[7, 17]} label={{ value: "Handicap (per 9)", angle: -90, position: "insideLeft", fill: "#5a5a5a", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              {PLAYERS.map(p => <Line key={p} type="monotone" dataKey={p} stroke={COLORS[p]} strokeWidth={2.5} dot={{ r: 4, fill: COLORS[p] }} />)}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* TRENDS TAB */}
      {tab === "trends" && (
        <div>
          <SectionTitle emoji="📅">Performance by Day of Weekend</SectionTitle>
          <p style={{ fontSize: 13, color: "#8a8a8a", margin: "0 0 16px" }}>Who gets better as the weekend goes on? Who falls apart?</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>{PLAYERS.map(p => <PlayerDot key={p} name={p} />)}</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dayAvg} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" tick={{ fill: "#6a6a6a", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6a6a6a", fontSize: 12 }} domain={[7, 17]} />
              <Tooltip content={<CustomTooltip />} />
              {PLAYERS.map(p => <Bar key={p} dataKey={p} fill={COLORS[p]} radius={[4, 4, 0, 0]} />)}
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 12, color: "#4ade80", fontWeight: 700, marginBottom: 4 }}>🏌️ Sunday Closer Award</div>
              <div style={{ fontSize: 13, color: "#aaa" }}>Kevin averages <strong style={{ color: COLORS.Kevin }}>0.87 strokes better</strong> on Sunday than other days. The host course advantage is real.</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 12, color: "#f87171", fontWeight: 700, marginBottom: 4 }}>😩 Sunday Struggler</div>
              <div style={{ fontSize: 13, color: "#aaa" }}>Bob averages <strong style={{ color: COLORS.Bob }}>+16.0 on Sundays</strong> vs +13.5 on Fridays. The weekend takes its toll.</div>
            </div>
          </div>

          <SectionTitle emoji="📈">Weekend Momentum (2nd Half vs 1st Half avg)</SectionTitle>
          <p style={{ fontSize: 13, color: "#8a8a8a", margin: "0 0 16px" }}>Negative = improved in 2nd half of weekend. Positive = got worse.</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weekendMomentum} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="year" tick={{ fill: "#6a6a6a", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6a6a6a", fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              {PLAYERS.map(p => <Bar key={p} dataKey={p} fill={COLORS[p]} radius={[4, 4, 0, 0]} />)}
            </BarChart>
          </ResponsiveContainer>

          <SectionTitle emoji="🎯">Consistency Over the Years (Std Dev)</SectionTitle>
          <p style={{ fontSize: 13, color: "#8a8a8a", margin: "0 0 16px" }}>Lower = more consistent. Higher = more volatile round-to-round.</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={consistencyData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="year" tick={{ fill: "#6a6a6a", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6a6a6a", fontSize: 12 }} domain={[0, 6]} />
              <Tooltip content={<CustomTooltip />} />
              {PLAYERS.map(p => <Line key={p} type="monotone" dataKey={p} stroke={COLORS[p]} strokeWidth={2.5} dot={{ r: 4, fill: COLORS[p] }} />)}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* HEAD TO HEAD TAB */}
      {tab === "h2h" && (
        <div>
          <SectionTitle emoji="⚔️">Head-to-Head Win Rate</SectionTitle>
          <p style={{ fontSize: 13, color: "#8a8a8a", margin: "0 0 16px" }}>Out of {RAW.length} nine-hole rounds, how often does each player beat the other?</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{ padding: "10px 14px", textAlign: "left", color: "#6a6a6a", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>↓ beats →</th>
                  {PLAYERS.map(p => <th key={p} style={{ padding: "10px 14px", textAlign: "center", color: COLORS[p], fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>{p}</th>)}
                </tr>
              </thead>
              <tbody>
                {PLAYERS.map(a => (
                  <tr key={a}>
                    <td style={{ padding: "10px 14px", fontWeight: 700, color: COLORS[a], borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{a}</td>
                    {PLAYERS.map(b => {
                      if (a === b) return <td key={b} style={{ padding: "10px 14px", textAlign: "center", color: "#333", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>—</td>;
                      const wins = h2h[a][b];
                      const pct = Math.round(wins / RAW.length * 100);
                      const bg = pct >= 60 ? "rgba(74,222,128,0.12)" : pct <= 30 ? "rgba(248,113,113,0.12)" : "rgba(255,255,255,0.03)";
                      return (
                        <td key={b} style={{ padding: "10px 14px", textAlign: "center", background: bg, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <div style={{ fontWeight: 700, fontSize: 16 }}>{pct}%</div>
                          <div style={{ fontSize: 10, color: "#6a6a6a" }}>{wins}/{RAW.length}</div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SectionTitle emoji="🔥">Key Rivalries</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fbbf24", marginBottom: 8 }}>Closest Matchup</div>
              <div style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                <span style={{ color: COLORS.Wesley }}>Wesley</span> vs <span style={{ color: COLORS.Karl }}>Karl</span>
              </div>
              <div style={{ fontSize: 12, color: "#8a8a8a", marginTop: 4 }}>Wesley wins 62% of the time — but Karl keeps it competitive with those clutch low rounds.</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#f87171", marginBottom: 8 }}>Most Lopsided</div>
              <div style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                <span style={{ color: COLORS.Kevin }}>Kevin</span> vs <span style={{ color: COLORS.Bob }}>Bob</span>
              </div>
              <div style={{ fontSize: 12, color: "#8a8a8a", marginTop: 4 }}>Kevin beats Bob 95% of the time (37 out of 39 rounds). Bob's only win? It's basically a unicorn sighting.</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.Kevin, marginBottom: 8 }}>Brothers Battle</div>
              <div style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                <span style={{ color: COLORS.Kevin }}>Kevin</span> vs <span style={{ color: COLORS.Wesley }}>Wesley</span>
              </div>
              <div style={{ fontSize: 12, color: "#8a8a8a", marginTop: 4 }}>Kevin has the edge at 62%, but Wesley keeps the sibling rivalry alive — especially when he fires off those rare +3 rounds.</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.Karl, marginBottom: 8 }}>Father vs Son</div>
              <div style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                <span style={{ color: COLORS.Karl }}>Karl</span> vs <span style={{ color: COLORS.Wesley }}>Wesley</span>
              </div>
              <div style={{ fontSize: 12, color: "#8a8a8a", marginTop: 4 }}>Wesley beats Dad 62% of the time. Karl's best weapon? Wild swings — when he's on, he can post a +5 out of nowhere.</div>
            </div>
          </div>

          <SectionTitle emoji="🏅">Front 9 vs Back 9</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={frontBack} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" tick={{ fill: "#6a6a6a", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6a6a6a", fontSize: 12 }} domain={[8, 17]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Front" fill="#4ade80" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Back" fill="#818cf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ fontSize: 12, color: "#8a8a8a", marginTop: 8, textAlign: "center" }}>Everyone plays slightly better on the back 9. Bob sees the biggest improvement (−1.8 strokes).</div>
        </div>
      )}

      {/* QUIRKY PATTERNS TAB */}
      {tab === "patterns" && (
        <div>
          <SectionTitle emoji="💥">Blowup Factor (15+ over par on a 9)</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {blowups.map(b => (
              <div key={b.name} style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid ${COLORS[b.name]}33`,
                borderRadius: 12,
                padding: 16,
                textAlign: "center",
              }}>
                <div style={{ fontSize: 11, color: COLORS[b.name], fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{b.name}</div>
                <div style={{ fontSize: 36, fontWeight: 900, fontFamily: "'Playfair Display', serif", color: b.blowups > 15 ? "#f87171" : b.blowups > 5 ? "#fbbf24" : "#4ade80" }}>{b.blowups}</div>
                <div style={{ fontSize: 11, color: "#6a6a6a" }}>{b.pct}% of rounds</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: "#8a8a8a", marginTop: 12 }}>
            Kevin has blown up exactly <strong>once</strong> in 39 rounds. Bob has exploded in over half his rounds. The gap between these two is a statistical marvel.
          </div>

          <SectionTitle emoji="🎰">Superlatives & Awards</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { title: "🧊 Mr. Consistent", player: "Kevin", desc: "Lowest career std dev (2.87). You always know what you're getting: a solid +8 to +11.", color: COLORS.Kevin },
              { title: "🎢 The Rollercoaster", player: "Wesley", desc: "Posted both the best single 9 (+3 in 2023) AND a +18 in the same year. A 15-stroke range in one weekend.", color: COLORS.Wesley },
              { title: "🏠 Home Course King", player: "Kevin", desc: "The host advantage is real. Kevin wins 67% of all 9-hole rounds across 6 years. Nobody else is close.", color: COLORS.Kevin },
              { title: "⚡ Karl's Magic Round", player: "Karl", desc: "In 2021, Karl fired a +5 on the back 9 at Founders Club. His best 9 ever — and 13 strokes better than his worst that same year.", color: COLORS.Karl },
              { title: "📉 Most Improved", player: "Wesley", desc: "Went from +13.0/9 in 2021 to +9.2/9 in 2024. That's nearly 4 strokes per 9 off the handicap — a serious leap.", color: COLORS.Wesley },
              { title: "🪨 The Immovable Object", player: "Bob", desc: "Bob's yearly average has never dipped below +13.5. Six years in, the handicap hasn't budged. Respect the consistency of being consistently over par.", color: COLORS.Bob },
              { title: "🌅 The Friday Fader", player: "Karl", desc: "Karl's best day is Friday (+12.1), but Saturday (+14.1) hits him hard. Maybe it's the extra Saturday rounds catching up.", color: COLORS.Karl },
              { title: "💪 Late-Round Warrior", player: "Everyone", desc: "All four players actually improve in later rounds of the day. Round 3+ averages are lower than Round 1 for everyone. Warmup effect is real.", color: "#818cf8" },
            ].map((a, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 16, borderLeft: `3px solid ${a.color}` }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: "#8a8a8a", lineHeight: 1.5 }}>{a.desc}</div>
              </div>
            ))}
          </div>

          <SectionTitle emoji="🔮">How Did Our 2026 Predictions Hold Up?</SectionTitle>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
            {[
              { text: "\"Kevin will win the weekend.\" ✅ Correct. He always does. 7 for 7.", emoji: "🏆", hit: true },
              { text: "\"Wesley will post at least one sub-+6 nine.\" ❌ Nope. His best was +7 on Friday's front. Close but no cigar.", emoji: "📈", hit: false },
              { text: "\"Bob will have one magical round where he beats Kevin.\" ✅ Sunday front 9: Bob +9, Kevin +9. They TIED. We'll give partial credit.", emoji: "⭐", hit: true },
              { text: "\"Karl will fire the best 9-hole score then follow it with his worst.\" ❌ Karl was the opposite — incredibly consistent. His range was only 6 strokes (8–14). Mr. Steady.", emoji: "🎢", hit: false },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < 3 ? 14 : 0, opacity: p.hit ? 1 : 0.7 }}>
                <span style={{ fontSize: 20 }}>{p.emoji}</span>
                <span style={{ fontSize: 13, color: "#aaa", lineHeight: 1.5 }}>{p.text}</span>
              </div>
            ))}
          </div>
          <SectionTitle emoji="🎱">2027 Predictions</SectionTitle>
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 20 }}>
            {[
              { text: "Karl's handicap dropped to 12 and he's peaking. He will finish within 2 points of Kevin.", emoji: "🔥" },
              { text: "Wesley will bounce back with his most consistent weekend yet — no 9-hole score above +13.", emoji: "📏" },
              { text: "Bob will win at least one full day outright. The euchre king has confidence now.", emoji: "👑" },
              { text: "Kevin will NOT win the weekend. Controversial? Maybe. But the handicap gap is closing fast.", emoji: "😱" },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: i < 3 ? 14 : 0 }}>
                <span style={{ fontSize: 20 }}>{p.emoji}</span>
                <span style={{ fontSize: 13, color: "#aaa", lineHeight: 1.5 }}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 48, fontSize: 11, color: "#3a3a3a" }}>
        45 rounds · 2020–2026 · Myrtle Beach, SC
      </div>
    </div>
  );
}
