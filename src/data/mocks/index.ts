import { Product } from "../../types/products";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "AGILITE- MAGNETIX™ BATTLE BELT – Multicam",
    price: 300000,
    description: "AGILITE- MAGNETIX™ BATTLE BELT – Multicam",
    urls: [
      "https://lrxljdjynkbwnjscwzqe.supabase.co/storage/v1/object/sign/images/products/battle-belt-multicam.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMzY3Zjc2Mi1lY2U0LTQ0YmUtODdmZS1iMjBmM2Q3NjhiZDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcHJvZHVjdHMvYmF0dGxlLWJlbHQtbXVsdGljYW0uanBlZyIsImlhdCI6MTc1MDg3ODkyNywiZXhwIjoxNzgyNDE0OTI3fQ.YyzsKGxahabYeuKc_TzSGz1SKUTiLxV5ij-D99RKwcc",
    ],
    category: ["Cinturones tácticos", "Indumentaria Tactica"],
    stock: 10,
    isNew: false,
  },
  {
    id: "2",
    name: "AGILITE- SCORPION LOGO HAT",
    price: 100000,
    description: `
    - Agilite Scorpion Logo Hat
    - One size fits all
    - Hook and Loop closure and adjustment
    - Available in Ranger Green, Wolf Grey and Black
    `,
    urls: [
      "https://lrxljdjynkbwnjscwzqe.supabase.co/storage/v1/object/sign/images/products/GorroCap_RNG.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMzY3Zjc2Mi1lY2U0LTQ0YmUtODdmZS1iMjBmM2Q3NjhiZDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcHJvZHVjdHMvR29ycm9DYXBfUk5HLmpwZWciLCJpYXQiOjE3NTA4Nzg5NjEsImV4cCI6MTc4MjQxNDk2MX0.tUSG09FzNPe_UagM4B17n3x0G15Vf_sp5OQ3ENxw-5E",
    ],
    category: ["Cascos/Helmet", "Indumentaria Tactica"],
    stock: 10,
    isNew: true,
  },
  {
    id: "3",
    name: "AGILITE – PINCER™ PLACARD MULTI-CALIBER TRIPLE MAG POUCH",
    price: 100,
    description: `
    • Fits three 5.56/7.62×39/PCC magazines or six 9mm extended Glock Mags
    • Weight: 5.6oz (161g)
    • Dimensions: 25cm * 9cm (9.8″ x 3.5″)
    • Patent Pending durable polymer magwells
    • Proprietary mil-spec G Hooks
    • Includes 3 Mag Splitters to accommodate PCC Mags
    • Includes mil-spec Polymer MOLLE Placard buckles
    • Laser-cut Squadron mil-spec laminate fabric`,
    urls: [
      "https://lrxljdjynkbwnjscwzqe.supabase.co/storage/v1/object/sign/images/products/Pincer_Placard_Triple_Mag_Pouch_MTC-7_44f0c8a2-35ad-494f-a030-c23d981caf47.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMzY3Zjc2Mi1lY2U0LTQ0YmUtODdmZS1iMjBmM2Q3NjhiZDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcHJvZHVjdHMvUGluY2VyX1BsYWNhcmRfVHJpcGxlX01hZ19Qb3VjaF9NVEMtN180NGYwYzhhMi0zNWFkLTQ5NGYtYTAzMC1jMjNkOTgxY2FmNDcuanBlZyIsImlhdCI6MTc1MDg3ODk3OCwiZXhwIjoxNzgyNDE0OTc4fQ.oRWx11bzyQnBA7KUsbV_aTHNol2SZas8oP7FUyFLR5Q",
      "https://lrxljdjynkbwnjscwzqe.supabase.co/storage/v1/object/sign/images/products/Pincer_Placard_Triple_Mag_Pouch_MTC-9.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMzY3Zjc2Mi1lY2U0LTQ0YmUtODdmZS1iMjBmM2Q3NjhiZDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcHJvZHVjdHMvUGluY2VyX1BsYWNhcmRfVHJpcGxlX01hZ19Qb3VjaF9NVEMtOS5qcGVnIiwiaWF0IjoxNzUwODc4OTkwLCJleHAiOjE3ODI0MTQ5OTB9.3eQdhLaO6dT3_AuVmjKkCDsx93lJiEBd4m2FM6L73jk",
      "https://lrxljdjynkbwnjscwzqe.supabase.co/storage/v1/object/sign/images/products/Pincer_Placard_Triple_Mag_Pouch_MTC-11.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8zMzY3Zjc2Mi1lY2U0LTQ0YmUtODdmZS1iMjBmM2Q3NjhiZDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMvcHJvZHVjdHMvUGluY2VyX1BsYWNhcmRfVHJpcGxlX01hZ19Qb3VjaF9NVEMtMTEuanBlZyIsImlhdCI6MTc1MDg3OTAwMCwiZXhwIjoxNzgyNDE1MDAwfQ.ph30qJFakMw1sXB70wl_c33AgcySZiLaISx0V2CXB2o",
    ],
    category: ["Chalecos / PortaPlacas", "Indumentaria Tactica", "Pouches"],
    stock: 10,
    isNew: true,
  },
];
