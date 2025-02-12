const express = require('express');
const router = express.Router();
const aiService = require('../services/AIService');

router.post('/getReview', async (req, res) => {
    const prompt = req.body.prompt;
    console.log(prompt);
    if(!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }
    const response = await aiService(prompt);
    res.send( response );
})

module.exports = router;