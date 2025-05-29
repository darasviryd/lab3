import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { firestore, auth } from "../firebaseConfig";

export default function AddProductScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [store, setStore] = useState("");
  const [quantity, setQuantity] = useState("1");
  const navigation = useNavigation();

  const isNumber = (value) => /^\d+$/.test(value);

  const handleAddProduct = async () => {
    if (!name || !price || !store || !quantity) {
      Alert.alert("Błąd", "Wypełnij wymagane pola.");
      return;
    }

    if (!isNumber(price) || !isNumber(quantity)) {
      Alert.alert("Błąd", "Cena i ilość muszą być liczbami.");
      return;
    }

    try {
      await addDoc(collection(firestore, "products"), {
        name,
        price,
        description,
        store,
        quantity,
        userId: auth.currentUser.uid,
        status: "Do kupienia",
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert("Błąd dodawania", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Wróć</Text>
      </Pressable>

      <Text style={styles.header}>Dodaj nowy produkt</Text>

      <TextInput
        style={styles.input}
        placeholder="Nazwa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Cena (zł)"
        value={price}
        onChangeText={(text) => setPrice(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Opis (opcjonalnie)"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Sklep"
        value={store}
        onChangeText={setStore}
      />
      <TextInput
        style={styles.input}
        placeholder="Ilość"
        value={quantity}
        onChangeText={(text) => setQuantity(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>+ Dodaj</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  back: {
    color: "#007AFF",
    marginBottom: 10,
    fontSize: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});