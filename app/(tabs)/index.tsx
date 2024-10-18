import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import itemList from '@/data/item.json';
import { ItemType } from '@/type/ItemType';
import { Link } from 'expo-router';

type Props = {}
const HomeScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <FlatList 
        data={itemList} 
        keyExtractor={(_, index) => `item-${index}`} 
        renderItem={({ item }) => (
          <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
              <Item item={item} />
            </TouchableOpacity>
          </Link>
        )}
      />
    </View>
  );
}

export default HomeScreen;

export const Item = ({ item }: { item: ItemType }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.posterUrl }} style={styles.itemImg} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.rating}>rating: {item.rating}
        <Text style={styles.itemReleaseYear}>  year: {item.releaseYear}
        <Text style={styles.duration}>  duration: {item.duration}</Text>
        </Text>
        </Text>
        <Text style={styles.itemGenre}>{item.genre.join(', ')}</Text>
        
        <Text style={styles.director}>{item.director}</Text>
        <Text style={styles.itemCast}>{item.cast.join(', ')}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
       
    
  },
  itemImg: {
    width: 100,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
       
  },
  itemInfo: {   
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    flexDirection: 'row', 
    justifyContent: 'center',
    width: '21%',
  
  },
  itemReleaseYear: {
    fontSize: 14,
    marginTop:3,
    marginBottom: 5,
    marginLeft: 20,
    
  },
  itemGenre: {
    fontSize: 14,
    marginBottom: 3,
    marginTop: 6,
   
  },
  itemDescription: {
    fontSize: 14,
    flexDirection: 'row', 
    justifyContent: 'center', 
    width: '22%', 
    marginTop: 8,  
  },
  itemCast: {
    fontSize: 14,
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    width: '22%',  
    marginTop: 6,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',  
  },
  rating: {
    fontSize: 14,
    
  },
  duration: {
    fontSize: 14,
  },
  director: {
    fontSize: 13,
    marginTop: 3,
  },
});
