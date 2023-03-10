const express = require("express")
const router = express.Router();
const { createUser,
        userLogin,
        createChatroom,
        sendMessage,getMessage,
        fetchChatrooms,
        deleteMessage} = require("../controller/db")

router.route("/createUser").post(createUser)
router.route("/userLogin").post(userLogin)
router.route("/createChatroom").post(createChatroom)
router.route("/sendMessage").post(sendMessage)
router.route("/getMessage").post(getMessage)
router.route("/fetchChatrooms").post(fetchChatrooms)
router.route("/deleteMessage/:messageId").delete(deleteMessage)
module.exports = router