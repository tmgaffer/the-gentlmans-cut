/* ==========================================
   MOBILE MENU
========================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


/* ==========================================
   BOOKING SYSTEM
========================================== */

const bookingForm =
    document.getElementById("bookingForm");


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value;

            const email =
                document.getElementById("email").value;

            const phone =
                document.getElementById("phone").value;

            const service =
                document.getElementById("service").value;

            const barber =
                document.getElementById("barber").value;

            const date =
                document.getElementById("date").value;

            const time =
                document.getElementById("time").value;

            const notes =
                document.getElementById("notes").value;


            /* SUMMARY */

            document.getElementById(
                "summaryService"
            ).textContent = service;


            document.getElementById(
                "summaryBarber"
            ).textContent = barber;


            document.getElementById(
                "summaryDate"
            ).textContent = date;


            document.getElementById(
                "summaryTime"
            ).textContent = time;


            /* SHOW SUCCESS */

            bookingForm.style.display = "none";

            document
                .getElementById("bookingSuccess")
                .classList.add("show");


            /* ==================================
               GOOGLE CALENDAR
            ================================== */


            const startDate =
                date.replaceAll("-", "") +
                "T" +
                time.replace(":", "") +
                "00";


            const hour =
                parseInt(
                    time.split(":")[0]
                );


            const endHour =
                String(hour + 1)
                    .padStart(2, "0");


            const endDate =
                date.replaceAll("-", "") +
                "T" +
                endHour +
                time.split(":")[1] +
                "00";


            const calendarTitle =
                `${service} - The Gentleman's Cut`;


            const calendarDetails =
                `Barber: ${barber}\n` +
                `Customer: ${name}\n` +
                `Phone: ${phone}\n` +
                `Email: ${email}\n` +
                `Notes: ${notes}`;


            const location =
                "The Gentleman's Cut, Johannesburg";


            const googleUrl =
                "https://calendar.google.com/calendar/render" +
                "?action=TEMPLATE" +
                "&text=" +
                encodeURIComponent(calendarTitle) +
                "&dates=" +
                startDate +
                "/" +
                endDate +
                "&details=" +
                encodeURIComponent(calendarDetails) +
                "&location=" +
                encodeURIComponent(location);


            document.getElementById(
                "googleCalendar"
            ).href = googleUrl;


            /* ==================================
               APPLE / ICS CALENDAR
            ================================== */

            const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//The Gentlemans Cut//Booking//EN
BEGIN:VEVENT
UID:${Date.now()}@gentlemanscut.co.za
DTSTAMP:${startDate}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${calendarTitle}
DESCRIPTION:${calendarDetails.replace(/\n/g, "\\n")}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;


            document
                .getElementById("downloadCalendar")
                .onclick = function () {

                    const blob =
                        new Blob(
                            [icsContent],
                            {
                                type:
                                    "text/calendar;charset=utf-8"
                            }
                        );


                    const url =
                        URL.createObjectURL(blob);


                    const link =
                        document.createElement("a");


                    link.href = url;

                    link.download =
                        "gentlemans-cut-appointment.ics";


                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);

                    URL.revokeObjectURL(url);

                };

        }
    );

}

/* =========================================
   PROMOTIONAL POPUP
========================================= */

const promoPopup = document.getElementById("promoPopup");
const closePopup = document.getElementById("closePopup");
const continueBrowsing = document.getElementById("continueBrowsing");

function openPopup() {
    if (promoPopup) {
        promoPopup.classList.add("show");
        document.body.style.overflow = "hidden";
    }
}

function hidePopup() {
    if (promoPopup) {
        promoPopup.classList.remove("show");
        document.body.style.overflow = "";
    }
}


/* Open popup after 2 seconds */

/*if (promoPopup) {
    setTimeout(() => {
        openPopup();
    }, 2000);
}*/

if (promoPopup) {

    const popupSeen = localStorage.getItem("gentlemansCutPopupSeen");

    if (!popupSeen) {

        setTimeout(() => {
            openPopup();
        }, 2000);

    }
}


/* Close X button */

if (closePopup) {
    closePopup.addEventListener("click", hidePopup);
}


/* Continue browsing button */

if (continueBrowsing) {
    continueBrowsing.addEventListener("click", hidePopup);
}


/* Close when clicking outside the popup */

if (promoPopup) {
    promoPopup.addEventListener("click", function(event) {

        if (event.target === promoPopup) {
            hidePopup();
        }

    });
}


/* Close with ESC key */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        hidePopup();
    }

});

/* =========================================
   PRESELECT SERVICE FROM SERVICES PAGE
========================================= */

const serviceSelect = document.getElementById("service");

if (serviceSelect) {

    const params = new URLSearchParams(window.location.search);

    const selectedService = params.get("service");

    if (selectedService) {

        const matchingOption = Array.from(
            serviceSelect.options
        ).find(
            option => option.value === selectedService
        );

        if (matchingOption) {
            serviceSelect.value = selectedService;
        }

    }
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Close popup logic (if active)
  const closePopup = document.getElementById("closePopup");
  const continueBrowsing = document.getElementById("continueBrowsing");
  const promoPopup = document.getElementById("promoPopup");

  const hidePopup = () => {
    if (promoPopup) promoPopup.style.display = "none";
  };

  if (closePopup) closePopup.addEventListener("click", hidePopup);
  if (continueBrowsing) continueBrowsing.addEventListener("click", hidePopup);
});