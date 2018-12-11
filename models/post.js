const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');
const mongoosePaginate = require('mongoose-paginate');


const PostSchema = new Schema({
    title: String,
    price: String,
    description: String,
    images: [ { url: String, public_id: String } ],
    location: String,
    coordinates: Array,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});


// hook that removes the review from posts -> review when Post.remove is called
PostSchema.pre('remove', async function() {
    await Review.remove({
        _id: {
            $in: this.reviews
        }
    });
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);
