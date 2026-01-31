/**
 * Simple TF-IDF based similarity calculation
 * Used to find similar products based on their names and descriptions
 */

interface Document {
  id: string;
  text: string;
}

/**
 * Tokenize text into lowercase words, removing punctuation
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 0);
}

/**
 * Calculate term frequency for a document
 */
function calculateTF(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  const length = tokens.length;

  tokens.forEach((token) => {
    tf.set(token, (tf.get(token) || 0) + 1 / length);
  });

  return tf;
}

/**
 * Calculate inverse document frequency across a corpus
 */
function calculateIDF(
  documents: string[],
  allTokens: Set<string>
): Map<string, number> {
  const idf = new Map<string, number>();
  const docCount = documents.length;

  allTokens.forEach((token) => {
    const docsWithToken = documents.filter((doc) =>
      tokenize(doc).includes(token)
    ).length;
    idf.set(token, Math.log(docCount / (docsWithToken + 1)));
  });

  return idf;
}

/**
 * Calculate cosine similarity between two TF-IDF vectors
 */
function cosineSimilarity(
  vec1: Map<string, number>,
  vec2: Map<string, number>
): number {
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  const allKeys = new Set([...vec1.keys(), ...vec2.keys()]);

  allKeys.forEach((key) => {
    const val1 = vec1.get(key) || 0;
    const val2 = vec2.get(key) || 0;
    dotProduct += val1 * val2;
    magnitude1 += val1 * val1;
    magnitude2 += val2 * val2;
  });

  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  return dotProduct / (magnitude1 * magnitude2);
}

/**
 * Find the top N most similar products to a set of favorited products
 * @param favoritedNames - Names of favorited products
 * @param availableProducts - All available products with id and name
 * @param topN - Number of similar products to return
 * @param excludeIds - Product IDs to exclude from results
 * @returns Top N similar products sorted by similarity score
 */
export function findSimilarProducts(
  favoritedNames: string[],
  availableProducts: { id: string; name: string }[],
  topN: number = 3,
  excludeIds: Set<string> = new Set()
): { id: string; name: string; similarity: number }[] {
  if (favoritedNames.length === 0 || availableProducts.length === 0) {
    return [];
  }

  // Combine all text for IDF calculation
  const allText = [...favoritedNames, ...availableProducts.map((p) => p.name)];
  const allTokens = new Set<string>();

  allText.forEach((text) => {
    tokenize(text).forEach((token) => allTokens.add(token));
  });

  // Calculate IDF
  const idf = calculateIDF(allText, allTokens);

  // Calculate TF-IDF vectors for favorited products
  const favoritedVectors = favoritedNames.map((name) => {
    const tf = calculateTF(tokenize(name));
    const tfidf = new Map<string, number>();

    tf.forEach((tfValue, token) => {
      tfidf.set(token, tfValue * (idf.get(token) || 0));
    });

    return tfidf;
  });

  // Average TF-IDF vector for all favorited products
  const averageFavoritedVector = new Map<string, number>();
  allTokens.forEach((token) => {
    const sum = favoritedVectors.reduce(
      (acc, vec) => acc + (vec.get(token) || 0),
      0
    );
    averageFavoritedVector.set(token, sum / favoritedVectors.length);
  });

  // Calculate similarity for each available product
  const similarities = availableProducts
    .filter((product) => !excludeIds.has(product.id))
    .map((product) => {
      const tf = calculateTF(tokenize(product.name));
      const tfidf = new Map<string, number>();

      tf.forEach((tfValue, token) => {
        tfidf.set(token, tfValue * (idf.get(token) || 0));
      });

      const similarity = cosineSimilarity(averageFavoritedVector, tfidf);

      return {
        id: product.id,
        name: product.name,
        similarity,
      };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);

  return similarities;
}
