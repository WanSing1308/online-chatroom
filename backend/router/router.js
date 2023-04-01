const express = require("express")
const router = express.Router();
const { createUser,
        userLogin,
        createChatroom,
        sendMessage,getMessage,
        fetchChatrooms,
        deleteMessage,
        addUser} = require("../controller/db")

router.route("/user/sign-up").post(createUser)
router.route("/user/login").post(userLogin)

router.route("/chatroom/:userID").post(createChatroom).get(fetchChatrooms)
router.route("/chatroom/:chatroomID").put(addUser)
router.route("/message/:chatroomID/:userID").post(sendMessage).get(getMessage) 
router.route("/message/:chatroomID/:messageID").delete(deleteMessage)

module.exports = router