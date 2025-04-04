import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const setUrlParams = (params) => {
    const url = new URL(window.location.href);
    url.searchParams.set('type', params);
    window.history.pushState({}, '', url);
};

export const deleteUrlParams = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('type');
    window.history.pushState({}, '', url);
};

export const getUrlParams = () => {
    const url = new URL(window.location.href);
    return url.searchParams.get('type');
};
