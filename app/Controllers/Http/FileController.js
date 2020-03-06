'use strict'


const Drive = use('Drive')
const Helpers = use('Helpers')

class FileController {
    async getImg({ response, request }) {
        const { fileName, pathFile } = request.all()
        console.log(pathFile+fileName);
        
        const localUrl = Helpers.tmpPath(pathFile + fileName)
        const exists = await Drive.exists(localUrl)
        if (exists) {
            const file = await Drive.get(localUrl, 'base64')
            return response.json({ file })
        } else {
            const message = {
                severity: 'error',
                title: 'file not found'
            }
            return response.json({ message })
        }
    }

    async uploadPicture({ request }) {
        const profilePic = request.file('file', {
            types: ['image'],
            size: '2mb'
        })
        const { pathFile, fileName } = request.all()

        await profilePic.move(Helpers.tmpPath(pathFile), {
            name: `${fileName}.jpg`,
            overwrite: true
        })

        if (!profilePic.moved()) {
            return profilePic.error()
        }
        return 'File moved'
    }
}

module.exports = FileController
