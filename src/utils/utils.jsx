export const isUpToDate = (lastUpdated, days) => {
    const now = new Date();
    return (+now - lastUpdated) < days * 1000 * 60 * 60 * 24;
}

export const saveToLocalStorage = (key, value) => {
    const updated = new Date();
    const toStore = {
        data: value,
        lastUpdated: +updated
    }
    localStorage.setItem(key, JSON.stringify(toStore));
}

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
