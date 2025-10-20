import { makeAutoObservable } from "mobx";

class MOD {
    download = false;
    login = false;
    rules = false;

    open(name) {
        this[name] = true;
    }

    close(name) {
        this[name] = false;
    }

    closeAll() {
        this.download = false;
        this.login = false;
        this.rules = false;
    }
}

export const mod = makeAutoObservable(new MOD(), {}, { deep: true });


