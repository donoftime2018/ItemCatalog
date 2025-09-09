const use = require('@tensorflow-models/universal-sentence-encoder')
let tf;
try {
  tf = require('@tensorflow/tfjs-node');
  console.log("Using TensorFlow Node backend (native)");
} catch {
  console.warn("Falling back to TensorFlow.js (slower, no native acceleration)");
  tf = require('@tensorflow/tfjs');
}
let model; // cache globally

async function loadModel() {
  if (!model) {
    model = await use.load();
    console.log("Universal Sentence Encoder loaded");
  }
  return model;
}

async function getEmbeddings(text) {
  const model = await loadModel();
  const embeddings = await model.embed([text]); // always force batch
  return embeddings; // return tensor [1, 512]
}

// cosine similarity with TF ops
function calculateSimilarity(embedding1, embedding2) {
  // flatten to [512]
  const v1 = embedding1.flatten();
  const v2 = embedding2.flatten();

  const dotProduct = tf.dot(v1, v2);
  const norm1 = tf.norm(v1);
  const norm2 = tf.norm(v2);

  const similarity = dotProduct.div(norm1.mul(norm2));
  return similarity.dataSync()[0]; // number
}

module.exports = { getEmbeddings, calculateSimilarity };