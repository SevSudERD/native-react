import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ItemType } from "@/type/ItemType";
import itemList from "@/data/item.json";
import { Link } from "expo-router";
import { Item } from "@/app/(tabs)/index";
import { useIsFocused } from "@react-navigation/native";

type Props = {};

const BookmarkScreen = (props: Props) => {
  const [bookmarkItem, setBoorkmarkItem] = useState<ItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchBookmark();
  }, [isFocused]);

  const fetchBookmark = async () => {
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token!);
      let items: ItemType[] = [];
      if (res) {
        res.forEach((element: string) => {
          let data = itemList.find((val: ItemType) => val.id == element);
          items.push(data!);
        });
        setBoorkmarkItem(items);
        setIsLoading(false);
      } else {
        setBoorkmarkItem([]);
        setIsLoading(false);
      }
    });
  };
  return (
    <View style={{ margin: 5 }}>
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={bookmarkItem}
          keyExtractor={(_, index) => `item-${index}`}
          renderItem={({ item }) => {
            if (!item) return null; // item undefined ise hiçbir şey render etme

            return (
              <Link href={`/listing/${item.id}`} asChild>
                <TouchableOpacity>
                  <Item item={item} />
                </TouchableOpacity>
              </Link>
            );
          }}
        />
      )}
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({});
