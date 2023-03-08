const TestingChatrooms = (
    [
        {
            id:1,
            name:"Room1",
            users:["Sam","Peter","Thomas"],
            messages:[
                        {
                            sender:"Sam",
                            time:"2023/3/7 15:21",
                            content:"Here is the messages 1Here is the messages 1Here is the messages 1Here is the messages 1Here is the messages 1Here is the messages 1Here is the messages 1",
                        },
                        {
                            sender:"Peter",
                            time:"2023/3/7 15:22",
                            content:"Here is the messages 2",
                        }, 
                        {
                            sender:"Thomas",
                            time:"2023/3/7 15:23",
                            content:"Here is the messages 3",
                        },     
                    ],
        },
        {
            id:2,
            name:"Room2",
            users:["Sam","Thomas"],
            messages:[
                {
                    sender:"Sam",
                    time:"2023/3/7",
                    content:"Here is the messages 1",
                },
                {
                    sender:"Thomas",
                    time:"2023/3/7",
                    content:"Here is the messages 2",
                },        
            ],
        },
        {
            id:3,
            name:"Room3",
            users:["Sam","Peter"],
            messages:[
                {
                    sender:"Sam",
                    time:"2023/3/7",
                    content:"Here is the messages 1",
                },
                {
                    sender:"Peter",
                    time:"2023/3/7",
                    content:"Here is the messages 2",
                }, 
                
            ],
        },
        {
            id:4,
            name:"Room4",
            users:["Peter","Thomas"],
            messages:[
                {
                    sender:"Peter",
                    time:"2023/3/7",
                    content:"Here is the messages 1",
                }, 
                {
                    sender:"Thomas",
                    time:"2023/3/7",
                    content:"Here is the messages 2",
                }        
            ],

        },
    ]
)
const TestingUsers = (
    [
        {
            name:"Peter",
            password:"Peter",
            id:1,
        },
        {
            name:"Sam",
            password:"Sam",
            id:2,
        },
        {
            name:"Thomas",
            password:"Thomas",
            id:3,
        },
    ]
)
export {TestingChatrooms,TestingUsers}