// const express = require('express');
// const router = express.Router()
import express from "express";
const router = express.Router()
import main from "../main.js"

var cache = {}

// 接受汉语
router.get('/searchEng', (req, res) => {
    
    let JsonTool = (data)=>{
        res.json({
            ...data,
            takeTime: Date.now() - tempTime
        })
    }
    JsonTool({
        result
    });

});
export default router