import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
const { Presentation, PresentationFile } = await import(pathToFileURL("C:/Users/usEr/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs").href);

const root = process.cwd();
const buildDir = path.join(root, ".codex-build");
const outDir = path.join(root, "output");
await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(outDir, { recursive: true });

const W = 1280, H = 720;
const C = {
  navy: "#1e293b", blue: "#2563eb", blue2: "#dbeafe", ink: "#172033",
  muted: "#64748b", bg: "#f4f7f6", white: "#ffffff", line: "#e2e8f0",
  light: "#f8fafc", green: "#0f766e"
};
const font = "Noto Sans Thai";

const deck = Presentation.create({ slideSize: { width: W, height: H } });

function shape(slide, geometry, x, y, w, h, fill = "none", lineFill = "none", radius = undefined) {
  return slide.shapes.add({ geometry, position: { left: x, top: y, width: w, height: h }, fill,
    line: { style: "solid", fill: lineFill, width: lineFill === "none" ? 0 : 1 },
    ...(radius ? { borderRadius: radius } : {}) });
}
function text(slide, value, x, y, w, h, size = 24, color = C.ink, bold = false, align = "left") {
  const s = shape(slide, "textbox", x, y, w, h);
  s.text = value;
  s.text.style = { fontFamily: font, fontSize: size, color, bold, align, verticalAlign: "middle" };
  return s;
}
function title(slide, kicker, heading, page) {
  text(slide, kicker.toUpperCase(), 72, 42, 400, 24, 14, C.blue, true);
  text(slide, heading, 72, 72, 900, 58, 34, C.navy, true);
  text(slide, String(page).padStart(2, "0"), 1160, 48, 48, 28, 16, C.muted, true, "right");
  shape(slide, "rect", 72, 142, 1136, 2, C.blue, C.blue);
}
function bullet(slide, value, x, y, w, size = 20, color = C.ink) {
  text(slide, "•  " + value, x, y, w, 34, size, color, false);
}
async function imageBytes(file) {
  const b = await fs.readFile(path.join(root, file));
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}

// 1 Cover
{
  const s = deck.slides.add(); s.background.fill = C.navy;
  shape(s, "rect", 0, 0, 470, H, C.blue, C.blue);
  text(s, "PERSONAL PORTFOLIO WEBSITE", 72, 98, 520, 30, 17, C.blue2, true);
  text(s, "เอกสารสรุป\nการพัฒนาเว็บไซต์", 72, 150, 620, 150, 46, C.white, true);
  text(s, "เว็บไซต์แนะนำตนเองเพื่อเตรียมสมัครงาน", 76, 330, 580, 48, 23, C.blue2, false);
  text(s, "ปวีณ์กร ศรีสุข\nSoftware Engineering, NPRU", 76, 535, 480, 68, 20, C.white, false);
  text(s, "2026", 1085, 620, 120, 34, 20, C.blue2, true, "right");
}

// 2 Objective
{
  const s = deck.slides.add(); s.background.fill = C.bg; title(s, "01  ข้อมูลผู้จัดทำ", "แนวคิดและวัตถุประสงค์", 2);
  shape(s, "roundRect", 72, 185, 460, 390, C.navy, C.navy, "rounded-2xl");
  text(s, "ปวีณ์กร ศรีสุข", 108, 230, 380, 46, 32, C.white, true);
  text(s, "นักศึกษาชั้นปีที่ 2\nสาขาวิชาวิศวกรรมซอฟต์แวร์\nมหาวิทยาลัยราชภัฏนครปฐม", 108, 300, 360, 120, 21, C.blue2);
  text(s, "ตำแหน่งที่สนใจ", 108, 450, 200, 28, 15, C.blue2, true);
  text(s, "Backend Developer /\nSoftware Engineer", 108, 480, 330, 68, 22, C.white, true);
  text(s, "เว็บไซต์นี้จัดทำขึ้นเพื่อรวบรวมประวัติ ทักษะ และผลงานสำหรับใช้แนะนำตนเองและประกอบการสมัครงาน โดยมุ่งสื่อสารความสนใจด้านระบบหลังบ้าน ฐานข้อมูล และการออกแบบระบบ", 590, 205, 560, 120, 23, C.ink);
  shape(s, "roundRect", 590, 375, 560, 150, C.white, C.line, "rounded-xl");
  text(s, "กลุ่มเป้าหมาย", 620, 400, 220, 30, 19, C.blue, true);
  text(s, "ผู้สรรหาบุคลากร อาจารย์ และผู้ที่สนใจผลงานด้านการพัฒนาเว็บไซต์และระบบซอฟต์แวร์", 620, 440, 470, 54, 21, C.ink);
}

// 3 structure
{
  const s = deck.slides.add(); s.background.fill = C.white; title(s, "02  โครงสร้างเว็บไซต์", "เว็บไซต์ประกอบด้วย 4 หน้าหลัก", 3);
  const items = [
    ["หน้าแรก", "index.html", "แนะนำตัว ตำแหน่งงานที่สนใจ และจุดเด่น"],
    ["ประวัติและทักษะ", "about.html", "ประวัติ การศึกษา เป้าหมาย และทักษะ"],
    ["ผลงาน", "projects.html", "แสดงผลงาน 3 โครงการพร้อมรายละเอียด"],
    ["ติดต่อ", "contact.html", "ช่องทางติดต่อและแบบฟอร์มจำลอง"]
  ];
  items.forEach((it, i) => {
    const x = 72 + (i % 2) * 570, y = 190 + Math.floor(i / 2) * 190;
    shape(s, "roundRect", x, y, 520, 145, i === 2 ? C.blue2 : C.light, C.line, "rounded-xl");
    text(s, String(i + 1), x + 22, y + 26, 45, 48, 30, C.blue, true);
    text(s, it[0], x + 85, y + 22, 350, 35, 23, C.navy, true);
    text(s, it[1], x + 85, y + 60, 350, 26, 16, C.blue, true);
    text(s, it[2], x + 85, y + 93, 400, 34, 17, C.ink);
  });
  text(s, "ทุกหน้ามี Header, Navigation, Footer และใช้ไฟล์ css/style.css ร่วมกัน", 72, 605, 980, 30, 20, C.muted);
}

// 4 design
{
  const s = deck.slides.add(); s.background.fill = C.bg; title(s, "03  การออกแบบเว็บไซต์", "โทนสีเรียบ อ่านง่าย และเป็นมืออาชีพ", 4);
  shape(s, "roundRect", 72, 190, 420, 340, C.white, C.line, "rounded-xl");
  text(s, "ชุดสีหลัก", 105, 220, 220, 30, 22, C.navy, true);
  [[C.navy, "กรมท่าเข้ม  #1e293b"], [C.blue, "น้ำเงิน  #2563eb"], [C.bg, "พื้นหลัง  #f4f7f6"], [C.white, "ขาว  #ffffff"]].forEach((a, i) => {
    const y = 275 + i * 55; shape(s, "roundRect", 108, y, 52, 38, a[0], C.line, "rounded-md"); text(s, a[1], 185, y + 3, 260, 30, 18, C.ink);
  });
  text(s, "แนวทางการจัดวาง", 575, 205, 300, 32, 22, C.navy, true);
  bullet(s, "ใช้พื้นที่ว่างและกล่องเนื้อหาเพื่อแบ่งส่วนข้อมูล", 575, 260, 550);
  bullet(s, "ใช้การ์ดสำหรับแสดงทักษะและผลงาน", 575, 315, 550);
  bullet(s, "ใช้สีกรมท่าเป็นพื้นฐานและสีน้ำเงินเป็นจุดเน้น", 575, 370, 550);
  bullet(s, "ใช้ฟอนต์ Segoe UI และลำดับหัวข้อชัดเจน", 575, 425, 550);
  shape(s, "roundRect", 575, 500, 520, 70, C.blue2, C.blue2, "rounded-xl");
  text(s, "รูปแบบเดียวกันทั้งเว็บไซต์ช่วยให้ผู้ใช้จดจำเมนูและใช้งานต่อเนื่องได้ง่าย", 600, 514, 465, 42, 18, C.navy, true);
}

// 5 techniques
{
  const s = deck.slides.add(); s.background.fill = C.white; title(s, "04  เทคนิคที่ใช้ในการพัฒนา", "โครงสร้าง HTML และ CSS ที่นำมาใช้จริง", 5);
  const left = ["Semantic HTML: header, nav, main, section, article, footer", "External CSS ผ่านไฟล์ css/style.css", "Class และ ID สำหรับจัดกลุ่มและเชื่อมโยงฟอร์ม", "Flexbox สำหรับเมนู หน้าแนะนำตัว และการ์ดผลงาน"];
  const right = ["CSS Box Model และตัวแปรสีใน :root", ":hover และ .active สำหรับเมนูและปุ่ม", "Responsive Image ด้วย max-width: 100%", "Internal Link และ External Link ไปยังผลงานจริง"];
  text(s, "HTML", 95, 195, 160, 36, 24, C.blue, true); left.forEach((v, i) => bullet(s, v, 95, 250 + i * 58, 510, 19));
  text(s, "CSS", 690, 195, 160, 36, 24, C.green, true); right.forEach((v, i) => bullet(s, v, 690, 250 + i * 58, 480, 19));
  shape(s, "roundRect", 95, 510, 1010, 80, C.navy, C.navy, "rounded-xl");
  text(s, "ตัวอย่างสำคัญ: .card-grid { display: flex; gap: 20px; flex-wrap: wrap; }", 130, 532, 930, 35, 22, C.white, true);
}

// 6 responsive
{
  const s = deck.slides.add(); s.background.fill = C.white; title(s, "05  อ่านโค้ดจากโครงสร้างหน้าเว็บ", "HTML เชื่อมกับ CSS ผ่าน class", 6);
  text(s, "ตัวอย่างจากหน้าแรก", 72, 190, 320, 32, 22, C.navy, true);
  shape(s, "roundRect", 72, 245, 520, 250, C.navy, C.navy, "rounded-xl");
  text(s, '<section class="hero-box">\n  <img class="profile-img">\n  <div>\n    <h1>ชื่อผู้จัดทำ</h1>\n    <a class="btn">ดูผลงาน</a>\n  </div>\n</section>', 105, 275, 460, 185, 20, C.white);
  text(s, "CSS ที่ทำงานกับส่วนนี้", 665, 190, 380, 32, 22, C.blue, true);
  bullet(s, ".hero-box → display: flex; จัดรูปกับข้อความให้อยู่แถวเดียว", 665, 250, 510, 18);
  bullet(s, ".profile-img → กำหนดขนาด รูปร่างวงกลม และ object-fit", 665, 320, 510, 18);
  bullet(s, ".btn → สีพื้นหลัง ระยะห่าง และรูปแบบปุ่ม", 665, 390, 510, 18);
  shape(s, "roundRect", 665, 455, 500, 76, C.blue2, C.blue2, "rounded-xl");
  text(s, "จำง่าย: class ใน HTML = ชื่อที่ CSS ใช้เลือกส่วนที่จะตกแต่ง", 695, 474, 440, 40, 19, C.navy, true);
}

// 7 css class map
{
  const s = deck.slides.add(); s.background.fill = C.bg; title(s, "06  แผนผัง Class สำคัญ", "ชื่อ class ไหนควบคุมส่วนไหนของเว็บ", 7);
  const rows = [
    [".navbar", "แถบเมนูด้านบน", "display: flex; justify-content: space-between"],
    [".nav-menu", "รายการลิงก์เมนู", "display: flex; gap: 15px"],
    [".container", "กรอบเนื้อหาหลัก", "max-width: 1100px; margin: 0 auto"],
    [".card-grid", "กลุ่มการ์ด", "display: flex; flex-wrap: wrap"],
    [".card", "การ์ดแต่ละใบ", "flex: 1 1 30%; padding: 20px"],
    [".info-list", "รายการข้อมูล", "margin-left: 20px"],
    [".active", "หน้าปัจจุบันในเมนู", "background-color: var(--secondary-color)"]
  ];
  text(s, "HTML class", 90, 190, 180, 30, 20, C.blue, true);
  text(s, "หน้าที่", 365, 190, 180, 30, 20, C.blue, true);
  text(s, "คำสั่ง CSS หลัก", 610, 190, 350, 30, 20, C.blue, true);
  rows.forEach((r, i) => {
    const y = 235 + i * 48; shape(s, "rect", 72, y, 1136, 42, i % 2 ? C.white : C.light, C.line);
    text(s, r[0], 90, y + 5, 240, 30, 18, C.navy, true);
    text(s, r[1], 365, y + 5, 210, 30, 17, C.ink);
    text(s, r[2], 610, y + 5, 560, 30, 17, C.muted);
  });
  text(s, "เวลาอธิบายโค้ด ให้ชี้จาก HTML class ไปหา selector ชื่อเดียวกันใน style.css", 72, 600, 1050, 30, 20, C.ink, true);
}

// 8 responsive
{
  const s = deck.slides.add(); s.background.fill = C.bg; title(s, "07  Responsive Design", "เว็บไซต์ปรับตัวตามขนาดหน้าจอ", 8);
  shape(s, "roundRect", 90, 190, 520, 340, C.white, C.line, "rounded-xl");
  text(s, "Desktop", 125, 210, 180, 30, 22, C.navy, true);
  shape(s, "rect", 145, 270, 410, 190, C.blue2, C.blue, "rounded-md");
  shape(s, "rect", 175, 300, 350, 30, C.navy, C.navy); shape(s, "rect", 175, 350, 100, 75, C.white, C.white); shape(s, "rect", 295, 350, 100, 75, C.white, C.white); shape(s, "rect", 415, 350, 100, 75, C.white, C.white);
  text(s, "การ์ด 3 คอลัมน์", 210, 480, 300, 30, 18, C.muted, false, "center");
  shape(s, "roundRect", 680, 190, 420, 340, C.white, C.line, "rounded-xl");
  text(s, "Mobile", 715, 210, 180, 30, 22, C.navy, true);
  shape(s, "roundRect", 805, 265, 170, 230, C.blue2, C.blue, "rounded-xl");
  shape(s, "rect", 825, 295, 130, 25, C.navy, C.navy); shape(s, "rect", 825, 340, 130, 42, C.white, C.white); shape(s, "rect", 825, 394, 130, 42, C.white, C.white); shape(s, "rect", 825, 448, 130, 25, C.white, C.white);
  text(s, "การ์ด 1 คอลัมน์\nเมนูขึ้นบรรทัดใหม่", 710, 520, 360, 54, 18, C.muted, false, "center");
  shape(s, "roundRect", 100, 585, 1010, 70, C.navy, C.navy, "rounded-xl");
  text(s, "@media (max-width: 768px) { .card { flex: 1 1 100%; } }", 135, 603, 940, 34, 21, C.white, true);
}

// 7 projects
{
  const s = deck.slides.add(); s.background.fill = C.white; title(s, "08  ผลงาน", "ผลงานที่นำเสนอใน Portfolio", 9);
  const imgs = ["images/webcoursework.png", "images/requestingshifts.png", "images/dutyroster.png"];
  const names = ["ระบบแสดงรายการสัตว์เลี้ยง", "ระบบขอเวรเจ้าหน้าที่พยาบาล", "ระบบขอเวรและจัดตารางเวร"];
  for (let i = 0; i < 3; i++) {
    const x = 72 + i * 385; shape(s, "roundRect", x, 190, 350, 360, C.light, C.line, "rounded-xl");
    const bytes = await imageBytes(imgs[i]);
    s.images.add({ blob: bytes, contentType: "image/png", alt: names[i], fit: "contain", position: { left: x + 20, top: 215, width: 310, height: 155 }, geometry: "rect" });
    text(s, names[i], x + 20, 390, 310, 58, 21, C.navy, true);
    const desc = i === 0 ? "HTML5, CSS3, Flexbox" : i === 1 ? "JavaScript, Apps Script, Google Sheets" : "JavaScript, Supabase, Export PDF/Excel";
    text(s, desc, x + 20, 470, 310, 45, 17, C.muted);
  }
  text(s, "ทุกผลงานระบุคำอธิบาย หน้าที่รับผิดชอบ และเทคโนโลยีที่ใช้", 72, 600, 900, 30, 20, C.ink, true);
}

// 8 learnings
{
  const s = deck.slides.add(); s.background.fill = C.bg; title(s, "09  สรุปการพัฒนา", "ปัญหาที่พบและสิ่งที่ได้เรียนรู้", 10);
  shape(s, "roundRect", 72, 195, 520, 340, C.white, C.line, "rounded-xl");
  text(s, "ปัญหาที่พบและวิธีแก้ไข", 105, 225, 420, 32, 23, C.navy, true);
  bullet(s, "ต้องจัดข้อมูลหลายประเภทให้สื่อสารได้ภายในหน้าเดียว จึงแบ่งเป็นส่วนและการ์ด", 105, 290, 430, 18);
  bullet(s, "ต้องรองรับหน้าจอเล็ก จึงใช้ Flexbox และ Media Query ปรับการเรียงเนื้อหา", 105, 365, 430, 18);
  bullet(s, "ต้องควบคุมรูปภาพหลายขนาด จึงกำหนด max-width และ object-fit", 105, 440, 430, 18);
  shape(s, "roundRect", 650, 195, 520, 340, C.navy, C.navy, "rounded-xl");
  text(s, "สิ่งที่ได้เรียนรู้", 685, 225, 420, 32, 23, C.white, true);
  bullet(s, "วางโครงสร้างเว็บไซต์ก่อนลงมือเขียนโค้ด", 685, 290, 430, 18, C.blue2);
  bullet(s, "เชื่อมโยงเนื้อหา HTML กับการออกแบบ CSS อย่างเป็นระบบ", 685, 365, 430, 18, C.blue2);
  bullet(s, "เข้าใจการทำเว็บไซต์ที่ใช้งานได้ทั้ง Desktop และ Mobile", 685, 440, 430, 18, C.blue2);
  text(s, "แนวทางต่อไป: เพิ่มเนื้อหาโครงการและปรับปรุงประสบการณ์ใช้งานอย่างต่อเนื่อง", 72, 605, 1060, 30, 20, C.ink, true);
}

// 9 links
{
  const s = deck.slides.add(); s.background.fill = C.navy;
  text(s, "ลิงก์ผลงานและช่องทางติดต่อ", 72, 80, 800, 60, 38, C.white, true);
  text(s, "เว็บไซต์ Portfolio", 90, 205, 300, 32, 20, C.blue2, true);
  text(s, "GitHub: github.com/sxdalnwza", 90, 250, 760, 38, 24, C.white);
  text(s, "ผลงานออนไลน์", 90, 350, 300, 32, 20, C.blue2, true);
  text(s, "ลิงก์เว็บไซต์และโปรเจกต์จริงอยู่ในหน้า “ผลงาน” ของ Portfolio", 90, 395, 850, 42, 23, C.white);
  shape(s, "roundRect", 90, 520, 560, 80, C.blue, C.blue, "rounded-xl");
  text(s, "Email: paweekorn022006@gmail.com", 120, 542, 500, 35, 22, C.white, true);
  text(s, "ขอบคุณครับ", 930, 585, 250, 48, 30, C.blue2, true, "right");
}

for (const [i, slide] of deck.slides.items.entries()) {
  const png = await deck.export({ slide, format: "png", scale: 1 });
  await fs.writeFile(path.join(buildDir, `slide-${String(i + 1).padStart(2, "0")}.png`), new Uint8Array(await png.arrayBuffer()));
}
const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(path.join(buildDir, "candidate.pptx"));
console.log("created", deck.slides.items.length);
