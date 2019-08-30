import * as mongoose from 'mongoose';

const presentationSchema = new mongoose.Schema({
 id:String
});

const Presentation = mongoose.model('Presentation', presentationSchema);

export default Presentation;
