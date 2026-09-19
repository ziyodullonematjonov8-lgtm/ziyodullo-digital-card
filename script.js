// =================================
// ZIYODULLO DIGITAL CARD
// COMPLETE JAVASCRIPT
// =================================


// =================================
// 1. CONTACT LINK INTERACTION
// =================================

const links =
    document.querySelectorAll(".link-card");


links.forEach((link) => {

    link.addEventListener("click", () => {

        console.log(
            "Link clicked:",
            link.innerText.trim()
        );

    });

});


// =================================
// 2. QR CODE
// =================================

const qrContainer =
    document.getElementById("qrcode");


if (qrContainer) {

    const qrScript =
        document.createElement("script");


    qrScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";


    qrScript.onload = function () {

        new QRCode(
            qrContainer,
            {

                text:
                    window.location.href,

                width:
                    130,

                height:
                    130,

                colorDark:
                    "#111111",

                colorLight:
                    "#ffffff",

                correctLevel:
                    QRCode.CorrectLevel.H

            }
        );

    };


    qrScript.onerror = function () {

        console.error(
            "QR Code library could not be loaded."
        );

    };


    document.body.appendChild(
        qrScript
    );

}


// =================================
// 3. SAVE CONTACT
// =================================

const saveContact =
    document.getElementById(
        "saveContact"
    );


if (saveContact) {

    saveContact.addEventListener(
        "click",
        () => {


            const contact = [

                "BEGIN:VCARD",

                "VERSION:3.0",

                "FN:ZIYODULLO",

                "N:ZIYODULLO;;;;",

                "TEL;TYPE=CELL:+998507448890",

                "TEL;TYPE=CELL:+998200027450",

                "EMAIL:ziyodullonematjonov8@gmail.com",

                "NOTE:Japanese - Uzbek - Russian Translator & Interpreter",

                "END:VCARD"

            ].join("\r\n");


            const blob =
                new Blob(
                    [contact],
                    {
                        type:
                            "text/vcard;charset=utf-8"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                "Ziyodullo.vcf";


            document.body.appendChild(
                link
            );


            link.click();


            document.body.removeChild(
                link
            );


            setTimeout(
                () => {

                    URL.revokeObjectURL(
                        url
                    );

                },
                1000
            );


            console.log(
                "Contact file created successfully."
            );

        }
    );

}


// =================================
// 4. NFC SHARE
// =================================

const nfcShare =
    document.getElementById(
        "nfcShare"
    );


const nfcStatus =
    document.getElementById(
        "nfcStatus"
    );


if (nfcShare) {

    nfcShare.addEventListener(
        "click",
        async () => {


            /*
             * Web NFC faqat mos qurilma
             * va HTTPS muhitida ishlashi mumkin.
             */


            if (
                !("NDEFReader" in window)
            ) {

                nfcStatus.textContent =
                    "Bu qurilma yoki brauzer Web NFC ni qo‘llab-quvvatlamaydi.";

                return;

            }


            try {


                nfcStatus.textContent =
                    "NFC tayyorlanmoqda...";


                const ndef =
                    new NDEFReader();


                await ndef.write({

                    records: [

                        {
                            recordType: "url",

                            data:
                                window.location.href
                        }

                    ]

                });


                nfcStatus.textContent =
                    "Tayyor! Telefoningizni NFC tagga yaqinlashtiring.";

            }

            catch (error) {

                console.error(
                    "NFC error:",
                    error
                );


                nfcStatus.textContent =
                    "NFC yozish amalga oshmadi. NFC yoqilganini va sayt HTTPS orqali ochilganini tekshiring.";

            }

        }
    );

}


// =================================
// 5. PAGE LOADED
// =================================

console.log(
    "Ziyodullo Digital Card loaded successfully."
);