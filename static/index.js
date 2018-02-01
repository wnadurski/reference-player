var SETTINGS = {
    type: "dash",
    flags: "4"
}

function getDrm(response) {
    if (!response.drm) {
        return undefined
    }

    if ((response.flags & 4096) !== 0) {
        return {
            widevine: {
                LA_URL: response.drm
            }
        }
    }

    return undefined
}


function getStreamRequest(url, settings) {
    return url + "&h=" + encodeURI(JSON.stringify(settings))
}

$(function () {

    var urlInput = $("#urlInput")
    var typeInput = $("#typeInput")
    var flagsInput = $("#flagsInput")
    var playButton = $("#playButton")

    playButton.click(function (e) {
        e.preventDefault()

        var url = urlInput.val()
        var type = typeInput.val()
        var flags = flagsInput.val()

        var settings = {
            type: type,
            flags: flags
        }

        var player = bitmovin.player('player');

        var request = getStreamRequest(url, settings)

        console.log("Request sent to: ", request)

        $.get(request)
            .then(function (response) {
                console.log("Received response:", response)

                var conf = {
                    key: 'ca394627-3d6a-420b-bace-35596f7bcc2b',
                    source: {
                        dash: response.url
                    }
                };

                var drm = getDrm(response)
                if (drm) {
                    conf.source.drm = drm
                }

                player.setup(conf).then(function (value) {
                    // Success
                    console.log('Successfully created bitmovin player instance');
                }, function (reason) {
                    // Error!
                    console.log('Error while creating bitmovin player instance');
                });
            })
    })


})
