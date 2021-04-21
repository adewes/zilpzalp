import React from 'react';
import classnames from 'helpers/classnames';

type IconProps = {
    icon: string;
    iconClasses?: string;
};

export const Icon = ({ icon, iconClasses }: IconProps) => (
    <i className={classnames('fas', `fa-${icon}`, iconClasses)} />
);
