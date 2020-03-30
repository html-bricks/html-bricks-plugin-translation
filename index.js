const path = require('path')
const htmlReg = /\.html$/
const translateReg = /<translate(.*?)>(.*?)<\/translate>/g

const dirname = process.cwd()

function formatLangMatch (langMatch) {
  return langMatch.replace(/\s*lang=(.*)/g, (match, lang) => lang).replace(/("|')/g, '')
}

exports.postBuild = function postBuild (files, config) {
  return new Promise(function (resolve, reject) {
    try {
      const langs = files.reduce((acc, file) => {
        if (file.dest.match(htmlReg)) {
          const fileContent = file.content.toString('utf8')
          fileContent.replace(translateReg, (match, langMatch) => {
            const lang = formatLangMatch(langMatch)
            if (acc.indexOf(lang) === -1) {
              acc.push(lang)
            }
          })
        }
        return acc
      }, [])

      const next = langs.reduce((acc, currentLang) => {
        files.forEach(file => {
          if (file.dest.match(htmlReg)) {
            const dest = file.dest.replace(path.resolve(dirname, config.buildDir), function (match) {
              return path.join(match, currentLang)
            })

            const markup = file.content.toString('utf8').replace(translateReg, function (match, langMatch, textMatch) {
              const lang = formatLangMatch(langMatch)
              if (lang === currentLang) {
                return textMatch
              }
              return ''
            })

            acc.push(Object.assign({}, file, {
              content: Buffer.from(markup),
              dest
            }))
          } else {
            acc.push(file)
          }
        })

        return acc
      }, [])

      if (langs.length === 0) {
        resolve(files)
      }

      resolve(next)
    } catch (e) {
      reject(e)
    }
  })
}
