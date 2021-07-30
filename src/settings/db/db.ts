import mongoose from 'mongoose';

const dbConect = () => {
    mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

    let { connection: db } = mongoose;

    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function () {
        console.log('Conection succesful');
    })

    return mongoose
}



export default dbConect;