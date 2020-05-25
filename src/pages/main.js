import React, {useEffect,useState} from 'react';
import { StyleSheet,Image,View,Text,TextInput,TouchableOpacity } from 'react-native';
import MapView ,{Marker,Callout} from 'react-native-maps';
import {requestPermissionsAsync,getCurrentPositionAsync} from 'expo-location'; 
import{MaterialIcons} from '@expo/vector-icons';
function Main({navigation}) {
    const[CurrentRegion,SetCurrentRegion] = useState(null);
    useEffect(()=>{
        async function loadInitialPosition(){
                const {granted} = await requestPermissionsAsync();
                if(granted){
                    const {coords} = await getCurrentPositionAsync({
                    enableHighAccuracy:true,
                });
                const {latitude,longitude} =coords;
                SetCurrentRegion({
                    latitude,
                    longitude,
                    latidudeDelta:0.04,
                    longitudeDelta:0.04,
                })
            }
        }
        loadInitialPosition();
    },[]);
    if(!CurrentRegion){
        return null;
    }
    
    return (
        <>
    <MapView initialRegion={CurrentRegion} style={styles.map}>
      <Marker coordinate={{latitude: -23.5571769, longitude: -46.8543534}}>
       <Image style= {styles.avatar} source={{uri:'https://avatars1.githubusercontent.com/u/22019306?s=460&u=01536f2ee1dc67dc3a3c966ca43002138fa6bf78&v=4'}}/>
        <Callout onPress={()=>{
            navigation.navigate('Profile',{github_username:'AnaCarolina5621'})
        }}>
            <View style={styles.callout}>
                <Text style={styles.devName}> Ana Carolina Oliveira Barbosa</Text>
                <Text style={styles.devBio}>Java Developer and Data Engineer</Text>
                <Text style={styles.devTechs}>Focusing Java+ WSDL + Hicode</Text>
            </View>
        </Callout>
     </Marker>
    </MapView>
   <View style={styles.searchForm}>
       <TextInput 
       style={styles.searchInput} placeholder ="Buscar devs por Techs..." placeholderTextColor="#000"
       autoCapitalize="words"
       autoCorrect={false}/>
        <TouchableOpacity onPress={()=>{}} style={styles.loadbutton}>
            <MaterialIcons name="my-location" size={20} color="#FFF"/>
        </TouchableOpacity>
   </View>
   </>
   );
}
 
const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar:{
        width:54,
        height: 54,
        borderRadius:4,
        borderWidth:4,
        borderColor: '#fff'
    },
    callout:{
        width:260,

    },
    devName:{
        fontWeight:'bold',
        fontSize:16,
    },
    devBio:{
        color:'#666',
        marginTop:5,
    },
    devTechs:{
        marginTop:5,
     },
     searchForm:{
         position:'absolute',
         top:20,
         left:20,
         right:20,
         zIndex:5,
         flexDirection:'row',

     },
    searchInput:{
        flex:1,
        height:50,
        backgroundColor:'#FFF',
        color:"#333",
        borderRadius: 25,
        paddingHorizontal:20,
        fontSize:16,
        shadowColor:'#000',
        shadowOpacity:0.2,
      shadowOffset:{
          width:4,
          height:4,
      },
      elevation:2,

    },
    loadbutton:{
        width:50,
        height:50,
        backgroundColor:'#7D40E7',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:15,
    }
})
 
export default Main;