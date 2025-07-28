const use = require('@tensorflow-models/universal-sentence-encoder')
const tf = require('@tensorflow/tfjs');

async function getEmbeddings(text) {
    const model = await use.load();
    const embeddings = await model.embed(text);
    return embeddings.arraySync();
}

function calculateSimilarity(embedding1, embedding2) {
    const dotProduct = tf.dot(tf.tensor(embedding1), tf.tensor(embedding2)).dataSync()[0];
    const norm1 = tf.norm(tf.tensor(embedding1)).dataSync()[0];
    const norm2 = tf.norm(tf.tensor(embedding2)).dataSync()[0];
    return dotProduct / (norm1 * norm2);
}

exports.getEmbeddings = getEmbeddings;
exports.calculateSimilarity = calculateSimilarity;