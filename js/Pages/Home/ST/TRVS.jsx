import { makeAutoObservable, runInAction } from "mobx";

class TravelStore {
    travels = [];
    loading = false; // start false, only true after page loaded
    lastFetched = null;
    flashes = {};
    pageLoaded = false; // flag to prevent loading before page ready
    pending = 637;
    during = 120;
    done = 13007;
    constructor() {
        makeAutoObservable(this);
        // do NOT load travels immediately
    }

    // Call this when page is fully loaded
    setPageLoaded() {
        this.pageLoaded = true;
        this.loadTravels();       // initial load
        this.startAutoReload();   // start periodic reload
    }

    async loadTravels() {
        if (this.pageLoaded) this.loading = true;

        try {
            const res = await axios.post("/travels");
            const newTravels = res.data ?? [];

            runInAction(() => {
                this.updateWithDiff(newTravels);
                if (this.pageLoaded) this.loading = false;
                this.lastFetched = new Date();
            });
        } catch (err) {
            console.error("Load error:", err);
            if (this.pageLoaded) runInAction(() => (this.loading = false));
        }
    }

    // Detect adds/removes/changes for animation
    updateWithDiff(newList) {
        if (!Array.isArray(newList)) {
            console.warn("updateWithDiff: newList is not an array", newList);
            return;
        }

        const prev = this.travels;
        const prevMap = new Map(prev.map((r) => [r.id, r]));
        const newMap = new Map(newList.map((r) => [r.id, r]));

        const flashes = {};

        // added
        for (const t of newList) {
            if (!prevMap.has(t.id)) flashes[t.id] = { color: "#bbf7d0", duration: 400 };
        }

        // removed
        for (const t of prev) {
            if (!newMap.has(t.id)) flashes[t.id] = { color: "#fecaca", duration: 300 };
        }

        // updated (status changed)
        for (const t of newList) {
            const old = prevMap.get(t.id);
            if (old && old.cap !== t.cap)
                flashes[t.id] = { color: "#fef08a", duration: 100 };
        }

        this.travels = newList;
        this.flashes = flashes;
    }

    addFake() {
        const id = Math.floor(Math.random() * 100000);
        const fake = {
            id,
            inf: {
                trv: {
                    mabcity: "تهران",
                    mag1city: "قم",
                    mag2city: "اصفهان",
                    mag3city: "",
                    dshow: "1404/12/12",
                    hshow: "15",
                    mshow: "30",
                },
            },
            cap: Math.floor(Math.random() * 30) + 10,
            status: Math.random() > 0.5 ? "active" : "inactive",
        };
        this.travels = [fake, ...this.travels];
        this.flashes = { [id]: { color: "#bbf7d0", duration: 500 } };
    }

    startAutoReload() {
        setInterval(() => {
            if (this.pageLoaded) this.loadTravels();
        }, 5000);
    }
}

export const travelStore = new TravelStore();

if (typeof window !== "undefined") {
    const handlePageReady = () => {
        travelStore.setPageLoaded();
    };

    // Try multiple events
    window.addEventListener("load", handlePageReady);
    document.addEventListener("DOMContentLoaded", handlePageReady);
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(handlePageReady, 0);
    }
}