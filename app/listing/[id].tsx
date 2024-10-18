import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import itemList from "@/data/item.json";
import { ItemType } from "@/type/ItemType";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const ItemDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [item, setItem] = useState<ItemType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookmark, setBookmark] = useState<boolean>(false);

  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    if (!isLoading){
      renderBookmark(item?.id);
    }
  }, [isLoading]);

  const getItem = () => {
    const result = itemList.find((item) => item.id === Number(id));
    setIsLoading(false);
    setItem(result);
  };

  const saveBookmark = async (itemId: string) => {
    setBookmark(true);
     await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token!);
      if (res !== null) {
        let data = res.find((val: string) => val === itemId);
        if (data == null) {
          res.push(itemId);
          AsyncStorage.setItem("bookmark", JSON.stringify(res));
          alert("Item saved");
        }
      } else {
        let bookmark = [];
        bookmark.push(itemId);
        AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
        alert("Item saved");
      };
      
    });
  };

  const removeBookmark = async (itemId: string) => {
    setBookmark(false);
    const bookmark = await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token!);
      return res.filter((id: string) => id !== itemId);
    });
    await AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
    alert('item removed');
  };

  const renderBookmark = async (itemId: string) => {
     await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token!);
      if (res!== null) {
        let data = res.find((val: string) => val === itemId);
        return data == null ? setBookmark(false) : setBookmark(true);
      }

      
    });

  }


  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity 
            onPress={() => 
            bookmark ? removeBookmark(item.id) : saveBookmark(item.id)}>
              <Ionicons
                name={bookmark ? "heart" : "heart-outline"}
                size={22}
                color={bookmark ? "red" : "black"}
              />
            </TouchableOpacity>
          ),
          title: "",
        }}
      />

      <ScrollView
        contentContainerStyle={styles.contentContainer} // contentContainerStyle doğru yer
        style={styles.container} // style sadece container için
      >
        <Text style={styles.title}>{item?.name}</Text>
        <View>
          <Text style={styles.rating}>Raiting: {item?.rating}
          <Text style={styles.newsInfo}>  Year: {item?.releaseYear}</Text>
          </Text>
          <Text style={styles.genre}>{item?.genre}</Text>
          
          <Text style={styles.newsInfo}>{item?.director}</Text>
        </View>
        {item?.posterUrl && (
          <Image source={{ uri: item.posterUrl }} style={styles.newImg} />
        )}
        <Text style={styles.description}>{item?.description}</Text>
      </ScrollView>
    </>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  rating: {
    fontSize: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  description: {
    fontSize: 18,
    marginTop: 23,
     
  },
  genre: {
    fontSize: 18,
    marginBottom: 16,
    marginTop: 15,
  
  },
  newImg: {
    width: 200,
    height: 300,
  },
  newsInfo: {
    fontSize: 17,
    marginBottom: 16,
  },
  newsInfoWrapper: {
    fontSize: 16,
    marginBottom: 16,
  },
});
