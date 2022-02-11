import React from 'react';
import { Text,Image ,StyleSheet,View ,ImageBackground} from 'react-native';
export default function PendingApproval(){
    return (
        
        <ImageBackground source={require('../assets/picture/BlueRaspberry.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
        <Image
        style={styles.Logo}
        source={require('../assets/picture/Logo.png')}
        />
        <Text style={styles.Massage} >รอการยืนยันจากผู้ดูแลพนักงานแคดดี้</Text>
        </View>
        </ImageBackground>
    )

}
const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent: "center",
        alignItems: "center",
    },
    Logo: {
     width: 350 ,
     height: 400 ,
     
    },
    image: {
        flex: 1,
        flexDirection:'column',
        justifyContent: "center",
        alignItems: "center",
      },
    Massage:{
        fontSize: 25,
        fontWeight: "bold",
        color: '#ffff'
    }
  });

