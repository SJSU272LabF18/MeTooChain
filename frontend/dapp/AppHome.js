import React,{Component} from "react";
import AppNavigator from "./AppNavigator";



class AppHome extends Component{
   constructor(props){
       super(props)
   }
    render(){
        return(<AppNavigator/>);
    }
}

export default AppHome;