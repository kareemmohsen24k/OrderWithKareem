document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const btnIcon = document.querySelector('.btn-icon');
    const projectTitle = document.querySelector('.project-title h1');
    const themeToggle = document.getElementById('themeToggle');
    const themeText = document.querySelector('.theme-text');

    // إدارة الوضع الليلي/النهاري
    function initThemeToggle() {
        // استعادة الوضع المحفوظ
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-theme');
            updateThemeText('الوضع النهاري');
        } else {
            document.body.classList.remove('dark-theme');
            updateThemeText('الوضع الليلي');
        }

        // إضافة مستمع الحدث للزر
        themeToggle.addEventListener('click', toggleTheme);
        
        // تأثير النقر على الزر
        themeToggle.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        themeToggle.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        themeToggle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // تبديل الوضع
    function toggleTheme() {
        const isDark = document.body.classList.contains('dark-theme');
        
        if (isDark) {
            // التبديل إلى الوضع النهاري
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            updateThemeText('الوضع الليلي');
            
            // تأثير انتقالي
            createThemeTransitionEffect('light');
        } else {
            // التبديل إلى الوضع الليلي
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeText('الوضع النهاري');
            
            // تأثير انتقالي
            createThemeTransitionEffect('dark');
        }
    }

    // تحديث نص الزر
    function updateThemeText(text) {
        if (themeText) {
            themeText.textContent = text;
        }
    }

    // إنشاء تأثير انتقالي عند تغيير الوضع
    function createThemeTransitionEffect(theme) {
        // إنشاء عنصر انتقالي
        const transition = document.createElement('div');
        transition.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)'};
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(transition);
        
        // تأثير الظهور
        setTimeout(() => {
            transition.style.opacity = '1';
        }, 10);
        
        // إزالة التأثير
        setTimeout(() => {
            transition.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(transition);
            }, 300);
        }, 300);
    }

    // إضافة تأثيرات للعنوان
    function addTitleEffects() {
        projectTitle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
            this.style.filter = 'brightness(1.2)';
        });
        
        projectTitle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1)';
        });
        
        // تأثير الكتابة
        const text = projectTitle.textContent;
        projectTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                projectTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // إضافة جزيئات متحركة
    function createParticles() {
        const container = document.querySelector('.container');
        
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 5000);
        }, 300);
    }

    // تأثيرات الحقول
    function addFieldEffects() {
        const inputs = document.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // تأثير عند التركيز
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 0 20px rgba(78, 205, 196, 0.3)';
            });
            
            // إزالة التأثير عند فقد التركيز
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
            
            // تأثير الكتابة
            input.addEventListener('input', function() {
                validateField(this);
                if (this.value.length > 0) {
                    this.style.borderColor = '#4ecdc4';
                    this.style.background = 'var(--card-bg)';
                }
            });
            
            // تأثير hover
            input.addEventListener('mouseenter', function() {
                if (!this.matches(':focus')) {
                    this.style.transform = 'translateY(-1px)';
                    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                }
            });
            
            input.addEventListener('mouseleave', function() {
                if (!this.matches(':focus')) {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = 'none';
                }
            });
        });
    }

    // التعامل مع إرسال النموذج
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // تأثيرات الزر أثناء الإرسال
        submitBtn.disabled = true;
        btnText.textContent = 'جاري الإرسال...';
        btnIcon.textContent = '⏳';
        submitBtn.style.background = 'linear-gradient(45deg, #f39c12, #e67e22)';
        submitBtn.style.animation = 'pulse 1s ease infinite';
        
        // جمع بيانات النموذج
        const formData = new FormData(form);
        
        // إرسال البيانات إلى Formspree
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // نجح الإرسال
                showSuccessMessage();
                form.reset();
                createSuccessParticles();
            } else {
                // فشل الإرسال
                throw new Error('فشل في إرسال الطلب');
            }
        })
        .catch(error => {
            console.error('خطأ:', error);
            showErrorMessage('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
        })
        .finally(() => {
            // إعادة تعيين حالة الزر
            submitBtn.disabled = false;
            btnText.textContent = 'إرسال الطلب';
            btnIcon.textContent = '🚀';
            submitBtn.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)';
            submitBtn.style.animation = 'gradientShift 3s ease infinite';
        });
    });

    // عرض رسالة النجاح
    function showSuccessMessage() {
        successMessage.classList.remove('hidden');
        successMessage.classList.add('show');
        
        // تأثيرات إضافية
        document.body.style.overflow = 'hidden';
        
        // إخفاء رسالة النجاح بعد 5 ثوانٍ
        setTimeout(() => {
            successMessage.classList.remove('show');
            setTimeout(() => {
                successMessage.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 500);
        }, 5000);
    }

    // إنشاء جزيئات النجاح
    function createSuccessParticles() {
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: linear-gradient(45deg, #4ecdc4, #45b7d1);
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: successParticle 2s ease-out forwards;
                `;
                container.appendChild(particle);
                
                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }

    // عرض رسالة خطأ
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #e74c3c, #c0392b);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(231, 76, 60, 0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease;
            font-family: 'Cairo', sans-serif;
            font-weight: 600;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => errorDiv.remove(), 500);
        }, 3000);
    }

    // دالة التحقق من صحة الحقول
    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldName = field.name;
        
        // إزالة رسائل الخطأ السابقة
        removeErrorMessage(field);
        
        // التحقق من الحقول المطلوبة
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'هذا الحقل مطلوب');
            return false;
        }
        
        // التحقق من رقم الهاتف
        if (fieldName === 'phoneNumber' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'يرجى إدخال رقم هاتف صحيح');
                return false;
            }
        }
        
        // التحقق من اسم العميل
        if (fieldName === 'customerName' && value) {
            if (value.length < 2) {
                showFieldError(field, 'يجب أن يكون الاسم أكثر من حرفين');
                return false;
            }
        }
        
        // التحقق من اسم المنتج
        if (fieldName === 'productName' && value) {
            if (value.length < 2) {
                showFieldError(field, 'يجب أن يكون اسم المنتج أكثر من حرفين');
                return false;
            }
        }
        
        return true;
    }

    // عرض رسالة خطأ للحقل
    function showFieldError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
        field.style.borderColor = '#e74c3c';
        field.style.animation = 'errorShake 0.5s ease';
    }

    // إزالة رسالة خطأ
    function removeErrorMessage(field) {
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = 'var(--input-border)';
    }

    // إضافة CSS للرسائل المتحركة
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes successParticle {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        .form-group.focused label {
            color: #4ecdc4;
        }
    `;
    document.head.appendChild(style);

    // تحسين تجربة المستخدم - حفظ البيانات مؤقتاً
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // استعادة البيانات المحفوظة
        const savedValue = localStorage.getItem(`form_${input.name}`);
        if (savedValue) {
            input.value = savedValue;
        }
        
        // حفظ البيانات عند التغيير
        input.addEventListener('input', function() {
            localStorage.setItem(`form_${this.name}`, this.value);
        });
    });

    // مسح البيانات المحفوظة عند الإرسال الناجح
    function clearSavedData() {
        inputs.forEach(input => {
            localStorage.removeItem(`form_${input.name}`);
        });
    }

    // إضافة دالة مسح البيانات المحفوظة إلى دالة النجاح
    const originalShowSuccessMessage = showSuccessMessage;
    showSuccessMessage = function() {
        originalShowSuccessMessage();
        clearSavedData();
    };

    // تشغيل التأثيرات
    initThemeToggle();
    addTitleEffects();
    createParticles();
    addFieldEffects();

    // تأثير تحميل الصفحة
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        document.body.style.transition = 'all 0.8s ease';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
}); 