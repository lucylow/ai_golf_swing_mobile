"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureStore = void 0;
class FeatureStore {
    constructor() {
        this.rows = [];
    }
    put(row) { this.rows.push({ ...row }); if (this.rows.length > 50000)
        this.rows.splice(0, this.rows.length - 50000); }
    query(entityId, name) { return this.rows.filter(r => r.entityId === entityId && (!name || r.name === name)); }
    clear(entityId) { this.rows = entityId ? this.rows.filter(r => r.entityId !== entityId) : []; }
    size() { return this.rows.length; }
}
exports.FeatureStore = FeatureStore;
