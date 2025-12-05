document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.querySelector('#viewer');
    const poster = document.querySelector('.poster-instructions');
    const okButton = document.querySelector('#instructions-ok-button');
    const shareButton = document.querySelector('#share-button');
    const infoButton = document.querySelector('#info-button');
    const infoPanel = document.querySelector('#info-panel');
    const infoPanelCloseButton = document.querySelector('#info-panel-close-button');

    // --- شريط التحميل من المشروع الأول ---
    const onProgress = (event) => {
        const progressBar = viewer.querySelector('.progress-bar');
        const updatingBar = viewer.querySelector('.update-bar');

        updatingBar.style.width = `${event.detail.totalProgress * 100}%`;

        if (event.detail.totalProgress === 1) {
            progressBar.classList.add('hide');
            viewer.removeEventListener('progress', onProgress);
        } else {
            progressBar.classList.remove('hide');
        }
    };
    viewer.addEventListener('progress', onProgress);

    // 1. إخفاء شاشة التعليمات عند الضغط على "موافق"
    okButton.addEventListener('click', () => {
        poster.classList.add('hide');
        infoPanel.classList.add('show');
    });

    // إظهار نافذة المعلومات
    infoButton.addEventListener('click', () => {
        infoPanel.classList.add('show');
    });

    // إخفاء نافذة المعلومات
    infoPanelCloseButton.addEventListener('click', () => {
        infoPanel.classList.remove('show');
    });

    // 4. برمجة زر المشاركة
    shareButton.addEventListener('click', async () => {
        const shareData = {
            title: 'الجبن التعزي المدخن',
            text: 'اكتشف هذا المنتج الرائع بتقنية ثلاثية الأبعاد والواقع المعزز!',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                alert('المشاركة غير مدعومة على هذا المتصفح. يمكنك نسخ الرابط.');
            }
        } catch (err) {
            console.error('خطأ أثناء محاولة المشاركة:', err);
        }
    });

    // (اختياري) إن أحببت أن تعرف متى يبدأ/ينتهي الـ AR:
    viewer.addEventListener('ar-status', (event) => {
        // console.log(event.detail.status); // values: "not-presenting" أو "session-started" إلخ
    });
});