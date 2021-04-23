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
import PropTypes from 'prop-types';
import { Button } from './button';
import { T } from './t';
import './modal.scss';
import classnames from 'helpers/classnames';
import t from './translations.yml';

export class Modal extends React.Component {
    render() {
        const {
            children,
            className,
            title,
            waiting,
            saveDisabled,
            cancelDisabled,
            save,
            cancel,
            onSave,
            onCancel,
            onClose,
            saveType,
        } = this.props;
        return (
            <div
                className={classnames(
                    'bulma-modal',
                    'bulma-is-active',
                    className
                )}
            >
                <div className="bulma-modal-background" onClick={onClose}></div>
                <div className="bulma-modal-card">
                    {title && (
                        <header className="bulma-modal-card-head">
                            <p className="bulma-modal-card-title">{title}</p>
                            {onClose && (
                                <Button
                                    type="info"
                                    aria-label="Close modal"
                                    className="bulma-delete"
                                    data-test-id="modal-close"
                                    onClick={onClose}
                                />
                            )}
                        </header>
                    )}
                    <section className="bulma-modal-card-body">
                        {children}
                    </section>
                    {(onSave || onCancel) && (
                        <footer className="bulma-modal-card-foot">
                            {onSave && (
                                <Button
                                    type={saveType}
                                    data-test-id="modal-save"
                                    waiting={waiting}
                                    disabled={saveDisabled}
                                    onClick={() => !saveDisabled && onSave()}
                                >
                                    {save || <T t={t} k="modal.save" />}
                                </Button>
                            )}
                            {onCancel && (
                                <Button
                                    type=""
                                    disabled={cancelDisabled}
                                    onClick={() =>
                                        !cancelDisabled && onCancel()
                                    }
                                >
                                    {cancel || <T t={t} k="modal.cancel" />}
                                </Button>
                            )}
                        </footer>
                    )}
                </div>
            </div>
        );
    }
}

Modal.defaultProps = {
    cancelDisabled: false,
    waiting: false,
    saveDisabled: false,
    save: undefined,
    cancel: undefined,
    saveType: 'primary',
};

Modal.propTypes = {
    cancel: PropTypes.node,
    cancelDisabled: PropTypes.bool,
    waiting: PropTypes.bool,
    children: PropTypes.node,
    save: PropTypes.node,
    saveType: PropTypes.string,
    saveDisabled: PropTypes.bool,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    onSave: PropTypes.func,
};
