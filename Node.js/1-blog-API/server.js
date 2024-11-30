const express = require('express');
const fs = require('fs').promises; // Using promises for async file operations
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

//  Create a new blog post
app.post('/blogs', async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).send('Title and content are required.');
    }

    try {
        await fs.writeFile(`./${title}.txt`, content);
        res.send('ok');
    } catch (err) {
        res.status(500).send('Error creating the post.');
    }
});

// Update an existing blog post
app.put('/posts/:title', async (req, res) => {
    const title = req.params.title;
    const { content } = req.body;

    if (!title || !content) {
        return res.status(400).send('Title and content are required.');
    }

    try {
        const filePath = `./${title}.txt`;
        const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

        if (fileExists) {
            await fs.writeFile(filePath, content);
            res.send('ok');
        } else {
            res.status(404).send('This post does not exist!');
        }
    } catch (err) {
        res.status(500).send('Error updating the post.');
    }
});

// Delete a blog post
app.delete('/blogs/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const filePath = `./${title}.txt`;
        const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

        if (fileExists) {
            await fs.unlink(filePath);
            res.send('ok');
        } else {
            res.status(404).send('This post does not exist!');
        }
    } catch (err) {
        res.status(500).send('Error deleting the post.');
    }
});

// Read a single blog post
app.get('/blogs/:title', async (req, res) => {
    const title = req.params.title;

    try {
        const filePath = `./${title}.txt`;
        const fileExists = await fs.access(filePath).then(() => true).catch(() => false);

        if (fileExists) {
            const content = await fs.readFile(filePath, 'utf8');
            res.send(content);
        } else {
            res.status(404).send('This post does not exist!');
        }
    } catch (err) {
        res.status(500).send('Error reading the post.');
    }
});

// Read all blog posts
app.get('/blogs', async (req, res) => {
    try {
        const files = await fs.readdir('./');
        const posts = files
            .filter(file => file.endsWith('.txt'))
            .map(file => ({ title: file.replace('.txt', '') }));

        res.json(posts);
    } catch (err) {
        res.status(500).send('Error reading posts.');
    }
});

// Start the server
const PORT = 3000;


app.listen(3000)


/*I used asynchronous methods because it's the best practice, even for small servers. 
 This keeps the server responsive and able to handle multiple requests at once.
*/