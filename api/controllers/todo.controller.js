import ToDo from '../models/ToDo'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

export const createToDo = async (req, res) => {
    try {
        const { userId } = req
        const { description } = req.body
        const newToDo = new ToDo({ description, userId })
        const todo = await newToDo.save()
        res.status(201).json(todo)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getToDos = async (req, res) => {
    try {
        const { userId } = req
        const todos = await ToDo.find(
            {
                userId: ObjectId(userId),
            },
            null,
            { sort: { _id: -1 } }
        )
        res.status(200).json(todos)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getToDoById = async (req, res) => {
    try {
        const { userId } = req
        const { id } = req.params

        const todo = await ToDo.find({
            userId: ObjectId(userId),
            _id: ObjectId(id),
        })
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const updateToDoById = async (req, res) => {
    try {
        const { userId } = req
        const { id } = req.params

        const todo = await ToDo.find({
            userId: ObjectId(userId),
            _id: ObjectId(id),
        })

        if (todo) {
            const updatedToDo = await ToDo.findByIdAndUpdate(id, req.body, {
                new: true,
            })
            res.status(200).json(updatedToDo)
        } else {
            res.status(400).json()
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const deleteToDoById = async (req, res) => {
    try {
        const { userId } = req
        const { id } = req.params

        const todo = await ToDo.find({
            userId: ObjectId(userId),
            _id: ObjectId(id),
        })

        if (todo) {
            await ToDo.findByIdAndDelete(id)
            res.status(204).json()
        } else {
            res.status(400).json()
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}
