const {Schema, model} = require('mongoose');


const TareaSchema = Schema({

    desc: {
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    vigente: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

TareaSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model('Tarea', TareaSchema);