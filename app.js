const a_home = document.getElementById("home")
const a_generate = document.getElementById("generate")
const a_scan = document.getElementById("scan")

const home = document.getElementById("go-home")
const home2 = document.getElementById("go-home2")

const sec1 = document.getElementById("sec1")
const sec2 = document.getElementById("sec2")
const sec3 = document.getElementById("sec3")
const sec4 = document.getElementById("sec4")
const sec5 = document.getElementById("sec5")

const scan_btn = document.getElementById("scan-btn")
const scan_btn2 = document.getElementById("scan-button")

const generate_btn = document.getElementById("generate-btn")
const generate_btn2 = document.getElementById("generate-button")

const download_btn = document.getElementById("download-btn") 
const link_btn = document.getElementById("link-button") 
const file_input = document.getElementById("file-input") 
const input = document.querySelector("#sec4 .input")
const input_span = document.querySelector("span")


input.addEventListener('click', () => {
    document.querySelector(".input input").click()
})

a_home.addEventListener('click', () => {
    sec2.style.display = 'none'
    sec3.style.display = 'none'
    sec4.style.display = 'none'
    sec5.style.display = 'none'

    sec1.style.display = 'block'
})

a_generate.addEventListener('click', () => {

    sec1.style.display = 'none'
    sec3.style.display = 'none'
    sec4.style.display = 'none'
    sec5.style.display = 'none'
    sec2.style.display = 'block'
})

a_scan.addEventListener('click', () => {

    sec1.style.display = 'none'
    sec2.style.display = 'none'
    sec3.style.display = 'none'
    sec5.style.display = 'none'
    sec4.style.display = 'block'
})

input.addEventListener('click', () => file_input.click() )

scan_btn.addEventListener('click', () => {
    // QR Scanner Code

    const html5QrCode = new Html5Qrcode("qr-reader");
    document.getElementById("qr-reader").innerHTML = ""
    // File based scanning

    if (file_input.files.length == 0) return;
    
    // document.getElementById("set-qr").src = URL.createObjectURL(file_input.files[0])
    let area = document.querySelector("#sec5 .box")

    imageFile = file_input.files[0]
        html5QrCode.scanFile(imageFile, showImage = true)
            .then(qrCodeMessage => {
                //console.log(qrCodeMessage)
                area.innerText = qrCodeMessage
                if (!isValidUrl(area.innerText)) {
                    let elem = document.getElementById("link-button")
                    elem.style.background = "#adabb8"
                    elem.style.cursor= "default"
                    elem.disabled = true
    }
            })
            .catch(err => {
                console.log(`Error scanning file. Reason: ${err}`)
            });
        
        // Style Code

        sec2.style.display = 'none'
        sec3.style.display = 'none'
        sec4.style.display = 'none'
        sec1.style.display = 'none'

        sec5.style.display = 'block'
   
    })

    scan_btn2.addEventListener('click', () => {
        sec2.style.display = 'none'
        sec3.style.display = 'none'
        sec5.style.display = 'none'
        sec1.style.display = 'none'

        sec4.style.display = 'block'
    })

home.addEventListener('click', () => a_home.click())
home2.addEventListener('click', () => a_home.click())
    

    generate_btn.addEventListener('click', () => {

        let val = document.querySelector(".box").value
        if (val == "") return

        var src = document.getElementById("add-qr")
        src.innerHTML = ""

        var text = document.getElementById("qr-text")
    
        var qrcode = new QRCode(src, {
            text: val,
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.H
        });
        text.innerText = ""
        text.innerText = val
        val.innerText = ""

        sec2.style.display = 'none'
        sec5.style.display = 'none'
        sec4.style.display = 'none'
        sec1.style.display = 'none'

        sec3.style.display = 'block'
   
    })


    download_btn.addEventListener('click', () => {
        let dataUrl = document.querySelector('#add-qr').querySelector('img').src;
        if (dataUrl == "") return
        downloadURI(dataUrl, 'qrcode.png')
        setTimeout(() => {
            a_home.click()
        }, 5000);
    })

    generate_btn2.addEventListener('click', () => {
        sec3.style.display = 'none'
        sec5.style.display = 'none'
        sec4.style.display = 'none'
        sec1.style.display = 'none'

        sec2.style.display = 'block'
    })

    // Entering QR File

    file_input.addEventListener('change', () => {
        if (file_input.files.length > 0) {
            input_span.innerText = "File is chosen"
        };

        scan_btn.style.background = "#5B50A1"
        scan_btn.style.cursor = "pointer"


        document.getElementById("set-qr").src = URL.createObjectURL(file_input.files[0])
    

    })

    // Download Link

    function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    };
  

    // Go to Link

    link_btn.addEventListener('click', () => {
        go_to_link()
    })

    function go_to_link() {
        var url = document.querySelector("#sec5 .input .box")
        var link = document.createElement("a")
        link.href = url.innerText
        link.target = "_blank"
        link.rel="noopener noreferrer"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        delete link
    }


    // function Check URL

    function isValidUrl(urlString) {
        var inputElement = document.createElement('input');
        inputElement.type = 'url';
        inputElement.value = urlString;
  
        if (!inputElement.checkValidity()) {
          return false;
        } else {
          return true;
        }
      } 

