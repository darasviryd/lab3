import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductDetailScreen({ route }) {
  const { product } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{product.name}</Text>
      <Text style={styles.text}>Cena: {product.price} zł</Text>
      <Text style={styles.text}>Ilość: {product.quantity}</Text>
      <Text style={styles.text}>Sklep: {product.store}</Text>
      <Text style={styles.text}>Opis: {product.description || "-"}</Text>
      <Text style={styles.text}>Status: {product.bought ? "Kupione" : "Do kupienia"}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>← Wróć</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  text: { fontSize: 16, marginBottom: 5 },
  button: { marginTop: 20, backgroundColor: "#007bff", padding: 12, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});