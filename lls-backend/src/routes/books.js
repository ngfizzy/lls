const { Router } = require('express');

const bookController = require('../controllers/book');

const router = Router();

router.post('/', async (req, res) => {
    const { body } = req;

    try {
       const result = await bookController.addBook(body);

       if(!result.error) {
           return res.status(201).json(result)
       }

       return res.status(400).json(result)

    } catch(e) {
        return res.status(500).json({
            error: true,
            message: e.message,
        });;
    }
});

router.get('/', async(_, res) => {

    try {
        const result = await bookController.getAllBooks();

        if(!result.error) {
            return res.status(200).json(result)
        }
 
        return res.status(400).json(result)
 
    } catch(e) {
        return res.status(500).json({
            error: true,
            message: e.message,
        });
    }
})

module.exports = router;