// $("button").click(function(e) {
//     e.preventDefault();
//     $(this).toggleClass("transparencia")
// })


// API 


const URL = "https://api.shrtco.de/v2/"

const infoURL = {
	"ok": true,
    "result": {
		"short_link": "shrtco.de\/go16fV",
        "code": "go16fV",
        "full_short_link": "https:\/\/shrtco.de\/go16fV",
        "short_link2": "9qr.de\/go16fV",
        "full_short_link2": "https:\/\/9qr.de\/go16fV",
        "short_link3": "shiny.link\/go16fV",
        "full_short_link3": "https:\/\/shiny.link\/go16fV",
        "share_link": "shrtco.de\/share\/go16fV",
        "full_share_link": "https:\/\/shrtco.de\/share\/go16fV",
        "original_link": "https://docs.google.com/presentation/d/1unfJGiqjoyXImfoaNMhGRsidECL1nGDPiE7ApkarnYo/preview?slide=id.g8972ade043_0_79"
    }
}

$("#btnEnviar").click(() => {
    $.ajax({
		method: "POST",
		url: URL,
		data: contenidoInput,
		success: function(respuesta) {
			$("svgbuscador").append(`<div>${respuesta}</div>`);
			}
		});
	});
