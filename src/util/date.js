export function getLocalDateWithOffset() {
    let localDateWithOffset = new Date();
    localDateWithOffset = new Date(localDateWithOffset - (localDateWithOffset.getTimezoneOffset() * 60000));
    return localDateWithOffset;
};