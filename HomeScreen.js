import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, firestore } from "../firebaseConfig";
import { onSnapshot, collection, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (!userId) return;
    const q = query(collection(firestore, "products"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(list);
    });
    return () => unsubscribe();
  }, [userId]);

  const toggleStatus = async (item) => {
    try {
      await updateDoc(doc(firestore, "products", item.id), {
        status: item.status === "Kupione" ? "Do kupienia" : "Kupione",
      });
    } catch (e) {
      Alert.alert("Błąd", "Nie udało się zmienić statusu");
    }
  };

  const deleteProduct = async (itemId) => {
    try {
      await deleteDoc(doc(firestore, "products", itemId));
    } catch (e) {
      Alert.alert("Błąd", "Nie udało się usunąć produktu");
    }
  };

  const logout = () => {
    auth.signOut();
  };

  const renderProduct = (status) => ({ item }) => {
    if (item.status !== status) return null;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("ProductDetail", { product: item })}
        onLongPress={() =>
          Alert.alert("Zmień status", "Czy chcesz zmienić status tego produktu?", [
            { text: "Anuluj", style: "cancel" },
            { text: "OK", onPress: () => toggleStatus(item) },
          ])
        }
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            {item.store ? <Text style={styles.meta}>{item.store}</Text> : null}
          </View>
          <TouchableOpacity onPress={() => deleteProduct(item.id)}>
            <Text style={styles.delete}>🗑</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lista zakupów</Text>

      <Text style={styles.section}>Do kupienia</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct("Do kupienia")}
      />

      <Text style={styles.section}>Kupione</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct("Kupione")}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddProduct")}>
        <Text style={styles.addText}>+ Dodaj produkt</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text style={styles.logout}>Wyloguj</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  heading: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginVertical: 16 },
  section: { fontSize: 18, fontWeight: "600", marginVertical: 8 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  name: { fontSize: 16, fontWeight: "500" },
  meta: { fontSize: 14, color: "#666" },
  delete: { fontSize: 18, color: "red", paddingHorizontal: 10 },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  addText: { color: "white", fontWeight: "bold" },
  logout: { textAlign: "center", marginTop: 16, color: "#007AFF", fontSize: 16 },
});