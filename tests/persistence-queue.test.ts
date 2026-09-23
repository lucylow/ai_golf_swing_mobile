import { describe, expect, it } from "vitest";
import { createHydrationGate, createPendingWorkTracker, createPersistenceQueue } from "../lib/persistence-queue";

describe("createPersistenceQueue", () => {
  it("runs queued writes in order without overlapping them", async () => {
    const queue = createPersistenceQueue();
    const order: string[] = [];
    let releaseFirst!: () => void;
    const firstGate = new Promise<void>((resolve) => { releaseFirst = resolve; });

    const first = queue(async () => {
      order.push("first-start");
      await firstGate;
      order.push("first-end");
    });
    const second = queue(async () => { order.push("second"); });

    await Promise.resolve();
    expect(order).toEqual(["first-start"]);

    releaseFirst();
    await Promise.all([first, second]);
    expect(order).toEqual(["first-start", "first-end", "second"]);
  });

  it("preserves a failed task's rejection without poisoning later writes", async () => {
    const queue = createPersistenceQueue();
    const failure = new Error("storage unavailable");

    await expect(queue(async () => { throw failure; })).rejects.toBe(failure);
    await expect(queue(async () => "recovered")).resolves.toBe("recovered");
  });

  it("lets queued state updates compose from the latest committed value", async () => {
    const queue = createPersistenceQueue();
    let state = { count: 0 };
    let releaseFirst!: () => void;
    const firstGate = new Promise<void>((resolve) => { releaseFirst = resolve; });
    const update = (delta: number) => queue(async () => {
      await (delta === 1 ? firstGate : Promise.resolve());
      state = { count: state.count + delta };
    });

    const first = update(1);
    const second = update(1);
    releaseFirst();
    await Promise.all([first, second]);
    expect(state.count).toBe(2);
  });

  it("waits for hydration before allowing a persistence task to continue", async () => {
    const gate = createHydrationGate();
    let continued = false;
    const waiting = gate.wait().then(() => { continued = true; });

    await Promise.resolve();
    expect(continued).toBe(false);
    gate.release();
    await waiting;
    expect(continued).toBe(true);
    gate.release();
    await gate.wait();
  });

  it("stays pending until every queued operation settles", () => {
    const tracker = createPendingWorkTracker();

    expect(tracker.isPending()).toBe(false);
    tracker.begin();
    tracker.begin();
    expect(tracker.isPending()).toBe(true);

    tracker.end();
    expect(tracker.isPending()).toBe(true);
    tracker.end();
    expect(tracker.isPending()).toBe(false);

    tracker.end();
    expect(tracker.isPending()).toBe(false);
  });
});
