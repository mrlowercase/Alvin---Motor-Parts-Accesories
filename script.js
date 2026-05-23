// ── Shared helpers ───────────────────────────────────────────────────────────
function buildMessage({ product, sku, price, qty, name, phone, notes }) {
    let msg = 'Hi! I\'d like to inquire about the following:\n\n';
    if (product) msg += 'Product: ' + product + '\n';
    if (sku)     msg += 'SKU: ' + sku + '\n';
    if (price)   msg += 'Price: ' + price + '\n';
    if (qty)     msg += 'Qty: ' + qty + '\n';
    msg += '\n';
    if (name)    msg += 'Name: ' + name + '\n';
    if (phone)   msg += 'Phone: ' + phone + '\n';
    if (notes)   msg += 'Notes: ' + notes + '\n';
    return msg.trim();
}

function confirmationHTML({ title, subtitle, msg, closeAction }) {
    return `
        <div class="p-2 flex flex-col gap-3">
            <p class="section-label">Inquiry Summary</p>
            <p class="font-heading text-[18px] font-bold text-text-light">${title}</p>
            ${subtitle ? `<p class="text-sm text-muted">${subtitle}</p>` : ''}
            <p class="text-[12px] text-muted">Your message is ready. Tap "Copy Message", then paste it in Facebook Messenger.</p>
            <textarea id="fbMsgText" readonly rows="8" onclick="this.select();this.setSelectionRange(0,99999);"
                class="bg-dark border border-border-dark rounded px-3 py-2 text-text-light text-[12px] font-body leading-relaxed resize-none outline-none focus:border-pink w-full"
            >${msg}</textarea>
            <button type="button" id="copyMsgBtn" onclick="copyInquiryMsg(this)"
                class="btn-primary block text-center w-full">Copy Message</button>
            <a href="https://www.facebook.com/alvin.galvez.686004" target="_blank" rel="noopener"
                class="btn-ghost block text-center w-full">Open Facebook</a>
            <button type="button" onclick="${closeAction}" class="text-[12px] text-muted underline text-center mt-1">Close</button>
        </div>
    `;
}

window.copyInquiryMsg = function(btnEl) {
    const ta = document.getElementById('fbMsgText');
    if (!ta) return;
    const text = ta.value;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            btnEl.textContent = '✓ Copied!';
            setTimeout(() => { btnEl.textContent = 'Copy Message'; }, 2500);
        }).catch(() => fallbackCopy(ta, btnEl));
    } else {
        fallbackCopy(ta, btnEl);
    }
};

function fallbackCopy(ta, btnEl) {
    ta.select();
    ta.setSelectionRange(0, 99999);
    try {
        document.execCommand('copy');
        if (btnEl) {
            btnEl.textContent = '✓ Copied!';
            setTimeout(() => { btnEl.textContent = 'Copy Message'; }, 2500);
        }
    } catch (e) {}
}

// ── Validation helpers ───────────────────────────────────────────────────────
function showError(input, msg) {
    clearError(input);
    input.classList.add('!border-pink');
    const err = document.createElement('p');
    err.className = 'field-error text-[11px] text-pink mt-1';
    err.textContent = msg;
    input.insertAdjacentElement('afterend', err);
}

function clearError(input) {
    input.classList.remove('!border-pink');
    const next = input.nextElementSibling;
    if (next && next.classList.contains('field-error')) next.remove();
}

function validateName(val) {
    if (!val.trim()) return 'Name is required.';
    if (val.trim().length < 2) return 'Name must be at least 2 characters.';
    if (!/[a-zA-Z]/.test(val.trim())) return 'Name must contain letters.';
    if (/^\d+$/.test(val.trim())) return 'Name cannot be numbers only.';
    return null;
}

function validatePhone(val) {
    if (!val.trim()) return 'Phone number is required.';
    if (!/^[\d\s\-\+\(\)]{7,15}$/.test(val.trim())) return 'Enter a valid phone number.';
    return null;
}

function validateQty(val) {
    const n = parseInt(val);
    if (!val || isNaN(n) || n < 1) return 'Quantity must be at least 1.';
    return null;
}

// ── Inquiry Modal (index.html) ───────────────────────────────────────────────
window.openInquiry = function(name, price) {
    document.getElementById('modalProductName').textContent = name;
    document.getElementById('modalProductPrice').textContent = price;
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
};

window.closeInquiry = function() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    const modal = overlay.querySelector('.modal');
    if (modal && !modal.querySelector('form')) {
        modal.innerHTML = `
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
        `;
    }
};

window.submitInquiry = function(e) {
    e.preventDefault();
    const form    = e.target;
    const nameEl  = form.querySelector('#mName');
    const phoneEl = form.querySelector('#mPhone');
    const qtyEl   = form.querySelector('#mQty');
    const notesEl = form.querySelector('#mNotes');

    let valid = true;
    if (nameEl)  { const err = validateName(nameEl.value);   if (err) { showError(nameEl, err);  valid = false; } else clearError(nameEl); }
    if (phoneEl) { const err = validatePhone(phoneEl.value); if (err) { showError(phoneEl, err); valid = false; } else clearError(phoneEl); }
    if (qtyEl)   { const err = validateQty(qtyEl.value);     if (err) { showError(qtyEl, err);   valid = false; } else clearError(qtyEl); }
    if (!valid) return;

    const productName  = document.getElementById('modalProductName').textContent;
    const productPrice = document.getElementById('modalProductPrice').textContent;
    const name  = nameEl  ? nameEl.value.trim()  : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const qty   = qtyEl   ? qtyEl.value          : '1';
    const notes = notesEl ? notesEl.value.trim() : '';

    const msg = buildMessage({ product: productName, price: productPrice, qty, name, phone, notes });

    const modal = document.querySelector('.modal');
    if (!modal) return;
    modal.innerHTML = confirmationHTML({
        title: productName,
        subtitle: productPrice + ' &nbsp;·&nbsp; Qty: ' + qty,
        msg,
        closeAction: 'closeInquiry()'
    });
};

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.closeInquiry();
});

// ── Mobile nav toggle ────────────────────────────────────────────────────────
window.toggleMenu = function() {
    const nav = document.getElementById('mobileNav');
    const btn = document.querySelector('.hamburger-btn');
    nav.classList.toggle('open');
    if (btn) btn.textContent = nav.classList.contains('open') ? '✕' : '☰';
};

// ── Back to top button ───────────────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.remove('opacity-0', 'pointer-events-none');
            backToTop.classList.add('opacity-100');
        } else {
            backToTop.classList.add('opacity-0', 'pointer-events-none');
            backToTop.classList.remove('opacity-100');
        }
    });
}

// ── Sticky header ────────────────────────────────────────────────────────────
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (header) header.style.borderBottomColor = window.scrollY > 10 ? '#E8185A' : '#2E2E2E';
});

// ── Active nav highlight on scroll ──────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id'); });
    navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + current ? '#F0F0F0' : '';
    });
});

// ── Scroll-triggered fade-in ─────────────────────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

// ── Contact form ─────────────────────────────────────────────────────────────
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nameEl    = this.querySelector('input[placeholder="Your Name"]');
        const phoneEl   = this.querySelector('input[placeholder="Phone Number"]');
        const messageEl = this.querySelector('textarea');

        let valid = true;
        if (nameEl)    { const err = validateName(nameEl.value);   if (err) { showError(nameEl, err);    valid = false; } else clearError(nameEl); }
        if (phoneEl)   { const err = validatePhone(phoneEl.value); if (err) { showError(phoneEl, err);   valid = false; } else clearError(phoneEl); }
        if (messageEl && !messageEl.value.trim()) { showError(messageEl, 'Please describe what you\'re looking for.'); valid = false; } else if (messageEl) clearError(messageEl);
        if (!valid) return;

        const name    = nameEl    ? nameEl.value.trim()    : '';
        const phone   = phoneEl   ? phoneEl.value.trim()   : '';
        const message = messageEl ? messageEl.value.trim() : '';
        const msg = buildMessage({ name, phone, notes: message });

        this.innerHTML = `
            <div class="flex flex-col gap-3">
                <p class="text-sm text-muted">Thanks, <strong class="text-text-light">${name}</strong>! Your message is ready.</p>
                <p class="text-[12px] text-muted">Tap "Copy Message", then paste it in Facebook Messenger.</p>
                <textarea id="fbMsgText" readonly rows="7" onclick="this.select();this.setSelectionRange(0,99999);"
                    class="bg-dark border border-border-dark rounded px-3 py-2 text-text-light text-[12px] font-body leading-relaxed resize-none outline-none focus:border-pink w-full"
                >${msg}</textarea>
                <button type="button" id="copyMsgBtn" onclick="copyInquiryMsg(this)"
                    class="btn-primary block text-center w-full">Copy Message</button>
                <a href="https://www.facebook.com/alvin.galvez.686004" target="_blank" rel="noopener"
                    class="btn-ghost block text-center w-full">Open Facebook</a>
                <button type="button" id="sendAnotherBtn" class="text-[12px] text-muted underline text-center">Send Another</button>
            </div>
        `;
        document.getElementById('sendAnotherBtn').addEventListener('click', resetContactForm);
    });
}

function resetContactForm() {
    const grid = document.querySelector('#contact .grid');
    if (!grid) return;
    const last = grid.lastElementChild;
    if (!last) return;
    last.outerHTML = `<form class="contact-form flex flex-col gap-3" novalidate>
        <input type="text" placeholder="Your Name">
        <input type="text" placeholder="Phone Number">
        <textarea placeholder="What part are you looking for?" rows="4"></textarea>
        <button type="submit" class="btn-primary">Send Inquiry</button>
    </form>`;
    initContactForm();
}

initContactForm();
