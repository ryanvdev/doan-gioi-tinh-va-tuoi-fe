export interface IHistoryItem {
    _id: string;
    createdAt: string;
    imageName: string;
}

export interface ILocalStorageData {
    history: IHistoryItem[];
}

class LocalStorageClient {
    private static _instance: LocalStorageClient | null = null;

    public static get instance() {
        if (!this._instance) this._instance = new LocalStorageClient();
        return this._instance;
    }

    private readonly key = 'LocalStorageClient';
    private _data: ILocalStorageData = {
        history: [],
    };

    private constructor() {
        this.load();
        window.onstorage = this.handleStorageChange;
    }

    private handleStorageChange = () => {
        alert('storage-change');
    };

    private load = () => {
        const strData = localStorage.getItem(this.key);

        if (!strData) {
            this.save();
            return;
        }

        try {
            const rawData = JSON.parse(strData) as ILocalStorageData;
            this._data = rawData;
            return;
        } catch {
            this.save();
            return;
        }
    };

    public save = () => {
        localStorage.setItem(this.key, JSON.stringify(this._data));
    };

    public get history() {
        return this._data.history;
    }

    public set history(v: IHistoryItem[]) {
        this._data.history = v;
        this.save();
    }

    public pushHistory(v: IHistoryItem) {
        this._data.history.push(v);
        this.save();
    }
}

export default LocalStorageClient;
