const express = require('express')
const Detail = require('../models/detail')
const auth = require('../middleware/auth')
const User = require('../models/users')
 const router = new express.Router()

router.post('/detail',auth,async(req,res)=>{
     const detail = new Detail({...req.body,
        user_id: req.user._id,
        
    })
       
    try {
        await detail.save()
        res.send({detail})
    } catch (e) {
        //  res.send(e)
        console.log(e)
    }
})

router.get('/detail', async (req, res) => {
 
    try {
        

        const detail = await Detail.find({})
        res.send(detail)
        

    } catch (e) {
        res.status(400).send()
    }
})


router.get('/detail/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const detail = await Detail.findById(_id)

        if (!detail) {
            return res.status(404).send()
        }

        res.send(detail)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/detail/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['text','done']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const detail = await Detail.findById(req.params.id)

        updates.forEach((update) => detail[update] = req.body[update])
        await detail.save()

        if (!detail) {
            return res.status(404).send()
        }

        res.send(detail)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/detail/:id', async (req, res) => {
    try {
        const detail = await Detail.findByIdAndDelete(req.params.id)

        if (!detail) {
            res.status(404).send()
        }

        res.send(detail)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports = router