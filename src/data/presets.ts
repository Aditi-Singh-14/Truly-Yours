import { PresetSample, PresetTopic } from "../types";

export const PRESET_SAMPLES: PresetSample[] = [
  {
    id: "tech-builder",
    title: "Tech Hot Take",
    badge: "Snappy & Casual",
    text: "Honestly, most software tools are over-engineered. We don't need another 10-layer modal framework when a simple key-value store and clean typography solve 90% of user needs. The best code is the code you never had to write. Focus on speed, delight, and clear feedback loops.",
  },
  {
    id: "reflective-journal",
    title: "Late Night Reflection",
    badge: "Poetic & Introspective",
    text: "Rain falling on the window pane at midnight always has a way of resetting the noise in my mind. We spend so much energy rushing toward distant targets that we forget the quiet beauty of the present moment. Take a deep breath, linger in the silence, and trust the process.",
  },
  {
    id: "product-strategy",
    title: "Product Manifesto",
    badge: "Structured & Direct",
    text: "Building great digital products requires relentless clarity of intent. Eliminate friction, respect user cognitive load, and craft micro-interactions that feel responsive and intentional. High craftsmanship isn't about feature volume; it's about seamless execution.",
  },
];

export const PRESET_TOPICS: PresetTopic[] = [
  { id: "ai-future", label: "The future of AI & creativity", iconName: "Sparkles" },
  { id: "coffee-thoughts", label: "Midnight coffee & focus", iconName: "Coffee" },
  { id: "remote-work", label: "Unpopular opinion on work culture", iconName: "Laptop" },
  { id: "building-apps", label: "Why simple design wins", iconName: "Layout" },
];
