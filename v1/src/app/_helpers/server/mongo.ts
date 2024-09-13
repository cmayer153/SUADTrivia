import mongoose from 'mongoose';

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/suad_test_00');
mongoose.Promise = global.Promise;

export const mongoData = {
    question: questionModel(),
    location: locationModel()
};

function questionModel() {
    const questionSchema = new Schema({
        question: String,
        questionType: String,
        questionPoints: Number,
        questionTime: Number,
        questionMedia: String,
        questionNote: String,
        questionLink: String,
        correctAnswer: String,
        answer2: String,
        answer3: String,
        answer4: String,
        usedLocations: [String]
    });

    return mongoose.model('Question', questionSchema);
}

function locationModel() {
    const locationSchema = new Schema({
        locationName: String,
    });

    return mongoose.model('Location', locationSchema);
}