# MẸO TỐI ƯU PROMPT CHO CÔNG VIỆC VĂN PHÒNG

Dùng chung cho mọi tác vụ Office – dễ hiểu – nhanh áp dụng

---

## 1️⃣ XÁC ĐỊNH MỤC ĐÍCH — Nghĩ: Bạn cần AI làm gì?

✔️ **Các loại tác vụ phổ biến:**

| Mục đích | Keyword gợi ý |
|----------|---------------|
| **Viết mới** | draft, create, compose, write |
| **Chỉnh sửa** | revise, improve, refine, polish |
| **Tóm tắt** | summarize, condense, extract key points |
| **Phân tích** | analyze, evaluate, assess, break down |
| **Chuyển đổi** | convert, transform, reformat, translate |

🎯 **Mẹo:**
Không biết dùng từ gì → dùng công thức:
👉 **"Tạo [loại tài liệu] về [chủ đề] cho [đối tượng]"**

Ví dụ: "Tạo email chuyên nghiệp về thay đổi lịch họp cho khách hàng VIP"

---

## 2️⃣ TONE (Giọng Điệu) — Nhớ công thức: Đối tượng → Tone

✔️ **Bảng chọn nhanh:**

| Đối tượng | Tone phù hợp | Keyword |
|-----------|-------------|---------|
| **Sếp/Leadership** | Trang trọng, ngắn gọn | formal, concise, executive-level |
| **Đồng nghiệp** | Chuyên nghiệp, thân thiện | professional, collaborative |
| **Khách hàng** | Lịch sự, nhiệt tình | polite, warm, customer-focused |
| **Nhân viên mới** | Đơn giản, hướng dẫn | simple, instructional, supportive |
| **Đối tác** | Tôn trọng, rõ ràng | respectful, clear, business-like |

🎯 **Mẹo:**
Muốn vừa chuyên nghiệp vừa gần gũi →
👉 **"professional yet approachable tone"**

---

## 3️⃣ CẤU TRÚC — Quy tắc: Càng rõ cấu trúc, output càng đẹp

✔️ **Format phổ biến:**

**Email:**
```
Subject + Greeting + Context + Main Point + Action + Closing
```

**Báo cáo:**
```
Title + Summary + Background + Findings + Recommendation + Conclusion
```

**Checklist:**
```
Category 1:
  □ Task 1.1
  □ Task 1.2
Category 2:
  □ Task 2.1
```

🎯 **Mẹo:**
Muốn output đẹp ngay lần đầu →
👉 Đưa sẵn cấu trúc trong prompt:

```
"Viết email theo cấu trúc:
1. Subject: [ngắn gọn 6-8 từ]
2. Greeting: [thân thiện]
3. Nội dung: [3 đoạn, mỗi đoạn 2-3 câu]
4. Action: [call-to-action rõ ràng]
5. Closing: [lịch sự + chữ ký]"
```

---

## 4️⃣ ĐỘ DÀI — Công thức chọn độ dài chuẩn

✔️ **Bảng tham khảo:**

| Loại tài liệu | Độ dài lý tưởng |
|---------------|-----------------|
| **Email thông thường** | 50-150 từ (3-5 câu mỗi đoạn) |
| **Email quan trọng** | 150-300 từ (3-4 đoạn) |
| **Báo cáo ngắn** | 300-500 từ |
| **Báo cáo đầy đủ** | 800-1500 từ |
| **Tóm tắt** | 100-200 từ hoặc 5-7 bullet points |
| **Meeting minutes** | 200-400 từ |

🎯 **Mẹo:**
Thêm vào prompt:
- **Ngắn gọn:** "concise, under 100 words"
- **Trung bình:** "around 200-300 words"
- **Chi tiết:** "comprehensive, 500+ words"

---

## 5️⃣ THÔNG TIN CỤ THỂ — Quyết định 80% chất lượng output

✔️ **Checklist thông tin cần có:**

**Cho Email:**
- [ ] Người nhận (vai trò, mối quan hệ)
- [ ] Mục đích gửi email
- [ ] Background context (nếu cần)
- [ ] Hành động mong muốn
- [ ] Deadline (nếu có)

**Cho Báo cáo:**
- [ ] Thời gian báo cáo (tuần/tháng/quý)
- [ ] Dữ liệu số liệu cụ thể
- [ ] KPI/metrics liên quan
- [ ] Vấn đề nổi bật
- [ ] Hành động tiếp theo

**Cho Presentation:**
- [ ] Đối tượng người nghe
- [ ] Thời lượng
- [ ] Mục tiêu cuối (inform/persuade/decide)
- [ ] Key messages (2-3 ý chính)

🎯 **Mẹo:**
Càng nhiều context → AI càng hiểu đúng ý bạn
👉 **"Thêm bối cảnh thật cụ thể"**

Thay vì: "Viết email cho khách hàng"
Nên: "Viết email xin lỗi khách hàng VIP vì giao hàng trễ 3 ngày, đề xuất giảm 15% hóa đơn"

---

## 6️⃣ NGÔN NGỮ & PHONG CÁCH — Tùy chỉnh theo văn hóa công ty

✔️ **Các yếu tố cần lưu ý:**

**Person (Ngôi):**
- **First person (Tôi/Chúng tôi):** Email cá nhân, informal
- **Third person:** Báo cáo, formal document

**Tense (Thì):**
- **Quá khứ:** Báo cáo công việc đã làm
- **Hiện tại:** Mô tả quy trình, SOP
- **Tương lai:** Kế hoạch, proposal

**Độ chuyên nghiệp:**
| Mức độ | Style | Ví dụ |
|--------|-------|-------|
| **Rất formal** | No contractions, passive voice | "It is recommended that..." |
| **Formal** | Clear, direct, professional | "We recommend..." |
| **Business casual** | Friendly but professional | "Here's what we suggest..." |
| **Casual** | Conversational | "Let's try this..." |

🎯 **Mẹo:**
Thêm vào cuối prompt:
👉 **"Match the writing style commonly used in [loại công ty] environment"**

---

## 7️⃣ CALL-TO-ACTION — Luôn kết thúc rõ ràng

✔️ **Các loại CTA phổ biến:**

**Cho Email:**
- "Please confirm by [date]"
- "Let me know if you have questions"
- "Looking forward to your feedback"
- "Please review and approve by EOD"

**Cho Báo cáo:**
- "Recommend immediate action on..."
- "Proposed next steps are..."
- "Awaiting decision on..."

**Cho Meeting:**
- "Action items assigned to [name]"
- "Follow-up meeting scheduled for..."
- "Deadline: [date]"

🎯 **Mẹo:**
Luôn có 1 trong 3:
1. Hành động cụ thể người đọc cần làm
2. Timeline/Deadline
3. Next step tiếp theo

---

## 🎯 COMBO PROMPT VẠN NĂNG CHO OFFICE

### **Template Tối Ưu:**

```
[1. LOẠI TÀI LIỆU] 
Create a [type] about [topic]

[2. ĐỐI TƯỢNG & TONE]
For [audience], using [tone] tone

[3. MỤC ĐÍCH CỤ THỂ]
Purpose: [specific goal]

[4. CẤU TRÚC]
Structure:
- Part 1: [...]
- Part 2: [...]
- Part 3: [...]

[5. THÔNG TIN CỤ THỂ]
Key details:
- [Detail 1]
- [Detail 2]
- [Detail 3]

[6. ĐỘ DÀI & STYLE]
Length: [word count]
Style: [specific style preferences]

[7. OUTPUT FORMAT]
Format: [email/table/bullets/paragraphs]

[8. CALL-TO-ACTION]
End with: [specific CTA]
```

---

## 📋 CHECKLIST TRƯỚC KHI GỬI PROMPT

Đã điền đủ:
- [ ] Loại tài liệu cần tạo
- [ ] Đối tượng nhận/đọc
- [ ] Mục đích cụ thể
- [ ] Cấu trúc mong muốn
- [ ] Tone/style phù hợp
- [ ] Độ dài ước tính
- [ ] Thông tin cụ thể (số liệu, ngày tháng, tên...)
- [ ] Deadline hoặc next step

---

## ⚡ MẸO NÂNG CAO

### **1. Dùng Examples (Ví dụ tham khảo)**
Thêm vào prompt:
```
"Similar to this example:
[paste example text]

But adjust for [your specific context]"
```

### **2. Iterative Refinement (Tinh chỉnh dần)**
Lần 1: Tạo draft cơ bản
Lần 2: "Make it more [formal/concise/detailed]"
Lần 3: "Add [specific element]"

### **3. Role-playing (Đóng vai)**
```
"You are a senior executive assistant with 10 years experience.
Write this email as you would for your CEO."
```

### **4. Constraints (Ràng buộc)**
```
"Requirements:
- Must not exceed 200 words
- Must include at least 2 data points
- Avoid jargon
- Use active voice only"
```

### **5. Multi-format Output**
```
"Provide 3 versions:
1. Short version (50 words)
2. Standard version (150 words)
3. Detailed version (300 words)"
```

---

## ❌ SAI LẦM THƯỜNG GẶP

| Sai lầm | Hậu quả | Cách sửa |
|---------|---------|----------|
| Prompt quá chung chung | Output generic, không dùng được | Thêm context cụ thể |
| Không nói rõ tone | Tone không phù hợp | Chỉ định audience & tone |
| Thiếu cấu trúc | Output bừa bãi | Đưa outline sẵn |
| Không review | Sai sót, không tự nhiên | Luôn đọc lại & edit |
| Copy 100% | Mất cá nhân hóa | Customize 20-30% |

---

## ✅ WORKFLOW LÝ TƯỞNG

```
1. Xác định loại tài liệu + mục đích
   ↓
2. Chọn template prompt phù hợp
   ↓
3. Điền thông tin cụ thể vào [placeholders]
   ↓
4. Gửi prompt → Nhận output
   ↓
5. Review & customize (sửa 20-30%)
   ↓
6. Lưu lại prompt hiệu quả để tái sử dụng
```

---

## 🎁 BONUS: LIBRARY PROMPT NHANH

### **Email xin lỗi:**
```
Write a sincere apology email to [client] for [issue].
Tone: professional yet empathetic.
Include: acknowledgment of issue, explanation (brief), solution offered, timeline.
Length: ~150 words.
```

### **Meeting summary:**
```
Summarize this meeting transcript:
[paste transcript]

Format:
- Key decisions (3-5 points)
- Action items (name + task + deadline)
- Next meeting: date
```

### **Data analysis:**
```
Analyze this data: [paste data]
Provide:
1. 3 key trends
2. Comparison vs [previous period]
3. 2 recommendations
Format: table + brief explanation
```

---

**Lưu ý cuối:** Prompt tốt = Rõ ràng + Đủ context + Cấu trúc + Có ví dụ

Hãy thử, điều chỉnh, và lưu lại những prompt hiệu quả nhất cho bạn! 🚀
