import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Recommendations = () => (
  <View style={styles.recommendations}>
    <Text style={styles.recommendationsTitle}>
      Personalised Recommendations
    </Text>
    <View style={styles.recommendationCard}>
      <Text style={styles.recommendationText}>Top pick</Text>
      <Text style={styles.recommendationText}>
        IV Drip for Boosting Immunity
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  recommendations: {
    marginTop: 20,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recommendationCard: {
    backgroundColor: "#ffe0b2",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  recommendationText: {
    fontSize: 16,
  },
});

export default Recommendations;
