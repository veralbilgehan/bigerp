document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Styles for the Toast notification and visual feedback
    const style = document.createElement('style');
    style.innerHTML = `
        .custom-toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #ffffff;
            color: #0b1c30;
            border-left: 4px solid #1960a3;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            padding: 16px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 10000;
            transform: translateY(100px) scale(0.9);
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            font-family: 'Inter', sans-serif;
            max-width: 380px;
            border: 1px solid #e5eeff;
        }
        .custom-toast.show {
            transform: translateY(0) scale(1);
            opacity: 1;
            pointer-events: auto;
        }
        .custom-toast .toast-icon {
            font-size: 24px;
            user-select: none;
        }
        .custom-toast .toast-content {
            flex: 1;
        }
        .custom-toast .toast-title {
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 2px;
            color: #1a365d;
        }
        .custom-toast .toast-desc {
            font-size: 12px;
            color: #43474e;
            line-height: 1.4;
        }
        .custom-toast .toast-close {
            cursor: pointer;
            color: #74777f;
            font-size: 18px;
            margin-left: 8px;
            transition: color 0.15s;
        }
        .custom-toast .toast-close:hover {
            color: #1a365d;
        }
    `;
    document.head.appendChild(style);

    // 2. Create and inject the Toast element
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.innerHTML = `
        <span class="material-symbols-outlined toast-icon">info</span>
        <div class="toast-content">
            <div class="toast-title" id="toast-title">İşlem Başarılı</div>
            <div class="toast-desc" id="toast-desc">Simüle edilmiş eylem başarıyla tetiklendi.</div>
        </div>
        <span class="material-symbols-outlined toast-close" id="toast-close">close</span>
    `;
    document.body.appendChild(toast);

    document.getElementById('toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
    });

    let toastTimeout;
    window.showToast = (title, desc, type = 'info') => {
        const titleEl = document.getElementById('toast-title');
        const descEl = document.getElementById('toast-desc');
        const iconEl = toast.querySelector('.toast-icon');
        
        titleEl.textContent = title;
        descEl.textContent = desc;
        
        if (type === 'success') {
            toast.style.borderLeftColor = '#10b981';
            iconEl.textContent = 'check_circle';
            iconEl.style.color = '#10b981';
        } else if (type === 'warning') {
            toast.style.borderLeftColor = '#f59e0b';
            iconEl.textContent = 'warning';
            iconEl.style.color = '#f59e0b';
        } else if (type === 'error') {
            toast.style.borderLeftColor = '#ba1a1a';
            iconEl.textContent = 'error';
            iconEl.style.color = '#ba1a1a';
        } else {
            toast.style.borderLeftColor = '#1960a3';
            iconEl.textContent = 'info';
            iconEl.style.color = '#1960a3';
        }
        
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    // 3. Click Event Interceptor
    document.body.addEventListener('click', (e) => {
        // Resolve closest button or anchor link
        const clickable = e.target.closest('button, a');
        if (!clickable) return;

        // Skip standard external/internal routing links
        const href = clickable.getAttribute('href');
        if (clickable.tagName === 'A' && href && href !== '#' && !href.startsWith('javascript:')) {
            return;
        }

        // Skip buttons that are accordions, tabs, etc.
        if (clickable.hasAttribute('onclick') || 
            clickable.getAttribute('role') === 'tab' || 
            clickable.className.includes('accordion') || 
            clickable.id.includes('icon') || 
            clickable.id.includes('content') ||
            clickable.className.includes('tab-button')) {
            return;
        }

        // Prevent default navigation / submission
        e.preventDefault();

        // Parse human-readable text labels from buttons/links
        let label = '';
        const iconElement = clickable.querySelector('.material-symbols-outlined');
        let tempEl = clickable.cloneNode(true);
        // Remove icon text to avoid it in the label
        if (tempEl.querySelector('.material-symbols-outlined')) {
            tempEl.querySelector('.material-symbols-outlined').remove();
        }
        label = tempEl.textContent.trim().replace(/[\s\r\n\t]+/g, ' ');
        if (!label && clickable.getAttribute('title')) {
            label = clickable.getAttribute('title');
        }
        if (!label) {
            label = clickable.getAttribute('aria-label') || 'Buton';
        }

        // Standardized messages for common action patterns
        let title = label;
        let desc = `"${label}" eylemi başarıyla simüle edildi. Modül aktif ve çalışır durumdadır.`;
        let type = 'success';

        if (label.toLowerCase().includes('ara') || label.toLowerCase().includes('search')) {
            title = 'Arama Yapıldı';
            desc = 'Arama kriterlerine göre sonuçlar başarıyla filtrelendi.';
        } else if (label.toLowerCase().includes('yeni') || label.toLowerCase().includes('ekle') || label.toLowerCase().includes('add') || label.toLowerCase().includes('create')) {
            title = 'Yeni Kayıt Formu';
            desc = `"${label}" formu açılıyor. Gerekli alanları doldurarak yeni kayıt oluşturabilirsiniz.`;
        } else if (label.toLowerCase().includes('ayarlar') || label.toLowerCase().includes('settings')) {
            title = 'Modül Ayarları';
            desc = 'Sistem ayarları yükleniyor. Tercihlerinizi bu panelden güncelleyebilirsiniz.';
            type = 'info';
        } else if (label.toLowerCase().includes('destek') || label.toLowerCase().includes('support') || label.toLowerCase().includes('yardım')) {
            title = 'Destek Talebi';
            desc = 'Destek merkezi ile bağlantı kuruluyor. Canlı sohbet başlatıldı.';
            type = 'info';
        } else if (label.toLowerCase().includes('çıkış') || label.toLowerCase().includes('logout') || label.toLowerCase().includes('sign out')) {
            title = 'Oturum Kapatma';
            desc = 'Güvenli çıkış işlemi başlatıldı. Oturumunuz sonlandırılıyor.';
            type = 'warning';
        }

        showToast(title, desc, type);
    });
});
