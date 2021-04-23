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

import React, { ReactChild } from 'react';

import './sidebar-container.scss';

interface SidebarContainerProps {
    active: boolean;
    content: ReactChild;
    sidebar: ReactChild;
}

export const SidebarContainer = ({
    active,
    content,
    sidebar,
}: SidebarContainerProps) => (
    <div className="kip-with-sidebar">
        <div className="kip-with-sidebar__sidebar">{active && sidebar}</div>
        <div className="kip-with-sidebar__content">{content}</div>
    </div>
);
