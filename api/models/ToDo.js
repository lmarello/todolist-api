import { Schema, model } from 'mongoose'

const todoSchema = new Schema(
    {
        description: { type: String, required: true },
        completed: { type: Boolean, default: false },
        userId: { ref: 'User', type: Schema.Types.ObjectId },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export default model('ToDo', todoSchema)
