(function (window) {
    window.__env = window.__env || {};
    window.__env.customize = {
      theme: "contrast",
      enterprise: "mutinynet",
      branding: {
        name: "mutinyney",
        title: "Mutinynet",
        site_id: 11,
        rounded_corner: true,
        img: "https://framerusercontent.com/images/dEeAapDQU71mZTWUltiFqlZSsE.png",
      },
      dashboard: {
        widgets: [
          {component: "fees"},
          {component: "goggles"},
          {component: "incoming"},
          {component: "replacements"},
          {component: "blocks"},
          {component: "transactions"},
	],
      },
    };
}((typeof global !== 'undefined') ? global : this));
