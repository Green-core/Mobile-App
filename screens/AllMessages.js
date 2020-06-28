import React from 'react'
import { View, Text } from 'react-native'
import axios from 'axios'

import { ListItem } from 'react-native-elements'


export default class AllMessages extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            chats: []
        }
    }

    componentDidMount(){

        this.setState({
            loading: true
        })

        const data = { userID: "5ecb578fb2b10b0844de4cff" }
        axios.post(
            'https://ancient-temple-30883.herokuapp.com/chats/get-all',
            data
        ).then(res => {
            const chatData = res.data
            console.log(chatData)

            this.setState({
                loading: false,
                chats: {...chatData}
            })
        })
    }

    render(){

        console.log(this.state.chats)

        let chats
        if(this.state.loading){
            chats = <Text>Loading</Text>
        }
        else{
            chats = Object.keys(this.state.chats).map((key) =>
                <ListItem key={key}
                    title={this.state.chats[key].from}
                    subtitle={this.state.chats[key].message}
                    bottomDivider
                />
            )
            // chats = <Text>Hello</Text>

        }

        return(
            <View>
                {chats}
            </View>
        )
    }
}