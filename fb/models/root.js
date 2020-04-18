class fb_root {
    url_format() {
        let answer = ''
        this.fields.forEach((item) => answer += `${item},`)
        answer = answer.slice(0, -1)
        return answer
    }
}

module.exports = fb_root