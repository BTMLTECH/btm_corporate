<script lang="ts">
  let selectedCountry: string = "Nigeria";
  import IATALogo from "$lib/images/iata-logo.png";
</script>

<footer class="w-full bg-gray-800 pt-4">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <!--Grid-->
    <div
      class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6 py-8 max-sm:max-w-sm max-sm:mx-auto gap-y-6"
    >
      <div class="col-span-full mb-6 lg:col-span-2 lg:mb-0">
        <div class="flex items-center gap-4">
          <img src={IATALogo} alt="IATA Logo" class="h-16 w-auto" />
        </div>
        <p class="py-4 text-sm text-gray-300 lg:max-w-xs text-left">
          Business Travel Management Limited is the acknowledged expert in the
          delivery of managed travel solutions.
        </p>
        <a href="mailto:info.gh@btmlimited.net" class="btn btn-primary">
          Contact us
        </a>
      </div>

      <div class="lg:mx-auto text-left">
        <h4 class="text-lg text-white font-medium mb-4">Useful Links</h4>
        <ul class="text-sm transition-all duration-500">
          <!-- <li class="mb-3">
            <a href="#" class="text-gray-300 hover:text-white">Leave a review</a
            >
          </li> -->
          <!-- <li class="mb-3">
            <a href="/blog" class="text-gray-300 hover:text-white">News</a>
          </li> -->
          <li class="mb-3">
            <a href="/login" class="text-gray-300 hover:text-white">Login</a>
          </li>
          <li class="mb-3">
            <a href="faqs" class="text-gray-300 hover:text-white">FAQs</a>
          </li>
        </ul>
      </div>

      <div class="lg:mx-auto text-left">
        <h4 class="text-lg text-white font-medium mb-4">Our Brands</h4>
        <ul class="text-sm transition-all duration-500">
          <li class="mb-3">
            <a
              href="https://www.btmholidays.com/"
              class="text-gray-300 hover:text-white">BTM Holidays</a
            >
          </li>
          <li class="mb-3">
            <a
              href="https://my.journeyeasy.net/"
              class="text-gray-300 hover:text-white">Journeyeasy</a
            >
          </li>
          <!-- <li class="mb-3">
            <a href="#0" class="text-gray-300 hover:text-white">TrekBuyFly</a>
          </li> -->
          <li>
            <a
              href="https://marketplace.btmlimited.net/"
              class="text-gray-300 hover:text-white">BTM Marketplace</a
            >
          </li>
        </ul>
      </div>

      <div class="lg:mx-auto text-left">
        <h4 class="text-lg text-white font-medium mb-4">Address</h4>
        <ul class="text-sm transition-all duration-500">
          <li class="mb-3 text-gray-300">
            No. 6 H.P. Nyemetei<br />Osu, Accra, Ghana<br />
          </li>
          <li class="mb-3 text-gray-300">P.O. Box CT 3626 Cantonments</li>
        </ul>
      </div>

      <div class="lg:mx-auto text-left">
        <h4 class="text-lg text-white font-medium mb-4">Legal</h4>
        <ul class="text-sm transition-all duration-500">
          <li class="mb-3">
            <a href="/terms" class="text-gray-300 hover:text-white"
              >Terms & Conditions</a
            >
          </li>
          <li class="mb-3">
            <a href="/privacy" class="text-gray-300 hover:text-white"
              >Privacy Policy</a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="py-5 border-t border-gray-700">
      <div
        class="flex items-center justify-center flex-col lg:justify-between lg:flex-row"
      >
        <span class="text-xs text-gray-300"
          >© BTM Limited 2024, All rights reserved</span
        >
        <div class="flex mt-4 space-x-3 sm:justify-center lg:mt-0">
          <a
            href="https://web.facebook.com/people/BTM-Ghana/61570113848541/"
            aria-label="Visit BTM Limited on Facebook"
            class="w-8 h-8 rounded-full bg-gray-700 flex justify-center items-center hover:bg-blue-500"
          >
            <svg
              class="w-[1.25rem] h-[1.25rem] text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/btmghanalimited/"
            aria-label="Visit BTM Limited on Instagram"
            class="w-8 h-8 rounded-full bg-gray-700 flex justify-center items-center hover:bg-orange-600"
          >
            <svg
              class="w-[1.25rem] h-[1.125rem] text-white"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.70975 7.93663C4.70975 6.65824 5.76102 5.62163 7.0582 5.62163C8.35537 5.62163 9.40721 6.65824 9.40721 7.93663C9.40721 9.21502 8.35537 10.2516 7.0582 10.2516C5.76102 10.2516 4.70975 9.21502 4.70975 7.93663ZM3.43991 7.93663C3.43991 9.90608 5.05982 11.5025 7.0582 11.5025C9.05658 11.5025 10.6765 9.90608 10.6765 7.93663C10.6765 5.96719 9.05658 4.37074 7.0582 4.37074C5.05982 4.37074 3.43991 5.96719 3.43991 7.93663ZM9.97414 4.22935C9.97408 4.39417 10.0236 4.55531 10.1165 4.69239C10.2093 4.82946 10.3413 4.93633 10.4958 4.99946C10.6503 5.06259 10.8203 5.07916 10.9844 5.04707C11.1484 5.01498 11.2991 4.93568 11.4174 4.81918C11.5357 4.70268 11.6163 4.55423 11.649 4.39259C11.6817 4.23095 11.665 4.06339 11.6011 3.91109C11.5371 3.7588 11.4288 3.6286 11.2898 3.53698C11.1508 3.44536 10.9873 3.39642 10.8201 3.39635H10.8197C10.5955 3.39646 10.3806 3.48424 10.222 3.64043C10.0635 3.79661 9.97434 4.00843 9.97414 4.22935ZM4.21142 13.5892C3.52442 13.5584 3.15101 13.4456 2.90286 13.3504C2.57387 13.2241 2.33914 13.0738 2.09235 12.8309C1.84555 12.588 1.69278 12.3569 1.56527 12.0327C1.46854 11.7882 1.3541 11.4201 1.32287 10.7431C1.28871 10.0111 1.28189 9.79119 1.28189 7.93669C1.28189 6.08219 1.28927 5.86291 1.32287 5.1303C1.35416 4.45324 1.46944 4.08585 1.56527 3.84069C1.69335 3.51647 1.84589 3.28513 2.09235 3.04191C2.3388 2.79869 2.57331 2.64813 2.90286 2.52247C3.1509 2.42713 3.52442 2.31435 4.21142 2.28358C4.95417 2.24991 5.17729 2.24319 7.0582 2.24319C8.9391 2.24319 9.16244 2.25047 9.90582 2.28358C10.5928 2.31441 10.9656 2.42802 11.2144 2.52247C11.5434 2.64813 11.7781 2.79902 12.0249 3.04191C12.2717 3.2848 12.4239 3.51647 12.552 3.84069C12.6487 4.08513 12.7631 4.45324 12.7944 5.1303C12.8285 5.86291 12.8354 6.08219 12.8354 7.93669C12.8354 9.79119 12.8285 10.0105 12.7944 10.7431C12.7631 11.4201 12.6481 11.7881 12.552 12.0327C12.4239 12.3569 12.2714 12.5882 12.0249 12.8309C11.7784 13.0736 11.5434 13.2241 11.2144 13.3504C10.9663 13.4457 10.5928 13.5585 9.90582 13.5892C9.16306 13.6229 8.93994 13.6296 7.0582 13.6296C5.17645 13.6296 4.95395 13.6229 4.21142 13.5892ZM4.15307 1.03424C3.40294 1.06791 2.89035 1.18513 2.4427 1.3568C1.9791 1.53408 1.58663 1.77191 1.19446 2.1578C0.802277 2.54369 0.56157 2.93108 0.381687 3.38797C0.207498 3.82941 0.0885535 4.3343 0.0543922 5.07358C0.0196672 5.81402 0.0117188 6.05074 0.0117188 7.93663C0.0117188 9.82252 0.0196672 10.0592 0.0543922 10.7997C0.0885535 11.539 0.207498 12.0439 0.381687 12.4853C0.56157 12.9419 0.802334 13.3297 1.19446 13.7155C1.58658 14.1012 1.9791 14.3387 2.4427 14.5165C2.89119 14.6881 3.40294 14.8054 4.15307 14.839C4.90479 14.8727 5.1446 14.8811 7.0582 14.8811C8.9718 14.8811 9.212 14.8732 9.96332 14.839C10.7135 14.8054 11.2258 14.6881 11.6737 14.5165C12.137 14.3387 12.5298 14.1014 12.9219 13.7155C13.3141 13.3296 13.5543 12.9419 13.7347 12.4853C13.9089 12.0439 14.0284 11.539 14.062 10.7997C14.0962 10.0587 14.1041 9.82252 14.1041 7.93663C14.1041 6.05074 14.0962 5.81402 14.062 5.07358C14.0278 4.33424 13.9089 3.82913 13.7347 3.38797C13.5543 2.93135 13.3135 2.5443 12.9219 2.1578C12.5304 1.7713 12.137 1.53408 11.6743 1.3568C11.2258 1.18513 10.7135 1.06735 9.96388 1.03424C9.21256 1.00058 8.97236 0.992188 7.05876 0.992188C5.14516 0.992188 4.90479 1.00002 4.15307 1.03424Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href="https://wa.me/233598117590"
            aria-label="Contact BTM Limited on WhatsApp"
            class="w-8 h-8 rounded-full bg-gray-700 flex justify-center items-center hover:bg-green-600"
          >
            <svg
              class="w-[1.25rem] h-[1.25rem] text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20.4015 3.48736C18.1769 1.26143 15.2053 0.0404663 12.0502 0.0404663C5.4635 0.0404663 0.100198 5.40377 0.100198 12.0005C0.100198 14.1255 0.659364 16.2005 1.72361 18.0505L0 24.0405L6.12519 22.3505C7.90519 23.3255 9.95354 23.8405 12.0502 23.8405H12.0519C18.6369 23.8405 24.0002 18.4772 24.0002 11.8805C24.0002 8.72544 22.6262 5.71329 20.4015 3.48736ZM12.0502 21.8405C10.1752 21.8405 8.34686 21.3505 6.74686 20.4255L6.40186 20.2255L2.77186 21.2505L3.81686 17.7005L3.59686 17.3405C2.57186 15.6755 2.02186 13.7505 2.02186 11.7755C2.02186 6.45044 6.52186 1.95044 12.0519 1.95044C14.7019 1.95044 17.1769 2.97544 19.0519 4.85044C20.9269 6.72544 21.9519 9.20044 21.9502 11.8505C21.9502 17.4005 17.5785 21.8405 12.0502 21.8405ZM17.4685 14.4255C17.1685 14.2755 15.7185 13.5505 15.4435 13.4505C15.1685 13.3505 14.9685 13.3005 14.7685 13.6005C14.5685 13.9005 13.9935 14.5755 13.8185 14.7755C13.6435 14.9755 13.4685 15.0005 13.1685 14.8505C12.8685 14.7005 11.8935 14.3755 10.7435 13.3505C9.84353 12.5505 9.24353 11.5755 9.06853 11.2755C8.89353 10.9755 9.04853 10.8005 9.19853 10.6505C9.33353 10.5255 9.49353 10.3255 9.64353 10.1505C9.79353 9.97544 9.84353 9.85044 9.94353 9.65044C10.0435 9.45044 9.99353 9.27544 9.91853 9.12544C9.84353 8.97544 9.24353 7.52544 8.99353 6.92544C8.74353 6.32544 8.49353 6.42544 8.31853 6.42544C8.14353 6.42544 7.94353 6.40044 7.74353 6.40044C7.54353 6.40044 7.21853 6.47544 6.94353 6.77544C6.66853 7.07544 5.89353 7.80044 5.89353 9.25044C5.89353 10.7004 6.96853 12.1004 7.11853 12.3004C7.26853 12.5004 9.24353 15.5504 12.2685 16.8254C12.9685 17.1254 13.5185 17.3004 13.9435 17.4254C14.6435 17.6504 15.2685 17.6004 15.7685 17.5254C16.3185 17.4504 17.4935 16.8004 17.7435 16.1004C17.9935 15.4004 17.9935 14.8004 17.9185 14.6754C17.8435 14.5504 17.6435 14.5004 17.3435 14.3504L17.4685 14.4255Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/btmghana"
            aria-label="Visit BTM Limited on LinkedIn"
            class="w-8 h-8 rounded-full bg-gray-700 flex justify-center items-center hover:bg-blue-700"
          >
            <svg
              class="w-[1.25rem] h-[1.25rem] text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>
