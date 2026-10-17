"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nearestPrototype = nearestPrototype;
const embedding_1 = require("../embedding");
function nearestPrototype(query, items, k = 3) { return items.map(p => ({ ...p, similarity: (0, embedding_1.cosineSimilarity)(query, p.embedding) })).sort((a, b) => b.similarity - a.similarity).slice(0, k); }
