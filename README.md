<div align="center">

# 🏆 Winner — Build with Gemma Hyderabad 2026
### National-Level Hackathon at CMRIT Hyderabad
### Track 3: Build Your First Gemma App

</div>

---

# Truly Yours

**An AI writing companion that learns your voice — not just your topic.**

Truly Yours analyzes a creator's raw writing sample to extract their distinct **"Voice DNA"** — sentence structure, vocabulary tier, tone, rhythm, and recurring markers — and uses it to generate authentic content that actually sounds like them.

---

## 💡 Inspiration

In today's digital landscape, creators and professionals struggle to maintain their authentic personal voice while producing content at the pace the internet demands. Existing generic AI writing tools generate cold, robotic, homogenous text that erases unique writing traits.

Creators are stuck choosing between:
- Writing everything themselves → burnout from constant high-volume output
- Using generic AI tools → flat, personality-less content that audiences can spot, damaging trust

**Truly Yours** removes that trade-off. It preserves the creator's authentic voice while eliminating the burnout of high-velocity content creation.

---

## 🛠️ How We Built It

### Model Cascade
We utilized the **Gemma 4 open-weights models** (`gemma-4-4b-it` and `gemma-4-27b-it`), supported by fallback routing to `gemma-2-27b-it` and `gemini-3.6-flash` via the Google Gemini API (`@google/genai`).

### Prompt Engineering & Pipeline
A two-stage prompt engineering pipeline powers the core functionality:

1. **Voice Fingerprinting Stage** — Analyzes raw writing text to extract structured traits: sentence length variance, vocabulary complexity tier, tone, cadence, and recurring phrase markers.
2. **Content Synthesis Stage** — Injects the extracted voice fingerprint alongside target topics to synthesize new content matching the user's exact writing style.

### Tech Stack
- **Frontend:** React Native, Expo SDK 54, TypeScript
- **Backend:** Express.js, Node.js
- **AI Layer:** Gemma 4 (4B & 27B) with Gemini API fallback routing

---

## 🎬 The Prototype

- **Demo Video (2 min):** [Watch here](https://youtube.com/shorts/ME7UiHXQGXA?si=yW4qkk_0iRt5y3aJ)
- **GitHub Repository:** [Aditi-Singh-14/Truly-Yours](https://github.com/Aditi-Singh-14/Truly-Yours)

---

## 🚧 Challenges We Ran Into

**Prompt Reliability & Trait Parsing**
Designing prompts that reliably analyze unstructured writing samples and format consistent key-value traits across different writing styles, without hallucinating or defaulting to generic descriptors.

**Cross-Platform Mobile Integration**
Porting a complex glassmorphism UI design into a native React Native Expo application, handling Wi-Fi network routing between mobile devices and local Express backend servers, and implementing resilient fallback states for offline mobile usage.

---

<div align="center">

*Built in 8 hours at Build with Gemma Hyderabad 2026*

</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/440227c8-eb37-45bd-83f9-8ebec726f839

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
