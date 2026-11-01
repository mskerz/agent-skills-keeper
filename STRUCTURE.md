relearn-next-react/
├── public/                     # Static files เข้าถึงตรงผ่าน root URL (เช่น /logo.svg)
├── src/
│   ├── app/                    # 1. Routing Layer (บางและคลีนที่สุด)
│   │   ├── (auth)/             # Route Group: กลุ่มหน้าล็อกอิน/สมัครสมาชิก
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/        # Route Group: หน้าจัดการหลังบ้าน
│   │   │   ├── dashboard/page.tsx
│   │   │   └── layout.tsx      # Sidebar/Header ของ dashboard
│   │   ├── api/                # Route Handlers (Webhooks, External Integration)
│   │   │   └── stripe/route.ts
│   │   ├── globals.css         # Tailwind & Global Styles
│   │   ├── layout.tsx          # Root Layout (<html> และ <body>)
│   │   ├── loading.tsx         # Global loading UI
│   │   ├── not-found.tsx       # Global 404 page
│   │   └── page.tsx            # Landing Page (/)
│   │
│   ├── features/               # 2. Business Logic Layer (แยกตามโดเมนงาน)
│   │   ├── auth/               # ฟีเจอร์ยืนยันตัวตน
│   │   │   ├── components/     # UI เฉพาะของ Auth (LoginForm.tsx, SocialButtons.tsx)
│   │   │   ├── actions/        # Server Actions ('use server') เช่น login.action.ts
│   │   │   ├── hooks/          # Custom hooks เช่น useAuth.ts
│   │   │   ├── types/          # auth.types.ts
│   │   │   └── index.ts        # ส่งออก component/action ที่อนุญาตให้ภายนอกเรียกใช้
│   │   └── products/           # ฟีเจอร์สินค้า
│   │       ├── components/     # ProductCard.tsx, ProductGrid.tsx
│   │       ├── actions/        # get-products.ts, mutate-product.ts
│   │       └── types/
│   │
│   ├── components/             # 3. Shared UI Layer (ของส่วนกลางที่ไม่มี Business Logic)
│   │   ├── ui/                 # Atomic/Base Components (ปุ่ม, ช่องกรอก, Modal - นิยมใช้ shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   └── dialog.tsx
│   │   └── common/             # UI ชิ้นใหญ่ที่ใช้ซ้ำข้ามหน้า (Navbar.tsx, Footer.tsx)
│   │
│   ├── lib/                    # 4. Third-party & Infrastructure Config
│   │   ├── db.ts               # Prisma / Drizzle / Database Client instance
│   │   └── utils.ts            # ฟังก์ชันช่วยพื้นฐาน (เช่น cn() รวม class name Tailwind)
│   │
│   ├── hooks/                  # 5. Shared Hooks (Hooks ทั่วไปที่ไม่ขึ้นกับฟีเจอร์ใดฟีเจอร์หนึ่ง)
│   │   ├── use-debounce.ts
│   │   └── use-media-query.ts
│   │
│   └── types/                  # 6. Global Types (ประเภทข้อมูลที่ใช้ทั้งโปรเจกต์ เช่น ApiResponse)
│       └── global.d.ts
│
├── .env.example                # ตัวอย่าง Environment variables
├── next.config.ts
├── package.json
└── tsconfig.json