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


export const deleteAllUrlParams = () => {
    const url = window.location.origin + window.location.pathname; // Keep only the base URL and path
    window.history.replaceState(null, '', url); // Update the URL without parameters
};


export const formattedAmount = (amount, locale = 'en-US') => {
    if (amount) {
        return amount.toLocaleString(locale); // 'en-US' লোকাল অনুযায়ী ফরম্যাট
    }
    return 0;
}

