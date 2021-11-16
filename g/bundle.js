(()=>{var u=["Programmering","Stockholm","Studenter","Javascript","Afterwork"],r,o,i;function a(){let e=Math.floor(Math.random()*u.length-1)+1;return u[e]}function l(e){return r.toLowerCase().indexOf(e)===-1}function d(e){return r.split("").reduce((t,n,s)=>(e===n.toLowerCase()&&t.push(s),t),[])}function f(e){return o.map((t,n)=>e.includes(n)?r.charAt(n):t)}function c(){return i===0}function p(){return r===o.join("")}function w(e){if(l(e)){i--;return}let t=d(e);o=f(t)}function h(){r=a(),o=r.split("").map(()=>"_"),i=5}function m(){h();let e=!0;for(;e;){let t=`
        ${o.join(" ")}

        Lives left: ${i}
        `,n=prompt(t);if(w(n.toLowerCase()),e=!(c()||p()),!e){let s=c()?`You have lost! The correct word was ${r}`:"You have won, congratulations!";alert(s)}}}m();})();
