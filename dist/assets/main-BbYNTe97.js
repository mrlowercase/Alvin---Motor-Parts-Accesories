import"./main-CgK1J6gc.js";function h({product:e,sku:t,price:n,qty:o,name:r,phone:i,notes:l}){let s=`Hi! I'd like to inquire about the following:

`;return e&&(s+="Product: "+e+`
`),t&&(s+="SKU: "+t+`
`),n&&(s+="Price: "+n+`
`),o&&(s+="Qty: "+o+`
`),s+=`
`,r&&(s+="Name: "+r+`
`),i&&(s+="Phone: "+i+`
`),l&&(s+="Notes: "+l+`
`),s.trim()}function S({title:e,subtitle:t,msg:n,closeAction:o}){return`
        <div class="p-2 flex flex-col gap-3">
            <p class="section-label">Inquiry Summary</p>
            <p class="font-heading text-[18px] font-bold text-text-light">${e}</p>
            ${t?`<p class="text-sm text-muted">${t}</p>`:""}
            <p class="text-[12px] text-muted">Your message is ready. Tap "Copy Message", then paste it in Facebook Messenger.</p>
            <textarea id="fbMsgText" readonly rows="8" onclick="this.select();this.setSelectionRange(0,99999);"
                class="bg-dark border border-border-dark rounded px-3 py-2 text-text-light text-[12px] font-body leading-relaxed resize-none outline-none focus:border-pink w-full"
            >${n}</textarea>
            <button type="button" id="copyMsgBtn" onclick="copyInquiryMsg(this)"
                class="btn-primary block text-center w-full">Copy Message</button>
            <a href="https://www.facebook.com/alvin.galvez.686004" target="_blank" rel="noopener"
                class="btn-ghost block text-center w-full">Open Facebook</a>
            <button type="button" onclick="${o}" class="text-[12px] text-muted underline text-center mt-1">Close</button>
        </div>
    `}window.copyInquiryMsg=function(e){const t=document.getElementById("fbMsgText");if(!t)return;const n=t.value;navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(n).then(()=>{e.textContent="✓ Copied!",setTimeout(()=>{e.textContent="Copy Message"},2500)}).catch(()=>x(t,e)):x(t,e)};function x(e,t){e.select(),e.setSelectionRange(0,99999);try{document.execCommand("copy"),t&&(t.textContent="✓ Copied!",setTimeout(()=>{t.textContent="Copy Message"},2500))}catch{}}function u(e,t){d(e),e.classList.add("!border-pink");const n=document.createElement("p");n.className="field-error text-[11px] text-pink mt-1",n.textContent=t,e.insertAdjacentElement("afterend",n)}function d(e){e.classList.remove("!border-pink");const t=e.nextElementSibling;t&&t.classList.contains("field-error")&&t.remove()}function v(e){return e.trim()?e.trim().length<2?"Name must be at least 2 characters.":/[a-zA-Z]/.test(e.trim())?/^\d+$/.test(e.trim())?"Name cannot be numbers only.":null:"Name must contain letters.":"Name is required."}function w(e){return e.trim()?/^[\d\s\-\+\(\)]{7,15}$/.test(e.trim())?null:"Enter a valid phone number.":"Phone number is required."}function C(e){const t=parseInt(e);return!e||isNaN(t)||t<1?"Quantity must be at least 1.":null}window.openInquiry=function(e,t){document.getElementById("modalProductName").textContent=e,document.getElementById("modalProductPrice").textContent=t,document.getElementById("modalOverlay").classList.add("open"),document.body.style.overflow="hidden"};window.closeInquiry=function(){const e=document.getElementById("modalOverlay");e.classList.remove("open"),document.body.style.overflow="";const t=e.querySelector(".modal");t&&!t.querySelector("form")&&(t.innerHTML=`
            <button class="modal-close" onclick="closeInquiry()">✕</button>
            <p class="section-label">Product Inquiry</p>
            <h3 class="font-heading text-[28px] font-bold mt-1 mb-1" id="modalProductName"></h3>
            <p class="modal-price" id="modalProductPrice"></p>
            <form class="modal-form" onsubmit="submitInquiry(event)" novalidate>
                <input type="text" placeholder="Your Name *" id="mName">
                <input type="text" placeholder="Phone Number *" id="mPhone">
                <input type="number" placeholder="Quantity" id="mQty" min="1" value="1">
                <textarea placeholder="Additional notes (optional)" id="mNotes" rows="3"></textarea>
                <button type="submit" class="btn-primary">Send Inquiry</button>
            </form>
        `)};window.submitInquiry=function(e){e.preventDefault();const t=e.target,n=t.querySelector("#mName"),o=t.querySelector("#mPhone"),r=t.querySelector("#mQty"),i=t.querySelector("#mNotes");let l=!0;if(n){const a=v(n.value);a?(u(n,a),l=!1):d(n)}if(o){const a=w(o.value);a?(u(o,a),l=!1):d(o)}if(r){const a=C(r.value);a?(u(r,a),l=!1):d(r)}if(!l)return;const s=document.getElementById("modalProductName").textContent,p=document.getElementById("modalProductPrice").textContent,f=n?n.value.trim():"",c=o?o.value.trim():"",y=r?r.value:"1",E=i?i.value.trim():"",I=h({product:s,price:p,qty:y,name:f,phone:c,notes:E}),b=document.querySelector(".modal");b&&(b.innerHTML=S({title:s,subtitle:p+" &nbsp;·&nbsp; Qty: "+y,msg:I,closeAction:"closeInquiry()"}))};document.addEventListener("keydown",e=>{e.key==="Escape"&&window.closeInquiry()});window.toggleMenu=function(){const e=document.getElementById("mobileNav"),t=document.querySelector(".hamburger-btn");e.classList.toggle("open"),t&&(t.textContent=e.classList.contains("open")?"✕":"☰")};const m=document.getElementById("backToTop");m&&window.addEventListener("scroll",()=>{window.scrollY>300?(m.classList.remove("opacity-0","pointer-events-none"),m.classList.add("opacity-100")):(m.classList.add("opacity-0","pointer-events-none"),m.classList.remove("opacity-100"))});const g=document.querySelector("header");window.addEventListener("scroll",()=>{g&&(g.style.borderBottomColor=window.scrollY>10?"#E8185A":"#2E2E2E")});const N=document.querySelectorAll("section[id]"),L=document.querySelectorAll("nav a");window.addEventListener("scroll",()=>{let e="";N.forEach(t=>{window.scrollY>=t.offsetTop-100&&(e=t.getAttribute("id"))}),L.forEach(t=>{t.style.color=t.getAttribute("href")==="#"+e?"#F0F0F0":""})});const M=document.querySelectorAll(".fade-in"),k=new IntersectionObserver(e=>{e.forEach((t,n)=>{t.isIntersecting&&(setTimeout(()=>t.target.classList.add("visible"),n*80),k.unobserve(t.target))})},{threshold:.1});M.forEach(e=>k.observe(e));function q(){const e=document.querySelector(".contact-form");e&&e.addEventListener("submit",function(t){t.preventDefault();const n=this.querySelector('input[placeholder="Your Name"]'),o=this.querySelector('input[placeholder="Phone Number"]'),r=this.querySelector("textarea");let i=!0;if(n){const c=v(n.value);c?(u(n,c),i=!1):d(n)}if(o){const c=w(o.value);c?(u(o,c),i=!1):d(o)}if(r&&!r.value.trim()?(u(r,"Please describe what you're looking for."),i=!1):r&&d(r),!i)return;const l=n?n.value.trim():"",s=o?o.value.trim():"",p=r?r.value.trim():"",f=h({name:l,phone:s,notes:p});this.innerHTML=`
            <div class="flex flex-col gap-3">
                <p class="text-sm text-muted">Thanks, <strong class="text-text-light">${l}</strong>! Your message is ready.</p>
                <p class="text-[12px] text-muted">Tap "Copy Message", then paste it in Facebook Messenger.</p>
                <textarea id="fbMsgText" readonly rows="7" onclick="this.select();this.setSelectionRange(0,99999);"
                    class="bg-dark border border-border-dark rounded px-3 py-2 text-text-light text-[12px] font-body leading-relaxed resize-none outline-none focus:border-pink w-full"
                >${f}</textarea>
                <button type="button" id="copyMsgBtn" onclick="copyInquiryMsg(this)"
                    class="btn-primary block text-center w-full">Copy Message</button>
                <a href="https://www.facebook.com/alvin.galvez.686004" target="_blank" rel="noopener"
                    class="btn-ghost block text-center w-full">Open Facebook</a>
                <button type="button" id="sendAnotherBtn" class="text-[12px] text-muted underline text-center">Send Another</button>
            </div>
        `,document.getElementById("sendAnotherBtn").addEventListener("click",P)})}function P(){const e=document.querySelector("#contact .grid");if(!e)return;const t=e.lastElementChild;t&&(t.outerHTML=`<form class="contact-form flex flex-col gap-3" novalidate>
        <input type="text" placeholder="Your Name">
        <input type="text" placeholder="Phone Number">
        <textarea placeholder="What part are you looking for?" rows="4"></textarea>
        <button type="submit" class="btn-primary">Send Inquiry</button>
    </form>`,q())}q();
