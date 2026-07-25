import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Mic, PenTool, LogOut, User as UserIcon } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { User } from "../types";

interface NavbarProps {
  currentStep: 1 | 2;
  hasProfile: boolean;
  onNavigate: (step: 1 | 2) => void;
  user?: User | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  hasProfile,
  onNavigate,
  user,
  onLogout,
}) => {
  return (
    <View style={styles.header}>
      {/* Brand Logo and Title */}
      <View style={styles.brandContainer}>
        <LinearGradient
          colors={["#6366f1", "#d946ef"]}
          style={styles.logo}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.logoText}>TY</Text>
        </LinearGradient>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Truly Yours</Text>
          <Text style={styles.subtitle}>IDENTITY SYNTHESIZER</Text>
        </View>
      </View>

      {/* User Badge / Logout */}
      {user && (
        <View style={styles.userSection}>
          <View style={styles.userBadge}>
            <UserIcon size={12} color="#818cf8" />
            <Text style={styles.userName} numberOfLines={1}>
              {user.name}
            </Text>
          </View>
          {onLogout && (
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton} activeOpacity={0.7}>
              <LogOut size={14} color="rgba(255,255,255,0.4)" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Step Navigation Pills */}
      {user && (
        <View style={styles.navPills}>
          <TouchableOpacity
            onPress={() => onNavigate(1)}
            style={[styles.pill, currentStep === 1 ? styles.activePillWeb : null]}
            activeOpacity={0.8}
          >
            <Mic size={12} color={currentStep === 1 ? "#000000" : "rgba(255,255,255,0.6)"} />
            <Text style={[styles.pillText, currentStep === 1 ? styles.activePillTextWeb : null]}>
              01. Voice
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => hasProfile && onNavigate(2)}
            disabled={!hasProfile}
            style={[
              styles.pill,
              !hasProfile ? styles.disabledPill : null,
            ]}
            activeOpacity={0.8}
          >
            {currentStep === 2 ? (
              <LinearGradient
                colors={["#4f46e5", "#c026d3"]}
                style={styles.gradientPillBg}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.gradientPillContent}>
                  <PenTool size={12} color="#ffffff" />
                  <Text style={[styles.pillText, styles.activePillTextNav]}>02. Generate</Text>
                </View>
              </LinearGradient>
            ) : (
              <View style={styles.gradientPillContent}>
                <PenTool size={12} color={hasProfile ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)"} />
                <Text
                  style={[
                    styles.pillText,
                    hasProfile ? styles.hasProfilePillText : styles.disabledPillText,
                  ]}
                >
                  02. Generate
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgba(5, 5, 5, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 13,
  },
  titleContainer: {
    justifyContent: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 7,
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: 1,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  userBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    borderColor: "rgba(99, 102, 241, 0.3)",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxWidth: 100,
  },
  userName: {
    color: "#818cf8",
    fontSize: 10,
    fontWeight: "600",
  },
  logoutButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  navPills: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 2,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    minHeight: 28,
    gap: 4,
  },
  activePillWeb: {
    backgroundColor: "#ffffff",
  },
  activePillTextWeb: {
    color: "#000000",
    fontWeight: "700",
  },
  pillText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 10,
    fontWeight: "600",
  },
  gradientPillBg: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: -10,
    marginVertical: -5,
  },
  gradientPillContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  activePillTextNav: {
    color: "#ffffff",
    fontWeight: "700",
  },
  hasProfilePillText: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  disabledPill: {
    opacity: 0.5,
  },
  disabledPillText: {
    color: "rgba(255, 255, 255, 0.2)",
  },
});
