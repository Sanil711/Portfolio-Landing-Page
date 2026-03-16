$(document).ready(function () {
  var PAGE_W = 440;
  var PAGE_H = 600;
  var ready = false;

  // ── Init Turn.js ──────────────────────────
  function initJournal() {
    $("#journal").turn({
      width: PAGE_W * 2,
      height: PAGE_H,
      display: "double",
      autoCenter: true,
      gradients: true,
      acceleration: true,
      pages: 14, // 1 ghost page + 12 inner + 1 back cover
      when: {
        turned: function (e, page) {
          console.log("Now on page:", page);
        },
      },
    });
    // Jump past ghost page straight to Avatar + Inventory spread
    $("#journal").turn("page", 2);
    ready = true;
    // Fix touch on mobile — map swipe left/right to page turns
    $("#journal").on("touchstart", function (e) {
      var touch = e.originalEvent.touches[0];
      $(this).data("touchStartX", touch.clientX);
    });

    $("#journal").on("touchend", function (e) {
      var touch = e.originalEvent.changedTouches[0];
      var startX = $(this).data("touchStartX");
      var diff = startX - touch.clientX;

      if (Math.abs(diff) > 50) {
        // minimum swipe distance
        if (diff > 0) {
          $("#journal").turn("next"); // swipe left = next page
        } else {
          $("#journal").turn("previous"); // swipe right = previous page
        }
      }
    });
  }

  // Scale book to fit mobile screen
  function scaleBook() {
    var scaleW = window.innerWidth / 880;
    var scaleH = window.innerHeight / 600;
    var scale = Math.min(scaleW, scaleH, 1); // never scale UP, only down
    document.documentElement.style.setProperty("--book-scale", scale);
  }
  scaleBook();
  $(window).on("resize", scaleBook);

  // ── Click closed book → open journal ──────
  $("#closed-book").on("click", function () {
    $("#landing").addClass("hide");

    setTimeout(function () {
      $("#landing").hide();
      $("#journal-wrap").removeClass("hidden");
      if (!ready) initJournal();
    }, 500);
  });

  // ── Keyboard navigation ───────────────────
  $(document).on("keydown", function (e) {
    if ($("#journal-wrap").hasClass("hidden")) return;
    if (e.key === "ArrowRight") $("#journal").turn("next");
    if (e.key === "ArrowLeft") $("#journal").turn("previous");
  });
});

$("#btn-close").on("click", function () {
  $("#journal-wrap").addClass("hidden");
  $("#landing").show();
  setTimeout(function () {
    $("#landing").removeClass("hide");
  }, 50);
});
