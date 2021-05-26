function randomInt(minimum, maximum) {
    return Math.floor(Math.random() * (maximum - minimum)) + minimum;
}

module.exports = randomInt