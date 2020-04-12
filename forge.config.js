module.exports = {
    packagerConfig: {
      icon: "assets/favicon.ico"
    },
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'LividaST',
            name: 'application'
          },
          prerelease: true
        }
      }
    ],
    makers: [
        {
          name: "@electron-forge/maker-squirrel",
          config: {
            name: "Livida",
            setupExe: "Livida Setup.exe",
            exe: "Livida.exe",
            iconUrl: "https://livida.net/assets/favicon.ico",
            setupIcon: "assets/favicon.ico"
          }
        },
        {
          name: "@electron-forge/maker-zip",
          platforms: [
            "darwin"
          ]
        },
        {
          name: "@electron-forge/maker-deb",
          config: {}
        },
        {
          name: "@electron-forge/maker-rpm",
          config: {}
        }
      ]
    }
