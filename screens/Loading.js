import React from 'react';
import { Image ,StyleSheet,View ,ImageBackground} from 'react-native';

export default function Loading(){
    return (
      
        <ImageBackground source={require('../assets/picture/BlueRaspberry.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
        <Image
        style={styles.Logo}
        source={require('../assets/picture/Logo.png')}
        />
        </View>
        </ImageBackground>
       
    )

}
const styles = StyleSheet.create({
    Logo: {
     width: 350 ,
     height: 400 ,
     
    },
    image: {
        flex: 1,
        flexDirection:'column',
        justifyContent: "center",
        alignItems: "center",
      }
  });

