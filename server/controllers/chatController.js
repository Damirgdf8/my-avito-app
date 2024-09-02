const axios = require('axios');

exports.generateAdText = async (req, res) => {
    const { titlePrompt, descriptionPrompt } = req.body;

    try {
        const titleResponse = await axios.post('https://api.openai.com/v1/completions', {
            prompt: titlePrompt,
            max_tokens: 60,
            temperature: 0.7,
            model: 'text-davinci-003'
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const descriptionResponse = await axios.post('https://api.openai.com/v1/completions', {
            prompt: descriptionPrompt,
            max_tokens: 150,
            temperature: 0.7,
            model: 'text-davinci-003'
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        res.json({
            title: titleResponse.data.choices[0].text.trim(),
            description: descriptionResponse.data.choices[0].text.trim()
        });
    } catch (error) {
        console.error('Error generating text:', error);
        res.status(500).json({ error: 'Failed to generate text' });
    }
};
