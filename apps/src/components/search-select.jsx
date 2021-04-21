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
