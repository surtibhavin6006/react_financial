export const isInteger = (value) => {
    return !isNaN(value) && parseInt(Number(value)) === value;
}

export const maxLength = (value, maxLength) => {
    return value && value.length > maxLength;
}

export const minLength = (value, maxLength) => {
    return value && value.length < maxLength;
}

export const validateEmail = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !pattern.test(value);
}

export const validateMatch = (value,matchFieldValue) => {
   return value !== matchFieldValue;
}

export const randomKey = (length = 10) => {
    return Math.random().toString(36).substr(2, length);
};

export const  randomTimestampPrefix = (prefix = 'TXN') => {
    const timestamp = Date.now(); // e.g. 1718275129382
    const random = Math.floor(Math.random() * 1000); // 3-digit random
    return `${prefix}_${timestamp}_${random}`;
}

export const setCookie = (name, value, ttlSeconds) => {
    deleteCookie(name);
    const maxAge = ttlSeconds ?? 86400; // default: 1 day
    document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
};


export const getCookie = (name) => {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`))
        ?.split('=')[1];
};

export const deleteCookie = (name) => {
    if(getCookie(name)){
        document.cookie = `${name}=; max-age=0; path=/`;
    }
};
