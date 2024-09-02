// ==UserScript==
// @name         betterButtons
// @namespace    https://github.com/zekwho/betterButtons
// @version      1.0
// @description  Adds dynamic elements to buttons
// @author       ZEK [3369]
// @match        https://cartelempire.online/*
// @icon         https://i.imghippo.com/files/GrifA1725167124.png
// @grant        GM_addStyle
// @run-at       document-end
// @updateURL    https://raw.githubusercontent.com/zekwho/betterButtons/main/betterButtons.js
// @downloadURL  https://raw.githubusercontent.com/zekwho/betterButtons/main/betterButtons.js
// ==/UserScript==

window.onload = (function() {
    'use strict';

    GM_addStyle(`
        @keyframes gradientAnimation {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
        }
        .job-button-gradient {
            background: linear-gradient(45deg, #007bff, #0056b3, #004494, #007bff);
            background-size: 200% 200%;
            animation: gradientAnimation 4s ease infinite;
        }
        .cancel-button-gradient {
            background: linear-gradient(45deg, #88261f, #cc0000, #b30000, #88261f);
            background-size: 200% 200%;
            animation: gradientAnimation 4s ease infinite;
        }
        #messageUser,
        #sendCashtoPlayerBtn,
        [title="Start Trade"],
        [title="Send Mail"],
        [title="Set Bounty"] {
            background: linear-gradient(45deg, #2c3e50, #34495e, #1abc9c, #2ecc71);
            background-size: 200% 200%;
            animation: gradientAnimation 4s ease infinite;
            opacity: 0.9;
            border: none;
            outline: none;
            box-shadow: none;
            font-size: 1.1rem;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            transition: transform 0.3s ease-in-out, opacity 0.3s ease;
        }
        #messageUser:hover,
        #sendCashtoPlayerBtn:hover,
        [title="Start Trade"]:hover,
        [title="Send Mail"]:hover,
        [title="Set Bounty"]:hover {
            opacity: 1;
            transform: scale(1.1);
        }
        .href-button-gradient {
            background: linear-gradient(45deg, #2c3e50, #34495e, #1abc9c, #2ecc71);
            background-size: 200% 200%;
            animation: gradientAnimation 4s ease infinite;
            opacity: 0.9;
            border: none;
            outline: none;
            box-shadow: none;
            font-size: 1.1rem;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            transition: transform 0.3s ease-in-out, opacity 0.3s ease;
        }
        .href-button-gradient:hover {
            opacity: 1;
            transform: scale(1.1);
        }
        .new-message-gradient {
            background: linear-gradient(45deg, #ff8c00, #e67e22, #d35400, #ff8c00);
            background-size: 200% 200%;
            animation: gradientAnimation 4s ease infinite;
        }
        .new-message-gradient:hover {
            opacity: 1;
            transform: scale(1.1);
        }
        .back-to-category-btn-gradient {
            background: linear-gradient(45deg, #007bff, #0056b3, #004494, #007bff);
            background-size: 200% 200%;
            animation: gradientAnimation 4s ease infinite;
        }
        .back-to-category-btn-gradient:hover {
            opacity: 1;
            transform: scale(1.1);
        }
        button, .btn-success, .btn-danger, button.backToCategoryBtn, label.chat-btn {
            border: none !important;
            outline: none !important;
            box-shadow: none !important;
        }
    `);
    function applyGradientAnimationToButtons() {
        const buttons = document.querySelectorAll('.btn-success, .btn-danger, button.backToCategoryBtn, label.chat-btn');
        buttons.forEach(button => {
            if (button.classList.contains('btn-success')) {
                button.classList.add('job-button-gradient');
            } else if (button.classList.contains('btn-danger')) {
                button.classList.add('cancel-button-gradient');
            } else if (button.classList.contains('backToCategoryBtn')) {
                button.classList.add('back-to-category-btn-gradient');
            } else if (button.classList.contains('chat-btn')) {
                if (button.classList.contains('newMessage')) {
                    button.classList.add('new-message-gradient');
                    button.classList.remove('job-button-gradient');
                } else {
                    button.classList.add('job-button-gradient');
                    button.classList.remove('new-message-gradient');
                }
            }
            button.style.transition = 'transform 0.3s ease-in-out'; 
            button.addEventListener('mouseover', () => {
                button.style.transform = 'scale(1.1)';
            });
            button.addEventListener('mouseout', () => {
                button.style.transform = 'scale(1)';
            });
        });
    }
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { 
                        const newButtons = node.querySelectorAll('.btn-success, .btn-danger, button.backToCategoryBtn, label.chat-btn');
                        newButtons.forEach(button => {
                            applyGradientAnimationToButtons();
                        });
                    }
                });
            } else if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.classList.contains('chat-btn') || target.classList.contains('chatContainer')) {
                    if (target.classList.contains('newMessage')) {
                        target.classList.add('new-message-gradient');
                        target.classList.remove('job-button-gradient');
                    } else {
                        target.classList.add('job-button-gradient');
                        target.classList.remove('new-message-gradient');
                    }
                }
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    applyGradientAnimationToButtons();
    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelector('.viewOffersButton')?.addEventListener('click', () => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.matches('button.backToCategoryBtn')) {
                        node.classList.add('back-to-category-btn-gradient');
                        node.style.border = 'none';
                        node.style.outline = 'none';
                        node.style.boxShadow = 'none';
                        node.style.transition = 'transform 0.3s ease-in-out';
                        node.addEventListener('mouseover', () => {
                            node.style.transform = 'scale(1.1)';
                        });
                        node.addEventListener('mouseout', () => {
                            node.style.transform = 'scale(1)';
                        });
                        observer.disconnect();
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
    const hrefButtons = [
        'a[href="/SendMail"]',
        'a[href="/Inbox"]',
        'a[href="/Outbox"]',
        'a[href="/Forum/8"]',
        'a[href="/Cartel/Perks"]',
        'a[href="/Cartel/Armory"]',
        'a[href="/Cartel/Territory"]',
        'a[href="/Cartel/Newsletter"]',
        'a[href="/User/Stats"]',
        'a[href*="/User/"][href*="/images"]',
        'a[href="/Town"]',
        'a[href="/Casino"]',
        'a[href="/Casino/blackjackRules"]',
        'a[href="/Casino/blackjackStats"]',
        'a[href="/Expedition"]',
        'a[href="/Search/Users"]',
        'a[href="/"]',
    ]
    hrefButtons.forEach(selector => {
        const links = document.querySelectorAll(selector);
        links.forEach(link => {
            const button = link.querySelector('button');
            if (button) {
                button.classList.add('href-button-gradient');
                button.style.border = 'none';
                button.style.outline = 'none';
                button.style.boxShadow = 'none';
                button.style.fontSize = '1.1rem';
                button.style.padding = '0.5rem 1rem';
                button.style.borderRadius = '0.375rem';
                button.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease';
                button.addEventListener('mouseover', () => {
                    button.style.opacity = '1';
                    button.style.transform = 'scale(1.1)';
                });
                button.addEventListener('mouseout', () => {
                    button.style.opacity = '0.9';
                    button.style.transform = 'scale(1)';
                });
            }
        });
    });
})();
