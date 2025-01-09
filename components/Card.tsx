import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

interface CardProps {
  title: string;
  date: string;
  buttonText: string;
  imageSource: any;
}

const Card: React.FC<CardProps> = ({
  title,
  date,
  buttonText,
  imageSource,
}) => (
  <View style={styles.card}>
    <Image source={imageSource} style={styles.image} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDate}>{date}</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#7345B6",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Card;
