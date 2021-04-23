// Zilp-Zalp - Privacy-Friendly Contact Tracing
// Copyright (C) 2021-2021 The Zilp-Zalp Authors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import BaseActions from "actions/base";
import Store from "helpers/store";
import { uuidv4 } from "helpers/uuid";
import Settings from "helpers/settings";

export enum NotificationType {
    NONE = "none",
    PRIMARY = "primary",
    INFO = "info",
    SUCCESS = "success",
    WARNING = "warning",
    DANGER = "danger"
}

interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    text: string;
    timeout: number;
}

export default class NotificationManager extends BaseActions {
    static get defaultKey() {
        return "notification";
    }

    constructor(store: Store, settings: Settings, key?: string) {
        super(store, settings, key);
        this.set({
            list: []
        });
    }

    /**
     * Adds a notification.
     */
    addNotification = (
        title: string,
        text: string,
        type: NotificationType = NotificationType.PRIMARY,
        timeout = 7500
    ) => {
        const list: Notification[] = this.get().list;
        list.push({
            id: uuidv4(),
            type: type,
            title: title,
            text: text,
            timeout: timeout
        });
        this.update({ list });
    };

    /**
     * Removes/dismisses a notification.
     */
    removeNotification = (id: string) => {
        const list: Notification[] = this.get().list;
        this.update({
            list: list.filter(notification => notification.id !== id)
        });
    };
}
