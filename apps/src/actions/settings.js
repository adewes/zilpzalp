import BaseActions from 'actions/base';
import t from './translations.yml';

export default class Settings extends BaseActions {
    static get defaultKey() {
        return 'settings';
    }

    constructor(store, settings, key) {
        super(store, settings, key);
        this.set({
            status: 'initialized',
        });
    }

    updateSettings(settings) {
        const loaded = settings.get('external');
        if (loaded) return;
        this.loadSettings(settings);
    }

    loadSettings(settings) {
        const loadSettings = data => {
            const dataMap = new Map(Object.entries(data));
            // we update the settings with the external ones
            settings.updateWithMap(dataMap);
            settings.set('external', true);
            this.set({ settings: dataMap, status: 'loaded' });
        };

        const xhr = new XMLHttpRequest();
        xhr.open(
            'GET',
            settings.get('external-settings-path', '/settings.json')
        );

        const promise = new Promise((resolve, reject) => {
            xhr.onload = () => {
                const contentType = xhr
                    .getResponseHeader('content-type')
                    .trim();
                if (/^application\/json(;.*)?$/i.exec(contentType) === null)
                    reject({
                        status: xhr.status,
                        message: 'not a JSON response',
                        errors: {},
                    });

                const data = JSON.parse(xhr.response);

                if (xhr.status >= 200 && xhr.status < 300) resolve(data);
                else {
                    reject(data);
                }
            };
            xhr.onerror = () => {
                reject({
                    status: xhr.status,
                    message: xhr.statusText || settings.t(t, 'requestFailed'),
                    errors: {},
                });
            };
        });
        promise
            .then(data => loadSettings(data))
            .catch(error => this.set({ status: 'failed', error: error }));
        xhr.send();
    }
}
