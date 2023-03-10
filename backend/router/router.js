const express = require("express")
const router = express.Router();
const {createUser,userLogin,createChatroom,sendMessage,getMessage,fetchChatrooms} = require("../controller/db")

router.route("/createuser").post(createUser)
router.route("/userlogin").post(userLogin)
router.route("/createchatroom").post(createChatroom)
router.route("/sendmessage").post(sendMessage)
router.route("/getmessage").post(getMessage)
router.route("/fetchchatrooms").post(fetchChatrooms)
module.exports = router