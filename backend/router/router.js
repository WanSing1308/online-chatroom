const express = require("express")
const router = express.Router();
const {createUser,userLogin,createChatroom,sendMessage} = require("../controller/db")

router.route("/createuser").post(createUser)
router.route("/userlogin").post(userLogin)
router.route("/createchatroom").post(createChatroom)
router.route("/sendmessage").post(sendMessage)

module.exports = router