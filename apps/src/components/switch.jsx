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
import './switch.scss';

export class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.textRef = React.createRef();
        this.state = {
            textWidth: 60,
        };
    }

    componentDidMount() {
        this.setState({
            textWidth: this.textRef.current.offsetWidth,
        });
    }

    componentDidUpdate() {
        const ow = this.textRef.current.offsetWidth;
        const { textWidth } = this.state;
        if (ow === textWidth) return;
        requestAnimationFrame(() => {
            if (this.textRef.current !== null)
                this.setState({
                    textWidth: this.textRef.current.offsetWidth,
                });
        });
    }

    render() {
        const { checked, updating, disabled, children, onChange } = this.props;
        const { textWidth } = this.state;
        return (
            <fieldset disabled={disabled}>
                <label
                    className={
                        'kip-switch' + (updating ? ' kip-switch-updating' : '')
                    }
                    style={{ width: textWidth + 44 + 'px' }}
                >
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={e => {
                            e.preventDefault;
                            onChange(!checked);
                        }}
                    />
                    <span className="kip-slider kip-round">
                        <span className="kip-knob" />
                        <span className="kip-text" ref={this.textRef}>
                            {children}
                        </span>
                    </span>
                </label>
            </fieldset>
        );
    }
}
