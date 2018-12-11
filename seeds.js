const faker = require('faker');
const Post = require('./models/post');

async function seedPosts() {
    await Post.remove({});
    for(const i of new Array(40)) {
        const post = {
            title: faker.lorem.word(),
            description: faker.lorem.text(),
            coordinates: [52.237049, 21.017532],
            author: {
                "_id": "5c0e6173a4855b0fdc9270a8",
                "username": "kajonem"
            }
        }
    await Post.create(post);
    }
    console.log('40 new posts created');
}

module.exports = seedPosts;