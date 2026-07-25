import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Sparkles, Mail, Lock, User as UserIcon, ArrowRight, ShieldCheck, Zap } from "lucide-react-native";
import { User } from "../types";

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("aditi@trulyyours.ai");
  const [password, setPassword] = useState<string>("password123");
  const [name, setName] = useState<string>("Aditi Singh");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mockUsers: User[] = [
    {
      id: "usr_1",
      name: "Aditi Singh",
      email: "aditi@trulyyours.ai",
      plan: "PRO CREATOR",
    },
    {
      id: "usr_2",
      name: "Guest Explorer",
      email: "guest@trulyyours.ai",
      plan: "FREE PASS",
    },
  ];

  const handleAuthSubmit = () => {
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        id: `usr_${Date.now()}`,
        name: isSignUp ? (name.trim() || "New Creator") : (email.split("@")[0] || "Aditi Singh"),
        email: email.trim(),
        plan: "PRO CREATOR",
      });
    }, 600);
  };

  const handleSelectMockUser = (user: User) => {
    setEmail(user.email);
    setName(user.name);
    setPassword("password123");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLogin(user);
    }, 400);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <LinearGradient
            colors={["#6366f1", "#d946ef"]}
            style={styles.logo}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Sparkles size={22} color="#ffffff" />
          </LinearGradient>

          <Text style={styles.brandTitle}>Truly Yours</Text>
          <Text style={styles.brandTagline}>AI VOICE IDENTITY SYNTHESIZER</Text>
        </View>

        {/* Auth Mode Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setIsSignUp(false)}
            style={[styles.tab, !isSignUp ? styles.activeTab : null]}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, !isSignUp ? styles.activeTabText : null]}>
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsSignUp(true)}
            style={[styles.tab, isSignUp ? styles.activeTab : null]}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, isSignUp ? styles.activeTabText : null]}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* 1-Tap Quick Presets */}
        <View style={styles.presetsSection}>
          <Text style={styles.presetsLabel}>1-TAP DEMO ACCOUNTS:</Text>
          <View style={styles.presetRow}>
            {mockUsers.map((u) => (
              <TouchableOpacity
                key={u.id}
                onPress={() => handleSelectMockUser(u)}
                style={styles.presetPill}
                activeOpacity={0.7}
              >
                <Zap size={12} color="#818cf8" />
                <Text style={styles.presetPillText}>{u.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Form Inputs */}
        <View style={styles.form}>
          {isSignUp && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>FULL NAME</Text>
              <View style={styles.inputWrapper}>
                <UserIcon size={16} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g. Aditi Singh"
                  placeholderTextColor="rgba(255,255,255,0.25)"
                  style={styles.textInput}
                />
              </View>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
            <View style={styles.inputWrapper}>
              <Mail size={16} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="aditi@trulyyours.ai"
                placeholderTextColor="rgba(255,255,255,0.25)"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.textInput}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <Lock size={16} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••••••"
                placeholderTextColor="rgba(255,255,255,0.25)"
                secureTextEntry={true}
                style={styles.textInput}
              />
            </View>
          </View>

          {/* Submit Action */}
          <TouchableOpacity
            onPress={handleAuthSubmit}
            disabled={isLoading || !email.trim() || !password.trim()}
            style={styles.submitContainer}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#4f46e5", "#c026d3"]}
              style={styles.submitButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {isLoading ? (
                <View style={styles.buttonInner}>
                  <ActivityIndicator size="small" color="#ffffff" />
                  <Text style={styles.submitText}>AUTHENTICATING...</Text>
                </View>
              ) : (
                <View style={styles.buttonInner}>
                  <Text style={styles.submitText}>
                    {isSignUp ? "START SYNTHESIZING" : "ACCESS WORKSPACE"}
                  </Text>
                  <ArrowRight size={16} color="#ffffff" />
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Footer info */}
        <View style={styles.footerInfo}>
          <ShieldCheck size={14} color="#34d399" />
          <Text style={styles.footerText}>Mock Auth Mode Active • Instant Access</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    gap: 16,
  },
  brandHeader: {
    alignItems: "center",
    gap: 6,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  brandTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  brandTagline: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderRadius: 12,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 9,
  },
  activeTab: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  tabText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 12,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  presetsSection: {
    gap: 6,
  },
  presetsLabel: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  presetRow: {
    flexDirection: "row",
    gap: 8,
  },
  presetPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    borderColor: "rgba(99, 102, 241, 0.3)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  presetPillText: {
    color: "#818cf8",
    fontSize: 11,
    fontWeight: "600",
  },
  form: {
    gap: 12,
  },
  inputGroup: {
    gap: 4,
  },
  inputLabel: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  inputIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 13,
  },
  submitContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 4,
  },
  submitButton: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  submitText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  footerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingTop: 4,
  },
  footerText: {
    color: "#34d399",
    fontSize: 10,
    fontWeight: "500",
  },
});
