document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Styles for the Toast notification and visual feedback
    const style = document.createElement('style');
    style.innerHTML = `
        .custom-toast {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #ffffff;
            color: #0f172a;
            box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 8px -1px rgba(0, 0, 0, 0.02);
            padding: 12px 18px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            transform: translateY(20px) scale(0.98);
            opacity: 0;
            pointer-events: none;
            transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: 'Inter', sans-serif;
            max-width: 360px;
            border: 1px solid #e2e8f0;
        }
        .custom-toast.show {
            transform: translateY(0) scale(1);
            opacity: 1;
            pointer-events: auto;
        }
        .custom-toast .toast-icon {
            font-size: 20px;
            user-select: none;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .custom-toast .toast-content {
            flex: 1;
        }
        .custom-toast .toast-title {
            font-weight: 600;
            font-size: 13px;
            color: #0f172a;
        }
        .custom-toast .toast-desc {
            font-size: 11px;
            color: #64748b;
            line-height: 1.4;
            margin-top: 1px;
        }
        .custom-toast .toast-close {
            cursor: pointer;
            color: #94a3b8;
            font-size: 16px;
            margin-left: 6px;
            transition: color 0.15s;
        }
        .custom-toast .toast-close:hover {
            color: #475569;
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
            toast.style.borderColor = '#bbf7d0';
            iconEl.textContent = 'check_circle';
            iconEl.style.color = '#10b981';
        } else if (type === 'warning') {
            toast.style.borderColor = '#fef08a';
            iconEl.textContent = 'warning';
            iconEl.style.color = '#d97706';
        } else if (type === 'error') {
            toast.style.borderColor = '#fecaca';
            iconEl.textContent = 'error';
            iconEl.style.color = '#ef4444';
        } else {
            toast.style.borderColor = '#e2e8f0';
            iconEl.textContent = 'info';
            iconEl.style.color = '#3b82f6';
        }
        
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    // 3. Inject Modal Styles and Markup dynamically
    const modalStyle = document.createElement('style');
    modalStyle.innerHTML = `
        .custom-modal-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(4px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease;
            font-family: 'Inter', sans-serif;
        }
        .custom-modal-backdrop.show {
            opacity: 1;
            pointer-events: auto;
        }
        .custom-modal-card {
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #f1f5f9;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            max-width: 440px;
            width: 100%;
            padding: 24px;
            transform: scale(0.95);
            transition: transform 0.2s ease;
        }
        .custom-modal-backdrop.show .custom-modal-card {
            transform: scale(1);
        }
    `;
    document.head.appendChild(modalStyle);

    const modalDiv = document.createElement('div');
    modalDiv.className = 'custom-modal-backdrop';
    modalDiv.id = 'global-modal-backdrop';
    modalDiv.innerHTML = `
        <div class="custom-modal-card">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                <h3 class="font-bold text-slate-900 text-sm" id="global-modal-title">Yeni Kayıt Ekle</h3>
                <span class="material-symbols-outlined text-slate-400 hover:text-slate-600 cursor-pointer text-lg" id="global-modal-close">close</span>
            </div>
            <form id="global-modal-form" class="space-y-4">
                <div id="global-modal-fields" class="space-y-3">
                    <!-- Dynamic fields -->
                </div>
                <div class="flex justify-end gap-2 pt-3 border-t border-slate-100">
                    <button type="button" id="global-modal-cancel" class="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">İptal</button>
                    <button type="submit" class="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors">Kaydet</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modalDiv);

    const closeModal = () => {
        modalDiv.classList.remove('show');
    };
    document.getElementById('global-modal-close').addEventListener('click', closeModal);
    document.getElementById('global-modal-cancel').addEventListener('click', closeModal);

    window.openGlobalModal = (title, fields, onSubmit) => {
        document.getElementById('global-modal-title').textContent = title;
        const fieldsContainer = document.getElementById('global-modal-fields');
        fieldsContainer.innerHTML = '';

        fields.forEach(field => {
            const div = document.createElement('div');
            div.className = 'space-y-1.5';
            
            const label = document.createElement('label');
            label.className = 'block text-[11px] font-bold text-slate-500 uppercase tracking-wider';
            label.textContent = field.label;
            div.appendChild(label);

            if (field.type === 'select') {
                const select = document.createElement('select');
                select.name = field.name;
                select.className = 'w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400 transition-colors';
                field.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt;
                    option.textContent = opt;
                    select.appendChild(option);
                });
                div.appendChild(select);
            } else {
                const input = document.createElement('input');
                input.type = field.type || 'text';
                input.name = field.name;
                input.placeholder = field.placeholder || '';
                input.required = field.required !== false;
                input.className = 'w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400 transition-colors';
                div.appendChild(input);
            }
            fieldsContainer.appendChild(div);
        });

        const form = document.getElementById('global-modal-form');
        form.onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            onSubmit(data);
            closeModal();
        };

        modalDiv.classList.add('show');
    };

    // Page Specific Modal Trigger Functions
    function openPersonnelModal() {
        const fields = [
            { label: 'Ad Soyad', name: 'name', type: 'text', placeholder: 'örn: Merve Yılmaz' },
            { label: 'E-posta', name: 'email', type: 'email', placeholder: 'örn: merve.yilmaz@erp.com' },
            { label: 'Departman', name: 'dept', type: 'select', options: ['TEKNOLOJİ', 'FİNANS', 'ÜRETİM', 'İNSAN KAYNAKLARI'] },
            { label: 'Rol', name: 'role', type: 'text', placeholder: 'örn: Frontend Developer' },
            { label: 'Başlangıç Tarihi', name: 'date', type: 'date' },
            { label: 'Durum', name: 'status', type: 'select', options: ['Aktif', 'İzinli', 'Ayrıldı'] }
        ];

        window.openGlobalModal('Yeni Personel Kaydı', fields, (data) => {
            const tbody = document.querySelector('tbody');
            if (!tbody) return;

            const tr = document.createElement('tr');
            tr.className = 'group hover:bg-surface-container-low cursor-pointer transition-colors';
            
            tr.setAttribute('data-name', data.name);
            tr.setAttribute('data-email', data.email);
            tr.setAttribute('data-phone', '+90 (555) 000 00 00');
            tr.setAttribute('data-location', 'İstanbul, TR');
            tr.setAttribute('data-role', data.role);
            tr.setAttribute('data-dept', data.dept);
            tr.setAttribute('data-perf', '9.0');
            tr.setAttribute('data-leave-left', '15');
            tr.setAttribute('data-leave-used', '5');
            tr.setAttribute('data-img', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOBbpaEo5m7ZdiEHPBcD1qvEQfP5MtVKVZ3WJZKLmiozMaFKQl3wy57j-Xc5us8yPEBNw9ddNTBH7GS8x5NtGG8dacHEKqs4MGQ4asyzTRqmu4T81BQTrsP5PEndE626Qu-z84Msd0dk0CkUtrsCKXvK1xIwf0t4g78aLbuVXJsfrpWyp_u-kxLobQwgq6dbnDCCgrx897gZLLDACkIC5JQHF0whz8qSP12nnsfLDq_e-4nD0fkvm00kekkoyk_DWkY5SlY_K1sw');

            const initials = data.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().substring(0,2);
            const statusClass = data.status === 'Aktif' ? 'bg-surface-container-highest text-secondary' : 
                               (data.status === 'İzinli' ? 'bg-error-container text-on-error-container' : 'bg-outline-variant text-secondary');

            tr.innerHTML = `
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold overflow-hidden">
                            <span>${initials}</span>
                        </div>
                        <div>
                            <p class="font-body-md font-bold text-primary">${data.name}</p>
                            <p class="text-xs text-on-surface-variant">${data.email}</p>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4"><span class="text-body-md text-on-surface">${data.dept}</span></td>
                <td class="px-6 py-4"><span class="text-body-md text-on-surface">${data.role}</span></td>
                <td class="px-6 py-4"><span class="font-mono-data text-mono-data text-on-surface-variant">${data.date}</span></td>
                <td class="px-6 py-4 text-right">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}">${data.status}</span>
                </td>
            `;

            tr.addEventListener('click', () => {
                document.querySelectorAll('tbody tr').forEach(r => r.classList.remove('bg-secondary-container/10'));
                tr.classList.add('bg-secondary-container/10');
                
                document.getElementById('detail-name').innerText = data.name;
                document.getElementById('detail-email').innerText = data.email;
                document.getElementById('detail-phone').innerText = '+90 (555) 000 00 00';
                document.getElementById('detail-location').innerText = 'İstanbul, TR';
                document.getElementById('detail-role').innerText = data.role;
                document.getElementById('detail-dept').innerText = data.dept;
                document.getElementById('detail-perf-text').innerText = '9.0 / 10';
                document.getElementById('detail-perf-bar').style.width = '90%';
                document.getElementById('detail-leave-left').innerText = '15 Gün';
                document.getElementById('detail-leave-used').innerText = '5 Gün';
                document.getElementById('detail-img').src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOBbpaEo5m7ZdiEHPBcD1qvEQfP5MtVKVZ3WJZKLmiozMaFKQl3wy57j-Xc5us8yPEBNw9ddNTBH7GS8x5NtGG8dacHEKqs4MGQ4asyzTRqmu4T81BQTrsP5PEndE626Qu-z84Msd0dk0CkUtrsCKXvK1xIwf0t4g78aLbuVXJsfrpWyp_u-kxLobQwgq6dbnDCCgrx897gZLLDACkIC5JQHF0whz8qSP12nnsfLDq_e-4nD0fkvm00kekkoyk_DWkY5SlY_K1sw';
            });

            tbody.prepend(tr);
            tr.click();
            showToast('Kayıt Başarılı', `${data.name} personeli başarıyla sisteme eklendi.`, 'success');
        });
    }

    function openCrmModal() {
        const fields = [
            { label: 'Şirket Ünvanı / Müşteri Adı', name: 'company_name', type: 'text', placeholder: 'örn: Aslan Teknoloji A.Ş.' },
            { label: 'Adres', name: 'address', type: 'text', placeholder: 'örn: Atatürk Mah. Başakşehir/İstanbul' },
            { label: 'Sabit Telefon', name: 'phone', type: 'text', placeholder: 'örn: 0212 555 00 11' },
            { label: 'Vergi Dairesi', name: 'tax_office', type: 'text', placeholder: 'örn: İkitelli Vergi Dairesi' },
            { label: 'Vergi Numarası', name: 'tax_number', type: 'text', placeholder: 'örn: 1234567890' },
            { label: 'Müşteri Yetkilisi (Ad Soyad)', name: 'authorized_person', type: 'text', placeholder: 'örn: Ahmet Yılmaz' },
            { label: 'Yetkili Cep / İrtibat', name: 'contact_phone', type: 'text', placeholder: 'örn: 0532 111 22 33' },
            { label: 'Güncel Bakiye', name: 'balance', type: 'text', placeholder: 'örn: 42.500,00 TL' },
            { label: 'Bakiye Türü', name: 'status', type: 'select', options: ['Alacaklı', 'Borçlu'] }
        ];

        window.openGlobalModal('Yeni Müşteri Ekle', fields, (data) => {
            const listContainer = document.querySelector('.w-1\\/3 .custom-scrollbar') || document.querySelector('.custom-scrollbar') || document.querySelector('nav').nextElementSibling;
            if (!listContainer) return;

            const card = document.createElement('div');
            card.className = 'group p-4 border-b border-outline-variant hover:bg-surface-container-low cursor-pointer transition-all relative overflow-hidden bg-surface-container-lowest';
            
            const badgeClass = data.status === 'Alacaklı' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800';

            card.innerHTML = `
                <div class="flex items-start justify-between gap-3 mb-1">
                    <span class="font-bold text-xs text-slate-800 truncate">${data.company_name}</span>
                    <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeClass}">${data.status}</span>
                </div>
                <div class="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span>Bakiye: ${data.balance}</span>
                    <span>%50 Dolu</span>
                </div>
            `;

            card.addEventListener('click', () => {
                selectCustomer(
                    data.company_name, 
                    data.balance, 
                    '50', 
                    data.status, 
                    data.address, 
                    data.phone, 
                    data.tax_office, 
                    data.tax_number, 
                    data.authorized_person, 
                    data.contact_phone
                );
                document.querySelectorAll('.w-1\\/3 .custom-scrollbar > div, .custom-scrollbar > div').forEach(c => c.classList.remove('bg-surface-container-low'));
                card.classList.add('bg-surface-container-low');
            });

            listContainer.prepend(card);
            card.click();
            showToast('Müşteri Eklendi', `${data.company_name} başarıyla yeni cari olarak eklendi.`, 'success');
        });
    }

    function openBulkCrmModal() {
        document.getElementById('global-modal-title').textContent = 'Toplu Müşteri Girişi';
        const fieldsContainer = document.getElementById('global-modal-fields');
        fieldsContainer.innerHTML = `
            <div class="space-y-1.5">
                <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Toplu Müşteri Listesi (CSV / Metin formatında)</label>
                <div class="text-[10px] text-slate-400 mb-1 leading-normal font-sans">
                    Format: <b>Müşteri Adı, Adres, Sabit Tel, Vergi Dairesi, Vergi No, Yetkili Kişi, Yetkili Cep, Bakiye, Bakiye Türü</b><br>
                    Her satıra bir kayıt gelecek şekilde yazınız. Örn:<br>
                    <i>Aslan Teknoloji A.Ş., Atatürk Mah. Başakşehir/İstanbul, 0212 555 00 11, İkitelli V.D., 1234567890, Ahmet Yılmaz, 0532 111 22 33, 42.500,00 TL, Alacaklı</i>
                </div>
                <textarea name="bulk_data" rows="6" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400 transition-colors font-mono" placeholder="Aslan Teknoloji A.Ş., Atatürk Mah. Başakşehir/İstanbul, 0212 555 00 11, İkitelli V.D., 1234567890, Ahmet Yılmaz, 0532 111 22 33, 42.500,00 TL, Alacaklı" required></textarea>
            </div>
        `;

        const form = document.getElementById('global-modal-form');
        form.onsubmit = (e) => {
            e.preventDefault();
            const bulkText = form.querySelector('textarea[name="bulk_data"]').value;
            const lines = bulkText.split('\n');
            let addedCount = 0;
            const listContainer = document.querySelector('.w-1\\/3 .custom-scrollbar') || document.querySelector('.custom-scrollbar') || document.querySelector('nav').nextElementSibling;

            lines.forEach(line => {
                const parts = line.split(',');
                if (parts.length >= 9) {
                    const company_name = parts[0].trim();
                    const address = parts[1].trim();
                    const phone = parts[2].trim();
                    const tax_office = parts[3].trim();
                    const tax_number = parts[4].trim();
                    const authorized_person = parts[5].trim();
                    const contact_phone = parts[6].trim();
                    const balance = parts[7].trim();
                    const status = parts[8].trim();

                    if (company_name && balance) {
                        const card = document.createElement('div');
                        card.className = 'group p-4 border-b border-outline-variant hover:bg-surface-container-low cursor-pointer transition-all relative overflow-hidden bg-surface-container-lowest';
                        
                        const badgeClass = status === 'Alacaklı' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800';

                        card.innerHTML = `
                            <div class="flex items-start justify-between gap-3 mb-1">
                                <span class="font-bold text-xs text-slate-800 truncate">${company_name}</span>
                                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded ${badgeClass}">${status}</span>
                            </div>
                            <div class="flex items-center justify-between text-xs text-slate-500 font-mono">
                                <span>Bakiye: ${balance}</span>
                                <span>%50 Dolu</span>
                            </div>
                        `;

                        card.addEventListener('click', () => {
                            selectCustomer(
                                company_name, 
                                balance, 
                                '50', 
                                status, 
                                address, 
                                phone, 
                                tax_office, 
                                tax_number, 
                                authorized_person, 
                                contact_phone
                            );
                            document.querySelectorAll('.w-1\\/3 .custom-scrollbar > div, .custom-scrollbar > div').forEach(c => c.classList.remove('bg-surface-container-low'));
                            card.classList.add('bg-surface-container-low');
                        });

                        if (listContainer) {
                            listContainer.prepend(card);
                            if (addedCount === 0) {
                                card.click();
                            }
                            addedCount++;
                        }
                    }
                }
            });

            closeModal();
            if (addedCount > 0) {
                showToast('Toplu Kayıt Başarılı', `${addedCount} adet yeni müşteri başarıyla sisteme eklendi.`, 'success');
            } else {
                showToast('Hata', 'Geçerli formatta müşteri bilgisi bulunamadı.', 'error');
            }
        };

        const modalDiv = document.getElementById('global-modal-backdrop');
        modalDiv.classList.add('show');
    }

    function openAccountingModal() {
        const fields = [
            { label: 'İşlem Tarihi', name: 'date', type: 'date' },
            { label: 'Müşteri / Cari', name: 'company', type: 'text', placeholder: 'örn: Ensar Profil A.Ş. veya Amazon Web Services' },
            { label: 'Kategori', name: 'category', type: 'select', options: ['SATIŞ', 'KİRA', 'MAAŞ', 'VERGİ', 'BİLİŞİM', 'DİĞER'] },
            { label: 'Açıklama', name: 'desc', type: 'text', placeholder: 'örn: Web Hizmetleri Ödemesi' },
            { label: 'Evrak No / Kod', name: 'doc', type: 'text', placeholder: 'örn: INV-202601' },
            { label: 'Tutar', name: 'amount', type: 'text', placeholder: '₺10.000,00' },
            { label: 'İşlem Tipi', name: 'type', type: 'select', options: ['Gelir (+)', 'Gider (-)'] },
            { label: 'Durum', name: 'status', type: 'select', options: ['Tamamlandı', 'Ödendi', 'Beklemede', 'İşlendi'] }
        ];

        window.openGlobalModal('Yeni Fiş / Fatura Girişi', fields, (data) => {
            const tbody = document.querySelector('tbody');
            if (!tbody) return;

            const tr = document.createElement('tr');
            tr.className = 'hover:bg-surface-container-low transition-colors group';

            const sign = data.type === 'Gelir (+)' ? '+' : '-';
            const colorClass = data.type === 'Gelir (+)' ? 'text-emerald-700' : 'text-red-700';
            const statusColor = data.status === 'Beklemede' ? 'text-amber-600' : 'text-emerald-600';
            const statusDot = data.status === 'Beklemede' ? 'bg-amber-600' : 'bg-emerald-600';

            tr.innerHTML = `
                <td class="px-6 py-4 border-b border-outline-variant">
                    <div class="font-bold text-on-surface">${data.desc}</div>
                    <div class="text-xs text-on-surface-variant">${data.date} • ${data.doc}</div>
                </td>
                <td class="px-6 py-4 border-b border-outline-variant font-semibold text-primary">
                    ${data.company}
                </td>
                <td class="px-6 py-4 border-b border-outline-variant">
                    <span class="px-2 py-1 bg-surface-container-highest text-primary text-[10px] rounded font-bold uppercase tracking-tighter">${data.category}</span>
                </td>
                <td class="px-6 py-4 border-b border-outline-variant">
                    <span class="flex items-center gap-1.5 ${statusColor} font-bold">
                        <span class="w-1.5 h-1.5 rounded-full ${statusDot}"></span> ${data.status}
                    </span>
                </td>
                <td class="px-6 py-4 border-b border-outline-variant text-right font-mono-data text-mono-data font-bold ${colorClass}">
                    ${sign} ${data.amount}
                </td>
                <td class="px-6 py-4 border-b border-outline-variant text-right">
                    <button class="p-2 opacity-0 group-hover:opacity-100 hover:bg-surface-container-high rounded transition-all">
                        <span class="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                </td>
            `;

            tbody.prepend(tr);
            showToast('İşlem Eklendi', `"${data.desc}" işlemi ${data.company} cari hesabına kaydedildi.`, 'success');
        });
    }

    function openBulkAccountingModal() {
        document.getElementById('global-modal-title').textContent = 'Toplu Fiş / Fatura Girişi';
        const fieldsContainer = document.getElementById('global-modal-fields');
        fieldsContainer.innerHTML = `
            <div class="space-y-1.5">
                <label class="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">Toplu Fatura Listesi (CSV / Metin formatında)</label>
                <div class="text-[10px] text-slate-400 mb-1 leading-normal font-sans">
                    Format: <b>Açıklama, Müşteri/Cari, Kategori, Evrak No, Tutar, Gelir/Gider (Gelir veya Gider)</b><br>
                    Her satıra bir kayıt gelecek şekilde yazınız. Örn:<br>
                    <i>Yazılım Hizmet Bedeli, Ensar Profil A.Ş., SATIŞ, INV-2024, 25.000 TL, Gelir<br>
                    Ofis Kırtasiye Gideri, Nezih Kırtasiye, OFİS, EXP-55, 1.200 TL, Gider</i>
                </div>
                <textarea name="bulk_data" rows="6" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-slate-400 transition-colors font-mono" placeholder="Yazılım Hizmet Bedeli, Ensar Profil A.Ş., SATIŞ, INV-2024, 25.000 TL, Gelir&#10;Ofis Kırtasiye Gideri, Nezih Kırtasiye, OFİS, EXP-55, 1.200 TL, Gider" required></textarea>
            </div>
        `;

        const form = document.getElementById('global-modal-form');
        form.onsubmit = (e) => {
            e.preventDefault();
            const bulkText = form.querySelector('textarea[name="bulk_data"]').value;
            const lines = bulkText.split('\\n');
            let addedCount = 0;
            const tbody = document.querySelector('tbody');
            if (!tbody) return;

            lines.forEach(line => {
                const parts = line.split(',');
                if (parts.length >= 6) {
                    const desc = parts[0].trim();
                    const company = parts[1].trim();
                    const category = parts[2].trim();
                    const doc = parts[3].trim();
                    const amount = parts[4].trim();
                    const type = parts[5].trim();

                    if (desc && company && amount) {
                        const tr = document.createElement('tr');
                        tr.className = 'hover:bg-surface-container-low transition-colors group';

                        const sign = type === 'Gelir' ? '+' : '-';
                        const colorClass = type === 'Gelir' ? 'text-emerald-700' : 'text-red-700';

                        tr.innerHTML = `
                            <td class="px-6 py-4 border-b border-outline-variant">
                                <div class="font-bold text-on-surface">${desc}</div>
                                <div class="text-xs text-on-surface-variant">01.07.2026 • ${doc}</div>
                            </td>
                            <td class="px-6 py-4 border-b border-outline-variant font-semibold text-primary">
                                ${company}
                            </td>
                            <td class="px-6 py-4 border-b border-outline-variant">
                                <span class="px-2 py-1 bg-surface-container-highest text-primary text-[10px] rounded font-bold uppercase tracking-tighter">${category}</span>
                            </td>
                            <td class="px-6 py-4 border-b border-outline-variant">
                                <span class="flex items-center gap-1.5 text-emerald-600 font-bold">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Tamamlandı
                                </span>
                            </td>
                            <td class="px-6 py-4 border-b border-outline-variant text-right font-mono-data text-mono-data font-bold ${colorClass}">
                                ${sign} ₺${amount}
                            </td>
                            <td class="px-6 py-4 border-b border-outline-variant text-right">
                                <button class="p-2 opacity-0 group-hover:opacity-100 hover:bg-surface-container-high rounded transition-all">
                                    <span class="material-symbols-outlined text-[20px]">more_vert</span>
                                </button>
                            </td>
                        `;

                        tbody.prepend(tr);
                        addedCount++;
                    }
                }
            });

            closeModal();
            if (addedCount > 0) {
                showToast('Toplu Giriş Başarılı', `${addedCount} adet yeni fatura/işlem başarıyla eklendi.`, 'success');
            } else {
                showToast('Hata', 'Geçerli formatta işlem bilgisi bulunamadı.', 'error');
            }
        };

        const modalDiv = document.getElementById('global-modal-backdrop');
        modalDiv.classList.add('show');
    }

    function openInventoryModal() {
        const fields = [
            { label: 'Ürün Kodu', name: 'code', type: 'text', placeholder: 'örn: PRO-X2-550' },
            { label: 'Ürün Adı', name: 'name', type: 'text', placeholder: 'örn: Asus ROG Keyboard' },
            { label: 'Kategori', name: 'category', type: 'text', placeholder: 'örn: Çevre Birimleri' },
            { label: 'Stok Miktarı', name: 'stock', type: 'number', placeholder: '15' },
            { label: 'Birim Fiyat', name: 'price', type: 'text', placeholder: '₺4.500,00' },
            { label: 'Durum', name: 'status', type: 'select', options: ['NORMAL', 'KRİTİK'] }
        ];

        window.openGlobalModal('Yeni Ürün Ekle', fields, (data) => {
            const tbody = document.querySelector('tbody');
            if (!tbody) return;

            const tr = document.createElement('tr');
            tr.className = 'hover:bg-surface-container-lowest transition-colors group';

            const statusClass = data.status === 'NORMAL' ? 'bg-success-container text-success' : 'bg-error-container text-error';

            tr.innerHTML = `
                <td class="px-6 py-3 font-mono-data text-primary font-semibold">${data.code}</td>
                <td class="px-6 py-3 font-body-md text-on-surface font-semibold">${data.name}</td>
                <td class="px-6 py-3 font-body-md text-on-surface-variant">${data.category}</td>
                <td class="px-6 py-3 font-mono-data text-on-surface">${data.stock} Adet</td>
                <td class="px-6 py-3 font-mono-data text-on-surface">${data.price}</td>
                <td class="px-6 py-3 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusClass} uppercase">${data.status}</span>
                </td>
                <td class="px-6 py-3 text-right">
                    <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-1.5 text-secondary hover:bg-secondary-fixed rounded transition-colors" title="Düzenle">
                            <span class="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button class="p-1.5 text-primary hover:bg-primary-fixed rounded transition-colors" title="Detay">
                            <span class="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
                    </div>
                </td>
            `;

            tbody.prepend(tr);
            showToast('Ürün Ekleme Başarılı', `${data.name} ürünü stok listesine eklendi.`, 'success');
        });
    }

    function openInvoiceModal() {
        const fields = [
            { label: 'Fatura Tarihi', name: 'date', type: 'date' },
            { label: 'Fatura Tipi', name: 'type', type: 'select', options: ['SATIŞ FATURASI', 'ALIŞ FATURASI', 'İADE FATURASI'] },
            { label: 'Açıklama', name: 'desc', type: 'text', placeholder: 'örn: Sunucu Gideri' },
            { label: 'Evrak No', name: 'doc', type: 'text', placeholder: 'örn: FT-202600010' },
            { label: 'Tutar', name: 'amount', type: 'text', placeholder: '15.400,00 TL' },
            { label: 'Durum', name: 'status', type: 'select', options: ['Ödendi', 'Beklemede'] }
        ];

        window.openGlobalModal('Yeni Fatura Girişi', fields, (data) => {
            const tbody = document.querySelector('tbody');
            if (!tbody) return;

            const tr = document.createElement('tr');
            tr.className = 'border-b border-outline-variant hover:bg-surface-container-low transition-colors';

            const typeBadge = data.type === 'SATIŞ FATURASI' ? 'bg-surface-container-high text-primary' : 
                             (data.type === 'ALIŞ FATURASI' ? 'bg-indigo-100 text-indigo-800' : 'bg-error-container text-on-error-container');
            const statusIcon = data.status === 'Ödendi' ? 'check_circle' : 'schedule';
            const iconColor = data.status === 'Ödendi' ? 'text-emerald-600' : 'text-on-surface-variant';

            tr.innerHTML = `
                <td class="p-4 font-mono-data">${data.date}</td>
                <td class="p-4"><span class="px-2 py-1 ${typeBadge} rounded-md font-bold text-[10px] uppercase">${data.type}</span></td>
                <td class="p-4">${data.desc}</td>
                <td class="p-4 font-mono-data">${data.doc}</td>
                <td class="p-4 text-right font-bold">${data.amount}</td>
                <td class="p-4 text-right"><span class="material-symbols-outlined ${iconColor}">${statusIcon}</span></td>
            `;

            tbody.prepend(tr);
            showToast('Fatura Kaydedildi', `${data.doc} numaralı fatura sisteme eklendi.`, 'success');
        });
    }

    function openOperationsModal() {
        const fields = [
            { label: 'İş / Görev Tanımı', name: 'title', type: 'text', placeholder: 'örn: Veritabanı Yedeklemesi' },
            { label: 'Sorumlu Personel', name: 'owner', type: 'text', placeholder: 'örn: Caner Demir' },
            { label: 'Bitiş Tarihi', name: 'date', type: 'date' },
            { label: 'Durum / Statü', name: 'status', type: 'select', options: ['Bekliyor', 'Devam Ediyor', 'Tamamlandı'] }
        ];

        window.openGlobalModal('Yeni Görev Ata', fields, (data) => {
            const tbody = document.querySelector('tbody');
            if (!tbody) return;

            const tr = document.createElement('tr');
            tr.className = 'border-b border-outline-variant hover:bg-surface-container-low transition-colors';

            const statusClass = data.status === 'Tamamlandı' ? 'bg-success-container text-success' : 
                               (data.status === 'Devam Ediyor' ? 'bg-warning-container text-warning' : 'bg-outline-variant text-secondary');

            tr.innerHTML = `
                <td class="p-4 font-bold text-primary">${data.title}</td>
                <td class="p-4 text-on-surface-variant">${data.owner}</td>
                <td class="p-4 font-mono-data text-body-sm">${data.date}</td>
                <td class="p-4 text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}">${data.status}</span>
                </td>
            `;

            tbody.prepend(tr);
            showToast('Görev Atandı', `"${data.title}" görevi ${data.owner} personeline atandı.`, 'success');
        });
    }

    // 4. Click Event Interceptor
    document.body.addEventListener('click', (e) => {
        // Resolve closest button or anchor link
        const clickable = e.target.closest('button, a');
        if (!clickable) return;

        // Skip buttons inside global modal container to let normal event bindings flow
        if (clickable.closest('#global-modal-backdrop')) return;

        // Check if it is a custom dynamic modal trigger
        const text = clickable.textContent.toLowerCase().trim();
        const path = window.location.pathname;

        if (text.includes('yeni') || text.includes('ekle') || text.includes('ata') || text.includes('personel kaydı') || text.includes('müşteri ekle') || text.includes('toplu') || text.includes('fatura') || text.includes('giriş')) {
            if (text.includes('toplu') && path.includes('m_teriler_crm_mod_l')) {
                e.preventDefault();
                openBulkCrmModal();
                return;
            } else if (text.includes('toplu') && path.includes('muhasebe_finansal_zet')) {
                e.preventDefault();
                openBulkAccountingModal();
                return;
            } else if (path.includes('muhasebe_finansal_zet') && (text.includes('yeni fatura') || text.includes('fatura') || text.includes('giriş'))) {
                e.preventDefault();
                openAccountingModal();
                return;
            } else if (path.includes('personel_y_netimi')) {
                e.preventDefault();
                openPersonnelModal();
                return;
            } else if (path.includes('m_teriler_crm_mod_l')) {
                e.preventDefault();
                openCrmModal();
                return;
            } else if (path.includes('envanter_y_netimi')) {
                e.preventDefault();
                openInventoryModal();
                return;
            } else if (path.includes('fatura_ve_entegrasyon_y_netimi') || path.includes('fiyatland_rma_ve_deme_y_netimi') || path.includes('finansal_raporlar')) {
                e.preventDefault();
                openInvoiceModal();
                return;
            } else if (path.includes('operasyon_i_takibi')) {
                e.preventDefault();
                openOperationsModal();
                return;
            }
        }

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
            clickable.className.includes('tab-button') ||
            clickable.className.includes('tab-btn')) {
            return;
        }

        // Prevent default navigation / submission
        e.preventDefault();

        // Parse human-readable text labels from buttons/links
        let label = '';
        let tempEl = clickable.cloneNode(true);
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
