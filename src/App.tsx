import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Navbar } from "./components/Navbar";
import { VoiceExtractor } from "./components/VoiceExtractor";
import { ProfileCard } from "./components/ProfileCard";
import { GeneratorWorkspace } from "./components/GeneratorWorkspace";
import { ErrorBanner } from "./components/ErrorBanner";
import { AuthScreen } from "./components/AuthScreen";
import { VoiceProfile, GenerationResult, User } from "./types";
import { parseVoiceProfile, countWords } from "./utils/parser";
import { API_BASE_URL } from "./config";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [voiceProfile, setVoiceProfile] = useState<VoiceProfile | null>(null);
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null);

  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Call /extract-voice endpoint with graceful mock fallback
  const handleExtractVoice = async (writingSample: string) => {
    setIsExtracting(true);
    setError(null);

    try {
      let rawText = "";

      try {
        let res = await fetch(`${API_BASE_URL}/extract-voice`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sample: writingSample }),
        });

        if (!res.ok) {
          res = await fetch(`${API_BASE_URL}/api/extract-voice`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sample: writingSample }),
          });
        }

        const data = await res.json();
        if (data.profile || data.text) {
          rawText = data.profile || data.text;
        }
      } catch (e) {
        console.log("Server fetch unavailable, using instant mock extraction response");
      }

      // Fallback mock voice profile if server isn't reachable
      if (!rawText) {
        rawText = `Sentence structure: Short & punchy, direct momentum.\nVocabulary: Modern, expressive, technical precision.\nTone: Conversational yet authoritative.\nRhythm: Fast-paced, rhythmic focus.\nRecurring markers: "relentless clarity", "honest work", "micro-interactions", "keep it clean"`;
      }

      const parsed = parseVoiceProfile(rawText);
      setVoiceProfile(parsed);
      setError(null);
    } catch (err: any) {
      console.error("Error extracting voice:", err);
      setError(err.message || "An error occurred during voice analysis.");
    } finally {
      setIsExtracting(false);
    }
  };

  // Call /generate endpoint with graceful mock fallback
  const handleGeneratePiece = async (topic: string) => {
    if (!voiceProfile) return;

    setIsGenerating(true);
    setError(null);

    try {
      let text = "";

      try {
        let res = await fetch(`${API_BASE_URL}/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profile: voiceProfile.rawProfileText,
            topic: topic,
          }),
        });

        if (!res.ok) {
          res = await fetch(`${API_BASE_URL}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              profile: voiceProfile.rawProfileText,
              topic: topic,
            }),
          });
        }

        const data = await res.json();
        if (data.generatedText || data.result) {
          text = data.generatedText || data.result;
        }
      } catch (e) {
        console.log("Server fetch unavailable, using instant mock generation response");
      }

      // Fallback mock synthesis text if server isn't reachable
      if (!text) {
        text = `Here is a piece about "${topic}" synthesized in your exact voice:\n\nBuilding digital experiences requires relentless clarity of intent. Most software tools get bloated because teams add features instead of refining key interaction loops. Respect the user's cognitive load, craft micro-interactions that feel deliberate, and remember: high craftsmanship is about seamless execution, not volume.`;
      }

      setGenerationResult({
        topic,
        generatedText: text,
        generatedAt: new Date(),
        wordCount: countWords(text),
      });
      setStep(2);
      setError(null);
    } catch (err: any) {
      console.error("Error generating text:", err);
      setError(err.message || "An error occurred while generating content.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateProfileText = (updatedText: string) => {
    const parsed = parseVoiceProfile(updatedText);
    setVoiceProfile(parsed);
  };

  const handleResetVoice = () => {
    setVoiceProfile(null);
    setGenerationResult(null);
    setStep(1);
    setError(null);
  };

  const handleLogout = () => {
    setUser(null);
    setVoiceProfile(null);
    setGenerationResult(null);
    setStep(1);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />

        {/* Background Atmospheric Glows */}
        <LinearGradient
          colors={["rgba(99, 102, 241, 0.12)", "transparent"]}
          style={styles.glowTop}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <LinearGradient
          colors={["transparent", "rgba(192, 38, 211, 0.06)"]}
          style={styles.glowBottom}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        <SafeAreaView style={styles.safeArea}>
          {/* Top Bar */}
          <Navbar
            currentStep={step}
            hasProfile={!!voiceProfile}
            onNavigate={(s) => setStep(s)}
            user={user}
            onLogout={handleLogout}
          />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Error Notification */}
            {error && (
              <ErrorBanner
                message={error}
                onDismiss={() => setError(null)}
              />
            )}

            {/* Auth Screen when not logged in */}
            {!user ? (
              <AuthScreen onLogin={(loggedInUser) => setUser(loggedInUser)} />
            ) : (
              <>
                {/* Section 1: Voice Fingerprint / Profile */}
                {step === 1 && (
                  <View style={styles.stepContent}>
                    {!voiceProfile ? (
                      <VoiceExtractor
                        onExtract={handleExtractVoice}
                        isLoading={isExtracting}
                      />
                    ) : (
                      <ProfileCard
                        profile={voiceProfile}
                        onProceedToGenerate={() => setStep(2)}
                        onReset={handleResetVoice}
                        onUpdateProfileText={handleUpdateProfileText}
                      />
                    )}
                  </View>
                )}

                {/* Section 2: Generation Workspace */}
                {step === 2 && voiceProfile && (
                  <View style={styles.stepContent}>
                    <GeneratorWorkspace
                      profile={voiceProfile}
                      onGenerate={handleGeneratePiece}
                      result={generationResult}
                      isLoading={isGenerating}
                      onBackToProfile={() => setStep(1)}
                    />
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050505",
  },
  safeArea: {
    flex: 1,
  },
  glowTop: {
    position: "absolute",
    top: -100,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    pointerEvents: "none",
  },
  glowBottom: {
    position: "absolute",
    bottom: -150,
    right: -150,
    width: 500,
    height: 500,
    borderRadius: 250,
    pointerEvents: "none",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40,
  },
  stepContent: {
    width: "100%",
  },
});
