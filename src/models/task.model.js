import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {type: String, require:true  },
    description: {},
    date:{type: Date, default: Date.now},
    user: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
},{
    timestamps: true
});

export default mongoose.models.Tasks || mongoose.model('Tasks', taskSchema);