// පෝස්ට් එකේ ඇති ටෙක්ස්ට් එක කොපි කරන ෆන්ක්ෂන් එක
function copyPostText(element, btn) {
    // "See more" හෝ "තවත් බලන්න" බොත්තම තිබේ නම් එය ක්ලික් කරයි
    const seeMore = element.querySelector('div[role="button"]');
    if (seeMore && (seeMore.innerText.includes("See more") || seeMore.innerText.includes("තවත් බලන්න"))) {
        seeMore.click();
    }

    setTimeout(() => {
        // ඔබ එවූ පින්තූරයේ ඇති classes භාවිතයෙන් ටෙක්ස්ට් එක සොයයි
        const textSpan = element.querySelector('span[dir="auto"]');
        if (textSpan) {
            let fullText = textSpan.innerText.replace(/See more|තවත් බලන්න/g, "").trim();
            navigator.clipboard.writeText(fullText).then(() => {
                btn.innerText = "Copied!";
                btn.style.backgroundColor = "#28a745";
                setTimeout(() => {
                    btn.innerText = "Copy Story";
                    btn.style.backgroundColor = "#0866FF";
                }, 2000);
            });
        }
    }, 500);
}

// හැම පෝස්ට් එකකටම බොත්තම ඇතුළත් කරන ෆන්ක්ෂන් එක
function injectButtons() {
    const posts = document.querySelectorAll('div[role="article"]:not(.btn-added)');
    
    posts.forEach(post => {
        post.classList.add('btn-added');
        
        const copyBtn = document.createElement('button');
        copyBtn.innerText = "Copy Story";
        copyBtn.className = "fb-copy-btn";
        
        copyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            copyPostText(post, copyBtn);
        });

        // පෝස්ට් එකේ ඉහළ කොටසට බොත්තම එකතු කිරීම
        post.appendChild(copyBtn);
    });
}

// පේජ් එක scroll කරන විට අලුත් පෝස්ට් සඳහා බොත්තම ඇතුළත් කිරීමට
const observer = new MutationObserver(injectButtons);
observer.observe(document.body, { childList: true, subtree: true });

// මුලින්ම පේජ් එක load වන විට
injectButtons();
