import { StyleSheet, Text, View } from 'react-native'
import {Tabs} from 'expo-router'
import React from 'react'
import {TabBar} from '@/components/TabBar'

const TabsLayout = () => {
  return (
    <Tabs tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen name="index"  options={{title: 'Home'}} />
      <Tabs.Screen name="bookmark" options={{title: 'Bookmark' }} />
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({})