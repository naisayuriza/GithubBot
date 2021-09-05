function nimegamiLast() {
    return new Promise((resolve, reject) => {
        axios.get('https://nimegami.com/')
        .then(({ data }) => {
            const $ = cheerio.load(data)
            const hasil = [];
            $('div.post-article > article').each(function (t, e) {
                hasil.push({
                    judul: $(e).find('h2').text(),
                    link: $(e).find('a').attr('href'),
                    gambar: $(e).find('img').attr('src'),
                    rating: $(e).find('div.rating').text(),
                    komen: $(e).find('div.comment-count').text(),
                    post_on: $(e).find('div.info > ul > li').eq(0).text().replace('Posted on: ', ''),
                    genre: $(e).find('div.info > ul > li').eq(1).text().replace('Category: ', ''),
                    episode: $(e).find('div.info > ul > li').eq(2).text().replace('Episode: ', ''),
                    durasi: $(e).find('div.info > ul > li').eq(3).text().replace('Duration: ', ''),
                    studio: $(e).find('div.info > ul > li').eq(4).text().replace('Studio: ', ''),
                    tipe: $(e).find('div.bot-post').text()
                })
            })
            resolve({
                creator: 'Dika Ardnt.',
                status: true,
                hasil: hasil
            })
        })
    })
}

function nimegamiSearch(title) {
    return new Promise((resolve, reject) => {
        axios.get(`https://nimegami.com/?s=${title}&post_type=post`)
        .then(({ data }) => {
            const $ = cheerio.load(data)
            const hasil = [];
            $('article').each(function (u, a) {
                hasil.push({
                    judul: $(a).find('h2').text(),
                    link: $(a).find('a').attr('href'),
                    gambar: $(a).find('img').attr('data-lazy-src'),
                    rating: $(a).find('div.rating-archive').text(),
                    episode: $(a).find('div.eps-archive').text(),
                    status: $(a).find('div.term_tag-a').text(),
                    tipe: $(a).find('div.terms_tag').text()
                })
            })
            resolve({
                creator: 'Dika Ardnt.',
                status: true,
                hasil: hasil
            })
        })
    })
}

function nimegamiDetail(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then(({ data }) => {
            const $ = cheerio.load(data)
            const hasil = {};
            const linkDl = [];
            hasil.judul = $('div.info2').find('table > tbody > tr').eq(0).text().replace('Judul :', '')
            hasil.judul_al = $('div.info2').find('table > tbody > tr').eq(1).text().replace('Judul Alternatif :', '')
            hasil.thumb = $('div.thumbnail').find('img').attr('src')
            hasil.cover = $('div.coverthumbnail').find('img').attr('src')
            hasil.up_by = $('div.info').find('ul > li').eq(0).text()
            hasil.up_on = $('div.info').find('ul > li').eq(1).text()
            hasil.up_at = $('div.info').find('ul > li').eq(2).text()
            hasil.durasi = $('div.info2').find('table > tbody > tr').eq(2).text().replace('Durasi Per Episode :', '')
            hasil.rating = $('div.info2').find('table > tbody > tr').eq(3).text().replace('Rating :', '')
            hasil.studio = $('div.info2').find('table > tbody > tr').eq(4).text().replace('Studio :', '')
            hasil.genre = $('div.info2').find('table > tbody > tr').eq(5).text().replace('Kategori :', '')
            hasil.musim = $('div.info2').find('table > tbody > tr').eq(6).text().replace('Musim / Rilis :', '')
            hasil.tipe = $('div.info2').find('table > tbody > tr').eq(7).text().replace('Type :', '')
            hasil.series = $('div.info2').find('table > tbody > tr').eq(8).text().replace('Series :', '')
            hasil.sub = $('div.info2').find('table > tbody > tr').eq(9).text().replace('Subtitle :', '')
            hasil.sinopsis = $('div.content').find('p').text()
            hasil.trailer = $('div.trailer').find('iframe').attr('src')
            $('div.download').each(function (a, b) {
                $(b).find('ul').each(function (c, d) {
                    $(d).find('li > a').each(function (e, f) {
                        linkDl.push({
                            judul: $(f).attr('title'),
                            tipe: $(f).text(),
                            link: $(f).attr('href')
                        })
                    })
                }) 
            })
            resolve({
                creator: 'Dika Ardnt.',
                status: true,
                info: hasil,
                download: linkDl
            })
        }).catch(reject)
    })
}