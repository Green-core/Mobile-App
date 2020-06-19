import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import axios from 'axios'

import ReplyMessage from './ReplyMessage'
import NavigationBar from 'react-native-navbar';
import MessageComponent from './MessageComponent'

export default class SingleMessage extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            chat: [],
            replys: []
        }
    }

    componentDidMount(){

        this.setState({
            loading: true
        })

        const data = { id: "5ece4f41f8dc143c847d3c85" }
        axios.post(
            'https://ancient-temple-30883.herokuapp.com/chats/get-one',
            data
        ).then(res => {
            const chatData = res.data
            // console.log(chatData)
            const replys = res.data.replies

            this.setState({
                loading: false,
                chat: {...chatData},
                replys: {...replys}
            })
        })
    }
    
    render(){
        const userName = "Nipuna Chandimal"     // get this from the store

        if(this.state.loading){
            chat = <Text>Loading</Text>
        }
        else{
            chat = 
                <MessageComponent
                    reply={this.state.chat.message}
                    from={this.state.chat.from}
                    time={this.state.chat.createdAt}
                    user={userName}
                />

            replys = Object.keys(this.state.replys).map((key) =>
                <MessageComponent key={key}
                    reply={this.state.replys[key].reply}
                    from={this.state.replys[key].from}
                    time={this.state.replys[key].date}
                    user={userName}
                />
            )
        }

        return(
            <ScrollView>
                <NavigationBar
                    tintColor='green'
                    title={{
                        title: 'Admin', 
                        tintColor: 'white'
                    }}
                />
                    {chat}
                    {replys}
                    {/* {replyMessage} */}
                    <ReplyMessage 
                    data={
                        {
                            id: this.state.chat._id,
                            from: "5ecb578fb2b10b0844de4cff"
                        } 
                    }
                />
            </ScrollView>
        )
    }
}