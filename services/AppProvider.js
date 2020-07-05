import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
const AppContext = React.createContext();// Creates a provider Component

class AppProvider extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            user:{},
           // jwt:'',
           // email:'',
            id:'',

        };       
    } 
    
    // setData=(user)=>{
    //     this.setState({user:this.props.data})
    //     this.setState(prevState => ({
        //     user: {
        //       ...prevState.user,
        //       email: this.props.email,
        //       id: this.props.id,
        //       jwt:this.props.jwt
        //     }
        //   }));
      
    // }

    setData = (user) =>{
       // console.log("passing jwt",user)
        this.setState((prevState)=>({user}))
       // console.log("after =",this.state.user)
    }
    
    componentDidMount() {
        AsyncStorage.getItem('id')
            .then((id) => {
                this.setState(prevState => ({
                        user: {
                          ...prevState.user,
                          id: id,
                        }
                      }));
            })
            .catch(error => {
                this.setState({ error })
            })

        //this.setData();
        //TODO async getKeys and set jwt and id
        console.log("id",this.state.user)
    }   

    render() {
        console.log("app provider ",this.props)
        return (
            <AppContext.Provider
                value={{
                    state: this.state,
                    setData: this.setData
                }}
            >
                {this.props.children}
            </AppContext.Provider>
        );
    }
}
export default AppContext;
export { AppProvider};