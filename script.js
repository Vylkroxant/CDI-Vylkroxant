document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('vCardToCapture');
    const btnDown = document.getElementById('btnDown');
    const inName = document.getElementById('inName');
    const inCourse = document.getElementById('inCourse');
    const inCDI = document.getElementById('inCDI');
    const inLevel = document.getElementById('inLevel');
    const inFile = document.getElementById('inFile');
    const vName = document.getElementById('vName');
    const vCourse = document.getElementById('vCourse');
    const vCDI = document.getElementById('vCDI');
    const vLevel = document.getElementById('vLevel');
    const dot = document.querySelector('.dot');

    let photoLoaded = false;

    function validate() {
        const hasName = inName.value.trim().length > 2;
        const hasCourse = inCourse.value !== "";
        const hasCDI = inCDI.value.trim().length >= 8;
        const hasLevel = inLevel.value !== "";

        const ok = hasName && hasCourse && hasCDI && hasLevel && photoLoaded;
        btnDown.disabled = !ok;
    }

    inName.addEventListener('input', () => { 
        vName.textContent = inName.value.toUpperCase() || "NOMBRE DEL ALUMNO"; 
        validate(); 
    });

    inCDI.addEventListener('input', () => { 
        vCDI.textContent = `#${inCDI.value.toUpperCase()}`; 
        validate(); 
    });

    inCourse.addEventListener('change', () => { 
        vCourse.textContent = inCourse.value.toUpperCase() || "Especialidad Vylkroxant"; 
        validate(); 
    });

    inLevel.addEventListener('change', () => {
        const nivel = inLevel.value;
        vLevel.textContent = ` ${nivel}`;

        vLevel.style.color = "white";

        if (nivel === "Estudiante Distinguido en:") {
            dot.style.background = "#FFD700"; 
            dot.style.boxShadow = "0 0 15px #FFD700";
            vLevel.style.color = "#FFD700";
        } else if (nivel === "Estudiante en Formación en:") {
            dot.style.background = "#8AB4FF"; 
            dot.style.boxShadow = "0 0 15px #8AB4FF";
            vLevel.style.color = "#8AB4FF";
        } else if (nivel === "Estudiante Inicial en:") {
            dot.style.background = "#7CFFD1"; 
            dot.style.boxShadow = "0 0 15px #7CFFD1";
            vLevel.style.color = "#7CFFD1";
        }
        
        validate();
    });
    
    inFile.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('vCardPhoto').innerHTML = `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
                photoLoaded = true; 
                validate();
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    btnDown.addEventListener('click', () => {
        const originalTransform = card.style.transform;
        card.style.transform = "none";
        
        setTimeout(() => {
            html2canvas(card, {
                scale: 3,
                useCORS: true,
                backgroundColor: null,
                width: 600,
                height: 350
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `Gafete_Vylkroxant_${inName.value.split(' ')[0]}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                card.style.transform = originalTransform;
            });
        }, 150);
    });

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const rotX = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
        const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * -15;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });

    document.addEventListener('contextmenu', e => e.preventDefault());

    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 123) e.preventDefault();
        if (e.ctrlKey || e.metaKey) {
            const key = e.key.toLowerCase();
            if (['s', 'u', 'p', 'c', 'i', 'j'].includes(key)) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }
    }, true);
});
