import{p as i,c as g}from"./navbar-rk9b7t58.js";import{c as n,d as s,a as d,H as m,i as u}from"./htmlPrint-saGA3FvD.js";import{g as p}from"./getAll-BNoPixQm.js";const a=document.getElementById("hero");if(a){const t=a.querySelector("#hero-logo");t&&(t.src=i)}const o=document.getElementById("categorys"),r=document.getElementById("posts");o.classList.add("row","justify-content-center","g-3","h-100","w-100","py-4","py-md-5","px-2","px-md-5");r.classList.add("row","justify-content-center","w-100","py-4","py-md-5","px-2","px-md-4","last-products");async function y(){n(o);try{const t=await g();h(t)}catch(t){s(o),d(o,t)}}function h(t){s(o),t.forEach(e=>{const c=document.createElement("div");c.className="col-12 col-md-6 col-lg-4 pb-3",c.innerHTML=`
            <div class="black-background rounded-4 p-3 p-md-4 h-100">
                <div class="d-flex justify-content-between h-100 gap-2">
                    <div class="flex-grow-1 d-flex flex-column justify-content-between align-items-start text-start">
                        <h2 class="h3 text-white mb-2">${e.name}</h2>
                        <a class="button-reset button-s text-white p-2 rounded-2 green-background mt-2" href="/src/views/pages/category/category.html?slug=${e.slug}">Ver todos</a>
                    </div>
                    <img src="${e.image}" alt="${e.name}" class="category-card-img rounded-3 align-self-center"
                        onerror="this.onerror=null; this.src='${u}';">
                </div>
            </div>
        `,o.appendChild(c)})}async function f(){n(r);try{const t=await p();w(t)}catch(t){s(r),d(r,t)}}function w(t){s(r);const e=document.createElement("div");e.className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 col-12 col-md-11 col-lg-10",t.forEach(c=>{const l=new m(c);e.appendChild(l.render())}),r.appendChild(e)}f();y();
