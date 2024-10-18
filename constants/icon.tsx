import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";

export const icon = {
     index: (props:any) => (
     <Feather name='home' size={24}  {...props}/>
     ),
     bookmark: (props:any) => (<Ionicons name='bookmark-outline' size={24} {...props}/>
     ),
   }