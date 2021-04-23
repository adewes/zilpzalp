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

import React from 'react';
import { RetractingLabelInput } from './retracting-label-input';
import './search-select.scss';

export const SearchSelect = ({
    search,
    disabled,
    label,
    description,
    onSelect,
    setSearch,
    candidates,
}) => {
    const items = candidates.map(candidate => (
        <li
            onClick={() => onSelect(candidate)}
            key={candidate.name}
            className="kip-candidate"
        >
            {candidate.value}
            {candidate.description && <p>{candidate.description}</p>}
        </li>
    ));

    let searchCandidates;
    if (items.length > 0)
        searchCandidates = <ul className="kip-candidates">{items}</ul>;

    return (
        <div className="kip-search-select">
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onSelect();
                }}
            >
                <fieldset disabled={disabled}>
                    <RetractingLabelInput
                        onChange={setSearch}
                        label={label}
                        disabled={disabled}
                        description={description}
                        autoComplete="off"
                        value={search}
                    >
                        {searchCandidates}
                    </RetractingLabelInput>
                </fieldset>
            </form>
        </div>
    );
};
