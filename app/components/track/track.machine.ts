import { createMachine, interpret, assign } from "xstate";

const increment = (context) => context.count + 1;
const decrement = (context) => context.count - 1;

// song from album
// song from single, ep
// created playlist
// playing song
// not playing song

const trackMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBDAxgawASYHsBbABwIDsxyAXAOgBsCoYIBJcgYgAUAZAQQCarAHIBxRKDKwAltWkUJIAB6IAjOtW0AHAAYA7ABYtAJgBsxk3q0BOADQgAnogDMu2joPn9B46q1bDUwBfIPs0LDxCUgoqOkZmSHYOAGVkAHkuLgBRABFFKVl5ckUVBC0AVj1aU1U9Y3LrA3KDZ1UG+ycEVx13T2Njaz1nZx1ygJCwjBx8YjJKGgYmFjSAV2oOHjTREXyCGTkFJGVEeoNaYdNrYwN9VWtVU0eOk8vaKwMH1SbVEZ1TZwmIHC0yic1iiwSEFW60222EAH1kgBVADCKKyyWSu32RRKiFMFXOxj0pgMenKI3Kl2eCHqWlonnK5S+umMfz0gOBkVmMQW8WWaw2WxE8KyACUxWkxdjCodQKUPmcrq1rKYdDpao1nAYabUlXdGqrVOrnKY6pyptzovM6CR6OgHNJyFAOCixVk+MgsjKDsUjqUvmS3jpWmzjWZ1cYac5ysY3k02cZnNZmrHgqEgZaZtbwXaHU6XbC0kjkD7cf61AM4xSdP0Hh9VMSdY4Tkm3np1T9rB4GvoLRFs2CFnnHc6OO6AGLu5IACTLcuOCC+xNoTPM3YaXxTusaDMbOgqzIsJLN-ZBPJttEwqDA6DkY7dHq9iNR6Mx8798srbO0N18Gp8axTRpAJnFoCxBgeS5rEGCwzytIc6GvW97xdR9PSyUUJSlD88SXG5rFoNpyUVOthhAvRNBgppnHJO5alPDMuUHXkkJvO9IFdd0MNwisyg+Ijk0qIxqP8PQQONc4zXqJktFaGwtHgljL2QjiICFURi1LI4Cl9PCzVMKStCaOSxlVEDTXORsDCMA9vFopTQVYq92OoTjJ2nOcdL2WVP0XFMqIqEiD0GUZxJbBBAloe51X+UZmjNDkmKzJyVNcsAslQVACFQLin29bycQXAMakMgIzWMlMDBgtoQLMdta0aipLgeRyL3BVS3My7LcqLEteK-JdmiqarnAGCpKpJZtOlVMChjJP5fATfw2pzBZOoyrKcvHLIpwxLzJB8vS+NqSSYJGEkKU+ciIq0cw3hjAk9EouSmnTSYB1S8FYGoAgSBITjeEEERxEK3y8JsKpdGZSju1JQxyhpJkwI1dQYKq+5mlWxDaB+v6AfUvrtMOoq-NKNUUYCx4AgW+okeGVc-Bg5pa1aZ7secvH-vc3bPIGxc5MM4l-kbKxnu1cLOmquMrGGPRrDupMySSjNyAICA4EUZivr5JZEj83Ty0G1VCJPZ6t1cK5VGjO4GVNfxSWGWtqoMDnL35SBoX5hVam0cwvHmhomRtwiWgJcwbipHRBnezNPva4d7VHKBvbUFo5uo1xiQPVpTBpYX4w7U0WmaGxjDdjrXILVOlzZ6K6kuP51CMRHbpDP3hlaO4mn0WPtYTtiUMgGvQPA-QmX0e5SSeW6YPcaPGuqzdkwr9b0u6nKa4eZ63nqEXTDGENpsQBWqjVLdG0aZl-lXuguYJmvDB6Ma947L5zH6JHPFXfQxruDwtB3HKLfGuSZn6miuDcWGUE84RWNFRAYfwtQfAMuXEIQQgA */
  createMachine(
    {
      context: { count: 0 },
      id: "Track component",
      initial: "loggedOut",
      states: {
        loggedIn: {
          on: {
            PLAYING: {
              target: "playing",
            },
            STOPPED: {
              target: "stopped",
            },
          },
        },
        loggedOut: {
          on: {
            LOGIN: {
              actions: "startLogin",
              target: "loggedOut",
              internal: false,
            },
            LOGIN_SUCCESS: {
              target: "loggedIn",
            },
            LOGIN_ERROR: {
              actions: "displayLoginError",
              target: "loggedOut",
              internal: false,
            },
          },
        },
        playing: {
          on: {
            CREATE: {
              target: "creating",
            },
            LOGOUT: {
              actions: "doLogout",
              target: "loggedOut",
            },
            REFRESH: {
              target: "loggedIn",
            },
          },
        },
        creating: {
          on: {
            CREATE_SUCCESS: {
              target: "created",
            },
            CREATE_ERROR: {
              target: "createError",
            },
          },
        },
        created: {
          on: {
            CREATE: {
              target: "creating",
            },
            LOGOUT: {
              actions: "doLogout",
              target: "loggedOut",
            },
            REFRESH: {
              target: "loggedIn",
            },
          },
        },
        createError: {
          on: {
            CREATE: {
              target: "creating",
            },
            LOGOUT: {
              actions: "doLogout",
              target: "loggedOut",
            },
            REFRESH: {
              target: "loggedIn",
            },
          },
        },
        stopped: {
          on: {
            PLAYING: {
              target: "playing",
            },
            LOGOUT: {
              actions: "doLogout",
              target: "loggedOut",
            },
            REFRESH: {
              target: "loggedIn",
            },
          },
        },
      },
    },
    {
      actions: {
        startLogin: () => {},
        displayLoginError: () => {},
        doLogout: () => {},
      },
    }
  );

const counterService = interpret(counterMachine)
  .onTransition((state) => console.log(state.context.count))
  .start();
// => 0

// counterService.send("INC");
// // => 1

// counterService.send("INC");
// // => 2

// counterService.send("DEC");
// // => 1
