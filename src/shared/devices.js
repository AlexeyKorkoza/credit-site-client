const size = {
    mobileS: 320,
    tablet: 768,
    laptop: 1024,
};

const device = Object.keys(size).reduce((acc, cur) => {
    acc[cur] = `(max-width: ${size[cur]}px)`;

    return acc;
}, {});

export default device;
