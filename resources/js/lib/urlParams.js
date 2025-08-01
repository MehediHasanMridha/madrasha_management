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
